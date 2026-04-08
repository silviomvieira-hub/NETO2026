# SKILL: API Backend Completa

> **Propósito**: Mapa exaustivo de todos os 286 endpoints, 43 serviços, 24 modelos ORM e padrões de integração do backend FastAPI.

---

## QUANDO USAR ESTA SKILL

- Criar ou modificar endpoints REST
- Investigar fluxo de dados no backend
- Integrar novo serviço ou modelo
- Debug de erros em rotas ou serviços
- Entender dependências entre módulos

---

## ARQUITETURA GERAL

```
backend/app/
├── main.py                    # Entry FastAPI (CORS, routers, lifespan)
├── core/
│   ├── config.py              # Settings (.env, provider IA, modelos)
│   ├── database.py            # AsyncEngine + pool PostgreSQL
│   ├── seguranca.py           # JWT HS256, bcrypt, OAuth2
│   ├── limiter.py             # SlowAPI rate limiting
│   ├── logging_config.py      # structlog
│   ├── rls_middleware.py      # Row Level Security
│   └── agent_registry.py     # Registro dinâmico de agentes
├── api/
│   ├── deps.py                # Depends(get_db), Depends(get_current_user)
│   └── rotas/                 # 33 arquivos de rotas
├── modelos/                   # 24 modelos ORM SQLAlchemy
├── esquemas/                  # 19 schemas Pydantic v2
├── servicos/                  # 43 serviços de lógica de negócio
├── agentes/                   # Sistema multi-agente LangGraph
│   ├── ferramentas/           # 8 ferramentas customizadas
│   ├── prompts/               # 8 prompts + supervisor
│   └── supervisor.py          # Orquestrador LangGraph
├── parlamentares/             # Submódulo parlamentar
└── db/
    ├── session.py             # AsyncSessionLocal factory
    └── base.py                # Declarative base
```

---

## CATÁLOGO DE ENDPOINTS (286 total)

### 1. AUTENTICAÇÃO E USUÁRIOS (23 endpoints)

**autenticacao.py** → `/api/v1/auth/` (9 endpoints)
| Método | Rota | Função |
|--------|------|--------|
| POST | `/auth/registro` | Registrar usuário |
| POST | `/auth/login` | Login email/senha → JWT |
| POST | `/auth/login/form` | Login form (legacy) |
| POST | `/auth/logout` | Logout |
| POST | `/auth/refresh-token` | Renovar access token |
| GET | `/auth/google/url` | URL OAuth Google |
| POST | `/auth/google` | Callback Google |
| POST | `/auth/google/token` | Token direto Google |
| GET | `/auth/me` | Perfil do usuário atual |

**usuarios.py** → `/api/v1/usuarios/` (10 endpoints)
| Método | Rota | Função |
|--------|------|--------|
| GET | `/usuarios/` | Listar (admin only) |
| GET | `/usuarios/{id}` | Obter por ID |
| POST | `/usuarios/` | Criar (admin) |
| POST | `/usuarios/alterar-senha` | Mudar senha |
| POST | `/usuarios/registrar-google` | Registrar via Google |
| PUT | `/usuarios/{id}` | Atualizar perfil |
| POST | `/usuarios/{id}/aprovar` | Aprovar (admin) |
| DELETE | `/usuarios/{id}` | Deletar (admin) |
| GET | `/usuarios/stats/distribuicao` | Stats de distribuição |

**dados_usuarios.py** → `/api/v1/dados-usuarios/` (5 endpoints)

---

### 2. ELEITORES - AGENTES SINTÉTICOS (13 endpoints)

**eleitores.py** → `/api/v1/eleitores/`
| Método | Rota | Função |
|--------|------|--------|
| GET | `/eleitores/` | Listar (20+ filtros simultâneos) |
| GET | `/eleitores/estatisticas` | Stats de distribuição |
| GET | `/eleitores/opcoes-filtros` | Opções para UI (dropdown) |
| GET | `/eleitores/exportar` | Export CSV |
| GET | `/eleitores/ids` | Apenas IDs |
| GET | `/eleitores/{id}` | Perfil completo (60+ atributos) |
| POST | `/eleitores/` | Criar eleitor |
| POST | `/eleitores/lote` | Criar lote |
| POST | `/eleitores/importar-json` | Importar JSON |
| PUT | `/eleitores/{id}` | Atualizar |
| DELETE | `/eleitores/{id}` | Deletar |
| POST | `/eleitores/selecionar` | Selecionar por filtros |
| POST | `/eleitores/por-ids` | Obter múltiplos por IDs |

---

### 3. PESQUISAS (40 endpoints)

**pesquisas.py** → `/api/v1/pesquisas/` (14 endpoints)
| Método | Rota | Função |
|--------|------|--------|
| GET | `/pesquisas/` | Listar pesquisas |
| POST | `/pesquisas/` | Criar pesquisa |
| GET | `/pesquisas/{id}` | Obter pesquisa |
| GET | `/pesquisas/{id}/completa` | Pesquisa com tudo |
| PUT | `/pesquisas/{id}` | Atualizar |
| DELETE | `/pesquisas/{id}` | Deletar |
| POST | `/pesquisas/{id}/iniciar` | Iniciar execução |
| POST | `/pesquisas/{id}/pausar` | Pausar |
| POST | `/pesquisas/{id}/retomar` | Retomar |
| POST | `/pesquisas/{id}/finalizar` | Finalizar |
| PUT | `/pesquisas/{id}/progresso` | Atualizar progresso |
| GET | `/pesquisas/{id}/respostas` | Obter respostas |
| POST | `/pesquisas/estimar-custo` | Estimar custo IA |
| GET | `/pesquisas/estatisticas/globais` | Stats globais |

**entrevistas.py** → `/api/v1/entrevistas/` (12 endpoints)
- CRUD + `/iniciar`, `/pausar`, `/retomar`, `/cancelar`, `/progresso`, `/respostas`, `/estimar-custo`

**templates.py** → `/api/v1/templates/` (10 endpoints)
- CRUD + `/por-categoria`, `/por-tipo`, `/categorias`, `/tipos`, `/aplicar/{pesquisa_id}`, `/importar`

**sessoes.py** → `/api/v1/sessoes/` (8 endpoints)
- CRUD + `/sincronizar`, `/migrar`, `/resumo/estatisticas`

**historico.py** → `/api/v1/` (5 endpoints)
- `/eleitor/{id}`, `/pergunta`, `/periodo`, `/busca`, `/resumo`

---

### 4. RESULTADOS E ANÁLISES (21 endpoints)

**resultados.py** → `/api/v1/resultados/` (12 endpoints)
| Método | Rota | Função |
|--------|------|--------|
| GET | `/resultados/` | Listar |
| GET | `/resultados/{id}` | Obter resultado |
| POST | `/resultados/analisar/{entrevista_id}` | Analisar entrevista |
| GET | `/resultados/{id}/estatisticas` | Estatísticas detalhadas |
| GET | `/resultados/{id}/sentimentos` | Análise de sentimentos |
| GET | `/resultados/{id}/mapa-calor` | Mapa de calor |
| GET | `/resultados/{id}/votos-silenciosos` | Votos silenciosos |
| GET | `/resultados/{id}/pontos-ruptura` | Pontos de ruptura |
| GET | `/resultados/{id}/insights` | Insights gerados |
| POST | `/resultados/{id}/gerar-insights` | Gerar insights IA |
| POST | `/resultados/gerar-insights` | Gerar batch |
| DELETE | `/resultados/{id}` | Deletar |

**analytics.py** → `/api/v1/analytics/` (9 endpoints)
- `/dashboard`, `/correlacoes`, `/tendencias`, `/segmentos/{tipo}`, `/insights`, `/historico/eleitor/{id}`, `/historico/busca`, `/exportar`, `/comparar/pesquisas`

---

### 5. DADOS ELEITORAIS (48 endpoints)

**candidatos.py** → `/api/v1/candidatos/` (12 endpoints)
- CRUD + `/estatisticas`, `/para-pesquisa`, `/por-cargo/{cargo}`, `/lote`, `/importar-json`, `/ativar`, `/desativar`

**cenarios_eleitorais.py** → `/api/v1/cenarios/` (13 endpoints)
- CRUD + `/executar`, `/simular-rapido`, `/simular-multiseed`, `/simular-multiseed/exportar-csv`, `/simular-segundo-turno`, `/analisar-rejeicao`, `/rejeicao/candidato/{id}`, `/comparar`

**magistrados.py** → `/api/v1/magistrados/` (5 endpoints)
- `/`, `/estatisticas`, `/por-orgao/{orgao}`, `/{id}`

**consultores_lendarios.py** → `/api/v1/consultores-lendarios/` (7 endpoints)
- `/`, `/categorias`, `/estatisticas`, `/por-categoria/{cat}`, `/por-tier/{tier}`, `/{id}`

**pesquisas_parlamentares.py** → `/api/v1/pesquisas-parlamentares/` (18 endpoints)
- CRUD completo + `/executar`, `/pausar`, `/retomar`, `/cancelar`, `/progresso`, `/respostas`, `/respostas/por-parlamentar`, `/respostas/por-pergunta`, `/estimar-custo`, `/analisar`, `/resultados`

**pesquisas_podc.py** → `/api/v1/pesquisas-podc/` (12 endpoints)
- CRUD + `/iniciar`, `/pausar`, `/finalizar`, `/respostas`, `/estatisticas` (IAD), `/exportar`

---

### 6. MEMÓRIAS E CHAT (19 endpoints)

**memorias.py** → `/api/v1/memorias/` (8 endpoints)
- CRUD + `/eleitor/{id}`, `/analytics/global`, `/analytics/uso`, `/analytics/pesquisa/{id}`, `/migrar-respostas`

**helena_conversas.py** → `/api/v1/helena/` (3 endpoints)
- `/conversas`, `/conversas/{sessao_id}`, PATCH `/conversas/{sessao_id}`

**helena_memorias.py** → `/api/v1/helena/` (7 endpoints)
- `/memorias`, POST `/memorias`, `/memorias/contexto`, `/memorias/compactar/{sessao_id}`, `/memorias/export/md`, DELETE `/memorias/{id}`, `/memorias/decair`

**chat_inteligencia.py** → `/api/v1/chat-inteligencia/` (9 endpoints)
- POST `/`, POST `/auditoria`, `/historico/{sessao_id}`, `/todas`, `/analytics`, `/memoria/indice`, `/memoria/busca`, `/memoria/sessao/{id}`, `/memoria/compactar/{id}`

---

### 7. MENSAGENS, CONTEÚDO E WHATSAPP (14 endpoints)

**mensagens.py** → `/api/v1/mensagens/` (5 endpoints)
- POST `/gerar`, `/gatilhos`, `/historico`, POST `/preview`, `/opcoes-filtros`

**chat_customizado.py** → `/api/v1/chat-customizado/` (1 endpoint)

**whatsapp.py** → `/api/v1/whatsapp/` (8 endpoints)
- GET/POST `/webhook`, `/status`, CRUD `/contatos`, `/conversas/{id}/mensagens`

---

### 8. GERAÇÃO E UTILITÁRIOS (11 endpoints)

**geracao.py** → `/api/v1/geracao/` (4 endpoints)
- POST `/`, `/opcoes`, `/estatisticas`, POST `/lote`

**consulta_unificada.py** → `/api/v1/consultar/` (3 endpoints)
- `/agentes`, POST `/`

**polaris.py** → `/api/v1/polaris/` (3 endpoints)
- POST `/executar`, `/pesquisas`, `/validar`

**rls.py** → `/api/v1/admin/` (5 endpoints)
- `/status`, `/policies`, `/context`, `/test`, `/functions`

---

### 9. SISTEMAS AVANÇADOS (41 endpoints)

**colmeia.py** → `/api/v1/colmeia/` (5 endpoints)
- `/status`, `/agentes`, `/dashboard`, `/tarefas`, `/atividades`

**automacao.py** → `/api/v1/automacao/` (11 endpoints)
- POST `/executar`, POST `/organizar`, POST `/briefing`, POST `/extrair-dados`, POST `/apresentacao`, POST `/relatorio`, POST `/workflow/gravar`, POST `/workflow/parar`, POST `/workflow/executar/{nome}`, `/workflow/listar`, `/estatisticas`

**vila_inteia.py** → `/api/v1/vila-inteia/` (25 endpoints)
- Estado: POST `/estado/salvar`, GET `/estado/carregar/{modulo}`, GET `/estado/listar`, DELETE `/estado/{modulo}`
- Economia: POST `/economia/transacao`, GET `/economia/transacoes`, POST `/economia/wallets/salvar`, GET `/economia/wallets`, GET `/economia/resumo`
- Constituição: POST `/constituicao/artigo`, GET `/constituicao/artigos`, GET `/constituicao/artigo/{numero}`, GET `/constituicao/resumo`
- Helena: POST `/helena/insight`, GET `/helena/insights`, GET `/helena/resumo`
- Mensagens, Rede Social, Snapshot, Reset, Backups, Status

**constituicao.py** → `/api/v1/constituicao/` (7 endpoints)

---

## CATÁLOGO DE SERVIÇOS (43 arquivos)

### Serviços Core de IA
| Arquivo | Responsabilidade |
|---------|------------------|
| `claude_servico.py` | Integração Claude API (OmniRoute → CLI → API) |
| `multimodal_servico.py` | Imagens, áudio, OCR |
| `modelo_router.py` | Roteamento dinâmico de modelos |

### Serviços de Dados
| Arquivo | Responsabilidade |
|---------|------------------|
| `eleitor_servico.py` | Carregamento JSON (1000+ agentes) |
| `eleitor_servico_db.py` | ORM queries PostgreSQL |
| `eleitor_helper.py` | Funções auxiliares |
| `candidato_servico.py` | CRUD candidatos |
| `magistrado_servico_db.py` | 164 magistrados |
| `consultor_lendario_servico_db.py` | 158 consultores |

### Serviços de Pesquisa
| Arquivo | Responsabilidade |
|---------|------------------|
| `entrevista_servico.py` | Gerenciamento de entrevistas |
| `pesquisa_servico.py` | CRUD pesquisas |
| `pesquisa_persistencia_servico.py` | Persistência BD |
| `pesquisa_parlamentar_servico.py` | Pesquisas parlamentares |
| `resultado_servico.py` | Cálculos estatísticos |
| `resultado_parlamentar_servico.py` | Resultados parlamentares |
| `analise_acumulativa_servico.py` | Análise agregada histórica |

### Serviços Helena
| Arquivo | Responsabilidade |
|---------|------------------|
| `helena_servico.py` | Orquestração Helena |
| `helena_memoria_chat.py` | Memória de conversa |
| `helena_memoria_servico.py` | Gerenciamento avançado |
| `helena_documentos.py` | Geração Word/PDF/Excel |
| `helena_email.py` | Envio emails |
| `helena_planilhas.py` | Planilhas Excel |
| `helena_navegacao.py` | Automação navegação |

### Serviços Especializados
| Arquivo | Responsabilidade |
|---------|------------------|
| `cenario_eleitoral_servico.py` | Simulação 1º/2º turno |
| `insights_servico.py` | Geração insights IA |
| `geracao_servico.py` | Geração eleitores IA |
| `mensagem_servico.py` | Mensagens persuasivas (5 gatilhos) |
| `memoria_servico.py` | CRUD memórias |
| `whatsapp_servico.py` | WhatsApp Business API |
| `pipeline_whatsapp.py` | Pipeline processamento |
| `compliance_servico.py` | Validações |
| `consulta_unificada_servico.py` | Consultas unificadas |

### Serviços de Autenticação
| Arquivo | Responsabilidade |
|---------|------------------|
| `usuario_servico.py` | CRUD usuários |
| `oauth_servico.py` | Google OAuth |
| `auth_whatsapp.py` | Auth WhatsApp |
| `rate_limiter.py` | Rate limiting customizado |

---

## MODELOS ORM (24 arquivos)

| Modelo | Tabela | Campos Chave |
|--------|--------|-------------|
| `usuario.py` | usuarios | id, email, senha_hash, role, google_id |
| `eleitor.py` | eleitores | id, nome, idade, genero, ra, cluster, 60+ campos |
| `candidato.py` | candidatos | id, nome, cargo, partido, ativo |
| `magistrado.py` | magistrados | id, nome, tribunal, especialidade |
| `consultor_lendario.py` | consultores_lendarios | id, nome, categoria, tier |
| `pesquisa.py` | pesquisas | id, titulo, status, tipo, amostra |
| `pesquisa_podc.py` | pesquisas_podc | id, titulo, dimensao_fayol |
| `sessao_entrevista.py` | sessoes_entrevista | id, pesquisa_id, status |
| `pergunta.py` | perguntas | id, texto, tipo, categoria |
| `resposta.py` | respostas | id, pergunta_id, eleitor_id, texto |
| `analise.py` | analises | id, pesquisa_id, tipo, dados |
| `memoria.py` | memorias | id, eleitor_id, conteudo, peso |
| `memoria_helena.py` | memorias_helena | id, sessao_id, tipo, relevancia |
| `conversa_helena.py` | conversas_helena | id, sessao_id, mensagens |
| `cenario_eleitoral.py` | cenarios_eleitorais | id, candidatos, turno, resultado |
| `contato_whatsapp.py` | contatos_whatsapp | id, telefone, nome |
| `mensagem_whatsapp.py` | mensagens_whatsapp | id, contato_id, texto |
| `conversa_whatsapp.py` | conversas_whatsapp | id, contato_id, estado |
| `interacao_chat.py` | interacoes_chat | id, sessao, usuario_msg, ia_msg |
| `constituicao.py` | constituicao_mensagens | id, artigo, texto |
| `consulta_unificada.py` | consulta_unificada_log | id, query, resultado |

---

## FLUXO DE DADOS PRINCIPAL

```
Frontend (Next.js/Vercel)
      ↓ HTTP /api/v1/...
  API Route (proxy)
      ↓
  FastAPI Router (rotas/*.py)
      ↓ Depends(get_db, get_current_user)
  Serviço (servicos/*.py)
      ↓
  ┌─────────────┬──────────────┐
  │ ORM Query   │ Claude API   │
  │ (PostgreSQL)│ (OmniRoute)  │
  └─────────────┴──────────────┘
      ↓
  Schema Pydantic (response)
      ↓
  JSON Response → Frontend
```

---

## PADRÕES DE CÓDIGO

### Criando Novo Endpoint
```python
# backend/app/api/rotas/novo_modulo.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_user

router = APIRouter(prefix="/novo-modulo", tags=["Novo Módulo"])

@router.get("/")
async def listar(
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000)
):
    resultado = await servico.listar(db, skip=skip, limit=limit)
    return resultado
```

### Registrando Router no main.py
```python
# backend/app/main.py
from app.api.rotas.novo_modulo import router as novo_modulo_router
app.include_router(novo_modulo_router, prefix="/api/v1")
```

---

## REFERÊNCIAS

| Arquivo | Para que serve |
|---------|---------------|
| `backend/app/main.py` | Entry point, registro de routers |
| `backend/app/core/config.py` | Variáveis de ambiente |
| `backend/app/api/deps.py` | Dependências compartilhadas |
| `backend/app/core/seguranca.py` | JWT e autenticação |

---

*Skill criada em 2026-02-28 | Atualizar sempre que novos endpoints forem adicionados*
