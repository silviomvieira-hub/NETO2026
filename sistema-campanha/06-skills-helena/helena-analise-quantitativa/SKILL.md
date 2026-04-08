# Skill: Helena — Analise Quantitativa e Qualitativa

> Usar quando Helena precisar executar analises estatisticas, simulacoes, testes de hipotese ou analises qualitativas profundas.

## Quando Usar
- Perguntas que exigem calculo: "qual a probabilidade de...", "simule...", "projete..."
- Necessidade de validacao estatistica rigorosa
- Cruzamento de dados complexos entre multiplas variaveis
- Analise de sentimento, tematica ou de discurso

## Arsenal Quantitativo

### Testes Estatisticos
| Teste | Quando Usar | Implementacao |
|-------|-------------|---------------|
| Chi-quadrado | Distribuicoes categoricas vs esperado | `scipy.stats.chisquare` |
| T-test | Comparar medias entre 2 grupos | `scipy.stats.ttest_ind` |
| ANOVA | Comparar medias entre 3+ grupos | `scipy.stats.f_oneway` |
| Mann-Whitney U | Comparar medianas (nao-parametrico) | `scipy.stats.mannwhitneyu` |
| Kolmogorov-Smirnov | Testar distribuicao | `scipy.stats.ks_2samp` |
| Fisher Exato | Tabelas 2x2 com n pequeno | `scipy.stats.fisher_exact` |
| Teste de Proporcoes | Comparar proporcoes | `statsmodels.stats.proportions_ztest` |

### Regressoes
| Tipo | Quando Usar |
|------|-------------|
| Linear | Prever valor continuo (ex: renda vs voto) |
| Logistica | Prever binario (vota/nao vota) |
| Multinomial | Prever categorias (candidato A/B/C) |
| Ridge/Lasso | Com multicolinearidade |
| Quantilica | Mediana em vez de media |

### Simulacoes
| Metodo | Quando Usar |
|--------|-------------|
| Monte Carlo | Estimar distribuicoes de probabilidade (10.000+ iteracoes) |
| Bootstrap | Estimar intervalos de confianca sem premissas parametricas |
| Simulacao de cenarios | Testar "e se" com combinacoes de variaveis |

### Series Temporais
| Modelo | Quando Usar |
|--------|-------------|
| ARIMA | Previsao com tendencia e sazonalidade |
| GARCH | Volatilidade (financeiro, politico) |
| Prophet | Previsao com feriados e eventos |
| Holt-Winters | Suavizacao exponencial |

### Machine Learning
| Algoritmo | Quando Usar |
|-----------|-------------|
| K-means | Segmentar grupos nao supervisionados |
| DBSCAN | Clusters de formato irregular |
| PCA | Reduzir dimensionalidade |
| Random Forest | Classificacao/importancia de variaveis |
| XGBoost | Previsao de alta performance |

### NLP
| Tecnica | Quando Usar |
|---------|-------------|
| Analise de sentimento | Classificar opiniao pos/neg/neutro |
| TF-IDF + Word Cloud | Identificar temas frequentes |
| Topic Modeling (LDA) | Descobrir topicos latentes |
| Named Entity Recognition | Extrair nomes, locais, organizacoes |

## Arsenal Qualitativo

### Metodos
| Metodo | Quando Usar |
|--------|-------------|
| Analise Tematica | Identificar temas recorrentes em respostas abertas |
| Grounded Theory | Construir teoria a partir dos dados (bottom-up) |
| Analise de Discurso | Entender linguagem, poder, ideologia |
| Analise de Conteudo | Quantificar categorias em texto |
| Triangulacao | Cruzar dados quantitativos + qualitativos + teoria |

### Frameworks de Analise
| Framework | Quando Usar |
|-----------|-------------|
| SWOT | Forcas, fraquezas, oportunidades, ameacas |
| PESTEL | Politico, economico, social, tecnologico, ecologico, legal |
| Porter 5 Forcas | Competicao em mercado |
| Stakeholder Mapping | Mapear poder e interesse |
| Teoria dos Jogos | Decisoes estrategicas com multiplos atores |
| Cenarios Prospectivos | Otimista, base, pessimista com probabilidades |

## Validacao de Resultados

### Checklist de Qualidade
- [ ] Tamanho amostral adequado (n >= 30 para parametricos)
- [ ] Premissas do teste verificadas (normalidade, homocedasticidade)
- [ ] p-valor reportado com interpretacao
- [ ] Intervalo de confianca de 95%
- [ ] Tamanho do efeito (Cohen's d, Cramer's V)
- [ ] Resultados fazem sentido logico
- [ ] Compativeis com realidade empirica
- [ ] Previsoes extremas calibradas (clamp 1-99%)

## Integracao com POLARIS

```python
from backend.sdk.polaris.analysis.quantitative import QuantitativeAnalyzer
from backend.sdk.polaris.analysis.qualitative import QualitativeAnalyzer
from backend.sdk.polaris.analysis.statistical import StatisticalValidator

quanti = QuantitativeAnalyzer()
quali = QualitativeAnalyzer()
validator = StatisticalValidator()

# Executar analise completa
resultados_quanti = quanti.analisar(dados_pesquisa)
resultados_quali = quali.analisar(respostas_abertas)
validacao = validator.validar(resultados_quanti)
```

## Saida Esperada
- Numeros com intervalos de confianca
- Tabelas formatadas em markdown
- Interpretacao em linguagem acessivel
- Graficos sugeridos (descricao para o frontend renderizar)
- Alertas se dados insuficientes ou premissas violadas
