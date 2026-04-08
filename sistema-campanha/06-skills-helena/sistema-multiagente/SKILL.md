# SKILL: Sistema Multi-Agente

> **Propósito**: Documentação dos sistemas multi-agente do projeto — Oráculo Eleitoral (8 agentes LangGraph), Vila INTEIA (cidade autônoma cognitiva), Colmeia (coordenação) e WhatsApp Business API.

---

## QUANDO USAR ESTA SKILL

- Criar ou modificar agentes do Oráculo
- Entender a arquitetura LangGraph
- Trabalhar com Vila INTEIA
- Integrar WhatsApp Business
- Coordenar agentes na Colmeia

---

## VISÃO GERAL DOS SISTEMAS

```
┌──────────────────────────────────────────┐
│              COLMEIA (Coordenação)       │
│  ┌─────────┐ ┌───────────┐ ┌──────────┐ │
│  │ Oráculo │ │ Vila      │ │ WhatsApp │ │
│  │ (8 ag.) │ │ INTEIA    │ │ Business │ │
│  └────┬────┘ └─────┬─────┘ └────┬─────┘ │
│       │             │            │       │
│  LangGraph    Cognitivo     Meta API     │
│  Supervisor   (7 módulos)   Webhooks     │
└──────────────────────────────────────────┘
         ↓             ↓           ↓
    Claude API    Claude API   FastAPI
   (OmniRoute)  (OmniRoute)  Endpoints
```

---

## 1. ORÁCULO ELEITORAL (8 Agentes)

### Arquitetura

```
backend/app/agentes/
├── supervisor.py          # Orquestrador LangGraph
├── ferramentas/           # 8 ferramentas customizadas
│   ├── consultar_dados.py
│   ├── simular_cenario.py
│   ├── analisar_estrategia.py
│   ├── buscar_memoria.py
│   ├── monitorar_social.py
│   ├── criar_conteudo.py
│   ├── gerenciar_cabos.py
│   └── pesquisar_profundo.py
└── prompts/               # 8 prompts de sistema
    ├── oraculo_dados.md
    ├── simulador.md
    ├── estrategista.md
    ├── memoria_viva.md
    ├── radar_social.md
    ├── criador_conteudo.md
    ├── central_cabos.md
    ├── pesquisador.md
    └── supervisor.md
```

### Os 8 Agentes

| # | Agente | Função | Modelo |
|---|--------|--------|--------|
| 1 | **Oráculo de Dados** | Consulta eleitores, candidatos, stats | Sonnet |
| 2 | **Simulador** | Cenários, projeções Monte Carlo | Sonnet |
| 3 | **Estrategista** | Análise profunda, SWOT, recomendações | Opus |
| 4 | **Memória Viva** | Histórico de conversas e decisões | Sonnet |
| 5 | **Radar Social** | Monitoramento de notícias e sentimento | Sonnet |
| 6 | **Criador de Conteúdo** | Posts, slogans, roteiros, copy | Sonnet |
| 7 | **Central de Cabos** | Gestão de cabos eleitorais | Sonnet |
| 8 | **Pesquisador** | Pesquisa profunda e dossiês | Opus |

### Fluxo LangGraph

```
Mensagem do Usuário
       ↓
  Supervisor (classifica intenção)
       ↓
  ┌─── Rota para agente adequado ───┐
  │                                  │
  ↓         ↓         ↓         ↓
Oráculo  Simulador  Estrateg.  Pesquisador
  │         │         │         │
  └─── Resposta compilada ──────┘
       ↓
  Supervisor (consolida)
       ↓
  Resposta Final ao Usuário
```

### Ferramentas Disponíveis

| Ferramenta | Agentes que usam | Dados acessados |
|-----------|-----------------|-----------------|
| `consultar_dados` | Oráculo, Simulador | Eleitores, candidatos, stats |
| `simular_cenario` | Simulador | Cenários 1º/2º turno |
| `analisar_estrategia` | Estrategista | SWOT, correlações |
| `buscar_memoria` | Memória Viva | Histórico, decisões |
| `monitorar_social` | Radar Social | Notícias, sentiment |
| `criar_conteudo` | Criador | Templates, copy |
| `gerenciar_cabos` | Central Cabos | Contatos, tarefas |
| `pesquisar_profundo` | Pesquisador | Web, docs, dossiês |

### Endpoints WhatsApp do Oráculo

```
POST /api/v1/whatsapp/webhook     # Recebe mensagem Meta
  → Supervisor classifica
  → Agente adequado responde
  → Resposta enviada via WhatsApp

GET /api/v1/whatsapp/status       # Status dos agentes
GET /api/v1/whatsapp/contatos     # Contatos registrados
GET /api/v1/whatsapp/conversas/{id}/mensagens  # Histórico
```

---

## 2. VILA INTEIA (Cidade Autônoma)

### Arquitetura Cognitiva

```
vila-inteia/
├── config.py              # Configuração da vila
├── main.py                # Entry point
├── api/
│   ├── rotas_vila.py      # Endpoints da vila
│   └── rotas_rede_social.py  # Rede social interna
└── engine/
    ├── campus.py          # Ambiente/espaço
    ├── persona.py         # Personalidades dos agentes
    ├── rede_social.py     # Rede social entre agentes
    ├── simulacao.py       # Motor de simulação
    └── cognitivo/         # 7 módulos cognitivos
    │   ├── perceber.py    # Percepção do ambiente
    │   ├── recuperar.py   # Recuperação de memórias
    │   ├── planejar.py    # Planejamento de ações
    │   ├── executar.py    # Execução de planos
    │   ├── refletir.py    # Reflexão sobre experiências
    │   ├── conversar.py   # Conversação entre agentes
    │   └── sintetizar.py  # Síntese de aprendizados
    └── memoria/           # 3 tipos de memória
        ├── fluxo.py       # Memória de fluxo (curto prazo)
        ├── espacial.py    # Memória espacial (localização)
        └── rascunho.py    # Memória rascunho (working memory)
```

### Módulos Cognitivos

| Módulo | Ciclo | Função |
|--------|-------|--------|
| **Perceber** | Input | Observa ambiente, outros agentes, eventos |
| **Recuperar** | Input | Busca memórias relevantes |
| **Planejar** | Processamento | Define próximas ações |
| **Executar** | Ação | Realiza ações no ambiente |
| **Conversar** | Interação | Dialoga com outros agentes |
| **Refletir** | Meta-cognição | Avalia experiências, atualiza crenças |
| **Sintetizar** | Output | Consolida aprendizados |

### Sistema de Memória

| Tipo | Analogia | Persistência | Função |
|------|----------|-------------|--------|
| **Fluxo** | Curto prazo | Temporária | Eventos recentes |
| **Espacial** | Mapa mental | Persistente | Localização e contexto |
| **Rascunho** | Working memory | Volátil | Processamento ativo |

### Endpoints Vila INTEIA (25 endpoints)

```
# Estado
POST /vila-inteia/estado/salvar
GET  /vila-inteia/estado/carregar/{modulo}
GET  /vila-inteia/estado/listar
DELETE /vila-inteia/estado/{modulo}

# Economia
POST /vila-inteia/economia/transacao
GET  /vila-inteia/economia/transacoes
POST /vila-inteia/economia/wallets/salvar
GET  /vila-inteia/economia/wallets
GET  /vila-inteia/economia/resumo

# Constituição
POST /vila-inteia/constituicao/artigo
GET  /vila-inteia/constituicao/artigos
GET  /vila-inteia/constituicao/artigo/{numero}
GET  /vila-inteia/constituicao/resumo

# Helena Insights
POST /vila-inteia/helena/insight
GET  /vila-inteia/helena/insights
GET  /vila-inteia/helena/resumo

# Mensagens, Rede Social, Snapshots
POST /vila-inteia/mensagens/salvar
GET  /vila-inteia/mensagens/carregar/{modulo}
POST /vila-inteia/rede-social/salvar
GET  /vila-inteia/rede-social/carregar
POST /vila-inteia/snapshot/salvar
GET  /vila-inteia/snapshot/carregar
POST /vila-inteia/reset/{modulo}
GET  /vila-inteia/backups
GET  /vila-inteia/status
```

---

## 3. COLMEIA (Coordenação)

### Endpoints

```
GET /api/v1/colmeia/status       # Status geral da Colmeia
GET /api/v1/colmeia/agentes      # Lista de agentes registrados
GET /api/v1/colmeia/dashboard    # Dashboard de atividade
GET /api/v1/colmeia/tarefas      # Tarefas em execução
GET /api/v1/colmeia/atividades   # Log de atividades
```

### Registro de Agentes (`core/agent_registry.py`)

O Agent Registry permite registrar e descobrir agentes dinamicamente:
- Registro automático ao inicializar
- Health check periódico
- Balanceamento de carga entre instâncias
- Fallback quando agente indisponível

---

## 4. AUTOMAÇÃO (11 endpoints)

```
POST /api/v1/automacao/executar         # Executar workflow
POST /api/v1/automacao/organizar        # Organizar dados
POST /api/v1/automacao/briefing         # Gerar briefing
POST /api/v1/automacao/extrair-dados    # Extrair dados
POST /api/v1/automacao/apresentacao     # Gerar apresentação
POST /api/v1/automacao/relatorio        # Gerar relatório
POST /api/v1/automacao/workflow/gravar  # Gravar workflow
POST /api/v1/automacao/workflow/parar   # Parar gravação
POST /api/v1/automacao/workflow/executar/{nome}  # Executar salvo
GET  /api/v1/automacao/workflow/listar  # Listar workflows
GET  /api/v1/automacao/estatisticas     # Estatísticas
```

---

## 5. CONSTITUIÇÃO INTEIA (7 endpoints)

Sistema de "Constituição" digital para governança da IA:

```
POST /api/v1/constituicao/mensagens       # Registrar mensagem
POST /api/v1/constituicao/mensagens/batch  # Batch
GET  /api/v1/constituicao/mensagens       # Listar
GET  /api/v1/constituicao/stats           # Estatísticas
POST /api/v1/constituicao/documento       # Gerar documento
GET  /api/v1/constituicao/documento       # Obter documento
GET  /api/v1/constituicao/sessoes         # Listar sessões
```

---

## INTEGRAÇÃO ENTRE SISTEMAS

### WhatsApp → Oráculo → Helena

```
Usuário WhatsApp
    ↓ Meta Webhook
FastAPI /whatsapp/webhook
    ↓
Supervisor LangGraph
    ↓ (classifica)
Agente Adequado
    ↓ (se complexo)
Helena (Opus) para análise profunda
    ↓
Resposta consolidada
    ↓
WhatsApp Business API → Usuário
```

### Frontend → Chat Helena → Memória

```
HelenaChat component
    ↓ POST /chat-inteligencia
helena_servico.py
    ↓ (executa via OmniRoute)
Claude Opus
    ↓ (resposta)
helena_memoria_servico.py
    ↓ (salva memória)
PostgreSQL memorias_helena
    ↓ (decay periódico)
Memórias antigas perdem relevância
```

---

## COMO ADICIONAR NOVO AGENTE AO ORÁCULO

1. **Criar ferramenta**: `backend/app/agentes/ferramentas/nova_ferramenta.py`
2. **Criar prompt**: `backend/app/agentes/prompts/novo_agente.md`
3. **Registrar no supervisor**: `backend/app/agentes/supervisor.py`
4. **Adicionar rota** (se necessário): `backend/app/api/rotas/`
5. **Registrar na Colmeia**: `core/agent_registry.py`

### Template de Ferramenta
```python
from langchain.tools import tool

@tool
def nova_ferramenta(query: str) -> str:
    """Descrição do que a ferramenta faz.

    Args:
        query: Parâmetro de entrada
    """
    # Lógica da ferramenta
    return resultado
```

### Template de Prompt
```markdown
# Nome do Agente

Você é o [Nome], especialista em [área].

## Função
[Descrição da função]

## Ferramentas Disponíveis
- ferramenta_1: [descrição]
- ferramenta_2: [descrição]

## Regras
1. [Regra 1]
2. [Regra 2]

## Formato de Resposta
[Formato esperado]
```

---

*Skill criada em 2026-02-28 | 8 agentes Oráculo + Vila INTEIA + Colmeia + WhatsApp*
