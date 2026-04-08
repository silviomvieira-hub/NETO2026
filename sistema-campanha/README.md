# Sistema de Campanha — Candidato Distrital DF 2026

Pacote de inteligência, pesquisa e consultoria para campanha de deputado distrital. Tudo extraído do projeto `pesquisa-eleitoral-df` da INTEIA.

> **Origem:** `C:\Users\igorm\pesquisa-eleitoral-df`
> **Data do snapshot:** 2026-04-08
> **Total:** ~42 MB

---

## Estrutura

### `01-eleitores-df/` — Banco de Eleitores Sintéticos
Base do simulador de pesquisa eleitoral. 2.015 perfis com 60+ atributos cada (demografia, socioeconomia, posição política, vieses cognitivos, fontes de informação).

- `banco-eleitores-df.json` — **Principal (1.9MB)**
- `banco-eleitores-rr.json` — Roraima (referência comparativa)

**Uso:** alimentar simulações de pesquisa eleitoral (intenção de voto, rejeição, teste de mensagem, segmentação por região administrativa).

---

### `02-parlamentares-candidatos/` — Mapeamento Político
Tudo sobre quem está no jogo:

- `banco-deputados-distritais-df.json` ⭐ **CRÍTICO** — adversários e potenciais aliados na CLDF
- `banco-deputados-federais-df.json` — bancada federal DF
- `banco-senadores-df.json` — senadores DF
- `banco-parlamentares-brasil.json` — base nacional
- `banco-candidatos-df-2026.json` / `candidatos-df-2026.json` — pré-candidatos 2026

**Uso:** análise de concorrência, mapeamento de alianças, identificação de nichos vagos.

---

### `03-consultores-inteligencia/` — Consultores Lendários
- `banco-consultores-lendarios.json` (1.4MB) — **158 perfis** de consultores lendários (estrategistas, marqueteiros, cientistas políticos clássicos).

**Uso:** alimentar agentes sintéticos que dão pareceres estratégicos. Cada decisão de campanha pode ser submetida a um "comitê" desses consultores para gerar inteligência cruzada (debate simulado, red team, validação de mensagem). Núcleo do módulo de **consultoria via IA**.

---

### `04-gestores-magistrados/`
- `banco-gestores.json` (332KB) — gestores públicos DF (analise de infra/políticas)
- `magistrados-meta/` — índice e schema dos 164 magistrados (STF, STJ, TJDFT, TRF1)

**Uso:** entender ambiente regulatório, judicialização, perfil de quem decide questões eleitorais.

---

### `05-templates-pesquisa/`
- `templates-perguntas-eleitorais.json` — questionários prontos
- `templates-perguntas-gestores.json` — pesquisa qualitativa com gestores

---

### `06-skills-helena/` ⭐ NÚCLEO DE PESQUISA E CONSULTORIA
**36 skills** da Dra. Helena Strategos + arsenal INTEIA completo (pesquisa, consultoria, construção do próprio sistema).

**A MAIS COMPLETA: `helena-master/`** (168KB, 485 linhas + 14 arquivos de referência)
- `SKILL.md` — manual mestre
- `HELENA_MAPA.md` — mapa de capacidades
- `reference/`:
  - `arsenal-estatistico.md` — 30+ métodos quanti
  - `arsenal.md` — toolkit geral
  - `agentes-sinteticos.md` — protocolo de agentes
  - `polaris-protocol.md` — pesquisa profunda
  - `teoria-dos-jogos.md` — 40+ modelos (Nash, Shapley, Hotelling, Banzhaf, eleitor mediano)
  - `persuasao-framework.md` — Insight Premium, Red Team, Curiosidade Residual
  - `pesquisa-web.md` — 5 camadas
  - `framework-mckinsey-relatorio.md` — formato consultoria
  - `formato-relatorio.md` — padrão INTEIA
  - `business-intel.md` — análise em 7 pilares
  - `multi-agente.md` — orquestração 144 consultores + 164 magistrados + 1001 eleitores + 594 parlamentares
  - `perfil-interlocutor.md` — psicografia
  - `criadora-skills.md` — auto-criação de capacidades
  - `tarefas-pipeline.md` — workflow

**Skills complementares de pesquisa quali+quanti:**
- `pesquisa-eleitoral-premium/` — fluxo end-to-end com POLARIS (10 bancos, anti-alucinação)
- `helena-analise-quantitativa/` — arsenal estatístico, ML, NLP, qualitativa
- `helena-chat-memorias/` — chat persistente
- `pesquisa-profunda-helena/` — investigação multi-camada
- `auditoria-e-validacao-pesquisa/` — quality gates anti-alucinação
- `cenarios-simulacoes/` — modelagem preditiva
- `simulacao-eleitoral-avancada/` — cenários eleitorais complexos
- `agentes-sinteticos-dados/` — geração de personas
- `insights-estrategicos-preditivos/` — recomendações com confiança
- `inteligencia-competitiva/` — análise de adversários
- `gestao-crises-reputacao/` — resposta a crises
- `comunicacao-persuasiva/` — messaging
- `diana-eleitoral/` — persuasão WhatsApp
- `inteia-report/` — relatórios HTML dark premium
- `templates-relatorios/` — templates visuais
- `sistema-multiagente/` — orquestração
- `campanha-celina-2026/` — referência de operação real
- `dados-governamentais-brasil/` — fontes oficiais
- `dados-publicos-brasil/` — Base dos Dados
- `content-engine-helena/` — produção de conteúdo

**Skills de gestão de campanha (estratégia + jurídico + financeiro):**
- `analise-financeira-estrategica/` — finanças do comitê, prestação de contas, orçamento
- `analise-juridica-preditiva/` — análise jurídica preditiva (TRE, TSE, contencioso eleitoral)
- `coaching-executivo/` — coaching do candidato (preparação para debates, entrevistas)
- `proposta-comercial-1pagina/` — propostas LaTeX premium (apresentações a apoiadores/financiadores)
- `relatorio-inteia/` — geração de relatórios .docx Word profissionais

**Skills para CONSTRUIR o sistema NETO2026:**
- `api-backend-completa/` — padrões de API backend (FastAPI)
- `frontend-arquitetura/` — arquitetura frontend (Next.js/React)
- `design-system-inteia/` — design system completo (cores, componentes, layouts) ⭐
- `infraestrutura-deploy/` — deploy Vercel/Render, monitoramento
- `integracao-ia-omniroute/` — integração multi-provider de IA (custo zero via OmniRoute)
- `orquestracao-divisoes/` — orquestração de múltiplas divisões/agentes
- `scripts-geracao-validacao/` — scripts de geração e validação
- `criacao-skills/` — criar novas skills sob demanda
- `gerador-imagens/` — criativos visuais via Gemini 3 Pro

**Índice oficial:** `SKILLS_INDEX.md` (do projeto original, copiado)

---

### `07-scripts/`
- `generators/gerar_eleitores_df_v4.py` — gera novos eleitores sintéticos
- `generators/gerar_eleitores_otimizado.py` — versão performática
- `validacao/validacao_modelo_comparativo.py` — valida MAE vs pesquisa real
- `validacao/diagnostico_outliers.py` — detecta vieses do prompt
- `validacao/validacao_estatistica.py` — testes estatísticos
- `auditoria/auditoria_fatos/` — anti-alucinação (Lei Hefesto)

---

### `08-prompts-ia/`
- `polaris/respondent_prompts.py` — prompts dos eleitores sintéticos (POLARIS)
- `polaris/analysis_prompts.py` — análise de respostas
- `polaris/scientist_prompts.py` — Helena cientista
- `frontend/prompts.ts` — prompts do frontend (calibrados v4 factual, MAE ~8pp)

---

### `09-docs-navegacao/`
- `GPS_NAVEGACAO_AGENTES.md` — mapa completo do projeto original
- `PROJECT_INDEX.md` — índice de funcionalidades
- `CLAUDE-projeto-original.md` — instruções e regras (Lei Hefesto, Padrão INTEIA, modelos IA)

---

### `10-relatorios-referencia/` (vazio — para você popular)
Sugestões a copiar quando precisar de templates HTML prontos:
- `C:\Users\igorm\pesquisa-eleitoral-df\frontend\public\relatorio-celina\`
- `C:\Users\igorm\pesquisa-eleitoral-df\frontend\public\relatorio-ibaneis-senado\`
- `C:\Users\igorm\pesquisa-eleitoral-df\frontend\public\dossie-rogerio-cpi-master\`
- `C:\Users\igorm\pesquisa-eleitoral-df\frontend\public\analise-ibaneis-2026\` (modelo 1 página A4)

---

## Sugestão de Arquitetura do Sistema NETO2026

```
NETO2026/
├── sistema-campanha/        ← este pacote (dados + skills + scripts)
├── frontend/                ← seu painel web
├── backend/                 ← API que consome banco de eleitores
└── docs/
```

### Módulos sugeridos do sistema
1. **Pesquisa Sintética** — usa `01-eleitores-df` + `08-prompts-ia/polaris` + `07-scripts`
2. **Inteligência Competitiva** — usa `02-parlamentares-candidatos` + skill `inteligencia-competitiva`
3. **Consultoria via IA** — usa `03-consultores-inteligencia` + `helena-master` (comitê de consultores lendários)
4. **Simulação de Cenários** — `cenarios-simulacoes` + `simulacao-eleitoral-avancada`
5. **Relatórios Premium** — `inteia-report` + `templates-relatorios`
6. **Auditoria Anti-Alucinação** — `07-scripts/auditoria` + `auditoria-e-validacao-pesquisa`

### Fluxo recomendado para qualquer pesquisa
1. Definir objetivo → carregar template de `05-templates-pesquisa`
2. Rodar simulação com `01-eleitores-df` + prompts de `08-prompts-ia/polaris`
3. Validar com `07-scripts/validacao` (MAE, outliers)
4. Auditar com `auditoria-e-validacao-pesquisa` (anti-alucinação)
5. Submeter conclusão ao "comitê de consultores lendários" (`03-consultores-inteligencia`)
6. Gerar relatório com `inteia-report` (HTML dark premium)

---

## Regras herdadas (do CLAUDE.md original)

1. **Lei Hefesto** — toda afirmação factual exige WebSearch antes de escrever. Sem inferência ancorada.
2. **Princípio Supremo** — DADOS antes de RACIOCÍNIO. Sem dado, sem opinião.
3. **Lei da Interface** — qualidade da conexão entre componentes > qualidade dos componentes isolados.
4. **Idioma** — pt-BR sempre, com acentuação completa em conteúdo público.
5. **Calibração de prompts** — tom factual neutro, sem percentuais no prompt (cria viés de ancoragem).

---

## Próximos passos sugeridos

1. Ler `06-skills-helena/helena-master/SKILL.md` (manual mestre)
2. Examinar `01-eleitores-df/banco-eleitores-df.json` (estrutura dos eleitores)
3. Testar `07-scripts/generators/gerar_eleitores_df_v4.py` para entender geração
4. Definir os módulos do painel NETO2026
5. Decidir: backend reaproveita o do `pesquisa-eleitoral-df` ou novo standalone?
