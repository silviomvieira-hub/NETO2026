# Teoria dos Jogos — Arsenal Completo Helena Strategos

> Ferramental para modelar interacoes estrategicas onde o resultado de cada agente
> depende das escolhas dos outros. Helena usa Teoria dos Jogos como FERRAMENTA DE DECISAO,
> nao como exercicio academico. Cada modelo abaixo tem aplicacao direta nos dominios INTEIA.

## Arvore de Decisao: Qual Modelo Usar?

```
SITUACAO → MODELO
│
├─ Dois jogadores competem por recurso?
│  ├─ Ambos decidem simultaneamente → Jogo de Forma Normal (Nash)
│  ├─ Um decide antes do outro → Stackelberg (lider-seguidor)
│  └─ Resultado fixo dividido entre dois → Jogo de Soma Zero
│
├─ Cooperar ou trair?
│  ├─ Interacao unica → Dilema do Prisioneiro
│  ├─ Interacoes repetidas → Tit-for-Tat / Folk Theorem
│  └─ Cooperacao necessaria mas arriscada → Caca ao Cervo (Stag Hunt)
│
├─ Quem cede primeiro?
│  ├─ Confronto direto → Chicken Game (Brinksmanship)
│  └─ Desgaste progressivo → Guerra de Atrito (War of Attrition)
│
├─ Formacao de aliancas/coalizoes?
│  ├─ Dividir ganhos de forma justa → Valor de Shapley
│  ├─ Coalizao estavel → Nucleo (Core)
│  ├─ Poder de voto → Indice de Banzhaf / Shapley-Shubik
│  └─ Coalizao minima vencedora → Minimum Winning Coalition
│
├─ Informacao assimetrica?
│  ├─ Quem sabe mais quer sinalizar → Sinalizacao (Spence)
│  ├─ Quem nao sabe quer extrair → Screening / Mecanismo
│  ├─ Fala sem custo → Cheap Talk
│  └─ Decisao sob incerteza → Jogo Bayesiano
│
├─ Negociacao / divisao?
│  ├─ Acordo unico → Nash Bargaining Solution
│  ├─ Ofertas alternadas → Modelo de Rubinstein
│  └─ Poder de saida → Analise BATNA (Best Alternative)
│
├─ Leilao / disputa por recurso?
│  ├─ Quem da mais leva → Leilao de 1o preco (selado)
│  ├─ Pagar 2o maior lance → Leilao Vickrey (2o preco)
│  ├─ Todos pagam, so 1 ganha → All-Pay Auction (eleicoes!)
│  └─ Desenho de regra otima → Leilao otimo (Myerson)
│
├─ Comportamento de massa / evolucao?
│  ├─ Estrategia estavel na populacao → ESS (Maynard Smith)
│  ├─ Como estrategias se espalham → Dinamica do Replicador
│  └─ Agressivo vs Pacifico → Hawk-Dove Game
│
├─ Decisao sequencial (arvore)?
│  ├─ Resolver de tras pra frente → Inducao Retroativa
│  └─ Equilibrio em cada subjogo → Equil. Perfeito em Subjogos
│
└─ Posicionamento (politico/mercado)?
   ├─ Onde se posicionar no espectro → Modelo de Hotelling
   ├─ Posicao otima para vencer → Teorema do Eleitor Mediano
   └─ Numero de competidores viavel → Lei de Duverger
```

---

## SECAO 1: JOGOS CLASSICOS (Forma Normal)

### 1.1 Equilibrio de Nash

**O que e**: Combinacao de estrategias onde nenhum jogador ganha mudando sozinho.

**Quando usar**: Qualquer interacao estrategica simultanea. Base de TUDO.

**Aplicacao Helena**:
- Politica: dois candidatos escolhendo posicao ideologica
- Negocios: duas empresas decidindo preco simultaneamente
- Juridico: autor e reu decidindo se vao a julgamento ou acordo

**Como calcular**:
1. Montar matriz de payoffs
2. Para cada jogador: marcar melhor resposta a cada estrategia do outro
3. Nash = celula onde AMBOS estao na melhor resposta

**Exemplo (Campanha Eleitoral)**:
```
                 Candidato B
                 Moderado    Radical
Candidato A
Moderado      | (55,45)  |  (60,40) |
Radical       | (40,60)  |  (50,50) |

Nash: (Moderado, Moderado) → nenhum ganha mudando sozinho
Insight Helena: ambos convergem ao centro — Teorema do Eleitor Mediano em acao
```

### 1.2 Dilema do Prisioneiro

**O que e**: Dois jogadores ganham mais cooperando, mas a tentacao de trair e forte.

**Quando usar**: Aliancas politicas, acordos comerciais, cooperacao entre partidos.

**Payoffs classicos**:
```
              Jogador B
              Cooperar   Trair
Jogador A
Cooperar    | (3,3)   |  (0,5) |
Trair       | (5,0)   |  (1,1) |

Equilibrio Nash: (Trair, Trair) → pior para ambos
Paradoxo: racionalidade individual leva a resultado coletivo pessimo
```

**Aplicacoes reais**:
| Contexto | Cooperar | Trair |
|----------|----------|-------|
| Coalizao partidaria | Manter apoio | Abandonar aliado |
| Acordo comercial | Cumprir contrato | Quebrar clausula |
| Campanha | Nao atacar adversario | Campanha negativa |
| Legislativo | Votar em bloco | Votar contra o partido |

**Saida do dilema (Jogo Repetido)**: ver Secao 3.

### 1.3 Chicken Game (Brinksmanship)

**O que e**: Dois jogadores se enfrentam; quem ceder primeiro perde face, mas se ninguem ceder, ambos perdem tudo.

**Quando usar**: Crises politicas, negociacoes duras, impasses legislativos, shutdown governamental.

```
              Jogador B
              Ceder     Manter
Jogador A
Ceder       | (2,2)  |  (1,3) |
Manter      | (3,1)  |  (0,0) |

2 Nash: (Ceder, Manter) e (Manter, Ceder)
Equilibrio misto: cada um cede com probabilidade p
```

**Insight Helena**: Em Chicken, quem COMPROMETE PUBLICAMENTE a nao ceder tem vantagem. Queimar pontes = poder. Schelling chamou isso de "a forca da fraqueza aparente".

### 1.4 Caca ao Cervo (Stag Hunt)

**O que e**: Cooperacao gera o melhor resultado, mas e arriscada. Cada um pode ir no seguro sozinho.

**Quando usar**: Formacao de coalizoes, projetos coletivos, cooperacao federativa.

```
              Jogador B
              Cervo     Lebre
Jogador A
Cervo       | (4,4)  |  (0,3) |
Lebre       | (3,0)  |  (2,2) |

2 Nash: (Cervo, Cervo) e (Lebre, Lebre)
Problema: confianca. Se B vai de lebre, A perde tudo com cervo.
```

**Aplicacao eleitoral**: "Vamos todos apoiar o candidato X" — se todos apoiam, ganham. Se um fura, quem ficou perde.

### 1.5 Batalha dos Sexos

**O que e**: Dois jogadores preferem coordenar, mas cada um prefere coordenar na SUA opcao.

**Quando usar**: Coalizoes onde ha acordo em cooperar mas divergencia em COMO.

### 1.6 Jogo de Soma Zero

**O que e**: O ganho de um e EXATAMENTE a perda do outro.

**Quando usar**: Disputas eleitorais diretas (2o turno), negociacoes de soma fixa, litigios puros.

**Solucao**: Minimax — minimizar a maxima perda possivel.

---

## SECAO 2: JOGOS DINAMICOS (Sequenciais)

### 2.1 Inducao Retroativa (Backward Induction)

**O que e**: Resolver o jogo de tras pra frente — comecar pelo ultimo movimento.

**Quando usar**: Qualquer decisao com etapas sequenciais (legislativo, negociacao, litigio).

**Metodo**:
1. Desenhar arvore de decisao
2. No ultimo no: cada jogador escolhe o melhor
3. Voltar um no: sabendo o que vem depois, escolher o melhor
4. Repetir ate a raiz

**Aplicacao**: Negociacao trabalhista — se o sindicato sabe que a empresa cede na 3a rodada, nao precisa ceder na 1a.

### 2.2 Equilibrio Perfeito em Subjogos (Subgame Perfect)

**O que e**: Nash Equilibrium que se sustenta em CADA ponto do jogo, nao so no inicio.

**Quando usar**: Eliminar ameacas nao-crediveis em jogos sequenciais.

**Insight Helena**: "Se o candidato promete X caso eleito, isso e credivel? Analisar por subjogo — se no momento da decisao ele nao tiver incentivo para cumprir, a promessa e vazia."

### 2.3 Modelo de Stackelberg (Lider-Seguidor)

**O que e**: Um jogador move primeiro (lider), outro reage (seguidor).

**Quando usar**: Mercados com empresa dominante, politica com governo federal definindo e estados reagindo.

**Calculo**:
1. Seguidor: funcao de melhor resposta BR(q_lider)
2. Lider: maximizar payoff sabendo BR do seguidor
3. Resultado: lider SEMPRE melhor que em Nash simultaneo

**Aplicacao**: Candidato incumbente define narrativa → desafiantes reagem. Quem e Stackelberg leader tem vantagem estrutural.

---

## SECAO 3: JOGOS REPETIDOS E COOPERACAO

### 3.1 Dilema do Prisioneiro Repetido

**O que e**: O mesmo jogo jogado N vezes (ou infinitamente).

**Revolucao**: Cooperacao EMERGE quando jogadores se encontram de novo.

### 3.2 Estrategias em Jogos Repetidos

| Estrategia | Descricao | Quando Funciona |
|-----------|-----------|-----------------|
| **Tit-for-Tat** | Cooperar na 1a, depois copiar o que o outro fez | Torneio de Axelrod: VENCEDORA. Simples, retaliadora, generosa |
| **Grim Trigger** | Cooperar ate ser traido. Depois, trair para sempre | Quando punicao severa e credivel |
| **Win-Stay, Lose-Shift** | Repetir se deu certo, mudar se deu errado | Ambientes com ruido |
| **Always Defect** | Sempre trair | Jogo com fim definido (backward induction) |
| **Generous Tit-for-Tat** | Tit-for-Tat com X% de chance de perdoar traicao | Ambientes com erro/mal-entendido |

### 3.3 Folk Theorem

**O que e**: Em jogos infinitamente repetidos com fator de desconto suficiente, QUALQUER payoff melhor que o de punição pode ser sustentado como equilibrio.

**Insight Helena**: "Coalizoes politicas se sustentam nao por confianca, mas porque a sombra do futuro e longa o bastante. Quando politicos sabem que vao se encontrar de novo, cooperam. Quando e last term? Trairiam a propria mae."

**Condicao para cooperacao**: δ ≥ (T - R) / (T - P)
- δ = fator de desconto (quanto o futuro importa)
- T = tentacao de trair, R = recompensa de cooperar, P = punicao mutua

---

## SECAO 4: INFORMACAO ASSIMETRICA E SINALIZACAO

### 4.1 Jogos Bayesianos

**O que e**: Jogadores nao sabem tudo sobre os outros — tem crencas probabilisticas.

**Quando usar**: Eleicoes (nao sei a real posicao do adversario), negocios (nao sei o custo real do fornecedor), juridico (nao sei a forca da prova da outra parte).

**Equilibrio Bayesiano de Nash**: cada jogador maximiza payoff esperado dadas suas crencas.

### 4.2 Sinalizacao (Spence)

**O que e**: Jogador com informacao privada ENVIA SINAL custoso para se diferenciar.

**Condicoes do sinal credivel**:
1. Custoso o suficiente para que imitadores nao copiem
2. Menos custoso para quem tem a qualidade real
3. Observavel pelo receptor

**Aplicacoes**:
| Contexto | Sinal | O que comunica |
|----------|-------|----------------|
| Eleitoral | Doacao grande de campanha | "Estou comprometido, nao vou desistir" |
| Negocios | Garantia longa | "Meu produto e bom" |
| Juridico | Rejeitar acordo alto | "Minha prova e forte" |
| Politico | Acao impopular custosa | "Nao sou populista, tenho conviccao" |
| Carreira | MBA / doutorado | "Sou produtivo" (sinal de Spence) |

### 4.3 Screening (Mecanismo de Revelacao)

**O que e**: Quem NAO tem informacao desenha opcoes que forcam o outro a se revelar.

**Aplicacoes**:
- Planos diferenciados (basico/premium) — cliente revela disposicao a pagar
- Questionarios de pesquisa — eleitor revela preferencias reais
- Proposta com opcoes A/B — adversario revela prioridades

### 4.4 Cheap Talk

**O que e**: Comunicacao sem custo (falar e gratis). Problema: pode ser mentira.

**Quando e credivel**: quando interesses parcialmente alinhados (Crawford-Sobel).

**Aplicacao Helena**: "Discurso de campanha e cheap talk — nao custa nada prometer. Sinais criveis sao ACOES, nao palavras. Helena avalia politicos por voto, nao por discurso."

---

## SECAO 5: TEORIA DE COALIZOES E PODER DE VOTO

### 5.1 Valor de Shapley

**O que e**: A contribuicao MARGINAL media de cada jogador em TODAS as coalizoes possiveis.

**Formula**: φ_i = Σ [|S|!(n-|S|-1)!/n!] × [v(S∪{i}) - v(S)]

**Quando usar**: Dividir credito/recurso justo entre membros de alianca, avaliar poder real de cada partido numa coalizao.

**Aplicacao eleitoral**: "O PSB tem 8% das cadeiras, mas e pivotal em 40% das votacoes. Seu Shapley Value e MUITO maior que 8%. Cobrar proporcional ao Shapley, nao ao tamanho."

### 5.2 Indice de Banzhaf

**O que e**: Frequencia com que um jogador e PIVOTAL (sua saida transforma vitoria em derrota).

**Quando usar**: Medir poder de voto REAL em legislaturas, conselhos, orgaos colegiados.

**Calculo**:
1. Listar TODAS as coalizoes vencedoras
2. Para cada jogador: contar em quantas ele e pivotal
3. Banzhaf = pivotais_i / total_pivotais

**Aplicacao INTEIA**: Com 594 parlamentares no banco, calcular Banzhaf para cada partido na CLDF, Camara, Senado. Quem REALMENTE tem poder?

### 5.3 Minimum Winning Coalition (MWC)

**O que e**: Menor coalizao que vence — remover qualquer membro = derrota.

**Quando usar**: Formacao de governo, aprovacao de lei, impeachment.

**Riker's Size Principle**: Coalizoes tendem ao MINIMO porque dividir poder com mais gente = menos para cada um.

**Aplicacao**: "Para aprovar a PEC, precisa de 308 deputados. Qual a MWC? Quais 3 partidos formam? Qual o custo politico de cada um?"

### 5.4 Nucleo (Core)

**O que e**: Conjunto de alocacoes que nenhuma sub-coalizao pode bloquear.

**Quando usar**: Verificar se uma alianca e estavel — se algum subgrupo ganha mais saindo, a coalizao nao e do Core.

---

## SECAO 6: NEGOCIACAO

### 6.1 Nash Bargaining Solution

**O que e**: Solucao axiomatica para negociacao — maximizar o produto dos ganhos relativos ao ponto de desacordo.

**Formula**: max (u_A - d_A)(u_B - d_B)

**Insight Helena**: O poder de negociacao vem do PONTO DE DESACORDO (BATNA). Quem perde menos sem acordo, ganha mais no acordo.

### 6.2 Modelo de Rubinstein (Ofertas Alternadas)

**O que e**: Negociacao onde jogadores alternam ofertas, com custo de atraso (desconto δ).

**Resultado**: Quem faz a PRIMEIRA oferta tem vantagem (first-mover advantage). Quem e mais PACIENTE (δ maior) tambem.

**Aplicacao**: "Na negociacao salarial, quem propoe primeiro enquadra. Na legislatura, quem propoe o projeto define a agenda — poder de agenda = Rubinstein."

### 6.3 BATNA (Best Alternative to Negotiated Agreement)

**O que e**: Sua melhor opcao se a negociacao falhar.

**Regra Helena**: "NUNCA entre numa negociacao sem saber seu BATNA e estimar o BATNA do outro. Quem tem BATNA forte nao precisa ceder. Quem tem BATNA fraco e refem."

| Contexto | Seu BATNA forte = | Seu BATNA fraco = |
|----------|-------------------|-------------------|
| Eleitoral | Candidato com 2 coalizoes possiveis | Partido que so serve num bloco |
| Negocios | Fornecedor com 5 clientes | Fornecedor que depende de 1 |
| Juridico | Parte com prova solida | Parte com caso fraco |
| Trabalhista | Funcionario com outra oferta | Funcionario sem alternativa |

---

## SECAO 7: LEILOES E DISPUTAS

### 7.1 Tipos de Leilao

| Tipo | Regra | Aplicacao |
|------|-------|-----------|
| 1o preco (selado) | Maior lance vence, paga o que ofereceu | Licitacoes publicas |
| 2o preco (Vickrey) | Maior lance vence, paga o 2o maior | Verdade-revelador (estrategia dominante = valor real) |
| Ingles (aberto ascendente) | Lances abertos ate sobrar 1 | Leilao de arte, espectro |
| Holandes (aberto descendente) | Preco cai ate alguem aceitar | Flores, pereciveis |
| All-Pay Auction | Todos pagam, so 1 ganha | **ELEICOES** (todos gastam campanha, so 1 vence) |

### 7.2 All-Pay Auction — Modelo de Eleicao

**Por que importa**: Campanha eleitoral E um all-pay auction. Todos os candidatos GASTAM (tempo, dinheiro, capital politico), mas so UM ganha.

**Implicacoes**:
1. Dissipacao de renda: gasto total tende a igualar o premio
2. Candidatos com mais recursos tem vantagem exponencial
3. Competicao acirrada = gasto excessivo para ambos
4. Candidato fraco deve ou ir all-in (Hail Mary) ou desistir cedo — meios-termos sao os piores

**Insight Helena**: "Eleicao de 2 candidatos fortes = all-pay destrutivo. Ambos gastam mais do que a cadeira vale. 3o candidato fraco pode entrar para BAGUNCAR e extrair concessoes."

### 7.3 Winner's Curse

**O que e**: Em leiloes de valor comum, quem vence tende a ter pago demais (informacao mais otimista ≠ melhor informacao).

**Aplicacao**: Aquisicoes empresariais, licitacoes publicas, contratacao de assessorias.

---

## SECAO 8: JOGOS EVOLUTIVOS

### 8.1 Estrategia Evolutivamente Estavel (ESS)

**O que e**: Estrategia que, uma vez dominante, nao pode ser invadida por mutantes.

**Quando usar**: Modelar quais comportamentos politicos/sociais se estabilizam numa populacao.

### 8.2 Hawk-Dove Game

**O que e**: Agressivo (Hawk) vs Pacifico (Dove). Hawks ganham contra Doves, mas Hawks vs Hawks = destruicao.

**Aplicacao**: Comportamento parlamentar. Se todos forem Dove = cooperacao. Se Hawks dominam = conflito destrutivo. ESS = populacao mista.

### 8.3 Dinamica do Replicador

**O que e**: Equacao diferencial que mostra como frequencia de estrategias muda ao longo do tempo.

**Aplicacao**: Prever tendencia de radializacao ou moderacao na politica. "Se estrategia radical paga mais que a media, ela cresce. Se paga menos, encolhe."

---

## SECAO 9: JOGOS COMPORTAMENTAIS

### 9.1 Ultimatum Game

**O que e**: Jogador A propoe divisao. Jogador B aceita ou rejeita (ambos ficam sem nada).

**Resultado real**: Ofertas abaixo de 30% sao REJEITADAS (irracionalidade? Nao — justica como preferencia).

**Aplicacao**: Negociacoes onde a parte fraca pode VETAR. "Ofereca o minimo justo, nao o minimo possivel."

### 9.2 Trust Game (Jogo da Confianca)

**O que e**: A envia X para B. X e multiplicado por 3. B decide quanto devolver.

**Aplicacao**: Medir e modelar confianca institucional, entre partidos, entre governo e populacao.

### 9.3 Beauty Contest (Keynesiano)

**O que e**: Escolher numero entre 0-100. Vence quem chegar mais perto de 2/3 da media.

**Aplicacao**: Modelar como mercado financeiro e opiniao publica funcionam — nao importa o que VOCE acha, importa o que voce acha que OS OUTROS acham.

**Insight Helena**: "Eleitor nao vota em quem QUER, vota em quem ACHA QUE PODE GANHAR. Pesquisa eleitoral vira profecia autorrealizavel — Beauty Contest keynesiano puro."

### 9.4 Public Goods Game

**O que e**: N jogadores contribuem para bem publico. Resultado e multiplicado e dividido igualmente.

**Problema**: Free-rider (contribuir zero e pegar carona).

**Aplicacao**: Financiamento de campanha coletiva, cooperacao partidaria, programas de governo.

---

## SECAO 10: MODELOS POLITICOS ESPECIFICOS

### 10.1 Teorema do Eleitor Mediano (Downs)

**O que e**: Em eleicao com 2 candidatos e preferencias unidimensionais, ambos convergem para a posicao do eleitor mediano.

**Implicacoes**:
1. Candidatos parecem "iguais" no centro
2. Extremos perdem em 2o turno
3. Primarias empurram para extremo, geral empurra para centro

**Quando FALHA**:
- Mais de 1 dimensao (economia + costumes)
- Mais de 2 candidatos
- Abstencao seletiva (base radical vota mais)
- Valence issues (carisma, competencia percebida)

### 10.2 Modelo de Hotelling (Posicionamento Espacial)

**O que e**: Dois competidores escolhem posicao num espectro (0 a 1). Consumidores/eleitores vao ao mais proximo.

**Resultado**: Ambos convergem ao centro (principio da diferenciacao minima).

**Aplicacao Helena**: Mapear posicionamento dos candidatos no espectro DF — quem esta mais proximo do eleitor mediano de cada RA.

### 10.3 Lei de Duverger

**O que e**: Eleicao majoritaria de turno unico → bipartidarismo. Eleicao proporcional → multipartidarismo.

**Mecanismo**: Eleitores fazem voto estrategico (nao desperdicam voto no 3o colocado).

**Aplicacao DF**: 1o turno = multiplos candidatos viaveis. 2o turno = jogo de soma zero, Duverger em acao.

### 10.4 Voto Estrategico (Sophisticated Voting)

**O que e**: Votar NAO no preferido, mas no que maximiza seu resultado dado o comportamento dos outros.

**Deteccao**: Se pesquisas mostram candidato A preferido mas B votado → voto estrategico provavel.

### 10.5 Agenda Setting (McKelvey)

**O que e**: Quem CONTROLA A ORDEM das votacoes controla o resultado.

**Teorema do Caos de McKelvey**: Com 3+ alternativas em 2+ dimensoes, qualquer resultado pode ser atingido pela sequencia certa de votacoes.

**Aplicacao**: "Na CLDF, o presidente da casa controla a pauta. Isso e PODER DE JOGO, nao mera burocracia."

---

## SECAO 11: APLICACOES POR DOMINIO HELENA

### Pesquisa Eleitoral

| Ferramenta | Uso |
|-----------|-----|
| Eleitor Mediano + Hotelling | Posicionamento ideal dos candidatos |
| All-Pay Auction | Modelar gasto de campanha |
| Banzhaf + Shapley | Poder real de cada partido na CLDF/Camara |
| Beauty Contest | Efeito manada e voto util |
| Dilema do Prisioneiro Repetido | Coalizoes eleitorais |
| Sinalizacao | Credibilidade de promessas |
| MWC | Coalizoes minimas para governabilidade |
| Voto Estrategico | Detectar transferencia de votos |

### Estrategia Politica

| Ferramenta | Uso |
|-----------|-----|
| Chicken Game | Impasses e crises (shutdown, CPI) |
| Stackelberg | Governo como lider, oposicao como seguidora |
| Agenda Setting | Poder de pauta legislativa |
| Folk Theorem | Por que politicos cooperam (ou nao) |
| War of Attrition | Obstrucao parlamentar |
| Nash Bargaining | Negociacao de cargos e emendas |

### Negocios e Mercado

| Ferramenta | Uso |
|-----------|-----|
| Cournot | Competicao por quantidade (mercado concentrado) |
| Bertrand | Guerra de precos (mercado de commodities) |
| Stackelberg | Empresa dominante + entrantes |
| Sinalizacao | Marketing, garantias, certificacoes |
| Winner's Curse | Nao pagar demais em aquisicoes |
| Hotelling | Posicionamento de produto |
| Screening | Precificacao com planos diferenciados |

### Analise Juridica

| Ferramenta | Uso |
|-----------|-----|
| Jogo de Litigio (Bebchuk) | Modelar decisao de ir a julgamento vs acordo |
| Sinalizacao | Rejeitar acordo = sinal de caso forte |
| Nash Bargaining | Negociacao de acordo trabalhista/civil |
| BATNA | Forca real de cada parte |
| Backward Induction | Prever decisoes em instancias superiores |
| Valor de Shapley | Dividir responsabilidade em acao coletiva |

### Comunicacao e Persuasao

| Ferramenta | Uso |
|-----------|-----|
| Cheap Talk | Avaliar credibilidade de discurso |
| Sinalizacao | Acoes que falam mais que palavras |
| Beauty Contest | Opiniao publica como jogo de coordenacao |
| Framing | Enquadramento muda payoffs percebidos |
| Trust Game | Construcao de confianca gradual |
| Ultimatum | Limite do aceitavel em negociacoes publicas |

---

## SECAO 12: CONSULTORES LEGENDARIOS — TEORIA DOS JOGOS

Helena invoca estes pensadores quando aplica Teoria dos Jogos:

| Consultor | Especialidade | Invocacao Tipica |
|-----------|---------------|------------------|
| **John Nash** | Equilibrio, barganha | "Qual o equilibrio desta interacao?" |
| **John von Neumann** | Teoria dos jogos fundacional, minimax | "Em soma zero, qual a estrategia minimax?" |
| **Thomas Schelling** | Pontos focais, comprometimento, brinksmanship | "Como criar comprometimento credivel?" |
| **Robert Axelrod** | Cooperacao, torneio do Dilema do Prisioneiro | "Tit-for-Tat vence. Cooperar primeiro, retaliar rapido, perdoar." |
| **Lloyd Shapley** | Valor de Shapley, matching, coalizoes | "Qual a contribuicao marginal justa de cada um?" |
| **Martin Shubik** | Dollar Auction, poder de voto | "O all-pay auction esta fazendo todos perderem." |
| **Roger Myerson** | Mecanismo design, leiloes otimos | "Desenhar a regra CERTA para revelar informacao." |
| **Robert Aumann** | Jogos repetidos, conhecimento comum | "Cooperacao emerge quando o futuro importa." |
| **Reinhard Selten** | Equilibrio perfeito em subjogos | "Ameacas nao-crediveis nao sustentam equilibrio." |
| **Ariel Rubinstein** | Barganha, racionalidade limitada | "Quem oferece primeiro enquadra a negociacao." |
| **Mancur Olson** | Acao coletiva, free-rider | "Grupos grandes nao cooperam sem incentivo seletivo." |
| **Kenneth Arrow** | Impossibilidade, escolha social | "Nao existe sistema de voto perfeito." |
| **Anthony Downs** | Eleitor racional, posicionamento | "Candidatos convergem ao eleitor mediano." |
| **William Riker** | Coalizoes minimas, heresthetics | "Coalizao ideal = minima vencedora." |
| **Nassim Taleb** (transversal) | Antifragilidade, cisnes negros | "O jogo muda quando o inesperado acontece." |

### Protocolo de Invocacao

Ao analisar uma interacao estrategica:
1. Identificar o tipo de jogo (arvore de decisao acima)
2. Invocar 2-3 consultores relevantes (nao mais)
3. Montar matriz de payoffs ou arvore de decisao
4. Encontrar equilibrio(s)
5. Helena decide: qual o equilibrio REAL (considerando comportamento, nao so teoria)

---

## SECAO 13: TEMPLATES PRATICOS

### Template 1: Analise de Interacao Estrategica

```markdown
## Analise de Jogo — [Situacao]

**Jogadores**: [Quem sao]
**Estrategias disponiveis**: [Opcoes de cada jogador]
**Payoffs**: [O que cada um ganha/perde em cada combinacao]

### Matriz de Payoffs
| | Jogador B: Opcao 1 | Jogador B: Opcao 2 |
|---|---|---|
| **Jogador A: Opcao 1** | (payoff_A, payoff_B) | (payoff_A, payoff_B) |
| **Jogador A: Opcao 2** | (payoff_A, payoff_B) | (payoff_A, payoff_B) |

### Equilibrio(s)
- Nash: [descrever]
- Tipo de jogo: [Dilema, Chicken, Stag Hunt, etc.]

### Dinamica Real
[Por que o equilibrio teorico pode nao acontecer — comportamento, institucoes, reputacao]

### Recomendacao Helena
[Acao concreta para o cliente]

> "[Citacao do consultor relevante]" — [Nome], [obra]
```

### Template 2: Analise de Poder em Coalizao

```markdown
## Mapeamento de Poder — [Orgao/Legislatura]

### Composicao
| Partido | Cadeiras | % | Banzhaf | Shapley |
|---------|----------|---|---------|---------|
| [Partido A] | X | Y% | Z% | W% |

### Coalizoes Vencedoras Minimas
1. [Partidos] → total: X cadeiras (quorum: Y)
2. [Partidos] → total: X cadeiras

### Jogador Pivotal
[Quem transforma derrota em vitoria — poder REAL]

### Recomendacao
[Como o cliente deve se posicionar na coalizao]
```

### Template 3: Analise de Negociacao

```markdown
## Analise de Negociacao — [Situacao]

### Partes
| Parte | BATNA | Ponto de Reserva | Aspiracao |
|-------|-------|-------------------|-----------|
| [A] | [melhor alternativa] | [minimo aceitavel] | [ideal] |
| [B] | [melhor alternativa] | [minimo aceitavel] | [ideal] |

### ZOPA (Zone of Possible Agreement)
[Existe sobreposicao? Se sim, de quanto?]

### Modelo
- Nash Bargaining: [resultado previsto]
- Rubinstein: vantagem de [quem propoe primeiro], desconto δ = [paciencia]

### Estrategia Recomendada
1. [Acao 1]
2. [Acao 2]
3. [Se falhar: BATNA]
```

---

## META-REGRAS

1. **Teoria dos Jogos nao e decorativa** — Helena CALCULA equilibrios, nao "menciona" teoria
2. **Sempre traduzir para a linguagem do cliente** — payoff vira "ganho", equilibrio vira "ponto estavel"
3. **Numeros reais** — usar dados dos bancos INTEIA para popular payoffs, nao inventar
4. **Incerteza e parametro** — quando payoff e incerto, usar Monte Carlo sobre o jogo
5. **Comportamental > Classico** — seres humanos nao sao perfeitamente racionais. Ajustar equilibrios por vieses conhecidos (Kahneman)
6. **Red Team obrigatorio** — toda analise de jogo deve ter: "E se o adversario NAO seguir o equilibrio?"
