# SKILL: Simulacao Eleitoral Avancada

> **Proposito**: Framework de simulacao eleitoral massiva com Iterative Proportional Fitting (IPF), benchmark PPE brasileiro, deteccao de vieses de modelo, predicao por Regiao Administrativa e simulacao multi-baseline. O motor preditivo de ORACLE turbinado.

---

## QUANDO USAR ESTA SKILL

- Pesquisa eleitoral com agentes sinteticos (POLARIS)
- Simulacao de 1o e 2o turno
- Analise de cenarios eleitorais alternativos
- Predicao por segmento demografico ou geografico
- Calibracao de vieses do modelo de IA
- Stress test de resultados eleitorais
- Validacao cruzada de pesquisas tradicionais
- ORACLE executa simulacao em larga escala

---

## MODULO 1: ITERATIVE PROPORTIONAL FITTING (IPF)

### Alinhar Amostra Sintetica com Dados Reais

O problema: agentes sinteticos podem ter distribuicao diferente da populacao real.
A solucao: IPF ajusta pesos de cada agente para que a amostra reflita a populacao.

```
IPF — CALIBRACAO DE AMOSTRA

DISTRIBUICOES-ALVO (Fonte: IBGE/TSE/CODEPLAN)
| Variavel | Categoria | Populacao Real | Amostra Bruta | Peso IPF |
|----------|-----------|---------------|---------------|----------|
| Genero | Masculino | 47.2% | [...] | [...] |
| Genero | Feminino | 52.8% | [...] | [...] |
| Idade | 16-24 | 18.3% | [...] | [...] |
| Idade | 25-34 | 22.1% | [...] | [...] |
| Idade | 35-44 | 19.7% | [...] | [...] |
| Idade | 45-59 | 23.4% | [...] | [...] |
| Idade | 60+ | 16.5% | [...] | [...] |
| Escolaridade | Fundamental | 28.4% | [...] | [...] |
| Escolaridade | Medio | 35.2% | [...] | [...] |
| Escolaridade | Superior | 36.4% | [...] | [...] |
| Renda | Ate 2 SM | 41.3% | [...] | [...] |
| Renda | 2-5 SM | 32.7% | [...] | [...] |
| Renda | 5-10 SM | 16.8% | [...] | [...] |
| Renda | 10+ SM | 9.2% | [...] | [...] |

CONVERGENCIA
Iteracoes: [N]
Erro maximo residual: [X]%
Status: [Convergiu|Nao convergiu — ajustar]

RESULTADO
Amostra calibrada: [N] agentes com pesos ajustados
Margem de erro (pos-IPF): [X]pp (IC 95%)
Efeito de design: [X]
```

### Variaveis de Calibracao por RA do DF

| RA | Populacao | % do DF | Amostra Necessaria |
|----|-----------|---------|-------------------|
| Plano Piloto | 221.223 | 7.3% | [N] agentes |
| Ceilandia | 432.927 | 14.3% | [N] agentes |
| Taguatinga | 222.598 | 7.4% | [N] agentes |
| Samambaia | 254.439 | 8.4% | [N] agentes |
| Aguas Claras | 161.184 | 5.3% | [N] agentes |
| [outras RAs] | [...] | [...] | [...] |

---

## MODULO 2: BENCHMARK PPE BRASILEIRO

### Questionario Padronizado para Pesquisa Eleitoral

Adaptacao do PPE (Pre-election Polling Evaluation) para o contexto brasileiro:

```
BENCHMARK PPE-BR — [ELEICAO]

BLOCO 1: INTENCAO DE VOTO (Espontanea + Estimulada)
1. "Se a eleicao fosse hoje, em quem voce votaria?" (espontanea)
2. "Dentre estes candidatos, em quem voce votaria?" (estimulada, lista)
3. "Em quem voce NAO votaria de jeito nenhum?" (rejeicao)
4. "Qual a probabilidade de voce mudar de voto ate a eleicao?" (1-10)

BLOCO 2: AVALIACAO DE GOVERNO
5. "Como voce avalia o governo atual?" (otimo/bom/regular/ruim/pessimo)
6. "Qual area esta melhor?" (saude/educacao/seguranca/economia/transporte)
7. "Qual area esta pior?" (idem)

BLOCO 3: TEMAS PRIORITARIOS
8. "Qual o principal problema da sua regiao?" (aberta)
9. "O que mais influencia seu voto?" (proposta/partido/candidato/religiao)
10. "Voce confia nas pesquisas eleitorais?" (sim/parcial/nao)

BLOCO 4: COMPORTAMENTO ELEITORAL
11. "Voce pretende votar nesta eleicao?" (sim/nao/indeciso)
12. "Voce ja definiu seu voto?" (sim/parcial/nao)
13. "Alguem influencia sua decisao de voto?" (familia/amigos/midia/religiao/ninguem)
14. "Por qual meio voce se informa sobre politica?" (TV/redes/WhatsApp/jornal/radio)

BLOCO 5: SEGUNDO TURNO
15-20. Simulacoes pareadas de 2o turno (todas combinacoes viaveis)

BLOCO 6: PERFIL (Demografico)
21-30. Genero, idade, escolaridade, renda, religiao, RA, tempo de residencia,
       cor/raca, estado civil, ocupacao
```

### Metricas de Validacao do Benchmark

| Metrica | O que Mede | Meta |
|---------|-----------|------|
| MAE (Mean Absolute Error) | Diferenca media entre previsao e resultado | <= 3.0pp |
| Bias Direcional | Tendencia sistematica para um lado | <= 1.0pp |
| Ranking Accuracy | Ordem correta dos candidatos | >= 90% |
| Winner Prediction | Acerto do vencedor | >= 95% |
| Coverage Rate (IC 95%) | Resultado dentro do intervalo | >= 93% |

---

## MODULO 3: DETECCAO E CORRECAO DE VIESES

### Vieses Comuns em Simulacao com LLM

| Vies | Descricao | Deteccao | Correcao |
|------|-----------|----------|----------|
| **Vies de Treinamento** | LLM reflete dados de treinamento (ex: mais dados de centros urbanos) | Comparar distribuicao com IBGE | IPF + oversampling de perfis sub-representados |
| **Vies de Acquiescencia** | Agente concorda demais com a pergunta | Medir taxa de "sim" vs "nao" | Perguntas invertidas (controle) |
| **Vies de Desejabilidade Social** | Agente da resposta "socialmente aceita" | Comparar com pesquisas reais anonimas | Prompt com garantia de anonimato |
| **Vies de Posicao** | Primeira opcao na lista e favorecida | Randomizar ordem das opcoes | Rodizio de ordem entre agentes |
| **Vies de Recencia** | Eventos recentes do treinamento distorcem | Comparar com dados pre-treino | Controlar por data de corte |
| **Vies de Centralidade** | Agentes tendem ao "meio-termo" | Medir variancia das respostas | Calibrar extremos com agentes radicais |
| **Vies Politico** | LLM pode ter orientacao politica implicita | Rodar com 3+ modelos e comparar | Ensemble multi-modelo + IPF |

### Protocolo de Deteccao

```
TESTE DE VIES — [PESQUISA]

1. TESTE DE INVERSAO
   Perguntar "Voce votaria em X?" vs "Voce NAO votaria em X?"
   Diferenca aceitavel: <= 5pp

2. TESTE DE ORDEM
   Rodar mesma pesquisa com lista A->Z e Z->A
   Diferenca aceitavel: <= 3pp

3. TESTE MULTI-MODELO
   Rodar com Opus, GPT-4o, Gemini Pro
   Convergencia aceitavel: <= 5pp entre modelos

4. TESTE DE ANCORAGEM
   Apresentar informacao previa vs sem contexto
   Medir influencia da ancoragem

5. TESTE DE EXTREMO
   Verificar se agentes "extremos" se comportam diferente de "moderados"
   Variancia esperada: > [X]

RESULTADO
Vieses detectados: [lista]
Correcoes aplicadas: [lista]
Confianca pos-correcao: [0.0-1.0]
```

---

## MODULO 4: PREDICAO POR REGIAO ADMINISTRATIVA

### Mapa Eleitoral do DF

```
MAPA ELEITORAL — [ELEICAO]
Amostra: [N] agentes | Margem: [X]pp | IC: 95%

| RA | Candidato A | Candidato B | Indecisos | Rejeicao A | Rejeicao B |
|----|------------|------------|-----------|-----------|-----------|
| Plano Piloto | [X]% | [Y]% | [Z]% | [W]% | [V]% |
| Ceilandia | [X]% | [Y]% | [Z]% | [W]% | [V]% |
| Taguatinga | [X]% | [Y]% | [Z]% | [W]% | [V]% |
| Samambaia | [X]% | [Y]% | [Z]% | [W]% | [V]% |
| [...] | [...] | [...] | [...] | [...] | [...] |

CLUSTERS IDENTIFICADOS
Cluster 1 (Fortaleza de A): [RAs] — [X]% de vantagem
Cluster 2 (Fortaleza de B): [RAs] — [X]% de vantagem
Cluster 3 (Battleground): [RAs] — Margem <= 5pp

SWING VOTERS
Total de indecisos: [N] agentes ([X]% da amostra)
Perfil predominante: [genero, idade, escolaridade, renda]
Maior concentracao: [RAs]
Sensibilidade a: [temas que mais movem indecisos]
```

---

## MODULO 5: SIMULACAO MULTI-BASELINE

### Testar Cenarios com Diferentes Contextos

```
MULTI-BASELINE — [ELEICAO]

BASELINE 1: SEM CONTEXTO
Pergunta crua, sem informacao previa
Resultado: A=[X]% | B=[Y]% | Outros=[Z]%

BASELINE 2: COM CONTEXTO FACTUAL
Informar realizacoes e problemas de cada candidato
Resultado: A=[X]% | B=[Y]% | Outros=[Z]%
Delta vs B1: A=[+-X]pp | B=[+-Y]pp

BASELINE 3: COM CONTEXTO EMOCIONAL
Incluir narrativas, historias, apelos
Resultado: A=[X]% | B=[Y]% | Outros=[Z]%
Delta vs B1: A=[+-X]pp | B=[+-Y]pp

BASELINE 4: COM PRESSAO SOCIAL
Informar pesquisas anteriores, "todo mundo votando em X"
Resultado: A=[X]% | B=[Y]% | Outros=[Z]%
Delta vs B1: A=[+-X]pp | B=[+-Y]pp (mede efeito manada)

BASELINE 5: COM CRISE
Simular evento negativo para A ou B
Resultado: A=[X]% | B=[Y]% | Outros=[Z]%
Delta vs B1: A=[+-X]pp | B=[+-Y]pp (mede resiliencia)

ANALISE DE SENSIBILIDADE
Fator mais influente: [contexto que mais moveu]
Candidato mais resiliente: [quem menos variou]
Ponto de vulnerabilidade: [cenario que mais prejudicou cada um]
```

---

## MODULO 6: SIMULACAO DE 2o TURNO

### Transferencia de Votos

```
SIMULACAO 2o TURNO — [CANDIDATO A vs CANDIDATO B]

VOTOS DO 1o TURNO
| Candidato | Votos 1o turno | % |
|-----------|---------------|---|
| A | [...] | [X]% |
| B | [...] | [Y]% |
| C (eliminado) | [...] | [Z]% |
| D (eliminado) | [...] | [W]% |

TRANSFERENCIA DE VOTOS
| De | Para A | Para B | Anula/Branco | Abstencao |
|----|--------|--------|-------------|-----------|
| C | [X]% | [Y]% | [Z]% | [W]% |
| D | [X]% | [Y]% | [Z]% | [W]% |
| Indecisos 1o turno | [X]% | [Y]% | [Z]% | [W]% |

RESULTADO 2o TURNO
A: [X]% (IC: [Y-Z]%)
B: [X]% (IC: [Y-Z]%)
Brancos/Nulos: [X]%
Abstencao estimada: [X]%

FATORES DECISIVOS
1. Rejeicao: quem tem menor rejeicao vence (A=[X]% vs B=[Y]%)
2. Transferencia de C: se for majoritariamente para A/B
3. Abstencao: se aumentar, beneficia quem (voto ideologico resiste)
```

---

## MODULO 7: STRESS TEST ELEITORAL

### Testar Limites dos Resultados

```
STRESS TEST — [PESQUISA]

CENARIO 1: Todos os indecisos vao para A
Resultado: A=[X]% | B=[Y]%
A vence? [sim|nao]

CENARIO 2: Todos os indecisos vao para B
Resultado: A=[X]% | B=[Y]%
B vence? [sim|nao]

CENARIO 3: Abstencao sobe 20pp
Quem perde mais? [A|B] (perda de [X]pp)

CENARIO 4: Evento negativo para lider (72h antes)
Impacto estimado: -[X]pp (baseado em precedentes)
Resultado: A=[X]% | B=[Y]%

CENARIO 5: Vies de modelo de 5pp
Se pesquisa superestima A em 5pp:
Resultado real estimado: A=[X]% | B=[Y]%

CONCLUSAO DO STRESS TEST
Resultado e robusto? [sim|parcial|nao]
Margem de seguranca: [X]pp (diferenca minima em todos cenarios)
Cenario mais perigoso para lider: [cenario N]
```

---

## EXEMPLOS PRATICOS

### Exemplo: Pesquisa Governador DF 2026
```
HELENA (ORACLE — POLARIS):
"Pesquisa com 1.015 agentes, calibrada via IPF com dados
CODEPLAN 2025. Margem 3.1pp (IC 95%).

1o Turno (estimulada):
A: 34.2% (IC: 31.1-37.3%)
B: 28.7% (IC: 25.6-31.8%)
C: 15.3% (IC: 12.2-18.4%)
Indecisos: 21.8%

Mapa por RA:
- Plano Piloto: A lidera (42% vs 31%)
- Ceilandia: B lidera (33% vs 27%) — maior colegio
- Aguas Claras: empate tecnico (30% vs 29%)

Vieses testados: 5/5 OK (inversao, ordem, multi-modelo,
ancoragem, extremo). Confianca: 0.87.

Stress test: A so perde se TODOS indecisos forem para B
E abstencao subir 15pp. Probabilidade: < 8%.

Recomendacao: foco em Ceilandia/Samambaia (battleground).
Cada ponto ali vale 2x mais que no Plano Piloto."
```

---

## INTEGRACAO COM DIVISOES

| Divisao | Papel na Simulacao Eleitoral |
|---------|------------------------------|
| ORACLE | **Lider** — executa simulacao e analise |
| ARES | Contexto politico e cenarios |
| HERMES | Testes de narrativa (baseline emocional) |
| SENTINEL | Validacao anti-manipulacao |
| MIDAS | Analise de custo/beneficio por regiao |

---

## REFERENCIAS

| Arquivo | Descricao |
|---------|-----------|
| `divisoes/oracle/` | Divisao ORACLE completa |
| `data/banco-eleitores-df.json` | 1.015 agentes sinteticos |
| `data/banco-regioes-administrativas-df.json` | 33 RAs do DF |

---

*Skill criada em: 2026-03-01*
*Mantida por: Igor Morais Vasconcelos — INTEIA*
