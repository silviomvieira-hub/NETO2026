---
name: inteia-report
description: >
  Gera relatórios de inteligência estratégica e análise político-eleitoral no padrão
  editorial premium INTEIA — dark mode, tipografia triádica Cormorant + JetBrains Mono + Outfit,
  paleta dourada (#c9952a), HTML standalone com tudo inline.

  USE SEMPRE QUE o usuário pedir: relatório INTEIA, relatório estratégico, análise
  político-eleitoral, relatório de inteligência, análise eleitoral, teoria dos jogos política,
  análise de risco político, relatório de candidatura, relatório executivo premium,
  documento HTML dark-mode premium, análise de cenários, SWOT eleitoral, simulação com
  agentes sintéticos, posicionamento de candidatura, análise de escândalo político.

  Também disparar para: relatório confidencial, brasão INTEIA, modelo INTEIA,
  design sistema dourado + preto, Celina Leão, DF 2026, caso Master/BRB.
---

# Skill: Relatório INTEIA — Versão Final Validada

Modelo construído e validado em sessão real com o fundador da INTEIA, Igor Morais Vasconcelos.
Esta skill captura todas as decisões de design, conteúdo e estrutura do documento final.

**ANTES DE ESCREVER QUALQUER CÓDIGO:** leia:
1. `references/design-tokens.md` → CSS completo e variáveis
2. `references/components.md` → HTML de cada componente
3. `references/equipe.md` → Currículos globais da equipe INTEIA
4. `references/checklist.md` → Validação antes de entregar

---

## 1. ARQUITETURA DO DOCUMENTO (ordem obrigatória)

```
<head>  → Google Fonts + CSS completo (tudo inline, sem arquivos externos)
<body>
  ├── [SIDEBAR STRIPE]          → position:fixed, left:0, 5px, gradiente dourado
  ├── [CAPA .cover]             → min-height:100vh, grid 3 rows
  │     ├── cover-grid-bg       → grade decorativa sutil
  │     ├── cover-header        → logo 135px + brand text + CONFIDENCIAL stamp
  │     ├── cover-body          → eyebrow + H1 display + H2 italic + rule + desc + chips
  │     ├── [BRASÍLIA STRIP]    → imagem full-width, height:180px, opacity:0.55
  │     └── cover-footer        → versão + metodologias + calibração
  ├── [PRINT BAR]               → sticky top:0, botão imprimir
  ├── [.doc max-width:1080px]
  │     ├── 00 Resumo Executivo → veredicto + aviso crítico + BLOCO MAD
  │     ├── 01 Metodologia      → pills 16 técnicas
  │     ├── 02 A Crise          → KPIs + timeline
  │     ├── 03 Teoria dos Jogos → tabela 6 modelos + barras payoff
  │     ├── 04 Simulações       → banner neural + baterias 1/2/3
  │     ├── 05 SWOT             → grid 2×2 + MCDA + riscos grid
  │     ├── 06 Plano de Ação    → banner BSB + frame analysis + fases + MAD echo
  │     ├── 07B Árvore SVG      → scroll horizontal, 2500×2700
  │     ├── 09 Monitor Imprensa → grid 3×3 notícias coloridas
  │     ├── [CONVERGÊNCIA]      → número 9rem + pills
  │     ├── [ASSINATURA]        → citação + Igor + Helena
  │     └── 10 Autores          → grid 2×2, 8 membros
  └── [RODAPÉ]                  → logo + metadados
```

---

## 2. IDENTIDADE VISUAL

### Logo INTEIA — 11 variantes (brasão + escudos)

**REGRA CRÍTICA**: usar sempre **PNG com transparência real** — JPEG não suporta alpha e gera caixa preta visível no fundo escuro do documento.

**Guia completo**: `assets/logos/LOGOS_GUIDE.md`

#### Decisão rápida por contexto

| Contexto | Arquivo |
|----------|---------|
| **Capa relatório dark** | `assets/logos/escudo-3d-premium-transparente.png` |
| **Capa relatório claro / impressão** | `assets/logos/brasao-completo-fundo-cinza.png` |
| **Capa LaTeX / sobreposição** | `assets/logos/brasao-completo-transparente.png` |
| **Header / sidebar (pequeno)** | `assets/logos/escudo-flat-transparente.png` |
| **Footer** | `assets/logos/escudo-flat-transparente.png` |
| **Proposta comercial / jurídico** | `assets/logos/brasao-ornamental-barroco.png` |
| **Cards dark mode (#050608)** | `assets/logos/escudo-3d-dark-neon.png` |
| **Avatar chat / redes sociais** | `assets/logos/escudo-3d-premium-transparente.png` |
| **Watermark (opacity 0.04)** | `assets/logos/brasao-completo-transparente.png` |

**Categorias**:
- **Escudos simples** (3): flat-transparente, 3d-premium-transparente, 3d-dark-neon
- **Brasões completos** (5): completo-transparente, completo-fundo-cinza, v1-fundo-cinza, v2-fundo-olive, ornamental-barroco
- **Originais** (3): logo_inteia.png, logo_inteia_original.png, logo_inteia_transparent.png

**Arquivo original (fallback)**: `assets/logo_inteia_transparent.png` — 400×267px, 90,6% transparente.
Brasão heráldico: espada + cetro cruzados, coroa dourada, louros, escudo com cérebro neural, estrela, faixa "INTEIA" + "Inteligência Estratégica".

**Processo de remoção de fundo (PIL — método validado final):**
```python
from PIL import Image
import numpy as np, base64, io

with open('logo.png','rb') as f:
    img = Image.open(io.BytesIO(f.read())).convert('RGBA')

arr = np.array(img, dtype=np.float32)
r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
max_ch = np.maximum(np.maximum(r, g), b)

# Ramp: abaixo de 35 = transparente, 35-80 = transição suave
low, high = 35.0, 80.0
arr[:,:,3] = np.clip((max_ch - low) / (high - low), 0.0, 1.0) * 255.0

result = Image.fromarray(arr.astype(np.uint8), 'RGBA')
result.thumbnail((400, 400), Image.LANCZOS)

buf = io.BytesIO()
result.save(buf, 'PNG', optimize=True)   # ← DEVE SER PNG, NUNCA JPEG
logo_b64 = base64.b64encode(buf.getvalue()).decode()
```

**Validação**: `(arr[:,:,3] < 10).sum() / total > 0.85` — se < 85% transparente, ajustar `low` para baixo.

**CSS nos img tags** (sem mix-blend-mode):
```css
/* capa 203px */
width:203px; height:auto; object-fit:contain; display:block;
filter: drop-shadow(0 0 12px rgba(201,149,42,0.4));

/* assinatura 135px, rodapé 99px — mesma estrutura */
```

**Tamanhos validados**: capa **200-250px**, header **80-120px**, footer **60-80px**, watermark **400px opacity:0.04**

### Tipografia triádica (Google Fonts — SEMPRE no `<head>`)
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

| Papel | Fonte | Uso |
|-------|-------|-----|
| Display / Títulos | Cormorant Garamond | H1 capa, sec-title, KPI values, pull-quotes |
| Corpo | Outfit | Parágrafos, bios, descrições |
| Dados / Labels | JetBrains Mono | sec-label, chips, tabela header, datas |

### Paleta (ver `references/design-tokens.md` para CSS completo)
- `--void: #050608` background body
- `--gold: #c9952a` / `--gold2: #e8b84b` primária
- `--crimson2: #e74c3c` alerta crítico / jurídico
- `--amber: #d68c1a` risco médio / político
- `--emerald2: #27ae60` positivo / oportunidade

---

## 3. CAPA — DETALHES CRÍTICOS

```html
<header class="cover-header">
  <div class="cover-logo-block">
    <!-- Logo: PNG transparente, class="cover-logo-img" obrigatório -->
    <img class="cover-logo-img" src="[BASE64_PNG]" alt="INTEIA Logo"
         style="width:135px;height:auto;max-width:135px;object-fit:contain;
                filter:drop-shadow(0 0 28px rgba(201,149,42,0.65));display:block;">
    <div>
      <span class="cover-brand-name">INTEIA</span>
      <span class="cover-brand-sub">Inteligência Artificial Estratégica</span>
      <!-- OBRIGATÓRIO: terceira linha dourada -->
      <span class="cover-brand-sub" style="color:var(--gold);opacity:0.75;font-size:0.5rem;">
        Preditiva Eleitoral
      </span>
    </div>
  </div>
  <div class="cover-stamp">Confidencial</div>
</header>
```

**Chips obrigatórios na capa:**
```html
<span class="chip red">Confidencial</span>
<span class="chip gold">Confiança: [X,XX]</span>
<span class="chip">[DATA]</span>
<span class="chip">n = [N] agentes</span>
<span class="chip">[AUTOR] · [CREDENCIAL]</span>
```

---

## 4. BLOCO MAD — INOVAÇÃO ESTRATÉGICA

Este bloco é a **maior inovação analítica** do modelo INTEIA. Sempre incluir no Resumo Executivo quando o contexto envolver auditoria, investigação ou crise institucional.

**Conceito:** A auditoria não é escudo — é Cavalo de Troia. Mapeamento sistemático de vulnerabilidades do ecossistema político inteiro gera kompromat sistêmico e ativa cenário de Destruição Mútua Assegurada (MAD). Qualquer atacante sabe que atacar ativa exposição cruzada.

**Posições de injeção:**
1. **Resumo Executivo** — bloco completo com watermark "MAD", borda crimson, 3 colunas táticas
2. **Seção 06 Plano de Ação** — eco compacto após Fase 02 (Auditoria)

**Estrutura do bloco completo** (ver `references/components.md` → seção "Bloco MAD")

---

## 5. EQUIPE INTEIA (8 membros)

Ver `references/equipe.md` para currículos completos.

**Regra crítica:** A foto do fundador Igor Morais Vasconcelos é uma **fotografia real profissional** — NUNCA substituir pelo arquivo `igor-morais-vasconcelos.png` do zip da equipe (é um ícone/cartoon 256×256). Usar sempre a foto de headshot profissional fornecida separadamente.

| Membro | Cargo | Credencial-Âncora |
|--------|-------|-------------------|
| Igor Morais Vasconcelos | Fundador & CEO | Doutorando Adm. Pública · Mestre Gestão Pública · IDP |
| Dra. Helena Strategos | Cientista-Chefe IA | Ph.D. MIT CSAIL · Stanford HAI |
| Ares Tekhton | Dir. Engenharia | D.Eng. Caltech · NASA JPL |
| Diana Venatrix | Dir. Inteligência Campo | Ph.D. Sciences Po · Harvard Kennedy |
| Iris Aetheria | Dir. Comunicação | Ph.D. Johns Hopkins · Stanford PIN Lab |
| Midas Chrysos | Dir. Financeiro | Ph.D. LSE · CFA · FMI Division Chief |
| Oracle Gnosis | Dir. Jurídico | J.S.D. Yale · PGR Brasil · TPI Haia |
| Themis Nomos | Dir. Governança IA | D.Phil. Oxford · EU HLEG IA (27 países) |

---

## 6. SEÇÃO DE NOTÍCIAS (Grid 3×3)

Código de cores semântico obrigatório:
- `--crimson2` = desenvolvimento jurídico/investigativo
- `--amber` = movimentação política/eleitoral
- `--gold` = estratégia do candidato analisado

```html
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;
            background:var(--border);border:1px solid var(--border);margin:2rem 0;">
  <div style="background:var(--carbon);padding:1.4rem;border-top:2px solid var(--crimson2);">
    <div style="font-family:var(--font-mono);font-size:0.5rem;letter-spacing:0.15em;
                text-transform:uppercase;color:var(--crimson2);margin-bottom:0.5rem;">
      Fonte · DD mmm AAAA
    </div>
    <div style="font-size:0.9rem;font-weight:600;color:var(--text);
                line-height:1.35;margin-bottom:0.5rem;">Título</div>
    <div style="font-size:0.78rem;color:var(--muted);font-weight:300;line-height:1.55;">
      Resumo em 2-3 linhas.
    </div>
  </div>
  <!-- repetir para 9 notícias -->
</div>
```

---

## 7. IMPRESSÃO A4 E MOBILE

### @media print (regras finais validadas)
```css
@media print {
  @page { size: A4 portrait; margin: 15mm 18mm 12mm 22mm; }
  @page :first { margin: 0; }
  .sidebar-stripe, .print-bar { display: none !important; }
  .cover { height: 100vh; page-break-after: always !important; }
  .section { page-break-inside: avoid; margin-bottom: 6mm !important; }
  .page-break { page-break-before: always; display: block; height: 0 !important; }
  .page-break span, .page-break::before, .page-break::after { display: none !important; }
  .kpi-grid, .news-grid { grid-template-columns: repeat(3,1fr) !important; }
  .authors-section { page-break-before: always; }
  .convergence { page-break-before: always; }
  .section div[style*="overflow-x"] { overflow: hidden !important; page-break-before: always; }
  .section div[style*="overflow-x"] svg { width: 100% !important; max-height: 240mm !important; }
  *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
```

### @media mobile — REESCRITO 2026-03-23

> Corrigido: logo minúscula, texto ilegível, caixas sobrepostas, margens grandes.
> CSS completo em `references/design-tokens.md` (seção "Mobile — CSS Responsivo Completo").

**Resumo das correções:**
- **Logo**: 90px em tablet, 72px em celular (antes: 60px ilegível)
- **Fontes**: body 14px mínimo, parágrafos 0.88rem (antes: 0.93rem que encavalava)
- **Margens**: `padding: 1rem 0.75rem` em ≤500px (antes: 3rem que desperdiçava tela)
- **Grids**: TODOS → 1 coluna (KPI, SWOT, riscos, notícias, autores)
- **Capa**: `min-height: auto`, número decorativo hidden, footer empilhado
- **MAD colunas**: `flex-direction: column` forçado (antes: 3 colunas sobrepostas)
- **P(vitória)**: oculto em fases (muito estreito, poluía)
- **Banners**: altura reduzida (120px/100px vs 200px/180px)
- **Tabelas**: scroll horizontal com `-webkit-overflow-scrolling: touch`
- **Riscos**: `writing-mode` removido em ≤500px (vertical era ilegível)
- **Autores**: card 1 coluna centralizado em ≤500px

**Meta viewport obrigatório no `<head>`:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

---

## 8. SIDEBAR DECORATIVA

```html
<div class="sidebar-stripe"></div>
```

```css
.sidebar-stripe {
  position: fixed; left: 0; top: 0; bottom: 0; width: 5px;
  background: linear-gradient(to bottom, var(--gold), rgba(201,149,42,0.15), var(--gold));
  z-index: 200; pointer-events: none;
}
/* Ocultar no print: */
@media print { .sidebar-stripe { display: none !important; } }
```

---

## 9. WORKFLOW DE CRIAÇÃO (checklist rápido)

1. **Brief** → tema, candidato/ator, contexto, fontes disponíveis
2. **Definir veredicto** (Head do PUMA) — 1 frase, antes de escrever qualquer código
3. **Coletar imagens** → logo (PNG transparente), fotos da equipe, banners temáticos
4. **Processar logos** → remover fundo preto com PIL se necessário
5. **Codificar imagens** → base64, JPEG 88% para fotos, PNG para logos
6. **Escrever seções** → seguir `references/components.md`
7. **Injetar banners** estratégicos (Brasília na capa, mesa redonda no exec, etc.)
8. **MAD block** → sempre que houver auditoria/crise como ferramenta estratégica
9. **Validar checklist** → `references/checklist.md`
10. **Testar impressão** → Ctrl+P → Salvar como PDF

---

## 10. GERAÇÃO DE PDF (duas opções)

### Opção A: PDF via HTML (fidelidade visual 100%)

Script: `scripts/gerar_pdf.py`

```bash
# Playwright (recomendado — renderiza exatamente igual ao Chrome)
python scripts/gerar_pdf.py relatorio.html

# WeasyPrint (fallback sem browser, mais leve)
python scripts/gerar_pdf.py relatorio.html --engine weasy

# Customizações
python scripts/gerar_pdf.py relatorio.html -o meu_relatorio.pdf
python scripts/gerar_pdf.py relatorio.html --landscape
```

**Quando usar**: sempre que o relatório HTML já estiver pronto e validado. O PDF gerado preserva 100% do visual dark premium, fontes, cores e layout.

**Dependências**: `pip install playwright && python -m playwright install chromium` (ou `pip install weasyprint`)

### Opção B: PDF via LaTeX (tipografia profissional)

Template: `templates/relatorio_inteia.tex`

```bash
# Compilar com XeLaTeX (obrigatório para fontes customizadas)
xelatex relatorio_inteia.tex

# Ou com latexmk (compila quantas vezes precisar)
latexmk -xelatex relatorio_inteia.tex
```

**Quando usar**: quando precisar de PDF com tipografia acadêmica/profissional superior, ou quando o cliente exigir documento editável (LaTeX é mais fácil de editar que HTML). Também ideal para impressão em gráfica.

**O template inclui**:
- Fundo escuro (void #050608) em todas as páginas
- Sidebar dourada lateral em todas as páginas (TikZ)
- Cores INTEIA completas (13 cores definidas)
- Fontes: Cormorant Garamond (títulos), Outfit (corpo), JetBrains Mono (código/labels)
- Fallback automático para Latin Modern se fontes não estiverem instaladas
- Capa completa com grade decorativa, glow, chips, eyebrow
- Comandos prontos: `\chip{}`, `\chipgold{}`, `\chipred{}`, `\kpi{}{}{}`, `\inteiabox{}{}{}`, `veredicto (environment)`, `\pagesep{}`
- SWOT, KPI, caixas coloridas, veredicto — todos parametrizados

**Dependências**: MiKTeX ou TeX Live com XeLaTeX. Fontes opcionais: Cormorant Garamond, Outfit, JetBrains Mono (Google Fonts).

### Decisão rápida: qual PDF usar?

| Critério | HTML→PDF (Playwright) | LaTeX→PDF |
|----------|----------------------|-----------|
| Fidelidade visual | 100% idêntico ao browser | 95% (adaptação LaTeX) |
| Qualidade tipográfica | Boa | Excelente (microajustes) |
| Editável | Difícil | Fácil (.tex é texto) |
| Peso do PDF | Maior (imagens inline) | Menor |
| Ideal para | Entrega rápida, web-first | Gráfica, acadêmico, arquivo |

---

## 11. WORKFLOW COMPLETO DE ENTREGA

```
1. Gerar HTML standalone (skill principal)
     ↓
2. Validar checklist (references/checklist.md)
     ↓
3. Testar mobile (Chrome DevTools → Responsive)
     ↓
4. Gerar PDFs:
   ├── HTML→PDF:  python scripts/gerar_pdf.py relatorio.html
   └── LaTeX→PDF: xelatex relatorio_inteia.tex
     ↓
5. Entregar ao cliente:
   ├── relatorio.html   (interativo, links, dark mode)
   ├── relatorio.pdf     (HTML renderizado, visual exato)
   └── relatorio_tex.pdf (LaTeX, tipografia premium)
```

---

## ARQUIVOS DE REFERÊNCIA

- `references/design-tokens.md` — CSS completo (variáveis, classes, layout, **mobile responsivo**)
- `references/components.md` — HTML de todos os componentes + Bloco MAD
- `references/equipe.md` — 8 currículos globais completos da equipe INTEIA
- `references/checklist.md` — 45+ itens de validação final (inclui mobile e PDF)
- `references/metodologias.md` — 16 metodologias com output esperado
- `scripts/gerar_pdf.py` — Gerador HTML→PDF (Playwright ou WeasyPrint)
- `templates/relatorio_inteia.tex` — Template LaTeX dark premium completo
