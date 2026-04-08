---
name: relatorio-inteia
description: "Transforma conteúdo bruto ou outputs de sistemas de análise em relatórios executivos profissionais padrão INTEIA. Usar quando o usuário solicitar relatório, documento profissional, formatação de análise, output HELENA, ou enviar dados desorganizados pedindo transformação em documento. Triggers: relatório, report, documento, formatar análise, HELENA, relatório INTEIA, relatório executivo, relatório de inteligência, transforma em relatório, formata esses dados."
---

# Relatório Profissional INTEIA

Gera documentos Word (.docx) seguindo identidade visual da INTEIA.

## Identidade

- **INTEIA**: Instituto Nacional de Tecnologia Estratégica e Inteligência Artificial
- **HELENA**: Heuristic Engine for Legislative and Electoral Neural Analysis
- **Pesquisador**: Igor Morais Vasconcelos

## Regra de Ouro

Página 1 autossuficiente: conclusão + 4 métricas + 3 cenários + 4 vetores + probabilidade geral.

## Estrutura (5 Páginas)

| Página | Conteúdo |
|--------|----------|
| 1 | Resumo Executivo (título, conclusão, métricas, cenários, vetores, probabilidade) |
| 2-4 | Análise Detalhada (rankings, stakeholders, insights, alertas, matriz risco) |
| 5 | Metodologia HELENA + Assinatura |

## Cores

```
NAVY: 0A1628 | GOLD: C9A227 | GRAY: 5A5A5A
GREEN: 2E7D32 (baixo) | ORANGE: F57C00 (médio) | RED: C62828 (alto)
```

## Caixas

| Tipo | Borda | Uso |
|------|-------|-----|
| CONCLUSÃO | dourado | Síntese |
| INSIGHT | azul | Descoberta |
| ALERTA | laranja | Risco |
| MITIGAÇÃO | roxo | Ação |

## Cabeçalho/Rodapé

**Cabeçalho**: INTEIA (azul+dourado) | Relatório de Inteligência | [Mês Ano]

**Rodapé**: INTEIA · Pesquisador Responsável: Igor Morais Vasconcelos · Documento Confidencial

## Implementação

1. Copiar `scripts/generate_report.js` para workspace
2. Adaptar objeto CONTENT com dados do usuário
3. Executar: `npm install docx && node generate_report.js`

Ver `references/componentes.md` para funções auxiliares (barras, tabelas, matrizes).

## Processo

1. Extrair conclusão (1 frase direta)
2. Identificar 4 métricas principais
3. Mapear cenários: favorável/neutro/desfavorável + probabilidades
4. Listar stakeholders com scores (1-10)
5. Definir 4 vetores estratégicos
6. Documentar metodologia e limitações
