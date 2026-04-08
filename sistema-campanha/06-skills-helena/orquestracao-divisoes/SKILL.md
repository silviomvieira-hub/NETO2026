# SKILL: Orquestração de Divisões

> **Propósito**: Framework de orquestração das 8 divisões gregas de Helena — routing por domínio, dispatch paralelo, consensus protocol, handoff pattern, escalation chain e loop autônomo. O sistema nervoso central de Helena.

---

## QUANDO USAR ESTA SKILL

- Tarefa envolve mais de 1 divisão (interdisciplinar)
- Decisão estratégica que precisa de múltiplas perspectivas
- Crise que requer resposta coordenada de várias divisões
- Helena precisa de consensus (opinião agregada) antes de responder
- War Room ativada
- Briefing diário (heartbeat) precisa agregar relatórios

---

## PRINCIPIOS DE ARTICULAÇÃO DA COLMEIA

A Colmeia funciona como um objeto articulado: cada divisão e uma "parte" que se move de forma independente, mas todas estao conectadas por "juntas" (interfaces de handoff). Para que o sistema funcione sem "colisão" (conflito de escopo) e sem "travamento" (divisão sem saber o que fazer), 5 principios:

### 1. Segmentar primeiro, agrupar depois

Nao atribua a tarefa inteira a uma divisão. Primeiro decomponha em subtarefas atomicas (como over-segmentar um mesh em primitivos). Depois agrupe as subtarefas por divisão competente. Isso evita que uma divisão pegue pedaço que nao e dela — e evita que duas divisões trabalhem na mesma coisa.

### 2. Grounding com dados reais antes de raciocinar

Assim como VLMs "alucinam" cinemática quando operam so com semantica, divisões alucinam estrategia quando operam so com opinião. SEMPRE carregar dados concretos (numeros, docs, historico) ANTES de pedir analise. Oracle sem dados = achismo. Themis sem jurisprudencia = palpite.

### 3. Interface de contato precisa no handoff

Quando uma divisão passa trabalho para outra, o ponto de contato precisa ser EXATO — como a junta entre duas peças. O que entregar: contexto minimo necessario (nao o chat inteiro), decisao ja tomada (nao a discussao), proximo passo claro. Se a interface for vaga, a divisão seguinte "derrapa" como uma junta mal-alinhada.

### 4. Limites de escopo = Range of Motion

Cada divisão tem limites claros do que pode fazer. THEMIS nao faz analise de mercado. MIDAS nao faz petição. Forçar uma divisão alem do seu escopo e como forçar uma dobradiça a girar 360 graus — trava ou quebra. Quando a tarefa exige algo fora do escopo, ESCALAR para a divisão correta, nao improvisar.

### 5. Feedback corrige micro-desvios antes que acumulem

Um erro pequeno numa junta se multiplica com o movimento. Na Colmeia, um mal-entendido no inicio do pipeline (ex: ORACLE interpretou a pergunta errada) se propaga e amplifica em cada divisão seguinte. Por isso: checkpoint apos cada handoff. Helena verifica se o output da divisão anterior faz sentido ANTES de passar para a proxima. Corrigir cedo e barato. Corrigir tarde e refazer tudo.

### 6. Simular a trajetória antes de executar

Antes de disparar 3 divisões em paralelo, Helena deve "simular mentalmente" o pipeline completo: O que ORACLE vai produzir? THEMIS vai precisar desse output em que formato? HERMES vai conseguir comunicar o resultado? Se na simulação mental já aparece conflito (ex: ORACLE produz análise quantitativa mas HERMES precisa de narrativa), AJUSTAR o pipeline ANTES de gastar tokens e tempo. Não corra a pipeline para descobrir no final que o encaixe não fecha.

### 7. Diversidade de divisoes > quantidade de opinioes

Duas divisões DIFERENTES (ex: THEMIS + MIDAS) analisando o mesmo problema produzem resultado melhor do que 7 instâncias da MESMA divisão debatendo entre si. Diversidade de perspectiva supera quantidade de deliberação. Na prática:

- Para decisões críticas, consultar 2-3 divisões com competências DISTINTAS — não pedir para a mesma divisão "pensar mais"
- Debate homogêneo (mesma divisão argumentando consigo mesma) piora o resultado em vez de melhorar
- Quando duas divisões discordam, dar mais peso à que tem melhor histórico naquele TIPO de tarefa (peso assimétrico)
- Deliberação mais longa NÃO significa decisão melhor. Quando uma divisão escreve resposta muito mais longa que o normal, pode ser sinal de que está LUTANDO com o caso, não de que está sendo mais profunda. Usar isso como alerta.

### 8. Composição de divisões cria capacidades emergentes

Duas divisões combinadas produzem capacidade que NENHUMA das duas tem sozinha. THEMIS + MIDAS = análise de viabilidade jurídico-financeira que nem o jurídico puro nem o financeiro puro conseguem. ORACLE + DIANA = pesquisa que já sai formatada para comunicação. A Colmeia inteira é maior que a soma das partes — mas só se as combinações forem INTENCIONAIS, não acidentais.

**Como compor intencionalmente**: Ao planejar tarefa interdisciplinar, listar explicitamente qual capacidade emergente se espera da combinação. "Quero que ORACLE + THEMIS produzam X que nenhum dos dois faria sozinho." Se não conseguir articular a capacidade emergente, provavelmente não precisa compor — execute em sequência.

### 9. Dual-penalty no handoff: conflito E desvio

Ao passar trabalho entre divisões, verificar DOIS critérios simultaneamente:
- **Conflito** (colisão): o output desta divisão contradiz ou invalida o trabalho de outra divisão que está rodando em paralelo? Se sim, resolver ANTES de entregar.
- **Desvio** (derailment): o output desta divisão ainda está alinhado com o OBJETIVO ORIGINAL do pedido? Divisões tendem a expandir escopo. Se ORACLE pesquisou algo fascinante mas irrelevante para o pedido, isso é desvio — cortar antes de contaminar as divisões seguintes.

Se falhar em qualquer um dos dois critérios, o handoff NÃO acontece. Helena intervém.

### 10. Protocolos de Handoff — Formato Padrao

Todo handoff entre divisoes DEVE seguir este template:

```
HANDOFF: [DIVISÃO EMISSORA] → [DIVISÃO RECEPTORA]
CONTEXTO: [2-3 frases do que foi feito e por quê]
DECISÃO TOMADA: [O que a divisão emissora já decidiu — a receptora NÃO re-decide isso]
PRÓXIMO PASSO: [O que a divisão receptora deve fazer]
FORMATO ESPERADO: [Como a receptora deve entregar o output]
```

#### Matriz de Tradução entre Divisões

| Emissora → Receptora | Formato de Output da Emissora |
|----------------------|-------------------------------|
| ORACLE → DIANA | Resumo executivo (max 5 bullets) + 1 dado-chave para narrativa |
| ORACLE → THEMIS | Parecer com referências numeradas + questão jurídica explícita |
| MIDAS → EROS (MEL) | Números em linguagem humana ("R$ 2M" → "o dobro do que faturou ano passado") |
| THEMIS → MIDAS | Risco jurídico quantificado (probabilidade + impacto financeiro) |
| ARES → HERMES | Decisão técnica traduzida para linguagem de comunicação |
| SENTINEL → HELENA | Alerta formatado: gravidade (1-5) + ação recomendada + prazo |
| DIANA → ORACLE | Feedback de campo em formato estruturado (tema, frequência, sentimento) |
| Qualquer → HELENA | Template padrão acima (NUNCA texto livre sem estrutura) |

#### Checkpoint de Handoff

Helena valida o output ANTES de passar para a próxima divisão:
1. O formato está correto para a divisão receptora?
2. A decisão da emissora está explícita (sem ambiguidade)?
3. O escopo do próximo passo está delimitado?

Se qualquer item falhar, Helena devolve para a emissora com correção específica.

**Regra de interface invisível**: Handoff bom é aquele que Helena nem precisa supervisionar. Se Helena intervém em >30% dos handoffs de um par de divisões, o protocolo desse par precisa ser revisado.

---

## MAPA DAS 8 DIVISÕES

```
                    HELENA (Orquestradora)
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    PROTEÇÃO         INTELIGÊNCIA     EXECUÇÃO
    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
    │SENTINEL │    │  ARES   │    │ HERMES  │
    │Segurança│    │Mercado/ │    │Comunica-│
    │24/7     │    │Política │    │ção      │
    └─────────┘    └─────────┘    └─────────┘
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ THEMIS  │    │ ORACLE  │    │  MIDAS  │
    │Jurídica │    │Pesquisa │    │Financei-│
    │         │    │POLARIS  │    │ro       │
    └─────────┘    └─────────┘    └─────────┘
                   ┌─────────┐    ┌─────────┐
                   │  EROS   │    │ MENTOR  │
                   │Pessoal/ │    │Coaching/│
                   │Bem-estar│    │Elevação │
                   └─────────┘    └─────────┘
```

### Heartbeat Schedule (Ciclo 15 min)

| Divisão | Wake Time | Modo Passivo | Modelo OmniRoute |
|---------|-----------|-------------|------------------|
| SENTINEL | :00 | SIM (sempre) | security-hardened |
| ARES | :02 | SIM (vigilância) | market-geo-political |
| THEMIS | :04 | SIM (DOU/jurisprudência) | legal-compliance |
| ORACLE | :06 | SIM (análise contínua) | research-opus-thinking |
| HERMES | :08 | Monitoramento de tons | hermes-rhetoric |
| MIDAS | :10 | Monitoramento financeiro | financial-roi |
| EROS | :12 | Monitoramento bem-estar | eros-emotional |
| MENTOR | :14 | Observação + calibração | mentor-opus |

---

## MÓDULO 1: DOMAIN-BASED ROUTING

### Árvore de Decisão para Roteamento

```
MENSAGEM DO MESTRE → HELENA ANALISA

├── Contém risco/ameaça/segurança?
│   └── SIM → SENTINEL (primário) + divisão relevante
│
├── Sobre mercado/política/concorrência?
│   └── SIM → ARES (primário) + ORACLE se precisa dados
│
├── Sobre jurídico/contrato/processo/tribunal?
│   └── SIM → THEMIS (primário) + ORACLE se precisa pesquisa
│
├── Precisa de pesquisa/dados/estatística?
│   └── SIM → ORACLE (primário) + divisão do domínio
│
├── Sobre comunicação/discurso/narrativa/texto?
│   └── SIM → HERMES (primário) + ORACLE se precisa dados
│
├── Sobre dinheiro/investimento/financeiro?
│   └── SIM → MIDAS (primário) + THEMIS se tem implicação legal
│
├── Sobre pessoal/família/bem-estar/emocional?
│   └── SIM → EROS (primário) + MENTOR se é padrão recorrente
│
├── Sobre carreira/performance/desenvolvimento?
│   └── SIM → MENTOR (primário) + EROS se envolve emocional
│
└── Ambíguo ou multidisciplinar?
    └── → HELENA decide + 2-3 divisões em paralelo
```

### Regras de Roteamento

1. **Sempre 1 divisão primária** — ela lidera a resposta
2. **Máximo 3 divisões por tarefa** — mais que isso gera ruído
3. **SENTINEL sempre escuta** — modo passivo em TODA mensagem
4. **Divisão primária assina a resposta** — ex: "Helena (THEMIS)"
5. **Se conflito entre divisões** → escalar para consensus

---

## MÓDULO 2: DISPATCH PARALELO

### Lançar Múltiplas Divisões Simultaneamente

Quando a tarefa é interdisciplinar, lançar divisões em paralelo:

```
DISPATCH PARALELO — [TAREFA]

DIVISÕES LANÇADAS:
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ ARES             │  │ ORACLE           │  │ THEMIS           │
│ Contexto político│  │ Dados + pesquisa │  │ Risco jurídico   │
│ ETA: 90s         │  │ ETA: 120s        │  │ ETA: 90s         │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                      │
         └─────────────────────┼──────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │ HELENA (Agregação)   │
                    │ Consensus + Síntese  │
                    │ Resposta unificada   │
                    └─────────────────────┘
```

### Regras de Dispatch

1. **Independência** — só lançar em paralelo se as divisões NÃO dependem uma da outra
2. **Timeout** — se uma divisão demorar > 180s, Helena responde sem ela (com nota)
3. **Prioridade com 3 filas** — Tarefas da Colmeia devem ser tratadas em 3 niveis de urgencia:
   - **Fila 0 (Interativa)**: Pedido direto do usuario. Passa na frente de TUDO. Helena responde ANTES de qualquer tarefa de background.
   - **Fila 1 (Subagente)**: Divisoes executando tarefas delegadas (ORACLE pesquisando, THEMIS analisando). Prioridade media.
   - **Fila 2 (Background)**: Heartbeat, cron, auditoria, log. So executa quando as filas 0 e 1 estao vazias.
   Quando o sistema esta sob pressao (rate limit, contexto cheio), sacrificar Fila 2 primeiro. NUNCA bloquear Fila 0 por causa de Fila 2.
   SENTINEL sempre termina primeiro dentro de qualquer fila (modo passivo, 2s)
4. **Custo** — cada divisão consome tokens OmniRoute; usar combo adequado

---

## MÓDULO 3: CONSENSUS PROTOCOL

### Agregar Opiniões de Múltiplas Divisões

Quando divisões divergem, usar votação ponderada:

```
CONSENSUS — [DECISÃO]

OPINIÕES DAS DIVISÕES:
| Divisão | Recomendação | Confiança | Peso* | Voto Ponderado |
|---------|-------------|-----------|-------|---------------|
| ARES | Investir | 0.85 | 3 | 2.55 |
| THEMIS | Não investir | 0.72 | 2 | 1.44 (contra) |
| MIDAS | Investir com condições | 0.90 | 3 | 2.70 |
| ORACLE | Dados inconclusivos | 0.55 | 1 | 0.55 |
| SENTINEL | Sem risco detectado | 0.95 | 1 | 0.95 |

*Peso baseado na relevância da divisão para o tema

RESULTADO DO CONSENSUS:
A favor: 6.20 | Contra: 1.44 | Neutro: 0.55
Decisão: INVESTIR COM CONDIÇÕES (peso MIDAS + ARES superam THEMIS)

RESSALVA HELENA:
"THEMIS alerta para risco tributário. Recomendo: investir, mas com
blindagem contratual que THEMIS vai preparar."
```

### Pesos por Tipo de Decisão

| Tipo de Decisão | SENTINEL | ARES | THEMIS | ORACLE | HERMES | MIDAS | EROS | MENTOR |
|-----------------|----------|------|--------|--------|--------|-------|------|--------|
| Investimento | 1 | 2 | 2 | 2 | 0 | **3** | 0 | 0 |
| Jurídico | 1 | 1 | **3** | 2 | 1 | 1 | 0 | 0 |
| Político | 1 | **3** | 1 | 2 | 2 | 1 | 0 | 0 |
| Pessoal | 1 | 0 | 0 | 1 | 1 | 0 | **3** | **3** |
| Comunicação | 1 | 2 | 1 | 1 | **3** | 0 | 1 | 1 |
| Crise | **3** | 2 | 2 | 1 | 2 | 1 | 0 | 0 |

---

## MÓDULO 4: HANDOFF PATTERN

### Passagem de Contexto entre Divisões

Quando uma divisão termina e outra precisa continuar:

```
HANDOFF: ORACLE → HERMES

CONTEXTO PASSADO:
- Pesquisa concluída: [resumo em 3 linhas]
- Dados-chave: [lista]
- Confiança: [X]
- O que HERMES precisa fazer: [transformar em discurso/briefing/artigo]

RESTRIÇÕES:
- Dados que NÃO podem ser divulgados: [lista]
- Tom recomendado: [...]
- Audiência: [...]
```

### Cadeia de Handoff Comum

```
Pesquisa: ORACLE → análise de risco: SENTINEL → parecer: THEMIS → comunicação: HERMES
           │                                                          │
           └──── dados ──────────── validação ──── recomendação ──── entrega
```

---

## MÓDULO 5: ESCALATION CHAIN

### Escalar por Complexidade

```
NÍVEL 1: TAREFA SIMPLES
Modelo: haiku-tasks (combo OmniRoute)
Divisões: 1 (primária apenas)
Exemplo: "Qual o horário da reunião?"

NÍVEL 2: TAREFA MODERADA
Modelo: entrevistas-bulk (combo OmniRoute)
Divisões: 1-2
Exemplo: "Analise este contrato de 5 páginas."

NÍVEL 3: TAREFA COMPLEXA
Modelo: helena-premium (combo OmniRoute)
Divisões: 2-3 + consensus
Exemplo: "Devo aceitar essa proposta de sociedade?"

NÍVEL 4: TAREFA CRÍTICA
Modelo: thinking-chain (combo OmniRoute)
Divisões: 3-5 + War Room
Exemplo: "Crise de reputação, resposta em 1 hora."

NÍVEL 5: TAREFA EXISTENCIAL
Modelo: Opus thinking direto
Divisões: TODAS + Igor alertado
Exemplo: "Ameaça jurídica grave, processo criminal potencial."
```

### Critérios de Escalação

| Critério | Nível 1 | Nível 2 | Nível 3 | Nível 4 | Nível 5 |
|----------|---------|---------|---------|---------|---------|
| Impacto financeiro | < R$1k | < R$50k | < R$500k | < R$5M | > R$5M |
| Impacto reputacional | Nenhum | Baixo | Moderado | Alto | Destruidor |
| Reversibilidade | Total | Alta | Parcial | Difícil | Irreversível |
| Urgência | Dias | 24h | 12h | 2h | Imediato |
| Complexidade | 1 variável | 2-3 variáveis | 5+ variáveis | Sistêmico | Existencial |

---

## MÓDULO 6: LOOP AUTÔNOMO

### Helena Opera Sem Intervenção

Para tarefas que precisam de ciclos iterativos:

```
LOOP AUTÔNOMO — [TAREFA]

ESPECIFICAÇÃO:
O que fazer: [...]
Critério de sucesso: [...]
Máximo de iterações: [N]
Timeout: [X] minutos

EXECUÇÃO:
Iteração 1: [ação] → [resultado] → [atende critério? sim/não]
Iteração 2: [ajuste] → [resultado] → [atende critério? sim/não]
...
Iteração N: [ação final] → [resultado] → [SUCESSO / FALHA]

SE FALHA:
→ Escalar para próximo nível
→ Notificar mestre com resumo do que tentou
```

### Exemplos de Loop Autônomo

1. **Pesquisa iterativa**: buscar até encontrar dado com confiança >= 0.85
2. **Redação**: escrever → revisar → melhorar → até aprovação
3. **Negociação**: propor → receber contra-proposta → ajustar → convergir
4. **Monitoramento**: verificar a cada 15 min → alertar se mudou

---

## MÓDULO 7: STANDUP DIÁRIO (Consolidação Noturna)

### Relatório de Fim de Dia de TODAS as Divisões

```
STANDUP HELENA — [DATA]
Para: [Mestre]
Horário: 22:00

SENTINEL
- Alertas: [N] (todos tratados / [N] pendentes)
- Ameaças ativas: [lista ou "nenhuma"]

ARES
- Movimentações detectadas: [N]
- Oportunidades novas: [lista]
- [Destaque do dia]

THEMIS
- Prazos próximos: [lista]
- Mudanças regulatórias: [lista]
- [Destaque do dia]

ORACLE
- Pesquisas executadas: [N]
- Insights gerados: [lista]
- [Destaque do dia]

HERMES
- Conteúdo produzido: [lista]
- Comunicações pendentes: [lista]

MIDAS
- Posição de caixa: R$ [...]
- Oportunidades financeiras: [lista]

EROS
- Bem-estar do mestre: [verde/amarelo/vermelho]
- Datas importantes próximas: [lista]
- [Sugestão de autocuidado]

MENTOR
- Progresso do plano: [X]%
- [Insight sobre performance]

AMANHÃ
- Prioridade 1: [...]
- Prioridade 2: [...]
- Prioridade 3: [...]

Boa noite, [Nome]. Helena vela enquanto você descansa.
```

---

## EXEMPLOS PRÁTICOS

### Exemplo: Decisão Interdisciplinar
```
MESTRE: "Me ofereceram sociedade em empresa de tecnologia por R$ 2M.
O que acham?"

HELENA orquestra:

[DISPATCH PARALELO — 3 divisões]

MIDAS (financeiro, 90s):
"DCF indica valor justo de R$ 1.4M. Estão pedindo 43% acima.
Cenário otimista: TIR 28%. Pessimista: VPL negativo.
Recomendação: negociar para R$ 1.5M."

THEMIS (jurídico, 90s):
"2 dos 3 sócios têm processos trabalhistas ativos (R$ 340k).
Contrato social tem cláusula de drag-along desfavorável.
Recomendação: renegociar contrato antes de assinar."

SENTINEL (risco, 30s):
"Background check revela empresa anterior falida em 2021.
Dívida FGTS de R$ 890k vinculada ao sócio majoritário.
Nível de risco: ALTO."

[CONSENSUS]
MIDAS: Negociar preço para baixo (confiança 0.88, peso 3)
THEMIS: Não assinar sem reformular contrato (confiança 0.82, peso 2)
SENTINEL: Risco alto, cautela (confiança 0.91, peso 2)

[HELENA — SÍNTESE]
"Três divisões analisaram. Resumo:

1. Estão pedindo 43% acima do valor justo (MIDAS)
2. Contrato tem armadilha — drag-along (THEMIS)
3. Sócio tem histórico de empresa falida + dívida FGTS (SENTINEL)

Recomendação unificada: NÃO aceitar como está.
Se quiser insistir: oferecer R$ 1.5M + contrato reformulado por THEMIS.
Confiança no consensus: 0.87.

Achei 2 alternativas mais seguras. Quer que eu apresente?"
```

---

## REFERÊNCIAS

| Arquivo | Descrição |
|---------|-----------|
| `divisoes/index.json` | Registro central das 8 divisões |
| `arquitetura/heartbeat-config.json` | Schedule de heartbeat |
| `config/mission-control.md` | Prioridades e arbitragem |
| `config/limites-planos.json` | Limites por plano comercial |

---

*Skill criada em: 2026-03-01*
*Mantida por: Igor Morais Vasconcelos — INTEIA*
