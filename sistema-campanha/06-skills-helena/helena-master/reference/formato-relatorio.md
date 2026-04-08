# Formato de Relatorio de Inteligencia — Padrao Helena/INTEIA

## Estrutura Padrao

Todo relatorio de inteligencia da INTEIA segue esta estrutura. Nao e sugestao — e padrao.

### 1. CABECALHO

```
RELATORIO DE INTELIGENCIA | INTEIA
Titulo: [descritivo, sem jargao]
Data: YYYY-MM-DD
Classificacao: [Publico | Interno | Confidencial | Restrito]
Analista: Helena Inteia
Confianca Global: [0.X]
```

### 2. SUMARIO EXECUTIVO (maximo 200 palavras)

Resposta direta a pergunta que motivou o relatorio. COM POSICAO.
O sumario executivo NAO e descritivo ("este relatorio analisa..."). E POSICIONAL ("recomendo X porque Y").
Conclusao principal + recomendacao + nivel de confianca em 2-3 paragrafos curtos.
Um decisor ocupado deve conseguir DECIDIR lendo apenas esta secao.
Se apos ler o sumario o decisor nao sabe o que fazer, o sumario falhou.

### 3. CONTEXTO

Por que este relatorio existe. Qual a demanda. Qual o cenario.
Maximo 1 pagina.

### 4. METODOLOGIA

- Fontes consultadas (com links/referencias)
- Metodos analiticos utilizados
- Tamanho de amostra e criterios
- Limitacoes metodologicas
- Disclaimer de agentes sinteticos (se aplicavel)

### 5. ACHADOS PRINCIPAIS

Organizados por relevancia (nao cronologicamente).
Cada achado segue o formato:

```
ACHADO [N]: [Titulo descritivo]
Confianca: [0.X]
Fonte: [referencia]
Dados: [numeros, graficos, tabelas]
Implicacao: [o que isso significa para o decisor]
```

### 6. ANALISE

Cruzamento entre achados. Conexoes nao-obvias. O "e dai?" de cada dado.
Aqui entra o Insight Diferencial — o angulo que so a INTEIA perceberia.

### 7. CENARIOS (quando aplicavel)

| Cenario | Probabilidade | Descricao | Impacto |
|---------|--------------|-----------|---------|
| Otimista | X% | ... | ... |
| Base | Y% | ... | ... |
| Pessimista | Z% | ... | ... |

Probabilidades devem somar 100%.

### 8. RECOMENDACOES

Acoes concretas, priorizadas por impacto e viabilidade.
Cada recomendacao com: o que fazer, quem faz, ate quando, como medir sucesso.

### 9. PROXIMOS PASSOS

O que precisa acontecer depois deste relatorio.
Pesquisas complementares sugeridas. Pontos de decisao iminentes.

### 10. CONTRA-HIPOTESES (Red Team)

3 razoes pelas quais as conclusoes deste relatorio podem estar erradas.
Explicacao de por que, mesmo assim, as conclusoes se sustentam (ou nao).

### 11. ASSINATURA

Frase final Helena — pessoal, acida, memoravel.

## Niveis de Classificacao

| Nivel | Descricao | Distribuicao |
|-------|-----------|-------------|
| Publico | Pode ser publicado no site INTEIA | Sem restricao |
| Interno | Uso interno INTEIA | Equipe INTEIA |
| Confidencial | Dados de clientes ou pesquisa em andamento | Apenas fundador + Helena |
| Restrito | Dados pessoais sensiveis do fundador | Apenas fundador |

## Formatacao

- Fonte: profissional (sem serif para digital, serif para impressao)
- Cor tematica: ambar/dourado (#d69e2e) em destaques
- Tabelas com bordas limpas, fundo alternado
- Graficos com labels claros, sem 3D, sem decoracao excessiva

## Checklist Pre-Entrega

- [ ] Sumario executivo permite decisao sem ler o resto?
- [ ] Toda afirmacao tem fonte ou rotulo [Inferencia]?
- [ ] Confianca calibrada em cada achado?
- [ ] Red Team interno (3 contra-hipoteses)?
- [ ] Recomendacoes com responsavel, prazo e metrica?
- [ ] Assinatura Helena presente?
- [ ] Classificacao de seguranca definida?
- [ ] Disclaimer de agentes sinteticos (se usado)?

## Template Preenchivel

```
============================================================
RELATORIO DE INTELIGENCIA | INTEIA
============================================================
Titulo: [PREENCHER]
Data: [YYYY-MM-DD]
Classificacao: [Publico | Interno | Confidencial | Restrito]
Analista: Helena Inteia
Confianca Global: [0.XX]
============================================================

SUMARIO EXECUTIVO (max 200 palavras)
[Resposta direta + recomendacao principal]

------------------------------------------------------------
CONTEXTO
[Por que este relatorio existe. Max 1 pagina.]

------------------------------------------------------------
METODOLOGIA
- Fontes: [listar]
- Metodos: [listar]
- Amostra: [n=XX, criterios]
- Limitacoes: [listar]

------------------------------------------------------------
ACHADO 1: [Titulo descritivo]
Confianca: [0.XX] | Fonte: [referencia]
Dados: [numeros/graficos]
Implicacao: [o que significa para o decisor]

ACHADO 2: [Titulo descritivo]
...

------------------------------------------------------------
ANALISE
[Cruzamento entre achados. Insight Diferencial.]

------------------------------------------------------------
CENARIOS
| Cenario    | Prob. | Descricao | Impacto |
|------------|-------|-----------|---------|
| Otimista   | XX%   | ...       | ...     |
| Base       | XX%   | ...       | ...     |
| Pessimista | XX%   | ...       | ...     |

------------------------------------------------------------
RECOMENDACOES
1. [O que] — [Quem] — [Ate quando] — [Metrica de sucesso]
2. ...

------------------------------------------------------------
RED TEAM (3 Contra-Hipoteses)
1. [Por que pode estar errada] → [Por que se sustenta]
2. ...
3. ...

------------------------------------------------------------
[Assinatura Helena]
============================================================
```
