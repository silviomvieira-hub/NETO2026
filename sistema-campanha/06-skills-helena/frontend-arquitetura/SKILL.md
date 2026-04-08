# SKILL: Frontend Arquitetura Completa

> **Propósito**: Mapa de toda a arquitetura frontend — 320 arquivos TSX, 130 componentes, 16 stores, 11 hooks, padrões e fluxos do Next.js 14.

---

## QUANDO USAR ESTA SKILL

- Criar ou modificar componentes React
- Adicionar nova página ao sistema
- Debugar estado (Zustand stores)
- Integrar nova API no frontend
- Entender fluxo de dados da UI

---

## STACK TÉCNICA

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript (strict) |
| UI | shadcn/ui (Radix UI) |
| Estilo | Tailwind CSS 3.4 |
| Estado | Zustand 4.4 |
| Data Fetching | TanStack React Query 5 + Axios |
| Gráficos | Recharts + Plotly.js + D3-cloud |
| Exportação | ExcelJS + jsPDF |
| Auth | jose (JWT) |
| Cache Local | Dexie (IndexedDB) |
| IA | Anthropic SDK |

---

## ESTRUTURA DE DIRETÓRIOS

```
frontend/src/
├── app/                       # Pages (App Router)
│   ├── (hub)/                 # Landing page pública
│   ├── (auth)/                # Login, Cadastro
│   ├── (dashboard)/           # Sistema principal (protegido)
│   │   ├── layout.tsx         # Sidebar + Header
│   │   ├── admin/             # Admin de usuários
│   │   ├── analise/           # Análises (BRB, CPI)
│   │   ├── candidatos/        # CRUD candidatos
│   │   ├── cenarios/          # Simulador de cenários
│   │   ├── consultores/       # 158 consultores lendários
│   │   ├── dashboard/         # Dashboard com KPIs
│   │   ├── eleitores/         # 1000+ eleitores sintéticos
│   │   ├── entrevistas/       # Nova entrevista + execução
│   │   ├── estimativas/       # Estimativas eleitorais
│   │   ├── gestores/          # Gestores PODC
│   │   ├── helena/            # Chat com IA + memórias
│   │   ├── magistrados/       # 164 magistrados
│   │   ├── mapa/              # Mapa interativo DF
│   │   ├── mensagens/         # Gerador persuasivo
│   │   ├── parlamentares/     # Deputados e senadores
│   │   ├── pesquisas-parlamentares/
│   │   ├── resultados/        # Dashboard de resultados
│   │   ├── stress-tests/      # Testes de stress
│   │   ├── swing-voters/      # Análise de indecisos
│   │   ├── templates/         # Templates de perguntas
│   │   ├── validacao/         # Validação estatística
│   │   └── whatsapp/          # 8 agentes WhatsApp
│   ├── api/                   # API Routes (proxy + direct)
│   └── colmeia/               # Subramo secreto
├── components/                # 130 componentes React
├── services/                  # 10+ clientes API
├── stores/                    # 16 Zustand stores
├── hooks/                     # 11 custom hooks
├── lib/                       # 27 arquivos utilitários
├── types/                     # 200+ interfaces TypeScript
├── data/                      # Dados estáticos de referência
└── styles/                    # CSS global + variáveis
```

---

## MAPA DE PÁGINAS (52+)

### Páginas Públicas
| Rota | Arquivo | Função |
|------|---------|--------|
| `/` | `(hub)/page.tsx` | Landing page |
| `/login` | `(auth)/login/page.tsx` | Login |
| `/cadastro` | `(auth)/cadastro/page.tsx` | Registro |

### Dashboard Principal
| Rota | Função |
|------|--------|
| `/dashboard` | KPIs e visão geral |
| `/eleitores` | Lista 1000+ eleitores (virtualizada) |
| `/eleitores/[id]` | Perfil 60+ atributos |
| `/eleitores/gerar` | Gerador IA de eleitores |
| `/candidatos` | CRUD candidatos |
| `/parlamentares` | 164 deputados/senadores |
| `/parlamentares/[id]` | Detalhes parlamentar |
| `/magistrados` | 164 magistrados |
| `/magistrados/[id]` | Detalhes magistrado |
| `/consultores` | 158 digital twins |
| `/consultores/[id]` | Perfil consultor |

### Pesquisa & Entrevistas
| Rota | Função |
|------|--------|
| `/entrevistas` | Gerenciamento |
| `/entrevistas/nova` | Criar entrevista |
| `/entrevistas/execucao` | Executar com IA |
| `/pesquisas-parlamentares` | Pesquisas parlamentares |
| `/templates` | Templates de perguntas |

### Resultados & Análise
| Rota | Função |
|------|--------|
| `/resultados` | Dashboard consolidado |
| `/resultados/[sessaoId]` | Resultados por sessão |
| `/cenarios` | Simulador 1º/2º turno |
| `/estimativas` | Estimativas eleitorais |
| `/stress-tests` | Testes de robustez |
| `/swing-voters` | Análise de indecisos |
| `/validacao` | Validação estatística |
| `/mapa` | Mapa interativo DF |
| `/analytics` | Analytics global |

### Helena (IA)
| Rota | Função |
|------|--------|
| `/helena` | Chat com Dra. Helena |
| `/helena/memorias` | Histórico de memórias |

### Gestão & Admin
| Rota | Função |
|------|--------|
| `/admin/usuarios` | Administração de usuários |
| `/configuracoes` | Preferências |
| `/mensagens` | Gerador persuasivo |
| `/whatsapp` | Integração WhatsApp |
| `/historico` | Histórico de pesquisas |

---

## CATÁLOGO DE COMPONENTES (130)

### UI Primitivos (shadcn/ui) — `components/ui/`
`alert-dialog`, `badge`, `button`, `card`, `checkbox`, `dialog`, `input`, `label`, `progress`, `scroll-area`, `select`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `textarea`, `tooltip`, `image-with-fallback`

### Layout — `components/layout/`
| Componente | Função |
|-----------|--------|
| `Header.tsx` | Cabeçalho com busca e perfil |
| `Sidebar.tsx` | Menu lateral navegação |
| `MobileNav.tsx` | Nav responsiva mobile |
| `PageTransition.tsx` | Animação entre páginas |

### Branding — `components/branding/`
| Componente | Função |
|-----------|--------|
| `InteiaLogo.tsx` | Logo "IA" fundo âmbar |
| `InteiaBadge.tsx` | Badge identidade |
| `InteiaFooter.tsx` | Footer com CNPJ |

### Eleitores — `components/eleitores/`
`ListaEleitores`, `FiltroEleitores`, `CardEleitor`, `MiniDashboard`

### Candidatos — `components/candidatos/`
`CandidatosList`, `CandidatoCard`, `CandidatoForm`, `CandidatoDetails`, `CandidatosCharts`, `CandidatosInsights`

### Parlamentares — `components/parlamentares/`
`ParlamentaresList`, `ParlamentarCard`, `ParlamentaresFilters`, `ParlamentaresCharts`, `ParlamentaresInsights`, `ParlamentaresMiniDashboard`, `DadosTempoReal`

### Magistrados — `components/magistrados/`
`MagistradosList`, `MagistradoCard`, `MagistradosFilters`, `MagistradosCharts`, `MagistradosInsights`, `MagistradosMiniDashboard`

### Consultores — `components/consultores/`
`ConsultorCard`, `ConsultoresCharts`, `ConsultoresFilters`, `ConsultoresInsights`, `ConsultoresMiniDashboard`

### Agentes Genéricos — `components/agentes-genericos/`
`GenericAgentCard`, `GenericAgentCharts`, `GenericAgentFilters`, `GenericAgentInsights`, `GenericMiniDashboard`, `GenericExportMenu`

### Resultados — `components/resultados/`
`DashboardConsolidado`, `ResultadosPorPergunta`, `PainelResultadosPergunta`, `InsightsPanel`, `ChatResultados`, `AnalisadorInteligente`, `RelatorioInteligenciaVisual`, `CitacoesRepresentativas`, `CaixaPontoRuptura`, `CaixaVotoSilencioso`

### Helena — `components/helena/`
`HelenaChat`, `HelenaFullscreen`, `HelenaQuickTake`, `HelenaConversasList`, `HelenaMemoriasPanel`

### Gráficos — `components/charts/`
`GraficoDinamico`, `GraficoTendenciaTemporal`, `Heatmap`, `MapaCalorDF`, `MapaCalorEmocional`, `WordCloud`, `SankeyDiagram`, `TreemapChart`, `ViolinPlot`, `PiramideEtaria`, `RadarChartPerfil`, `FunnelChart`, `GaugeChart`

### Cenários — `components/cenarios/`
`SimuladorCenario`, `ResultadosCenario`, `AnaliseRejeicao`

### Estimativas — `components/estimativas/`
`CardCandidato`, `GraficoAgregado`, `GraficoRejeicao`, `MetricasResumo`, `PrevisaoModelo`, `ComparadorInstitutos`, `AvaliacaoGoverno`, `SimuladorSegundoTurno`, `TabelaPesquisas`

### Validação — `components/validacao/`
`ValidacaoEstatistica`, `MetricasEstatisticas`, `ResumoValidacao`, `TooltipComFonte`, `IndicadorDivergencia`, `GraficosComparativos`, `ExportarRelatorio`

### WhatsApp — `components/whatsapp/`
`ContatosTable`, `ConversasView`, `MetricasWhatsApp`

---

## ZUSTAND STORES (16)

| Store | Estado | Ações Principais |
|-------|--------|------------------|
| `auth-store` | usuario, token | login, logout, refresh |
| `eleitores-store` | eleitores[], filtros | load, filter, select |
| `candidatos-store` | candidatos[] | CRUD |
| `entrevistas-store` | entrevistas[], progresso | criar, executar, pausar |
| `resultados-store` | resultados[], analises | load, analisar |
| `pesquisas-store` | pesquisas[] | CRUD persistido |
| `parlamentares-store` | parlamentares[] | load, filter |
| `gestores-store` | gestores[] | load, entrevistar |
| `cenarios-store` | cenarios[] | simular, comparar |
| `templates-store` | templates[] | CRUD |
| `theme-store` | darkMode | toggle |
| `sidebar-store` | isOpen | toggle |
| `notifications-store` | toasts[] | add, dismiss |
| `configuracoes-store` | prefs | save |
| `modelos-ia-store` | modelo | setModelo |
| `helena-store` | conversas, memorias | chat, salvar |

### Padrão de Store
```typescript
interface State { data: T[]; loading: boolean; }
interface Actions { load: () => Promise<void>; }

export const useStore = create<State & Actions>((set) => ({
  data: [],
  loading: false,
  load: async () => {
    set({ loading: true });
    const res = await api.get('/endpoint');
    set({ data: res.data, loading: false });
  },
}));
```

---

## CUSTOM HOOKS (11)

| Hook | Função |
|------|--------|
| `useEleitores` | Carrega e filtra eleitores |
| `useGestores` | Entrevistas com gestores |
| `useParlamentares` | Lista de parlamentares |
| `useMagistrados` | Lista de magistrados |
| `useConsultores` | Lista de consultores |
| `useAnaliseInteligente` | Análise IA de resultados |
| `useFilterNavigation` | Sincroniza filtros com URL |
| `useDadosAbertos` | APIs externas |
| `useDivergencias` | Detecta divergências |
| `useSyncSessoes` | Sincronização de sessões |

---

## SERVICES (10+)

| Arquivo | Função |
|---------|--------|
| `api.ts` | Cliente Axios base (JWT interceptor, error handling) |
| `pesquisas-api.ts` | CRUD pesquisas persistidas |
| `sessoes-api.ts` | Gerenciamento de sessões |
| `memorias-api.ts` | Histórico de conversas |
| `analytics-api.ts` | Métricas e dashboards |
| `analytics-local.ts` | Cálculos no frontend |
| `dados-abertos.ts` | APIs externas (dados públicos) |
| `metricas-estatisticas.ts` | Cálculos estatísticos |
| `validacao-estatistica.ts` | Validação de dados |
| `whatsapp-api.ts` | Integração WhatsApp |

---

## LIB (27 arquivos)

### Claude IA — `lib/claude/`
| Arquivo | Função |
|---------|--------|
| `client.ts` | Cliente Anthropic (OmniRoute) |
| `prompts.ts` | Prompts principais |
| `prompts-templates.ts` | Prompts para templates |
| `prompts-gestor.ts` | Prompts para gestores |

### Análise — `lib/analysis/`
| Arquivo | Função |
|---------|--------|
| `statistics.ts` | Média, desvio, margem de erro |
| `ponto-ruptura.ts` | Detecção de inflexão |
| `voto-silencioso.ts` | Análise voto oculto |

### Exportação — `lib/export/`
`csv.ts`, `excel.ts` (ExcelJS), `pdf.ts` (jsPDF), `markdown.ts`

### Server — `lib/server/`
`chat-auditoria.ts`, `http-security.ts`, `rate-limit.ts`

### Outros
| Arquivo | Função |
|---------|--------|
| `utils.ts` | cn(), formatação, helpers |
| `analise-estatistica.ts` | Cálculos avançados |
| `analise-discurso.ts` | NLP texto |
| `classificador-perguntas.ts` | Classificação automática |
| `extrator-inteligente.ts` | Extração de dados |
| `gerador-pdf.ts` | PDF com branding INTEIA |
| `db/dexie.ts` | IndexedDB local |
| `data/parlamentares-loader.ts` | Loader parlamentares |

---

## TIPOS PRINCIPAIS (types/index.ts)

### Entidades Base
```typescript
interface Eleitor {
  id: number; nome: string; idade: number; genero: string;
  regiao_administrativa: string; cluster_socioeconomico: string;
  orientacao_politica: string; posicao_bolsonaro: string;
  // ... 60+ campos
}

interface Candidato {
  id: number; nome: string; cargo: string; partido: string; ativo: boolean;
}

type TipoAgente = 'eleitor' | 'parlamentar' | 'consultor' | 'magistrado' | 'gestor';
type ClusterSocioeconomico = 'G1_alta' | 'G2_media_alta' | 'G3_media_baixa' | 'G4_baixa';
type OrientacaoPolitica = 'esquerda' | 'centro-esquerda' | 'centro' | 'centro-direita' | 'direita';
```

---

## API ROUTES DO FRONTEND

### Proxy Universal
`/api/v1/[...proxy]/route.ts` → Redireciona para backend FastAPI

### Rotas Diretas (Next.js)
| Rota API | Função |
|----------|--------|
| `/api/chat-inteligencia` | Chat streaming Helena |
| `/api/chat-inteligencia/deep-research` | Pesquisa profunda |
| `/api/chat-inteligencia/pesquisas` | Análise de pesquisas |
| `/api/chat-inteligencia/sonho` | Modo onírico |
| `/api/chat-inteligencia/tts` | Text-to-Speech |
| `/api/claude/entrevista` | Executa entrevista IA |
| `/api/claude/gerar-perguntas` | Gera perguntas |
| `/api/claude/insights` | Gera insights |
| `/api/claude/relatorio-inteligencia` | Relatório inteligência |
| `/api/warroom-helena` | Análise warroom |

---

## FLUXO DE ENTREVISTA (Exemplo Completo)

```
1. /entrevistas/nova
   → TemplateSelector (escolhe perguntas)
   → api.post('/entrevistas') → cria sessão

2. /entrevistas/execucao
   → Carrega eleitores selecionados
   → Para cada eleitor:
     → api.post('/claude/entrevista', { eleitor, pergunta })
     → Claude responde como persona do eleitor
     → Resposta salva no backend

3. /resultados/[sessaoId]
   → DashboardConsolidado
   → ResultadosPorPergunta + gráficos
   → InsightsPanel (IA analisa)
   → ChatResultados (interativo)
   → ExportarRelatorio (XLSX, PDF, DOCX)
```

---

## PADRÕES DE CÓDIGO

### Novo Componente
```tsx
interface NomeComponenteProps {
  dado: Tipo;
  onAcao?: (id: string) => void;
  className?: string;
}

export function NomeComponente({ dado, onAcao, className }: NomeComponenteProps) {
  return <div className={cn("base-classes", className)}>...</div>;
}
```

### Nova Página
```tsx
// app/(dashboard)/nova-pagina/page.tsx
'use client'
import { useQuery } from '@tanstack/react-query'

export default function NovaPaginaPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dados'],
    queryFn: () => api.get('/endpoint')
  });
  // ...
}
```

### Novo Store
```tsx
// stores/novo-store.ts
import { create } from 'zustand'
import { api } from '@/services/api'

interface NovoState { items: Item[]; loading: boolean; }
interface NovoActions { load: () => Promise<void>; }

export const useNovoStore = create<NovoState & NovoActions>((set) => ({
  items: [],
  loading: false,
  load: async () => { /* ... */ },
}));
```

---

*Skill criada em 2026-02-28 | 320 arquivos, 130 componentes, 52+ páginas*
