# Agentes Sinteticos — Protocolo de Uso Detalhado

## Visao Geral

Os agentes sinteticos da INTEIA sao perfis simulados com 60+ atributos demograficos,
psicograficos e comportamentais, calibrados com dados oficiais (TSE, IBGE, PDAD-DF).
Nao sao pessoas reais. Sao modelos probabilisticos que simulam decisoes humanas.

## Banco 1: Eleitores Sinteticos do DF (1.001 perfis)

### Atributos Calibrados
- Demograficos: idade, genero, raca/etnia, renda, escolaridade, regiao administrativa
- Comportamentais: historico eleitoral, consumo de midia, nivel de engajamento politico
- Psicograficos: valores, medos, aspiracoes, identidade social
- Calibracao: dados PDAD 2023, Censo 2022, TSE 2022

### Usos Validados
- Pesquisa de intencao de voto (cenarios 1o e 2o turno)
- Testes de mensagem politica (qual narrativa ressoa com qual segmento)
- Validacao de preco de produto/servico (subset por profissao)
- Profiling de publico-alvo (filtragem por atributos)

### Protocolo de Pesquisa Eleitoral
1. Definir cenario (candidatos, contexto, periodo)
2. Selecionar amostra (total ou filtrada por criterio)
3. Aplicar questionario padronizado (intencao espontanea + estimulada + rejeicao)
4. Rodar simulacao com variabilidade calibrada
5. Calcular margens de erro e intervalos de confianca
6. Produzir relatorio com disclaimer: "Simulacao com agentes sinteticos, nao pesquisa de campo"

### Validacao de Mercado (subset profissional)
Filtrar banco por atributos relevantes: profissao, faixa etaria, renda, regiao.

## Banco 2: Consultores Lendarios (144 perfis)

Gemeos digitais dos maiores estrategistas e pensadores do mundo.

### Paineis Sugeridos
- **Marketing/Copy (10):** Godin, Schwartz, Ogilvy, Halbert, Kennedy, Hormozi, Brunson, Forleo, Porterfield, Walker
- **Estrategia (10):** Drucker, Porter, Christensen, Collins, Thiel, Dalio, Taleb, Kahneman, Munger, Marks
- **Lideranca (10):** Lencioni, Sinek, Grant, Duckworth, Maxwell, Covey, Ferrazzi, Goldsmith, Catmull

### Protocolo de Consulta
1. Definir a pergunta estrategica
2. Selecionar 5-10 consultores relevantes
3. Simular resposta individual (mantendo voz e framework proprios)
4. Compilar concordancias e divergencias
5. Sintetizar recomendacao ponderada
6. Identificar insight emergente (que nenhum consultor daria isoladamente)

## Banco 3: Magistrados Sinteticos (164 perfis)

Composicao: STF (11) + STJ (turmas) + TJDFT + TRF1

### Atributos Decisorios
- Tendencia (progressista/conservador/tecnicista)
- Taxa historica de provimento por tipo de acao
- Peso: jurisprudencia vs legislacao vs doutrina
- Estilo redacional

### Protocolo
1. Identificar juizo/turma competente
2. Carregar perfis relevantes
3. Submeter tese juridica
4. Cada magistrado emite voto fundamentado
5. Calcular probabilidade com IC
6. Disclaimer: "Simulacao analitica, nao previsao vinculante"

## Banco 4: Gestores Publicos (180 perfis)

Nivel hierarquico (estrategico/tatico/operacional), area, tempo de servico, perfil decisorio.
Usos: teste de politicas, profiling, resistencia a mudanca, early adopters vs laggards.

## Banco 5: Parlamentares (594 perfis)

513 deputados + 81 senadores, 21 partidos, 27 estados.
Usos: mapeamento de aliancas, previsao de votacao, interlocutores-chave por tema.

## Banco 6: Candidatos Governador DF 2026 (18 perfis)

Historico eleitoral, base eleitoral por RA, vulnerabilidades, rede de apoiadores.

## Regra Universal

TODOS os outputs de agentes sinteticos devem incluir:
- Disclaimer: dados simulados, nao reais
- Metodologia utilizada
- Tamanho da amostra e criterios de filtragem
- Margem de erro e nivel de confianca
- Limitacoes do modelo

## Templates de Questionario

### Willingness-to-Pay (curso/produto)

```
QUESTIONARIO WTP — [PRODUTO]
Perfil do respondente: [atributos filtrados]

Q1. De 0 a 10, qual seu interesse em [descricao do produto]?
Q2. Qual sua intencao de compra?
    ( ) Certamente nao  ( ) Provavelmente nao  ( ) Talvez
    ( ) Provavelmente sim  ( ) Certamente sim
Q3. Qual o maximo que pagaria?
    ( ) Ate R$297  ( ) R$298-697  ( ) R$698-997
    ( ) R$998-1.997  ( ) R$1.998-2.997  ( ) Acima de R$2.997
Q4. Principal objecao para NAO comprar? [Resposta aberta]
Q5. O que mais influenciaria sua decisao?
    [ ] Reputacao  [ ] Depoimentos  [ ] Garantia
    [ ] Modulo gratuito  [ ] Certificado  [ ] Preco promocional
```

### Pesquisa de Intencao de Voto

```
QUESTIONARIO ELEITORAL — CENARIO [N]
Perfil: [atributos demograficos]

Q1 (Espontanea). Se a eleicao fosse hoje, em quem votaria? [Aberta]
Q2 (Estimulada). Dentre estes candidatos: [Lista aleatorizada]
    ( ) [A]  ( ) [B]  ...  ( ) Branco/Nulo  ( ) Nao sabe
Q3 (Rejeicao). Em quem NAO votaria de jeito nenhum? [Multipla]
Q4 (2o turno). Entre [X] e [Y], em quem votaria?
```

### Avaliacao de Copy (para consultores lendarios)

```
AVALIACAO DE COPY — [MATERIAL]
Consultor: [Nome]

Avalie de 0 a 100:
1. HEADLINE: [score] — [justificativa]
2. PROPOSTA DE VALOR: [score] — [justificativa]
3. STACK DE OFERTA: [score] — [justificativa]
4. URGENCIA: [score] — [justificativa]
5. PROVA SOCIAL: [score] — [justificativa]
6. CTA: [score] — [justificativa]

SCORE GERAL: [media ponderada]
TOP 3 SUGESTOES: 1. [maior impacto] 2. [...] 3. [...]
```
