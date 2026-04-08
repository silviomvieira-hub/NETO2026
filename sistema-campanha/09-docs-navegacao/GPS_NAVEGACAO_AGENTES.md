# GPS DE NAVEGACAO PARA AGENTES DE IA

> Documento operacional de engenharia de contexto.
> Workspace: `C:\Agentes`
> Atualizado: 2026-03-17

## Objetivo

Permitir que uma IA atravesse a pasta inteira com baixo custo de contexto, encontrando rapidamente:

- o produto principal
- os documentos certos
- os artefatos de apoio
- o que deve ser ignorado

## Regra de contexto

### Zonas de uso

| Zona | Sinal | Comportamento |
|------|-------|---------------|
| Verde | ate 35% | Explorar, validar estrutura, abrir hubs |
| Amarela | 35% a 55% | Parar expansao lateral, resumir e focar |
| Vermelha | acima de 55% | Encerrar exploracao, compilar e voltar ao essencial |

### Gatilho de compilacao

Quando entrar na zona amarela:

1. pare de abrir novas pastas
2. reduza para 3 a 5 arquivos centrais
3. escreva resumo curto em [WORK_LOG.md](WORK_LOG.md) se o achado for estrutural
4. retorne ao hub mais proximo em vez de continuar em busca livre

## Mapa estrategico da raiz

| Zona | Pasta | Papel | Temperatura |
|------|-------|-------|-------------|
| Produto | `backend/` | API, servicos, auth, DB, SDK | quente |
| Produto | `frontend/` | UI Next.js, rotas, componentes | quente |
| Dominio | `agentes/` | bancos JSON, bases eleitorais DF/RR e perfis sinteticos | quente |
| Documentacao | `docs/` | operacao, metodologia, arquitetura | quente |
| Automacao | `scripts/` | execucao, deploy, pipelines | quente |
| Dados de apoio | `data/` | overrides e snapshots tratados | morna |
| Navegacao IA | `ai/` | diagramas e praticas | morna |
| Entregaveis | `resultados/`, `output/` | relatorios, estudos, propostas | morna |
| Paralelos | `OmniRoute/`, `vila-inteia/` | projetos adjacentes | fria |
| Temporarios | `tmp_*`, `.tmp_*` | espelhos e snapshots | fria |
| Cache | `.next/`, `node_modules/`, `__pycache__/` | ruido | congelada |

## Sequencia padrao de entrada

### Se a tarefa for sobre o sistema principal

1. [AGENTS.md](AGENTS.md)
2. [\_INDEX.md](_INDEX.md)
3. `backend/_INDEX.md` ou `frontend/_INDEX.md` ou `agentes/_INDEX.md`
4. `_INDEX.md` da subpasta alvo
5. codigo especifico

### Se a tarefa for sobre documentos

1. [docs/_INDEX.md](docs/_INDEX.md)
2. pasta tematica correta (`deployment/`, `inteia/`, `qa/`, `processos/`, `api/`)
3. arquivo final

### Se a tarefa for sobre navegacao de IA

1. [PROJECT_INDEX.md](PROJECT_INDEX.md)
2. [ai/diagrams/00_OVERVIEW.md](ai/diagrams/00_OVERVIEW.md)
3. [ai/diagrams/01_FOLDER_MAP.md](ai/diagrams/01_FOLDER_MAP.md)

## GPS por intencao

| Quero... | Entre por... | Nao comece por... |
|----------|--------------|-------------------|
| achar uma rota API | `backend/app/api/rotas/_INDEX.md` | buscas cegas em `backend/app/` |
| mexer em logica IA | `backend/app/servicos/_INDEX.md` | ler JSON de agentes primeiro |
| editar tela | `frontend/src/app/_INDEX.md` ou `frontend/src/components/_INDEX.md` | `frontend/public/` |
| entender dados | `agentes/_INDEX.md` | abrir bases gigantes sem indice |
| rodar operacao | `scripts/_INDEX.md` | scripts soltos por nome |
| localizar guia humano | `docs/_INDEX.md` | pesquisar em toda raiz |
| ver entrega pronta | `resultados/` ou `output/` | backend/frontend |

## Zonas para ignorar por padrao

- `node_modules/`
- `.next/`
- `__pycache__/`
- `.pytest_cache/`
- `.ruff_cache/`
- `playwright-report/`
- `test-results/`
- `tmp/`, `tmp_*`, `.tmp_*`
- backups JSON de `agentes/backups/`

## Zonas que exigem justificativa

Abra somente se a tarefa apontar para elas:

- `OmniRoute/`
- `vila-inteia/`
- `Clonagem de Voz/`
- `Informações para trabalhar de outras buscas/`
- `Intenção de voto Celina Leao 01.2024-01.2026/`

## Hubs confiaveis

| Hub | Funcao |
|-----|--------|
| [\_INDEX.md](_INDEX.md) | portal raiz |
| [PROJECT_INDEX.md](PROJECT_INDEX.md) | mapa mestre |
| [docs/_INDEX.md](docs/_INDEX.md) | biblioteca de documentos |
| [backend/_INDEX.md](backend/_INDEX.md) | backend |
| [frontend/_INDEX.md](frontend/_INDEX.md) | frontend |
| [agentes/_INDEX.md](agentes/_INDEX.md) | dados sinteticos |
| [scripts/_INDEX.md](scripts/_INDEX.md) | automacoes |

## Nota de bases eleitorais

- eleitores nao sao mais apenas DF: a navegacao correta passa por `agentes/MANIFEST.md`
- escolha explicitamente a base `df` ou `rr` antes de abrir JSONs ou consultar a API
- para a API, use `GET /api/v1/eleitores?estado=df|rr` e `GET /api/v1/eleitores/estados`

## Heuristicas para nao estourar contexto

- Leia indices antes de ler implementacao.
- Limite a exploracao a uma trilha principal por vez.
- Se ja encontrou a pasta certa, pare de pesquisar globalmente.
- Resuma nomes de arquivos grandes em vez de abrir todos.
- Se a tarefa for local, ignore documentos estrategicos longos.

## Template de compilacao

```text
CONTEXTO COMPILADO
- objetivo:
- camada:
- hubs consultados:
- arquivos centrais:
- decisoes:
- proximo passo unico:
```

## Resultado esperado

Uma IA nova no workspace deve conseguir, em poucos passos:

- distinguir o produto principal das pastas paralelas
- achar o documento ou modulo certo
- navegar por hubs sucessivos
- evitar leitura improdutiva
