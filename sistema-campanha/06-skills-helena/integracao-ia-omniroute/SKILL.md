# SKILL: Integração IA e OmniRoute

> **Propósito**: Guia operacional completo do OmniRoute — gateway multi-provedor self-hosted que transforma assinaturas de IA em API (custo zero por token). Inclui acesso SSH/Docker, 14 combos, 12 provedores ativos, debugging e troubleshooting.
>
> **Atualizado**: 2026-03-05 (auditoria completa + limpeza de providers mortos)

---

## QUANDO USAR ESTA SKILL

- Configurar, debugar ou auditar providers de IA
- Entender cadeia de fallback OmniRoute → CLI → API
- Adicionar/remover modelos ou combos no OmniRoute
- Resolver erros de chamada à IA (400, 403, 429, timeout)
- Verificar status de providers e connections
- Entender prefixos de modelos (cc/, cx/, gc/, etc.)
- Fazer manutenção no SQLite do OmniRoute via SSH

---

## ARQUITETURA GERAL

```
┌─────────────────────────────────────────────────────────────┐
│                   APLICAÇÃO (Backend FastAPI)                │
│                                                              │
│  helena_provider.py (orquestrador)                          │
│       ↓                                                      │
│  modelo_router.py (roteamento por tipo de tarefa)           │
│       ↓                                                      │
│  helena_servico.py / chat_inteligencia.py (execução)        │
│       ↓                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │  OmniRoute   │  │ Claude Code  │  │  API Anthropic    │ │
│  │  (Primário)  │→→│ CLI(Fallback)│→→│  (Último resort)  │ │
│  │  Custo: $0   │  │  Custo: $0   │  │  Custo: $$$/tok   │ │
│  └──────┬───────┘  └──────────────┘  └───────────────────┘ │
│         ↓                                                    │
│  ┌──────────────────────────────────────────┐               │
│  │        OmniRoute Gateway (VPS)           │               │
│  │  host privado via env | Docker: 20128   │               │
│  │                                          │               │
│  │  12 Providers ativos com 14 combos       │               │
│  │  Estratégias: priority, round-robin,     │               │
│  │               least-used                 │               │
│  │                                          │               │
│  │  SQLite: /app/data/storage.sqlite        │               │
│  └──────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## ACESSO AO OMNIROUTE (SSH + Docker)

### Dados de Acesso

| Item | Valor |
|------|-------|
| **VPS IP** | definido em `VPS_HOST` local/cofre |
| **Container** | omniroute-inteia |
| **Porta interna** | **20128** (NÃO 3456 — cuidado com configs antigas) |
| **Porta externa** | 443 (HTTPS via Nginx) |
| **URL pública** | definida em `OMNIROUTE_URL` local/cofre |
| **Dashboard** | definido em cofre local / env privado |
| **SQLite** | /app/data/storage.sqlite (dentro do container) |
| **Node.js** | v22.22.0 |
| **better-sqlite3** | /app/node_modules/better-sqlite3 |

### Comandos SSH Essenciais

```bash
# Conectar ao VPS
ssh "$VPS_USER@$VPS_HOST"

# Ver container rodando
docker ps --format '{{.Names}} {{.Ports}} {{.Status}}'

# Executar comando dentro do container
docker exec omniroute-inteia <comando>

# Shell interativo no container
docker exec -it omniroute-inteia /bin/sh

# Testar porta interna (DEVE ser 20128)
docker exec omniroute-inteia wget -qO- http://localhost:20128/health

# Ver logs do container
docker logs omniroute-inteia --tail 100
docker logs omniroute-inteia -f  # follow em tempo real
```

### Consultar SQLite via SSH

```bash
# IMPORTANTE: Usar node com better-sqlite3 (não tem sqlite3 CLI no container)

# Listar providers ativos
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
const rows = db.prepare('SELECT id, provider, name, enabled FROM provider_connections ORDER BY provider').all();
rows.forEach(r => console.log(r.id, r.provider, r.name, r.enabled ? 'ATIVO' : 'DESAB'));
\""

# Listar combos
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
const rows = db.prepare('SELECT name, data FROM combos').all();
rows.forEach(r => { const d = JSON.parse(r.data); console.log(r.name, d.strategy, d.models.length + ' modelos'); });
\""

# Ver call_logs recentes (últimos erros)
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
const rows = db.prepare('SELECT model, status, error, created_at FROM call_logs WHERE status != 200 ORDER BY created_at DESC LIMIT 20').all();
rows.forEach(r => console.log(r.created_at, r.status, r.model, (r.error||'').substring(0,60)));
\""

# Estatísticas de erros por modelo (7 dias)
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
const rows = db.prepare('SELECT model, status, COUNT(*) as c FROM call_logs WHERE created_at > datetime(\\\"now\\\", \\\"-7 days\\\") AND status != 200 GROUP BY model, status ORDER BY c DESC LIMIT 20').all();
rows.forEach(r => console.log(r.model, 'status=' + r.status, 'count=' + r.c));
\""
```

### Modificar Combos via SQLite

```bash
# ATENÇÃO: Backup antes de modificar!
# Formato do campo 'data' em combos: JSON com {strategy, models: [{model, weight}]}

# Exemplo: Adicionar modelo a um combo
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
const row = db.prepare('SELECT data FROM combos WHERE name = \\\"helena-premium\\\"').get();
const d = JSON.parse(row.data);
console.log('Antes:', d.models.length, 'modelos');
// d.models.push({model: 'novo/modelo', weight: 50});
// db.prepare('UPDATE combos SET data = ? WHERE name = \\\"helena-premium\\\"').run(JSON.stringify(d));
// console.log('Depois:', d.models.length + 1, 'modelos');
\""
```

### Habilitar/Desabilitar Providers

```bash
# Desabilitar um provider (por ID da connection)
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
db.prepare('UPDATE provider_connections SET enabled = 0 WHERE id = 42').run();
console.log('Provider 42 desabilitado');
\""

# Habilitar um provider
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db = require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
db.prepare('UPDATE provider_connections SET enabled = 1 WHERE id = 42').run();
console.log('Provider 42 habilitado');
\""
```

---

## PROVEDORES ATIVOS (12) — Atualizado 2026-03-05

| # | Provider | Prefixo | Connections | Tipo | Custo | Modelos-Chave |
|---|----------|---------|-------------|------|-------|---------------|
| 1 | **Claude Max** | `cc/` | 2 (igor, 2ª conta) | OAuth | $0 (assinatura) | claude-opus-4-6, claude-sonnet-4-5 |
| 2 | **Codex (ChatGPT Business)** | `cx/` | 2 (igorlegalgpt, igoriacompartilhado) | OAuth | $0 ($25/vaga/ano) | gpt-5.3-codex-xhigh, gpt-5.1-codex-mini |
| 3 | **Gemini CLI** | `gc/` | 1 (rennanmarques) | OAuth | $0 | gemini-3-pro-preview, gemini-2.5-flash |
| 4 | **GitHub Copilot** | `gh/` | 1 | OAuth | $0 (~$10/mês) | claude-sonnet-4.5, gpt-4o, gemini-2.5-pro |
| 5 | **Kiro (AWS)** | `kr/` | 1 | OAuth | $0 | claude-sonnet-4.5, claude-haiku-4.5 |
| 6 | **Perplexity** | `pplx/` | 1 | API Key | Pago | sonar-pro, sonar |
| 7 | **Together AI** | `together/` | 1 | API Key | Free tier | Llama-3.3-70B, DeepSeek-R1, Qwen3-235B |
| 8 | **NVIDIA NIM** | `nvidia/` | 1 | API Key | Free tier | deepseek-v3.2, llama-3.3-70b |
| 9 | **OpenAI API** | `openai/` | 1 | API Key | Pago ($2.65) | gpt-4o, gpt-4o-mini (ÚLTIMO RECURSO) |
| 10 | **xAI (Grok)** | `xai/` | 1 | API Key | Free tier | grok-3, grok-3-mini |
| 11 | **Qwen (Alibaba)** | `qw/` | 1 | OAuth | $0 | qwen3-coder-plus, qwen3-coder-flash |
| 12 | **Kimi Coding** | `kmc/` | 1 | OAuth | $0 | kimi-k2.5 (⚠️ 402 — membership expirada) |

### Provedores DESABILITADOS (7) — Limpeza 2026-03-05

| Provider | Conexões | Motivo |
|----------|----------|--------|
| **Antigravity** | 7 | Banido por violação de ToS (403). 1.375 erros/semana |
| **Cerebras** | 1 | llama-3.3-70b removido do free tier (404) |
| **Nanobanana** | 1 | Provider morto |
| **Groq** | 1 | Fila congestionada (736 reqs), timeout constante |
| **Kilocode** | 1 | Provider morto |
| **Gemini API Key** | 1 | Quota permanentemente esgotada (429) |
| **Gemini CLI (6 contas)** | 6 | "Permission denied on resource project" (403) |

---

## 14 COMBOS — Atualizado 2026-03-05

### Uso por Tipo de Tarefa (modelo_router.py)

| Tipo de Tarefa | Combo | Estratégia |
|----------------|-------|------------|
| CHAT_HELENA | helena-premium | priority |
| ENTREVISTA | entrevistas-bulk | round-robin |
| ENTREVISTA_BULK | entrevistas-bulk | round-robin |
| GERACAO_PERFIL | fast-quality | priority |
| MENSAGEM | fast-quality | priority |
| ANALISE | claude-only | priority |
| SINTESE | thinking-chain | priority |
| CLASSIFICACAO | json-extract | priority |
| SONHO | helena-premium | priority |
| WHATSAPP_ROUTING | haiku-tasks | least-used |
| WHATSAPP_AGENTE | whatsapp-smart | priority |
| MULTIMODAL | vision-multi | priority |
| PARLAMENTAR | research-deep | priority |
| CENARIO | thinking-chain | priority |
| CONSULTOR | fast-quality | priority |

### Descrição dos Combos

| # | Combo | Estratégia | Cadeia de Modelos | Uso |
|---|-------|------------|-------------------|-----|
| 1 | **helena-premium** | priority | Opus 4.6 (2 contas) → Codex xHigh → Sonnet → Kiro → Gemini 3 Pro → GitHub → Llama | Análise complexa, chat Helena |
| 2 | **nexo-ops** | priority | Opus → Codex → Sonnet → Codex Mini → GitHub → Gemini Flash → Llama | Operações gerais |
| 3 | **fast-quality** | priority | Sonnet → Flash → GitHub → Kiro → Together | Chat rápido com qualidade |
| 4 | **claude-only** | priority | Opus → Sonnet → Haiku → Kiro | Cadeia pura Claude (formato Anthropic) |
| 5 | **research-deep** | priority | Perplexity → Opus → Codex xHigh → Gemini 3 Pro → GitHub → DeepSeek | Pesquisa profunda |
| 6 | **thinking-chain** | priority | Opus → Codex xHigh → Kiro → DeepSeek R1 | Raciocínio estendido |
| 7 | **coding-power** | priority | Codex 5.3 → Opus → Codex 5.1 → Sonnet → Kiro → GitHub → DeepSeek | Código |
| 8 | **vision-multi** | priority | Opus → GitHub GPT-4o → Gemini 3 Pro → Flash → Codex | Multimodal/imagens |
| 9 | **entrevistas-bulk** | round-robin | Sonnet → Codex Mini → Kiro → Gemini Flash → GitHub → Together → NVIDIA | Volume/entrevistas |
| 10 | **haiku-tasks** | least-used | Haiku → Flash → GPT-4o Mini → Together → NVIDIA | Tarefas leves |
| 11 | **long-context** | priority | Codex xHigh (400K) → Codex (400K) → Opus (200K) → Gemini 3 Pro → GitHub → DeepSeek | Docs longos |
| 12 | **json-extract** | priority | Codex xHigh → Sonnet → Flash → GitHub → NVIDIA | Extração estruturada |
| 13 | **whatsapp-smart** | priority | Sonnet → Flash → GitHub → Together → NVIDIA | WhatsApp rápido |
| 14 | **free-unlimited** | round-robin | GitHub → Together → NVIDIA → Perplexity | Gratuito ilimitado |

### Estratégias de Combo

| Estratégia | Comportamento |
|------------|---------------|
| **priority** | Tenta modelos em ordem de peso (maior primeiro). Se falha, próximo. |
| **round-robin** | Rotaciona entre modelos (sticky_round_robin_limit=3). |
| **least-used** | Usa o modelo com menos chamadas recentes. |

---

## REGRAS CRÍTICAS (BUGS CONHECIDOS)

### 1. NUNCA terminar mensagens com role=assistant (Prefill Bug)

**Problema**: OmniRoute NÃO suporta "assistant message prefill" do Claude. Se o histórico terminar com `role: "assistant"`, retorna erro 400.

**Causa comum**: Quando Helena retorna erro, a mensagem de erro é salva como `role: "assistant"` no histórico. Na próxima request, o histórico termina com assistant e dá 400.

**Fix implementado** (helena_servico.py):
```python
# Em _montar_historico_api():
while mensagens and mensagens[-1]["role"] == "assistant":
    mensagens.pop()
return mensagens

# Em builder de mensagens formato OpenAI:
messages.extend(historico_api)
while messages and messages[-1].get("role") == "assistant":
    messages.pop()
```

### 2. Nomes de Modelos Gemini

| Nome CORRETO | Nome ERRADO (404) |
|-------------|-------------------|
| `gemini-3-pro-preview` | `gemini-3.1-pro`, `gemini-3-pro` |
| `gemini-3-flash-preview` | `gemini-3.1-flash`, `gemini-3-flash` |
| `gemini-2.5-flash` | `gemini-2.5-flash-preview` |
| `gemini-2.5-pro` | `gemini-2.5-pro-preview` |

### 3. Antigravity Provider — BANIDO

O provider Antigravity (ag/) foi desabilitado permanentemente por violação de ToS (Google Cloud). Todas as referências no código foram removidas. NÃO reabilitar.

Modelos que eram exclusivos do Antigravity (thinking models) foram substituídos:
- `ag/claude-opus-4-6-thinking` → `cc/claude-sonnet-4-5-20250929` + `kr/claude-sonnet-4.5`

### 4. Escaping de Caracteres em SSH

Ao executar comandos Node.js via SSH + Docker exec, `!==` é interpretado pelo bash. Usar `!=` ou copiar script para arquivo temporário:

```bash
# Método seguro: criar arquivo .js e copiar para o container
echo 'const db = require(...); ...' > /tmp/query.js
docker cp /tmp/query.js omniroute-inteia:/tmp/query.js
docker exec omniroute-inteia node /tmp/query.js
```

---

## CONFIGURAÇÃO (.env)

```env
# ========== PROVIDER PRINCIPAL ==========
HELENA_MODO=omniroute              # Provider Helena: omniroute | claude_code | api
IA_PROVIDER=omniroute              # Provider global: omniroute | claude_code | api
IA_ALLOW_API_FALLBACK=true         # Permitir fallback para API paga

# ========== MODELOS (ALIASES) ==========
IA_MODELO_ENTREVISTAS=sonnet       # Para entrevistas (custo-benefício)
IA_MODELO_INSIGHTS=opus            # Para análises complexas (Helena)

# ========== OMNIROUTE ==========
OMNIROUTE_URL=https://<host-privado-definido-no-env>
OMNIROUTE_API_KEY=sk-...            # Chave de acesso (salva no .env)

# ========== API ANTHROPIC (ÚLTIMO FALLBACK) ==========
CLAUDE_API_KEY=sk-ant-...           # Chave API Anthropic (custo por token)
```

---

## CADEIA DE FALLBACK (Backend)

```
helena_provider.py
  ├─ 1. OmniRoute (chamar_omniroute) — custo $0, 14 combos
  │     └─ Retry 3x com backoff
  ├─ 2. Claude Code CLI (chamar_claude_code_cli) — custo $0, local
  │     └─ Fallback se OmniRoute offline
  ├─ 3. API Anthropic (chamar_api_anthropic) — custo $$$
  │     └─ Último recurso se tudo falhar
  └─ 4. Formato OpenAI (chamar_openai_compat) — para modelos não-Claude
        └─ Usado quando modelo não é Claude (GPT, Gemini, etc.)
```

### Prevenção de Cascata de Rate Limit

Quando UM provider bate rate limit, o sistema inteiro pode travar se todos os agentes tentarem o mesmo fallback ao mesmo tempo. Para evitar:

1. **Isolar falhas por agente**: Se Helena bate 429 no Opus, so Helena faz fallback. Outros agentes que usam Opus nao sao afetados imediatamente — cada um tem sua propria detecção.

2. **Backoff progressivo (AIMD)**: No retry, dobrar o intervalo de espera a cada falha consecutiva. Primeira falha: 1s. Segunda: 2s. Terceira: 4s. Cortar pela metade quando voltar a funcionar. Nunca fazer retry imediato em loop — isso e o que causa cascata.

3. **Admission control na entrada**: Antes de enviar uma chamada ao OmniRoute, verificar se o combo alvo teve >50% de falha nos ultimos 60s. Se sim, pular direto para o proximo combo da cadeia. Nao desperdicar uma tentativa em provider que voce SABE que esta com problema.

4. **Zombie detection**: Se um subagente fez chamada e nao recebeu resposta em 30s, considerar como morto. Liberar os recursos e registrar no log. Nao ficar esperando eternamente — isso bloqueia a lane para outros agentes.

5. **Filas de prioridade**: Mensagens do usuario (interativas) SEMPRE passam na frente de tarefas de background (cron, heartbeat, auditoria). Se o sistema esta sob pressao de rate limit, sacrificar as tarefas de background primeiro, nunca a experiencia do usuario.

6. **Modelo certo para tarefa certa — nao use canhao para matar mosca**: Para tarefas de CLASSIFICAÇÃO (rotear pedido, detectar tipo de eleitor, triagem de urgencia), modelo pequeno e rapido (Haiku) e tao bom ou melhor que modelo grande. Opus e para GERAR conteudo complexo, nao para decidir se um pedido e juridico ou tecnico. Classificar com Haiku (0.3s), gerar com Opus (5s). Se inverter, gasta 15x mais tempo sem ganho de qualidade na classificacao.

7. **Health check inline antes de chamada** — Antes de enviar chamada ao OmniRoute, verificar saúde do provider alvo em <1s. Template:

```python
# Health check inline (adicionar em helena_provider.py antes de chamar_omniroute)
async def provider_saudavel(combo: str, janela_segundos: int = 60) -> bool:
    """Verifica se o combo teve >50% sucesso nos últimos N segundos."""
    stats = cache_health.get(combo)
    if not stats or stats["ultima_verificacao"] < time.time() - janela_segundos:
        return True  # Sem dados recentes = assumir saudável
    taxa_sucesso = stats["sucessos"] / max(stats["total"], 1)
    return taxa_sucesso > 0.5

# Uso no fluxo:
if not await provider_saudavel("helena-premium"):
    logger.warning("helena-premium degradado, pulando para nexo-ops")
    combo = "nexo-ops"  # Próximo da cadeia
```

**Cache de saúde**: Dict em memória `{combo: {sucessos, falhas, total, ultima_verificacao}}`. Atualizar após cada chamada. Reset a cada 5 minutos. Sem dependência externa.

### Streaming (chat_inteligencia.py)

Cadeia de modelos para streaming Helena:
```python
modelos_stream = [
    modelo_primario,                    # helena-premium ou modelo escolhido
    "cx/gpt-5.3-codex-xhigh",          # Codex alta qualidade
    "cc/claude-sonnet-4-5-20250929",    # Claude Sonnet via Max
    "kr/claude-sonnet-4.5",            # Kiro Sonnet
]
```

---

## MODELO ROUTER (modelo_router.py)

### Heurísticas de Ajuste Automático

| Condição | Override | Justificativa |
|----------|---------|---------------|
| `quantidade_itens >= 50` | free-unlimited | Batch grande → modelos gratuitos |
| `quantidade_itens >= 10` | entrevistas-bulk | Bulk → round-robin |
| `quantidade_itens <= 3` (tarefas simples) | haiku-tasks | Poucos itens → haiku |
| `tokens_esperados <= 200` | haiku-tasks | Output curto → haiku |

### Modelos Confiados (helena_prompt.py)

Modelos fora desta lista recebem disclaimer automático:
```python
MODELOS_CONFIADOS = {
    "claude-opus-4-6",
    "claude-opus-4-5-20251101",
    "claude-sonnet-4-6",
    "claude-sonnet-4-5-20250929",
    "claude-sonnet-4-20250514",
    "claude-3-5-haiku-20241022",
    "helena-premium",
    "cc/claude-opus-4-6",
    "cc/claude-sonnet-4-5-20250929",
    "kr/claude-sonnet-4.5",
    "opus", "sonnet",
}
```

---

## TROUBLESHOOTING

### Diagnóstico Rápido

```bash
# 1. OmniRoute está online?
curl -s "$OMNIROUTE_URL/health" | head -5

# 2. Container rodando?
ssh "$VPS_USER@$VPS_HOST" "docker ps --filter name=omniroute-inteia --format '{{.Status}}'"

# 3. Teste direto de chamada
curl -s -X POST "$OMNIROUTE_URL/v1/messages" \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"helena-premium","max_tokens":50,"messages":[{"role":"user","content":"ping"}]}'

# 4. Verificar erros recentes
ssh "$VPS_USER@$VPS_HOST" "docker exec omniroute-inteia node -e \"
const db=require('/app/node_modules/better-sqlite3')('/app/data/storage.sqlite');
db.prepare('SELECT model,status,COUNT(*)as c FROM call_logs WHERE created_at>datetime(\\\"now\\\",\\\"-1 day\\\") AND status!=200 GROUP BY model,status ORDER BY c DESC LIMIT 10').all().forEach(r=>console.log(r.model,r.status,r.c));
\""
```

### Problemas Comuns

| Problema | Causa | Solução |
|----------|-------|---------|
| Erro 400 "prefill not supported" | Histórico termina com assistant | Guard em _montar_historico_api() (já fixado) |
| Erro 403 em Gemini | OAuth expirado ou conta sem permissão | Desabilitar connection, usar outra |
| Erro 429 rate limit | Muitas chamadas simultâneas | OmniRoute faz retry automático via combo. Ver "Prevenção de Cascata" abaixo |
| Resposta vazia | Token OAuth expirado | Re-autenticar no dashboard OmniRoute |
| Timeout | Provider lento ou offline | Combo faz fallback para próximo modelo |
| Erro 402 Kimi | Membership expirada | Re-autenticar OAuth no dashboard |
| Porta 3456 não responde | Porta ERRADA (é 20128) | Usar porta 20128 sempre |

### Trocar Provider Rapidamente

```env
# OmniRoute (padrão, custo zero)
IA_PROVIDER=omniroute

# Claude Code CLI (local)
IA_PROVIDER=claude_code

# API Anthropic direta (custo por token)
IA_PROVIDER=api

# Auto-detect
IA_PROVIDER=auto
```

---

## ARQUIVOS-CHAVE

| Arquivo | Função |
|---------|--------|
| `backend/app/servicos/helena_provider.py` | Orquestrador de fallback |
| `backend/app/servicos/helena_servico.py` | Serviço principal Helena (streaming, histórico) |
| `backend/app/servicos/helena_prompt.py` | Prompts, persona, modelos confiados, meta-infra |
| `backend/app/servicos/modelo_router.py` | Roteamento inteligente por tipo de tarefa |
| `backend/app/servicos/ia_monitor.py` | Monitoramento de providers e métricas |
| `backend/app/api/rotas/chat_inteligencia.py` | Endpoint de chat Helena (streaming SSE) |
| `backend/app/core/config.py` | Configuração de providers (.env) |
| `agentes/omniroute-config.json` | Snapshot de configuração OmniRoute |

---

## GESTÃO DE CONTAS

### Calendário de Renovação

| Conta | Plano | Custo | Renovação | Prioridade |
|-------|-------|-------|-----------|------------|
| Claude Max (igor) | Mensal | ~R$100/mês | Automática | ALTA |
| ChatGPT Business (INTEIA) | Anual | ~$75/ano (3 vagas) | 2026-04-02 | ALTA |
| GitHub Copilot | Mensal | ~$10/mês | Automática | MÉDIA |
| Kiro (AWS) | Gratuito | $0 | Auto-refresh | MÉDIA |
| Gemini CLI (Rennan) | Gratuito | $0 | Auto-refresh | MÉDIA |
| Qwen (Alibaba) | Gratuito | $0 | Auto-refresh | BAIXA |
| Together AI | Free tier | $0 | N/A | BAIXA |
| NVIDIA NIM | Free tier | $0 | N/A | BAIXA |
| xAI (Grok) | Free tier | $0 | N/A | BAIXA |

### Ações Pendentes

1. Kimi Coding: re-autenticar OAuth (erro 402 — membership expirada)
2. Monitorar 6 contas Gemini-CLI desabilitadas — podem voltar após re-auth

---

## BASE CIENTIFICA: Model Merging e Routing (Song & Zheng, Tencent 2026)

> Fonte: arXiv:2603.09938v1, "Model Merging in the Era of Large Language Models"
> Survey: 100+ papers, taxonomia FUSE, 53 paginas
> Confianca: 0.90 — Meta-analise exaustiva com benchmark FusionBench

### Por Que OmniRoute Funciona (Fundamento Teorico)

O OmniRoute implementa, na camada de API, o que a literatura chama de **Mixture-of-Experts (MoE) routing**:
- Cada combo e um sistema MoE com K experts (providers) e estrategia de routing
- O modelo_router.py funciona como **gating network**: g(x) = softmax(task_type -> combo -> model_priority)
- A cadeia de fallback e equivalente a **sparse top-k routing**: ativa 1 expert por vez, fallback se falha

### Conceitos Aplicaveis

| Conceito Paper | Equivalente OmniRoute | Acao |
|----------------|----------------------|------|
| Linear Mode Connectivity | Modelos Claude (Opus/Sonnet/Haiku) do mesmo trunk | Fallback entre Claudes e suave |
| Shared Initialization | Familia Claude (mesmo pretrain) | Priorizar familia Claude em combos criticos |
| Task Vector Negation | Remover provider do combo | Eliminar modelo que degrada qualidade |
| TIES-Merging (trim conflitos) | Desabilitar connections com erro | Limpeza de providers mortos |
| Cross-Architecture | Combo com Claude + GPT + Gemini | Possivel para volume, nao para qualidade |

### Regras Derivadas

1. **Combos criticos**: priorizar mesma familia (Claude) — Linear Mode Connectivity garante coerencia
2. **Combos de volume**: podem misturar familias — inferencia e tratada como aproximacao
3. **Metrica TRR** (Task Retention Rate) = perf_combo / perf_melhor_individual. Se < 0.85, investigar

---

*Skill reescrita em 2026-03-05 apos auditoria completa + limpeza de 17 connections mortas*
*Atualizado 2026-03-11: base cientifica Model Merging (Song & Zheng, Tencent 2026)*
*Melhoria esperada: taxa de sucesso de 68% -> ~85-90%*
