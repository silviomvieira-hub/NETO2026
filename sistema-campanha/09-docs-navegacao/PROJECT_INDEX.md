# PROJECT_INDEX.md - Indice Mestre para Agentes

> Mapa amplo do workspace `C:\Agentes`.
> Foco: navegao rapida, baixo custo de contexto e referencias reais do repositorio.
> Atualizado em 2026-03-17.

## Protocolo de contexto

Quando a exploracao comecar a espalhar demais:

1. Pare de abrir novas arvores.
2. Reduza para no maximo 5 arquivos centrais.
3. Registre achados em [WORK_LOG.md](WORK_LOG.md) se houver descoberta estrutural.
4. Volte ao hub mais proximo em vez de continuar derivando por busca livre.

## O que e este workspace

O projeto principal e **Pesquisa Eleitoral Brasilia + Roraima 2026**, um modelo multi-UF com eleitores sinteticos de DF e RR, mas o workspace tambem contem:

- o produto principal `backend/ + frontend/ + agentes/`, agora com bases eleitorais multi-UF incluindo DF e RR
- operacao documental e metodologica em `docs/`
- automacao e pipelines em `scripts/`
- projetos ou espelhos paralelos como `OmniRoute/` e `vila-inteia/`
- artefatos de estudos e relatorios em `resultados/` e `output/`

## Mapa de camadas

| Camada | Pasta | Conteudo |
|--------|-------|----------|
| Aplicacao backend | `backend/` | FastAPI, servicos, auth, DB, SDK, testes |
| Aplicacao frontend | `frontend/` | Next.js App Router, componentes, stores, testes |
| Base de agentes | `agentes/` | Eleitores DF/RR, consultores, parlamentares, gestores, perfis juridicos |
| Documentacao | `docs/` | Guias, arquitetura, processos, INTEIA, QA |
| Automacao | `scripts/` | Deploy, geracao, sincronizacao, data quality, agentico |
| Dados auxiliares | `data/` | Overrides, snapshots e dados tratados |
| Diagramas IA | `ai/` | Mermaid, boas praticas e aliases |
| Saidas | `resultados/`, `output/` | Relatorios, estudos, propostas, artefatos de execucao |

## Entradas recomendadas por perfil de tarefa

| Tarefa | Ler primeiro | Ler depois |
|--------|--------------|------------|
| Descobrir endpoints | [backend/app/api/rotas/_INDEX.md](backend/app/api/rotas/_INDEX.md) | `main.py`, servicos da rota |
| Entender dominio eleitoral | [agentes/_INDEX.md](agentes/_INDEX.md) | [AGENTES_SINTETICOS.md](AGENTES_SINTETICOS.md) |
| Investigar logica Helena | [backend/app/servicos/_INDEX.md](backend/app/servicos/_INDEX.md) | arquivos `helena_*` e rotas correspondentes |
| Ajustar frontend | [frontend/src/_INDEX.md](frontend/src/_INDEX.md) | `app/_INDEX.md`, `components/_INDEX.md` |
| Operacao/deploy | [docs/deployment/README.md](docs/deployment/README.md) | `scripts/deploy.ps1`, configs `.env*` |
| Rodar pesquisa sem UI | [scripts/_INDEX.md](scripts/_INDEX.md) | `scripts/agentico/` |
| Consultar metodologia | [docs/_INDEX.md](docs/_INDEX.md) | `docs/inteia/`, `docs/qa/`, `docs/guia-usuario/` |

## Estrutura relevante da raiz

```text
C:\Agentes
├── backend\
│   ├── app\api\rotas\
│   ├── app\servicos\
│   ├── app\core\
│   ├── sdk\
│   ├── tools\
│   └── tests\
├── frontend\
│   ├── src\app\
│   ├── src\components\
│   ├── src\stores\
│   ├── public\
│   └── tests\
├── agentes\
│   ├── banco-*.json
│   ├── perfis agentes sinteticos judiciario - STF, STJ, TJDF, TRF1\
│   ├── meta\
│   └── scripts\
├── docs\
│   ├── api\
│   ├── deployment\
│   ├── guia-usuario\
│   ├── inteia\
│   ├── arquitetura\
│   ├── processos\
│   └── qa\
├── scripts\
│   ├── agentico\
│   ├── data-quality\
│   ├── generators\
│   ├── parlamentares\
│   └── lib\
├── data\
├── ai\diagrams\
├── resultados\
├── output\
├── OmniRoute\
└── vila-inteia\
```

## Backend

**Ponto de entrada:** [backend/_INDEX.md](backend/_INDEX.md)

Subhubs que importam:

- [backend/app/_INDEX.md](backend/app/_INDEX.md)
- [backend/app/api/rotas/_INDEX.md](backend/app/api/rotas/_INDEX.md)
- [backend/app/servicos/_INDEX.md](backend/app/servicos/_INDEX.md)
- [backend/app/core/_INDEX.md](backend/app/core/_INDEX.md)
- [backend/app/modelos/_INDEX.md](backend/app/modelos/_INDEX.md)

Rotas relevantes hoje incluem, entre outras:

- `autenticacao.py`
- `eleitores.py`
- `entrevistas.py`
- `consultores_lendarios.py`
- `magistrados.py`
- `consulta_unificada.py`
- `pesquisas.py`
- `pesquisas_parlamentares.py`
- `pesquisas_podc.py`
- `templates.py`
- `whatsapp.py`
- `polaris.py`
- `vila_inteia.py`

## Frontend

**Ponto de entrada:** [frontend/_INDEX.md](frontend/_INDEX.md)

Subhubs:

- [frontend/src/_INDEX.md](frontend/src/_INDEX.md)
- [frontend/src/app/_INDEX.md](frontend/src/app/_INDEX.md)
- [frontend/src/components/_INDEX.md](frontend/src/components/_INDEX.md)
- [frontend/src/stores/_INDEX.md](frontend/src/stores/_INDEX.md)
- [frontend/src/services/_INDEX.md](frontend/src/services/_INDEX.md)

Rotas/pastas relevantes hoje:

- `(auth)/`
- `(dashboard)/`
- `(hub)/`
- `helena/`
- `colmeia/`
- `aorus/`
- `teste-mapa/`
- `api/`

## Dados dos agentes

**Ponto de entrada:** [agentes/_INDEX.md](agentes/_INDEX.md)

Arquivos-chave:

- `banco-eleitores-df.json`
- `banco-eleitores-rr.json`
- `dados-demograficos-roraima-2026.json`
- `banco-consultores-lendarios.json`
- `banco-candidatos-df-2026.json`
- `banco-parlamentares-brasil.json`
- `banco-gestores.json`
- `templates-perguntas-eleitorais.json`
- `templates-perguntas-gestores.json`

Areas especiais:

- `perfis agentes sinteticos judiciario - STF, STJ, TJDF, TRF1/`
- `meta/`
- `backups/`
- `MANIFEST.md`

## Documentacao

**Ponto de entrada:** [docs/_INDEX.md](docs/_INDEX.md)

Blocos principais:

- `api/`
- `deployment/`
- `guia-usuario/`
- `inteia/`
- `arquitetura/`
- `processos/`
- `qa/`
- `ia/`

## Scripts

**Ponto de entrada:** [scripts/_INDEX.md](scripts/_INDEX.md)

Blocos principais:

- `agentico/`
- `data-quality/`
- `generators/`
- `parlamentares/`
- `lib/`

Scripts de alto valor:

- `deploy.ps1`
- `dev.ps1`
- `executar_pesquisa_inteia.py`
- `gama_helena_pipeline.py`
- `pesquisa_governador_2026.py`
- `simulacao_stress_politico_celina.py`
- `helena_go_live_check.py`

## Areas que confundem agentes

Evite ler por padrao:

- `tmp_*`, `.tmp_*`
- `node_modules/`, `.next/`
- `playwright-report/`, `test-results/`
- backups JSON extensos
- projetos paralelos sem relacao com a tarefa

Tratamento recomendado:

- `resultados/` e `output/`: consulte apenas se a tarefa for sobre entregaveis, estudos ou auditorias.
- `OmniRoute/`: consulte apenas se a tarefa mencionar OmniRoute ou MCP/A2A relacionado.
- `vila-inteia/`: consulte apenas se a tarefa envolver material estrategico separado.

## Ordem de navegacao recomendada

1. Identifique a camada.
2. Abra o `_INDEX.md` da pasta principal.
3. Abra no maximo 1 subhub por vez.
4. So depois leia arquivos grandes ou JSONs.
5. Atualize o mapa local se descobrir estrutura nova relevante.

## Arquivos-raiz que merecem consulta

| Arquivo | Quando usar |
|---------|-------------|
| [AGENTS.md](AGENTS.md) | Sempre no inicio |
| [CLAUDE.md](CLAUDE.md) | Regras operacionais e deploy |
| [GPS_NAVEGACAO_AGENTES.md](GPS_NAVEGACAO_AGENTES.md) | Navegacao assistida por contexto |
| [AGENTES_SINTETICOS.md](AGENTES_SINTETICOS.md) | Dominio de agentes sinteticos |
| [GESTAO_CONTEXTO.md](GESTAO_CONTEXTO.md) | Regras adicionais de janela |

## Resultado esperado deste indice

Uma IA deve conseguir:

- achar rapidamente a pasta certa
- diferenciar codigo, dados, docs e artefatos
- ignorar zonas frias
- entrar em hubs locais sem estourar contexto
