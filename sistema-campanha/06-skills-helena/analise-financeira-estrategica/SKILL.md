# SKILL: Analise Financeira Estrategica

> **Proposito**: Framework de analise financeira com Financial Chain-of-Thought, modelagem de cenarios, valuation, ROI, gestao de caixa e analise multi-risco. O cofre inteligente de MIDAS.

---

## QUANDO USAR ESTA SKILL

- Mestre avalia investimento, aquisicao ou parceria
- Analise de viabilidade de negocio ou projeto
- Modelagem financeira com cenarios (otimista/base/pessimista)
- Valuation de empresa, startup ou ativo
- Planejamento de capital e alocacao de recursos
- Analise de ROI de campanha politica ou marketing
- Negociacao de termos financeiros (equity, divida, hibrido)
- Projecao de receita da INTEIA
- MIDAS precisa de framework estruturado

---

## MODULO 1: FINANCIAL CHAIN-OF-THOUGHT (CoT)

### Raciocinio Sequencial para Analises Complexas

Em vez de pular para a conclusao, decompor em etapas verificaveis:

```
ANALISE FINANCEIRA — [TITULO]
Analista: Dra. Helena Strategos (MIDAS)
Data: [...]

PASSO 1: CONTEXTO
- O que esta sendo analisado? [...]
- Qual a pergunta do mestre? [...]
- Horizonte temporal: [curto|medio|longo prazo]

PASSO 2: COLETA DE DADOS
- Receita: R$ [...] (fonte: [...])
- Custos fixos: R$ [...] (fonte: [...])
- Custos variaveis: R$ [...] (fonte: [...])
- Investimento necessario: R$ [...] (fonte: [...])
- Taxa de desconto: [X]% (justificativa: [...])

PASSO 3: DECOMPOSICAO
[Quebrar o problema em componentes menores]
- Componente A: [calculo] = R$ [...]
- Componente B: [calculo] = R$ [...]
- Componente C: [calculo] = R$ [...]

PASSO 4: ANALISE POR COMPONENTE
[Para cada componente, avaliar sensibilidade]
- Se A variar +-20%: impacto de R$ [...] no resultado
- Se B variar +-20%: impacto de R$ [...] no resultado

PASSO 5: SINTESE
[Integrar componentes no resultado final]
- VPL: R$ [...]
- TIR: [X]%
- Payback: [N] meses
- Breakeven: R$ [...] de receita mensal

PASSO 6: RECOMENDACAO
[Decisao baseada nos dados]
- Investir / Nao investir / Negociar termos
- Justificativa em 2-3 linhas
```

---

## MODULO 2: MODELAGEM DE CENARIOS

### 3 Cenarios Obrigatorios

```
CENARIOS FINANCEIROS — [PROJETO]

PREMISSAS COMUNS
- Horizonte: [N] meses/anos
- Taxa de desconto: [X]%
- Inflacao: [X]%/ano

CENARIO PESSIMISTA (Probabilidade: [X]%)
- Receita: R$ [...] (-[X]% do base)
- Custos: R$ [...] (+[X]% do base)
- VPL: R$ [...]
- TIR: [X]%
- Payback: [N] meses
- Risco principal: [...]

CENARIO BASE (Probabilidade: [X]%)
- Receita: R$ [...]
- Custos: R$ [...]
- VPL: R$ [...]
- TIR: [X]%
- Payback: [N] meses

CENARIO OTIMISTA (Probabilidade: [X]%)
- Receita: R$ [...] (+[X]% do base)
- Custos: R$ [...] (-[X]% do base)
- VPL: R$ [...]
- TIR: [X]%
- Payback: [N] meses
- Alavanca principal: [...]

VPL ESPERADO (PONDERADO)
= (VPL_pess x Prob_pess) + (VPL_base x Prob_base) + (VPL_otim x Prob_otim)
= R$ [...]

DECISAO BASEADA EM CENARIOS
[Se VPL esperado > 0 E cenario pessimista e sobrevivivel → Investir]
```

---

## MODULO 3: VALUATION

### Metodos de Avaliacao

| Metodo | Quando Usar | Precisao |
|--------|-------------|----------|
| **DCF (Fluxo Descontado)** | Empresas com fluxo previsivel | Alta |
| **Multiplos** | Comparacao com empresas similares | Media |
| **Ativos Liquidos** | Liquidacao ou empresas de ativos | Alta |
| **Venture Capital** | Startups pre-receita | Baixa |
| **Opcoes Reais** | Projetos com flexibilidade | Media-Alta |

### Template DCF

```
VALUATION DCF — [EMPRESA]

PROJECAO DE FLUXO DE CAIXA LIVRE (FCF)
| Ano | Receita | EBITDA | Capex | FCF |
|-----|---------|--------|-------|-----|
| 1 | R$ [...] | R$ [...] | R$ [...] | R$ [...] |
| 2 | R$ [...] | R$ [...] | R$ [...] | R$ [...] |
| 3 | R$ [...] | R$ [...] | R$ [...] | R$ [...] |
| 4 | R$ [...] | R$ [...] | R$ [...] | R$ [...] |
| 5 | R$ [...] | R$ [...] | R$ [...] | R$ [...] |

WACC (Custo Medio Ponderado de Capital): [X]%
- Custo do equity: [X]% (CAPM: Rf + B x ERP)
- Custo da divida: [X]% (pos-imposto)
- Estrutura de capital: [X]% equity / [Y]% divida

VALOR TERMINAL
Metodo: [Gordon Growth | Exit Multiple]
Taxa de crescimento perpetuo: [X]%
Valor terminal: R$ [...]

VALOR DA EMPRESA (Enterprise Value)
= Soma FCF descontados + Valor terminal descontado
= R$ [...]

VALOR DO EQUITY
= Enterprise Value - Divida liquida
= R$ [...]

PRECO POR ACAO/QUOTA
= Valor do equity / No de acoes
= R$ [...]
```

### Template Multiplos

```
VALUATION POR MULTIPLOS — [EMPRESA]

EMPRESAS COMPARAVEIS
| Empresa | EV/EBITDA | P/L | EV/Receita |
|---------|-----------|-----|-----------|
| Comp 1 | [X]x | [X]x | [X]x |
| Comp 2 | [X]x | [X]x | [X]x |
| Comp 3 | [X]x | [X]x | [X]x |
| Mediana | [X]x | [X]x | [X]x |

APLICACAO A EMPRESA-ALVO
EBITDA da empresa: R$ [...]
EV estimado (mediana x EBITDA): R$ [...]
Desconto de liquidez (empresa fechada): [20-30]%
EV ajustado: R$ [...]
```

---

## MODULO 4: ANALISE DE ROI

### ROI de Investimento

```
ANALISE DE ROI — [INVESTIMENTO]

INVESTIMENTO TOTAL: R$ [...]
- Capital: R$ [...]
- Tempo (custo de oportunidade): R$ [...]
- Risco: [quantificado]

RETORNO ESPERADO
- Receita gerada: R$ [...] / [periodo]
- Economia gerada: R$ [...] / [periodo]
- Valor intangivel: [reputacao, rede, aprendizado]

ROI = (Retorno - Investimento) / Investimento x 100
ROI = [X]%

PAYBACK PERIOD: [N] meses

COMPARACAO COM ALTERNATIVAS
| Alternativa | Investimento | ROI | Payback | Risco |
|-------------|-------------|-----|---------|-------|
| Opcao A | R$ [...] | [X]% | [N] meses | [1-10] |
| Opcao B | R$ [...] | [X]% | [N] meses | [1-10] |
| Nao investir | R$ 0 | 0% | N/A | [custo da inacao] |
```

### ROI de Campanha Politica

```
ROI DE CAMPANHA — [CANDIDATO/PAUTA]

INVESTIMENTO EM CAMPANHA
- Marketing digital: R$ [...]
- Eventos: R$ [...]
- Equipe: R$ [...]
- Midia: R$ [...]
- TOTAL: R$ [...]

RETORNO ESPERADO
- Votos incrementais estimados: [N]
- Custo por voto: R$ [...]
- Comparacao com media nacional: R$ [...] (fonte: TSE)
- Custo por ponto percentual: R$ [...]

EFICIENCIA POR CANAL
| Canal | Investimento | Votos est. | Custo/voto |
|-------|-------------|-----------|-----------|
| WhatsApp | R$ [...] | [...] | R$ [...] |
| Radio | R$ [...] | [...] | R$ [...] |
| Eventos | R$ [...] | [...] | R$ [...] |
| Digital | R$ [...] | [...] | R$ [...] |

ALOCACAO OTIMA
[Redistribuir orcamento para canais com menor custo/voto]
```

---

## MODULO 5: GESTAO DE CAIXA

### Dashboard de Tesouraria

```
POSICAO DE CAIXA — [DATA]

SALDO ATUAL: R$ [...]

ENTRADAS PREVISTAS (proximos 30 dias)
| Data | Origem | Valor | Probabilidade |
|------|--------|-------|--------------|
| [...] | [...] | R$ [...] | [X]% |

SAIDAS PREVISTAS (proximos 30 dias)
| Data | Destino | Valor | Adiavel? |
|------|---------|-------|---------|
| [...] | [...] | R$ [...] | [sim|nao] |

FLUXO LIQUIDO PROJETADO: R$ [...]
SALDO PROJETADO (30 dias): R$ [...]

ALERTA DE CAIXA
[VERDE Saudavel | AMARELO Atencao | VERMELHO Critico]
Runway: [N] meses sem nova receita
```

---

## MODULO 6: ANALISE MULTI-RISCO

### 6 Dimensoes de Risco Financeiro

```
MAPA DE RISCO FINANCEIRO — [INVESTIMENTO/EMPRESA]

| Dimensao | Nivel | Descricao | Mitigacao |
|----------|-------|-----------|-----------|
| Mercado | [1-10] | [volatilidade, demanda] | [...] |
| Credito | [1-10] | [contraparte, inadimplencia] | [...] |
| Liquidez | [1-10] | [conversibilidade, prazo] | [...] |
| Operacional | [1-10] | [execucao, processos] | [...] |
| Regulatorio | [1-10] | [mudanca de regras] | [...] |
| Reputacional | [1-10] | [imagem, percepcao] | [...] |

RISCO AGREGADO: [1-10] (media ponderada)

STRESS TEST
- Cenario de crise (2008-like): impacto de [X]% no valor
- Cenario regulatorio adverso: impacto de [X]% no custo
- Cenario de liquidez: [N] dias para converter em caixa

COBERTURA DE RISCO
- Seguro: [sim|nao] — Cobertura: R$ [...]
- Hedge: [sim|nao] — Instrumento: [...]
- Reserva: R$ [...] — Cobertura de [N] meses
```

---

## MODULO 7: PROJECAO DE RECEITA INTEIA

### Modelo Financeiro do Negocio

```
PROJECAO INTEIA — [PERIODO]

CLIENTES POR PLANO
| Mes | Elite (R$30k) | Premium (R$15k) | Essencial (R$5k) | MRR |
|-----|---------------|-----------------|-------------------|-----|
| 1 | [...] | [...] | [...] | R$ [...] |
| 3 | [...] | [...] | [...] | R$ [...] |
| 6 | [...] | [...] | [...] | R$ [...] |
| 12 | [...] | [...] | [...] | R$ [...] |

CHURN: [X]%/mes
LTV (por plano): Elite = R$ [...] | Premium = R$ [...] | Essencial = R$ [...]
CAC: R$ [...] (estimativa baseada em [metodo])
LTV/CAC: [X]x (meta: > 3x)

CUSTOS OPERACIONAIS
- OmniRoute: R$ 0 (assinaturas existentes)
- VPS: R$ [X]/mes (escalavel)
- WhatsApp API: R$ [X]/cliente/mes
- Outros: R$ [X]/mes
- TOTAL: R$ [X]/mes

MARGEM BRUTA: [X]%
LUCRO OPERACIONAL MENSAL (Mes 12): R$ [...]
ARR (Mes 12): R$ [...]
```

---

## EXEMPLOS PRATICOS

### Exemplo 1: Avaliacao de Aquisicao
```
MESTRE: "Querem R$ 8M pela empresa. Vale a pena?"

HELENA (MIDAS):
"Financial CoT:

Passo 1: Faturamento declarado R$ 12M. Estrutura operacional
sugere R$ 7-8M real.

Passo 2: EBITDA estimado: R$ 1.5M (margem 19%).
Multiplo pedido: 8M / 1.5M = 5.3x EBITDA.
Mediana do setor: 4.2x. Estao pedindo 26% acima do mercado.

Passo 3: DCF com premissas conservadoras:
VPL (WACC 15%): R$ 5.8M.
Gap: R$ 2.2M entre preco pedido e valor justo.

Cenario pessimista: VPL = R$ 3.1M (perda de R$ 4.9M).
Cenario otimista: VPL = R$ 9.2M (ganho de R$ 1.2M).
VPL esperado ponderado: R$ 5.4M.

Recomendacao: oferecer R$ 5.5M (desconto de 31%).
Se nao aceitarem, passar. Achei 3 alternativas mais baratas."
```

### Exemplo 2: ROI de Campanha
```
MESTRE: "Vale investir R$ 500k em marketing digital?"

HELENA (MIDAS + ORACLE):
"Analisei custo por voto historico no DF:
- Media: R$ 38/voto (fonte: TSE 2022)
- Seu benchmark 2024: R$ 29/voto (12% melhor que media)

R$ 500k em digital → estimativa: 14.000-17.000 votos incrementais
Custo por voto estimado: R$ 29-35
Custo por ponto percentual: R$ 42k

Comparacao:
- Radio: R$ 45/voto (29% mais caro)
- Eventos: R$ 52/voto (48% mais caro)
- WhatsApp: R$ 18/voto (38% mais barato)

Recomendacao: Realocar 40% de digital para WhatsApp.
ROI sobe 23%. Votos incrementais: 19.000-22.000.
Economia: R$ 130k com resultado melhor."
```

---

## INTEGRACAO COM DIVISOES

| Divisao | Papel na Analise Financeira |
|---------|----------------------------|
| MIDAS | **Lider** — modelagem e analise financeira |
| ORACLE | Dados de mercado e pesquisa para projecoes |
| THEMIS | Implicacoes tributarias e regulatorias |
| ARES | Contexto competitivo e oportunidades |
| SENTINEL | Risco de contraparte e fraude |

---

## REFERENCIAS

| Arquivo | Descricao |
|---------|-----------|
| `divisoes/midas/` | Divisao MIDAS completa |
| `comercial/precos.md` | Modelo de precos INTEIA |
| `config/limites-planos.json` | Limites por plano comercial |

---

*Skill criada em: 2026-03-01*
*Mantida por: Igor Morais Vasconcelos — INTEIA*
