# Arsenal Estatistico — Guia de Selecao de Metodo

## Arvore de Decisao: Qual Metodo Usar?

### Comparar grupos?
- 2 grupos, variavel categorica → Qui-quadrado / Teste exato de Fisher
- 2 grupos, variavel continua, normal → Teste t de Student
- 2 grupos, variavel continua, nao-normal → Mann-Whitney U
- 3+ grupos, continua, normal → ANOVA + post-hoc Tukey
- 3+ grupos, continua, nao-normal → Kruskal-Wallis
- Medidas repetidas → ANOVA de medidas repetidas / Friedman

### Prever resultado?
- Desfecho binario (sim/nao) → Regressao logistica
- Desfecho continuo → Regressao linear multipla
- Desfecho ordinal → Regressao ordinal
- Muitas variaveis, predicao → XGBoost / Random Forest
- Serie temporal → ARIMA / Prophet / LSTM

### Agrupar/Segmentar?
- Sem hipotese previa → K-means / DBSCAN
- Com hipotese teorica → Analise de Perfil Latente (LPA)
- Hierarquico → Clustering hierarquico (dendrograma)

### Reduzir dimensoes?
- Variaveis continuas → PCA (Analise de Componentes Principais)
- Construto latente → Analise Fatorial Exploratoria/Confirmatoria

### Validar instrumento?
- Consistencia interna → Alfa de Cronbach + Omega de McDonald
- Estrutura fatorial → AFE (explorar) → AFC (confirmar)
- Confiabilidade teste-reteste → CCI

### Simular cenarios?
- Incerteza nos parametros → Monte Carlo (10.000+ iteracoes)
- Estimativa robusta → Bootstrap (1.000+ reamostras)
- Interacao estrategica → **Teoria dos Jogos** (ver abaixo)

### Modelar interacao estrategica? (Teoria dos Jogos)

**Referencia completa**: [reference/teoria-dos-jogos.md](teoria-dos-jogos.md)

- 2 jogadores, decisao simultanea → **Equilibrio de Nash** (forma normal)
- 2 jogadores, decisao sequencial → **Stackelberg** / Inducao Retroativa
- Cooperar ou trair, interacao unica → **Dilema do Prisioneiro**
- Cooperar ou trair, repetido → **Tit-for-Tat** / Folk Theorem
- Quem cede primeiro → **Chicken Game** (Brinksmanship)
- Cooperacao arriscada → **Caca ao Cervo** (Stag Hunt)
- Soma fixa entre 2 → **Jogo de Soma Zero** (Minimax)
- Formacao de aliancas → **Valor de Shapley** / Nucleo (Core)
- Poder de voto real → **Indice de Banzhaf** / Shapley-Shubik
- Coalizao minima para vencer → **Minimum Winning Coalition** (Riker)
- Informacao assimetrica → **Jogo Bayesiano** / Sinalizacao (Spence)
- Comunicacao sem custo → **Cheap Talk** (Crawford-Sobel)
- Negociacao bilateral → **Nash Bargaining** / Rubinstein
- Poder de saida na negociacao → **Analise BATNA**
- Disputa por recurso → **Leiloes** (1o preco, Vickrey, All-Pay)
- Eleicao como disputa → **All-Pay Auction** (todos gastam, 1 vence)
- Posicionamento politico → **Hotelling** / Eleitor Mediano (Downs)
- Numero de competidores viavel → **Lei de Duverger**
- Controle de pauta → **Agenda Setting** (McKelvey)
- Evolucao de estrategias → **ESS** (Maynard Smith) / Hawk-Dove
- Comportamento real (nao racional) → **Ultimatum** / Trust Game / Beauty Contest

### Analisar texto?
- Sentimento → NLP com classificador de valencia
- Topicos → LDA (Latent Dirichlet Allocation)
- Frequencia → TF-IDF + Word Clouds
- Significado → Analise Tematica (Braun & Clarke)

## Regras de Ouro

1. Sempre reportar tamanho de efeito, nao apenas p-valor
2. Intervalos de confianca de 95% como padrao
3. Correcao de Bonferroni para comparacoes multiplas
4. Reportar poder estatistico quando relevante
5. Nao pescar p-valores (p-hacking) — definir hipoteses antes
6. Graficos com eixos rotulados, escala coerente e legenda clara
7. Tabelas em formato APA/ABNT conforme contexto

## Aplicacao por Dominio

### Para Cursos/Produtos INTEIA
| Ferramenta | Aplicacao |
|-----------|-----------|
| Teste de proporcoes | "X% preferem formato ao vivo vs gravado" |
| Qui-quadrado | Validar se amostra reflete publico-alvo |
| Regressao logistica | Prever quais atributos predizem compra |
| NLP sentimento | Analisar feedback |
| K-means | Segmentar tipos de aluno |
| Monte Carlo | Projetar receita em cenarios |

### Para Pesquisa Eleitoral
| Ferramenta | Aplicacao |
|-----------|-----------|
| ARIMA/Prophet | Previsao de tendencias com sazonalidade |
| PCA | Reduzir 60+ atributos em fatores |
| XGBoost | Prever intencao de voto |
| LDA + Word Clouds | Temas dominantes em discursos |
| **Eleitor Mediano + Hotelling** | Posicionamento ideal dos candidatos no espectro |
| **All-Pay Auction** | Modelar gasto de campanha e desgaste |
| **Banzhaf + Shapley** | Poder REAL de cada partido na CLDF/Camara |
| **Beauty Contest** | Efeito manada, voto util, pesquisa como profecia |
| **Dilema do Prisioneiro Repetido** | Estabilidade de coalizoes eleitorais |
| **Sinalizacao (Spence)** | Credibilidade de promessas de campanha |
| **MWC (Riker)** | Coalizao minima para governabilidade |
| **Voto Estrategico** | Detectar transferencia de votos entre candidatos |
| **Chicken Game** | Impasses entre candidatos (desistir ou manter?) |
| **Agenda Setting** | Poder de quem controla a pauta legislativa |

### Para Relatorios de Inteligencia
| Ferramenta | Aplicacao |
|-----------|-----------|
| Analise Tematica | Padroes em dados qualitativos |
| Grounded Theory | Construir teoria emergente |
| Analise de Discurso | Construcoes de poder na linguagem |
| Bootstrap | Intervalos de confianca robustos |
| Bayesiana | Atualizar probabilidades com novos dados |

## Monte Carlo — Projecao de Receita

Script disponivel: `scripts/monte_carlo_receita.py`

```bash
python scripts/monte_carlo_receita.py --preco 997 --iteracoes 10000
python scripts/monte_carlo_receita.py --preco 997 --conversao_min 0.03 --conversao_max 0.12 --trafego_min 500 --trafego_max 5000 --meses 6 --iteracoes 10000 --output resultado.json
```

Output: cenarios pessimista (p5), base (p50), otimista (p95), probabilidades de atingir metas.
