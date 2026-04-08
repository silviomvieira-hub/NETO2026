# Arsenal Completo — Referencia Detalhada

## Bancos de Dados

| Banco | Arquivo | Qtd |
|-------|---------|-----|
| Eleitores DF | `agentes/banco-eleitores-df.json` | 1.001 |
| Consultores Lendarios | `agentes/banco-consultores-lendarios.json` | 144 |
| Magistrados | `agentes/banco-magistrados.json` | 164 |
| Gestores Publicos | `agentes/banco-gestores-publicos.json` | 180 |
| Deputados Federais | `agentes/banco-deputados-federais.json` | 513 |
| Parlamentares BR | `agentes/banco-parlamentares-brasil.json` | 594 |
| Senadores DF | `agentes/banco-senadores-df.json` | 3 |
| Candidatos Gov DF 2026 | `agentes/banco-candidatos-governador-df-2026.json` | 18 |

## Motor POLARIS

| Modulo | Arquivo |
|--------|---------|
| Motor Principal | `backend/sdk/polaris/motor.py` |
| Analise | `backend/sdk/polaris/analise.py` |
| Questionario | `backend/sdk/polaris/questionario.py` |
| Amostra | `backend/sdk/polaris/amostra.py` |
| Entrevistador | `backend/sdk/polaris/entrevistador.py` |
| Relatorio | `backend/sdk/polaris/relatorio.py` |

Pipeline: Brief → Desenho amostral → Questionario → Entrevistas (4 etapas cognitivas) → Analise quanti → Analise quali → Auditoria Red Team → Relatorio

## Servicos Backend (FastAPI)

| Servico | Arquivo |
|---------|---------|
| Helena Servico | `backend/app/servicos/helena_servico.py` |
| Claude Servico | `backend/app/servicos/claude_servico.py` |
| OmniRoute | `backend/app/servicos/modelo_router.py` |
| Cenarios | `backend/app/servicos/cenarios_servico.py` |
| Entrevistas | `backend/app/servicos/entrevista_servico.py` |
| Analise | `backend/app/servicos/analise_servico.py` |
| Mensagens | `backend/app/servicos/mensagem_servico.py` |
| WhatsApp | `backend/app/servicos/whatsapp_servico.py` |

## Combos OmniRoute

| Combo | Modelos |
|-------|---------|
| `helena-premium` | Opus → GPT-5 → Gemini Pro → Antigravity → GPT-4o |
| `research-deep` | Perplexity → Gemini 3 Pro → Opus |
| `thinking-chain` | Opus thinking, Kimi thinking, DeepSeek R1 |
| `entrevistas-bulk` | Sonnet, Flash, Llama 70B (Groq x2), Cerebras, Together |
| `coding-power` | GPT-5 Codex → Kimi K2.5 → Opus → Qwen |
| `vision-multi` | Opus → GPT-4o → Gemini Pro → Flash |
| `free-unlimited` | Groq, Cerebras, NVIDIA, Together |
| `haiku-tasks` | 5 modelos leves (least-used) |

## Endpoints API

| Endpoint | Funcao |
|----------|--------|
| `/api/v1/chat-inteligencia/chat` | Chat principal Helena |
| `/api/v1/chat-inteligencia/todas` | Listar conversas |
| `/api/v1/chat-inteligencia/historico/{sessao}` | Historico de sessao |
| `/api/v1/eleitores` | CRUD eleitores sinteticos |
| `/api/v1/entrevistas` | Execucao de entrevistas IA |
| `/api/v1/pesquisas` | CRUD pesquisas |
| `/api/v1/resultados` | Analises e estatisticas |
| `/api/v1/cenarios` | Simulacao eleitoral |
| `/api/v1/consultores-lendarios` | 144 consultores |
| `/api/v1/magistrados` | 164 magistrados |
| `/api/v1/parlamentares` | 594 parlamentares |
| `/api/v1/candidatos` | Candidatos eleitorais |
| `/api/v1/whatsapp` | Inteligencia eleitoral multi-agente |
| `/api/v1/mensagens` | Gerador de mensagens persuasivas |
| `/api/v1/analytics` | Analytics do sistema |
| `/api/v1/chat-customizado` | Chat com system_prompt customizado (OmniRoute, custo zero) |
| `/api/v1/polaris` | Motor POLARIS de pesquisa eleitoral |

## Scripts

| Script | Funcao |
|--------|--------|
| `scripts/gerar_eleitores_df_v4.py` | Geracao de eleitores sinteticos |
| `scripts/sync-agentes.js` | Sync dados agentes → frontend |
| `scripts/ssh_vps.py` | Acesso SSH a VPS Hostinger |
| `backend/scripts/dados_consultores/` | Seed de consultores lendarios (10 blocos) |
