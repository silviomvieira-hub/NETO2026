# Guia de Logos INTEIA — Relatórios de Inteligência

> 11 logos disponíveis (3 originais + 8 novas variantes). Escolher conforme contexto.

## Catálogo Completo

### Escudos Simples (ícone, favicon, inline)

| Arquivo | Descrição | Fundo | Uso Ideal |
|---------|-----------|-------|-----------|
| `escudo-flat-transparente.png` | Escudo 2D flat, cérebro neural dourado, borda dourada lisa | Transparente | **Favicon, ícone app, email, assinatura digital, watermark** |
| `escudo-3d-premium-transparente.png` | Escudo 3D metálico, cérebro neural dourado, borda grossa brilhante | Transparente | **Header de relatório dark, sobreposição em banners, avatar premium** |
| `escudo-3d-dark-neon.png` | Escudo flat dark com cérebro amarelo (nós grandes), fundo escuro gradiente | Escuro | **Relatórios dark mode, fundo #050608, cards de inteligência** |

### Brasões Completos (capa, header hero, impressão)

| Arquivo | Descrição | Fundo | Uso Ideal |
|---------|-----------|-------|-----------|
| `brasao-completo-transparente.png` | Brasão com louros+coroa+espada+cetro, texto "INTEIA Inteligência Estratégica" | Transparente | **Capa de relatório, LaTeX, sobreposição em qualquer fundo** |
| `brasao-completo-fundo-cinza.png` | Brasão completo com glow dourado, texto "Inteligencia Estrategica" (sem acento) | Cinza | **Impressão em papel, fundos claros, apresentações** |
| `brasao-completo-v1-fundo-cinza.png` | Variante v1 do brasão (espada+cetro, glow mais sutil) | Cinza | **Alternativa para impressão, quando v2 for muito brilhante** |
| `brasao-completo-v2-fundo-olive.png` | Brasão com acentos corretos ("Inteligéncia Estratégica"), fundo olive/verde | Olive | **Relatórios com fundo alternativo, tema militar/estratégico** |
| `brasao-ornamental-barroco.png` | Moldura barroca elaborada, louros+espada+pena+fita, texto na fita inferior | Cinza gradiente | **Capas premium, relatórios formais, documentos jurídicos, propostas comerciais** |

### Logos Originais (já existiam na skill)

| Arquivo | Descrição | Localização |
|---------|-----------|-------------|
| `logo_inteia.png` | Logo original do pacote skill | `assets/` |
| `logo_inteia_original.png` | Logo original sem processamento | `assets/` |
| `logo_inteia_transparent.png` | Logo com fundo removido (PIL) | `assets/` |

---

## Decisão Rápida: Qual Logo Usar?

| Contexto | Logo Recomendada |
|----------|-----------------|
| **Capa de relatório HTML (dark)** | `escudo-3d-premium-transparente.png` |
| **Capa de relatório HTML (claro)** | `brasao-completo-fundo-cinza.png` |
| **Capa LaTeX** | `brasao-completo-transparente.png` |
| **Header/sidebar do relatório** | `escudo-flat-transparente.png` (pequeno) |
| **Footer do relatório** | `escudo-flat-transparente.png` ou `logo_inteia_transparent.png` |
| **Impressão A4** | `brasao-completo-fundo-cinza.png` |
| **Proposta comercial** | `brasao-ornamental-barroco.png` |
| **Relatório jurídico** | `brasao-ornamental-barroco.png` |
| **Favicon / ícone** | `escudo-flat-transparente.png` |
| **Avatar chat / bot** | `escudo-3d-dark-neon.png` |
| **WhatsApp / redes sociais** | `escudo-3d-premium-transparente.png` |
| **Watermark em página** | `brasao-completo-transparente.png` (opacity 0.05) |
| **Email / assinatura** | `escudo-flat-transparente.png` |
| **Apresentação PowerPoint** | `brasao-ornamental-barroco.png` |

## Regras de Uso

1. **SEMPRE usar PNG** — nunca JPEG para logos (perde transparência)
2. **Relatórios dark**: preferir logos com fundo transparente ou escuro
3. **Impressão**: preferir logos com fundo cinza (já otimizado para papel)
4. **Inline em HTML**: converter para base64 com `base64 -w0 arquivo.png`
5. **Tamanhos recomendados**:
   - Capa: `width: 200-250px`
   - Header: `width: 80-120px`
   - Footer: `width: 60-80px`
   - Favicon: `width: 32px`
   - Watermark: `width: 400px; opacity: 0.04`
