# Design Tokens — Sistema INTEIA (Versão Final Validada)

## Variáveis CSS Completas

```css
:root {
  --void:      #050608;
  --obsidian:  #0a0b0f;
  --carbon:    #111318;
  --graphite:  #1a1d26;
  --slate:     #252832;
  --border:    rgba(255,255,255,0.06);
  --border2:   rgba(255,255,255,0.12);
  --gold:      #c9952a;
  --gold2:     #e8b84b;
  --gold3:     #f5d07a;
  --gold-dim:  rgba(201,149,42,0.15);
  --gold-glow: rgba(201,149,42,0.35);
  --crimson:   #c0392b;
  --crimson2:  #e74c3c;
  --emerald:   #1a7a4a;
  --emerald2:  #27ae60;
  --cobalt:    #1a4a8a;
  --cobalt2:   #2980b9;
  --amber:     #d68c1a;
  --text:      #eeeae0;
  --muted:     #8a8680;
  --dim:       #4a4845;
  --font-disp: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## CSS Base Obrigatório

```css
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--void);
  color: var(--text);
  line-height: 1.65;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
}
.doc { max-width: 1080px; margin: 0 auto; padding: 4rem 3rem; }
.section { margin-bottom: 5.5rem; }
.doc p { color: rgba(238,234,224,0.7); margin-bottom: 1rem; font-size: 0.93rem; font-weight: 300; line-height: 1.8; }
.doc strong { color: var(--text); font-weight: 600; }
```

## Capa — CSS

```css
.cover {
  min-height: 100vh;
  background:
    radial-gradient(ellipse 60% 80% at 100% 0%, rgba(201,149,42,0.10), transparent 60%),
    radial-gradient(ellipse 40% 40% at 0% 100%, rgba(192,57,43,0.07), transparent 50%),
    var(--obsidian);
  display: grid;
  grid-template-rows: auto 1fr auto;
  position: relative;
  overflow: hidden;
}
.cover-grid-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(201,149,42,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,149,42,0.035) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}
.cover-header {
  padding: 2rem 3.5rem;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--border);
  position: relative; z-index: 1;
}
.cover-logo-block { display: flex; align-items: center; gap: 1.25rem; }
.cover-logo-img {
  width: 135px; height: auto; max-width: 135px;
  object-fit: contain;
  filter: drop-shadow(0 0 28px rgba(201,149,42,0.65));
  display: block;
}
.cover-brand-name {
  font-family: var(--font-mono); font-size: 0.85rem;
  letter-spacing: 0.4em; text-transform: uppercase;
  color: var(--gold); display: block; line-height: 1;
}
.cover-brand-sub {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.2em; color: var(--muted);
  display: block; margin-top: 0.3rem;
}
.cover-stamp {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--crimson2); border: 1px solid var(--crimson2);
  padding: 0.3rem 0.85rem; opacity: 0.85;
}
.cover-body {
  padding: 4rem 3.5rem 3rem;
  display: flex; flex-direction: column; justify-content: center;
  position: relative; z-index: 1;
}
.cover-eyebrow {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 2rem;
  display: flex; align-items: center; gap: 1rem;
}
.cover-eyebrow::before { content: ''; width: 2rem; height: 1px; background: var(--gold); }
.cover-h1 {
  font-family: var(--font-disp);
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 600; line-height: 1.0;
  color: var(--text); margin-bottom: 0.5rem; letter-spacing: -0.02em;
}
.cover-h1 em { color: var(--gold); font-style: italic; }
.cover-h2 {
  font-family: var(--font-disp);
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 300; font-style: italic;
  color: var(--muted); line-height: 1.2; margin-bottom: 2.5rem;
}
.cover-rule { width: 80px; height: 2px; background: var(--gold); margin-bottom: 2rem; }
.cover-desc {
  font-size: 0.95rem; color: var(--muted); font-weight: 300;
  max-width: 600px; line-height: 1.75; margin-bottom: 2.5rem;
}
.cover-chips { display: flex; gap: 0.65rem; flex-wrap: wrap; }
.chip {
  font-family: var(--font-mono); font-size: 0.56rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--border2); color: var(--muted);
}
.chip.gold { border-color: rgba(201,149,42,0.5); color: var(--gold2); }
.chip.red  { border-color: rgba(192,57,43,0.5); color: #e87070; }
.cover-footer {
  padding: 1.5rem 3.5rem;
  border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
  position: relative; z-index: 1;
}
.cover-footer-left { display: flex; gap: 3rem; }
.cover-meta-item label {
  font-family: var(--font-mono); font-size: 0.52rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--dim); display: block; margin-bottom: 0.2rem;
}
.cover-meta-item span { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); }
.cover-number {
  font-family: var(--font-disp); font-size: 7rem; font-weight: 700;
  color: rgba(201,149,42,0.06); line-height: 1;
  position: absolute; right: 3.5rem; bottom: 2.5rem; pointer-events: none;
}
.brasilia-strip {
  width: 100%; height: 180px; object-fit: cover;
  object-position: center 40%; opacity: 0.55; display: block;
}
```

## Print Bar

```css
.print-bar {
  background: var(--carbon); border-bottom: 1px solid var(--border);
  padding: 0.65rem 1.5rem;
  display: flex; justify-content: flex-end; gap: 1rem; align-items: center;
  position: sticky; top: 0; z-index: 100;
}
.btn-print {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--gold);
  color: var(--gold); padding: 0.4rem 1rem; cursor: pointer;
  transition: all 0.2s;
}
.btn-print:hover { background: var(--gold); color: var(--void); }
```

## Seção Label + Título

```css
.sec-label {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.35em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 0.75rem;
  display: flex; align-items: center; gap: 1rem;
}
.sec-label::after { content: ''; flex: 1; height: 1px; background: var(--border2); }
.sec-title {
  font-family: var(--font-disp); font-size: 2.2rem; font-weight: 600;
  line-height: 1.15; color: var(--text); margin-bottom: 2rem; letter-spacing: -0.01em;
}
.sec-title em { color: var(--gold); font-style: italic; }
.h3-rule {
  font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--gold); margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem; border-bottom: 1px solid var(--border2);
}
```

## Exec Summary

```css
.exec {
  background:
    radial-gradient(ellipse 50% 80% at 100% 50%, rgba(201,149,42,0.07), transparent),
    var(--carbon);
  border: 1px solid rgba(201,149,42,0.2);
  border-left: 3px solid var(--gold);
  padding: 3rem 3.5rem; margin-bottom: 5rem;
  position: relative; overflow: hidden;
}
.exec::after {
  content: '16/16';
  font-family: var(--font-disp); font-size: 9rem; font-weight: 700;
  color: rgba(201,149,42,0.04);
  position: absolute; right: 1.5rem; bottom: -1rem;
  line-height: 1; pointer-events: none;
}
```

## Veredicto

```css
.verdict-block {
  border: 1px solid rgba(201,149,42,0.4);
  background: linear-gradient(135deg, rgba(201,149,42,0.055), transparent);
  padding: 2.5rem 3rem; margin: 2rem 0;
  position: relative; text-align: center;
}
.verdict-block::before {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 80px; height: 2px; background: var(--gold);
}
.verdict-tag {
  font-family: var(--font-mono); font-size: 0.55rem;
  letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 1rem;
}
.verdict-main {
  font-family: var(--font-disp); font-size: 2rem; font-weight: 600;
  color: var(--gold2); margin-bottom: 1rem; line-height: 1.2;
}
.verdict-flow {
  font-family: var(--font-mono); font-size: 0.63rem;
  color: var(--muted); line-height: 2; letter-spacing: 0.04em;
}
.verdict-stats { margin-top: 1.5rem; display: flex; justify-content: center; gap: 3rem; }
.verdict-stat-val {
  font-family: var(--font-disp); font-size: 2.5rem; font-weight: 600;
  color: var(--gold2); display: block; line-height: 1;
}
```

## Convergência

```css
.convergence {
  background: var(--graphite);
  border: 1px solid rgba(201,149,42,0.28);
  padding: 4rem 3.5rem; text-align: center; margin: 3rem 0;
  position: relative; overflow: hidden;
}
.convergence::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,149,42,0.055), transparent);
  pointer-events: none;
}
.conv-fraction {
  font-family: var(--font-disp);
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 700; color: var(--gold2); line-height: 1;
  position: relative; z-index: 1; letter-spacing: -0.04em;
}
.conv-label {
  font-family: var(--font-mono); font-size: 0.63rem;
  letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--muted); margin-top: 1rem; position: relative; z-index: 1;
}
.conv-methods {
  margin-top: 2rem; display: flex; flex-wrap: wrap;
  justify-content: center; gap: 0.4rem; position: relative; z-index: 1;
}
```

## Autores

```css
.authors-section {
  background: var(--carbon); border: 1px solid var(--border2);
  border-top: 2px solid var(--gold);
  padding: 3rem 3.5rem; margin-top: 5rem;
}
.author-card { display: grid; grid-template-columns: 110px 1fr; gap: 1.5rem; align-items: start; }
.author-name {
  font-family: var(--font-disp); font-size: 1.25rem; font-weight: 600;
  color: var(--text); margin-bottom: 0.2rem; line-height: 1.2;
}
.author-title {
  font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--gold); margin-bottom: 0.7rem;
}
.author-bio { font-size: 0.8rem; color: var(--muted); font-weight: 300; line-height: 1.7; }
.author-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.7rem; }
.author-tag {
  font-family: var(--font-mono); font-size: 0.48rem; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 0.18rem 0.5rem;
  border: 1px solid var(--border2); color: var(--dim);
}
.authors-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; }
```

## Rodapé

```css
.doc-footer {
  background: var(--carbon); border-top: 1px solid var(--border2);
  padding: 1.75rem 3.5rem;
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 5rem;
}
.footer-logo-block { display: flex; align-items: center; gap: 1rem; }
.footer-logo-img { width: 66px; height: auto; object-fit: contain; opacity: 0.88; }
.footer-logo-text { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.3em; color: var(--gold); }
.footer-meta { font-family: var(--font-mono); font-size: 0.52rem; letter-spacing: 0.1em; color: var(--dim); text-align: right; line-height: 1.8; }
```

---

## Mobile — CSS Responsivo Completo (OBRIGATÓRIO)

> Reescrito em 2026-03-23. Corrige: logo minúscula, texto ilegível, caixas sobrepostas, margens excessivas.

### Breakpoint 1: Tablets e celulares grandes (≤900px)

```css
@media (max-width: 900px) {
  /* === LAYOUT GERAL === */
  .doc { padding: 1.5rem 1rem; max-width: 100%; }
  .section { margin-bottom: 3rem; }
  .sidebar-stripe { display: none; }

  /* === CAPA === */
  .cover { min-height: auto; padding-bottom: 2rem; }
  .cover-header { padding: 1.25rem 1rem; flex-wrap: wrap; gap: 0.75rem; }
  .cover-logo-img { width: 90px !important; }
  .cover-brand-name { font-size: 0.75rem; letter-spacing: 0.3em; }
  .cover-brand-sub { font-size: 0.55rem; }
  .cover-stamp { font-size: 0.52rem; padding: 0.25rem 0.6rem; }
  .cover-body { padding: 2rem 1rem 1.5rem; }
  .cover-h1 { font-size: clamp(2rem, 7vw, 3rem); }
  .cover-h2 { font-size: clamp(1.1rem, 4vw, 1.6rem); margin-bottom: 1.5rem; }
  .cover-desc { font-size: 0.9rem; max-width: 100%; }
  .cover-chips { gap: 0.4rem; }
  .chip { font-size: 0.52rem; padding: 0.25rem 0.55rem; }
  .cover-footer { padding: 1rem; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
  .cover-footer-left { gap: 1.5rem; flex-wrap: wrap; }
  .cover-number { font-size: 4rem; right: 1rem; bottom: 1rem; }

  /* === SEÇÕES === */
  .sec-title { font-size: 1.6rem; margin-bottom: 1.25rem; }
  .h3-rule { font-size: 0.55rem; }

  /* === EXEC SUMMARY === */
  .exec { padding: 1.5rem 1.25rem; margin-bottom: 3rem; }
  .exec::after { font-size: 5rem; right: 0.5rem; }

  /* === VEREDICTO === */
  .verdict-block { padding: 1.5rem 1rem; }
  .verdict-main { font-size: 1.4rem; }
  .verdict-stats { flex-direction: column; gap: 1.25rem; align-items: center; }
  .verdict-stat-val { font-size: 2rem; }

  /* === GRIDS → 1 COLUNA === */
  .kpi-grid { grid-template-columns: 1fr !important; }
  .swot { grid-template-columns: 1fr !important; }
  .risk-grid { grid-template-columns: 1fr !important; }
  .news-grid { grid-template-columns: 1fr !important; }
  .authors-grid { grid-template-columns: 1fr !important; }

  /* === KPI === */
  .kpi { padding: 1.25rem 1rem; }
  .kpi-val { font-size: 1.8rem; }
  .kpi-lbl { font-size: 0.54rem; }

  /* === TABELAS === */
  .tbl-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 1rem -1rem; padding: 0 1rem; }
  table { min-width: 500px; }
  thead th { font-size: 0.5rem; padding: 0.6rem 0.8rem; }
  tbody td { font-size: 0.78rem; padding: 0.55rem 0.8rem; }

  /* === BARRAS === */
  .bar-name { font-size: 0.55rem; }
  .bar-val { font-size: 0.9rem; }

  /* === TIMELINE === */
  .timeline { padding-left: 1.75rem; }

  /* === FASES === */
  .phase { grid-template-columns: 50px 1fr; gap: 0 1rem; padding: 1.25rem 0; }
  .phase-num { font-size: 2.2rem; }
  .phase-prob { display: none; } /* Muito estreito para P(vitória) */
  .phase-title { font-size: 0.9rem; }

  /* === BLOCO MAD === */
  .mad-columns,
  div[style*="display:flex;gap:2rem"] { flex-direction: column !important; gap: 1rem !important; }

  /* === CONVERGÊNCIA === */
  .convergence { padding: 2.5rem 1.25rem; }
  .conv-fraction { font-size: clamp(3.5rem, 14vw, 6rem); }
  .conv-methods { gap: 0.3rem; }

  /* === AUTORES === */
  .authors-section { padding: 2rem 1.25rem; }
  .author-card { grid-template-columns: 80px 1fr; gap: 1rem; }
  .author-name { font-size: 1.1rem; }
  .author-bio { font-size: 0.78rem; }

  /* === RODAPÉ === */
  .doc-footer { padding: 1.25rem 1rem; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
  .footer-meta { text-align: left; }

  /* === PILLS === */
  .pills { gap: 0.35rem; }
  .pill { font-size: 0.5rem; padding: 0.22rem 0.6rem; }

  /* === BOXES === */
  .box { padding: 1rem 1.25rem; margin: 1.25rem 0; }

  /* === PULL-QUOTE === */
  .pull-quote p { font-size: 1.05rem; }

  /* === SVG TREE === */
  .section div[style*="overflow-x"] {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }
  .svg-scroll-hint { display: block !important; }

  /* === PRINT BAR === */
  .print-bar { padding: 0.5rem 1rem; }
  .btn-print { font-size: 0.52rem; padding: 0.35rem 0.75rem; }
}
```

### Breakpoint 2: Celulares pequenos (≤500px)

```css
@media (max-width: 500px) {
  /* === LAYOUT === */
  .doc { padding: 1rem 0.75rem; }
  body { font-size: 14px; line-height: 1.6; }
  .doc p { font-size: 0.88rem; line-height: 1.7; }

  /* === CAPA === */
  .cover-header { padding: 1rem 0.75rem; }
  .cover-logo-img { width: 72px !important; }
  .cover-body { padding: 1.5rem 0.75rem 1rem; }
  .cover-h1 { font-size: clamp(1.6rem, 8vw, 2.4rem); line-height: 1.05; }
  .cover-h2 { font-size: clamp(0.95rem, 4.5vw, 1.3rem); }
  .cover-desc { font-size: 0.85rem; }
  .cover-chips { gap: 0.3rem; }
  .chip { font-size: 0.48rem; padding: 0.2rem 0.45rem; }
  .cover-footer { padding: 0.75rem; }
  .cover-number { display: none; }

  /* === SEÇÕES === */
  .sec-label { font-size: 0.52rem; }
  .sec-title { font-size: 1.35rem; }
  .section { margin-bottom: 2.5rem; }

  /* === EXEC === */
  .exec { padding: 1.25rem 1rem; }
  .exec::after { display: none; }

  /* === VEREDICTO === */
  .verdict-block { padding: 1.25rem 0.75rem; }
  .verdict-main { font-size: 1.2rem; }
  .verdict-flow { font-size: 0.58rem; line-height: 1.8; }
  .verdict-stat-val { font-size: 1.7rem; }

  /* === KPI === */
  .kpi { padding: 1rem 0.75rem; }
  .kpi-val { font-size: 1.5rem; }

  /* === SWOT === */
  .sw-cell { padding: 1rem; }
  .sw-heading { font-size: 0.52rem; margin-bottom: 0.8rem; }
  .sw-item { font-size: 0.76rem; }

  /* === FASES === */
  .phase { grid-template-columns: 40px 1fr; }
  .phase-num { font-size: 1.8rem; }
  .phase-date { font-size: 0.52rem; }
  .phase-title { font-size: 0.85rem; }
  .phase-desc { font-size: 0.76rem; }

  /* === RISCOS === */
  .risk-item { grid-template-columns: 1fr; }
  .risk-level { writing-mode: horizontal-tb; transform: none; margin-bottom: 0.5rem; }

  /* === AUTORES === */
  .author-card { grid-template-columns: 1fr; text-align: center; }
  .author-card img { margin: 0 auto; }
  .author-tags { justify-content: center; }

  /* === CONVERGÊNCIA === */
  .convergence { padding: 2rem 0.75rem; }
  .conv-fraction { font-size: clamp(3rem, 16vw, 5rem); }

  /* === RODAPÉ === */
  .doc-footer { padding: 1rem 0.75rem; }
  .footer-logo-img { width: 50px; }

  /* === NOTÍCIAS GRID (inline style override) === */
  div[style*="grid-template-columns:1fr 1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }

  /* === BLOCO MAD COLUNAS (inline style override) === */
  div[style*="display:flex;gap:2rem"] {
    flex-direction: column !important;
    gap: 0.75rem !important;
  }

  /* === BANNERS === */
  div[style*="height:200px"] { height: 120px !important; }
  div[style*="height:180px"] { height: 100px !important; }

  /* === PRINT BAR === */
  .print-bar { padding: 0.4rem 0.75rem; }
  .btn-print { font-size: 0.48rem; padding: 0.3rem 0.6rem; }

  /* === TIMELINE === */
  .timeline { padding-left: 1.25rem; }
  .tl-item::before { left: -1.31rem; }

  /* === TABELAS === */
  table { min-width: 400px; }
  thead th { font-size: 0.48rem; padding: 0.5rem 0.6rem; }
  tbody td { font-size: 0.72rem; padding: 0.45rem 0.6rem; }
}
```

### Meta viewport (OBRIGATÓRIO no `<head>`)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```
