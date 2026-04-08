# Checklist Final — Relatório INTEIA (Versão Validada)

## ✅ LOGOS (11 variantes — ver `assets/logos/LOGOS_GUIDE.md`)
- [ ] Logo escolhida conforme contexto (dark → escudo-3d-premium / claro → brasao-fundo-cinza)
- [ ] Header/footer → `escudo-flat-transparente.png` (pequeno, limpo)
- [ ] Proposta comercial / jurídico → `brasao-ornamental-barroco.png`
- [ ] Formato PNG (NUNCA JPEG para logos)
- [ ] Convertida para base64 se HTML inline
- [ ] Tamanho: capa 200-250px, header 80-120px, footer 60-80px

## ✅ CAPA
- [ ] Logo INTEIA 135px, PNG transparente (sem fundo preto)
- [ ] `class="cover-logo-img"` no img tag da capa
- [ ] Três linhas de brand: INTEIA + Inteligência Artificial Estratégica + **Preditiva Eleitoral** (gold)
- [ ] Eyebrow com contexto do relatório
- [ ] H1 Cormorant Garamond com `<em>` em dourado
- [ ] Chips obrigatórios: CONFIDENCIAL (red), confiança, data, n= agentes, autor + credencial
- [ ] Cover-footer com versão, metodologias, calibração
- [ ] Número decorativo fundo (ex: "16")
- [ ] Strip de imagem de Brasília/contexto (opcional mas recomendado)

## ✅ SIDEBAR E PRINT BAR
- [ ] `.sidebar-stripe` fixo na lateral esquerda (5px, gradiente dourado)
- [ ] Print bar sticky no topo com `↓ Imprimir / Salvar como PDF`
- [ ] Ambos `display:none` no `@media print`

## ✅ RESUMO EXECUTIVO (seção mais crítica)
- [ ] Veredicto em 1 frase clara no topo
- [ ] `.verdict-block` com: verdict-tag, verdict-main, verdict-flow, verdict-stats
- [ ] verdict-stats: P(vitória/sucesso) + confiança + convergência N/N
- [ ] `.box.red` com aviso crítico após o veredicto
- [ ] **BLOCO MAD** — sempre que houver auditoria como ferramenta estratégica
- [ ] exec::after watermark "16/16"

## ✅ CONTEÚDO ANALÍTICO
- [ ] 16 metodologias listadas em pills (seção 01)
- [ ] KPIs com cores semânticas corretas (gold/crimson/emerald)
- [ ] Timeline com pontos gold (normal) e crimson (crítico)
- [ ] Tabelas de teoria dos jogos com scores e confiança
- [ ] Barras horizontais com largura % proporcional ao valor
- [ ] SWOT 2×2 com bordas semânticas por quadrante
- [ ] Fases com número display grande, data mono, P(vitória) no canto
- [ ] Echo MAD no Plano de Ação após fase de Auditoria
- [ ] Grid 3×3 de notícias com cores: crimson/amber/gold por tipo
- [ ] Bloco de convergência com fração N/N em 9rem

## ✅ EQUIPE (seção 10)
- [ ] **Igor**: foto real profissional (headshot terno escuro) — NUNCA usar cartoon do zip
- [ ] Helena: helena-strategos.png do zip
- [ ] Grid 2×2 com todos os 8 membros
- [ ] Fotos 120×120px, object-position:center top, borda gold 2px
- [ ] Currículos com instituições globais de elite (MIT, Yale, Oxford, Caltech...)
- [ ] Tags de especialidade em chips mono

## ✅ DESIGN SYSTEM
- [ ] Google Fonts link no `<head>` (Cormorant + JetBrains Mono + Outfit)
- [ ] Todas as variáveis CSS no `:root`
- [ ] Nenhum fundo branco — sempre var(--void) ou var(--carbon)
- [ ] Tipografia triádica usada corretamente por contexto
- [ ] Cores semânticas: crimson=crítico, amber=médio, emerald=positivo, gold=recomendação

## ✅ IMPRESSÃO A4
- [ ] `@page { size: A4 portrait; margin: 15mm 18mm 12mm 22mm; }`
- [ ] `@page :first { margin: 0; }` para capa
- [ ] Capa: `page-break-after: always !important`
- [ ] Seções: `page-break-inside: avoid`
- [ ] `.page-break`: `page-break-before: always`
- [ ] `sidebar-stripe` e `print-bar`: `display: none !important`
- [ ] `-webkit-print-color-adjust: exact` em todo documento
- [ ] Autores: `page-break-before: always`
- [ ] Convergência: `page-break-before: always`
- [ ] SVG tree: `overflow: hidden; page-break-before: always; max-height: 240mm`
- [ ] Máximo 8 page-breaks (sem fragmentação excessiva)

## ✅ MOBILE (≤900px e ≤500px) — Reescrito 2026-03-23
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">` no `<head>`
- [ ] Logo capa: 90px em ≤900px, 72px em ≤500px (NUNCA menos que 72px)
- [ ] Body font-size: 14px mínimo em ≤500px
- [ ] Parágrafos: 0.88rem com line-height 1.7
- [ ] Padding `.doc`: 1.5rem 1rem em ≤900px, 1rem 0.75rem em ≤500px
- [ ] TODOS os grids → 1 coluna (kpi, swot, risk, news, authors)
- [ ] Capa: `min-height: auto`, número decorativo `display: none` em ≤500px
- [ ] Cover-footer: `flex-direction: column`
- [ ] MAD 3 colunas → `flex-direction: column` (forçado com `!important`)
- [ ] Fases → P(vitória) `display: none` em mobile
- [ ] Tabelas → `overflow-x: auto` + `-webkit-overflow-scrolling: touch`
- [ ] SVG tree → overflow-x:auto + hint "← ROLE →"
- [ ] Riscos grid: `writing-mode` removido em ≤500px (ilegível vertical)
- [ ] Autores: card 1 coluna centralizado em ≤500px
- [ ] Banners: altura 120px/100px (não 200px/180px)
- [ ] Notícias inline grid: override `grid-template-columns: 1fr !important`
- [ ] Veredicto stats: `flex-direction: column` em ≤900px
- [ ] CSS completo em `references/design-tokens.md` → seção "Mobile — CSS Responsivo Completo"

## ✅ PDF (geração)
- [ ] HTML→PDF: testar `python scripts/gerar_pdf.py relatorio.html` (Playwright)
- [ ] PDF gerado preserva fundo escuro (print_background=True)
- [ ] Capa ocupa primeira página inteira
- [ ] Fontes Google carregadas (2s de espera no script)
- [ ] Se LaTeX: compilar com `xelatex` (NÃO pdflatex — precisa fontspec)
- [ ] Se LaTeX: verificar se fontes Cormorant/Outfit/JetBrains instaladas (fallback Latin Modern OK)
- [ ] Entregar 3 arquivos: `.html` + `.pdf` (HTML) + `.pdf` (LaTeX) quando solicitado

## ✅ QUALIDADE SQVID (Helena Strategos)
- [ ] **S=Simples**: zero informação decorativa sem valor analítico
- [ ] **Q=Qualidade**: dados com fonte e calibração declarados
- [ ] **V=Visão**: veredicto aponta para FRENTE (spine de Duarte sempre para cima)
- [ ] **I=Individual**: análise específica ao caso, não genérica
- [ ] **D=Delta**: contraste claro entre "situação atual" e "futuro recomendado"
- [ ] Teste 5 segundos: cada seção comunica seu ponto em 5s
- [ ] Lie Factor = 1,0: barras proporcionais aos valores reais
- [ ] Convergência N/N: todas as metodologias testadas concordam com o veredicto
