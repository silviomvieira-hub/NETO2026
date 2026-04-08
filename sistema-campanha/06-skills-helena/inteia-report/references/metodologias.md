# Metodologias INTEIA — 16 Técnicas Convergentes

## TEORIA DOS JOGOS (6 modelos formais)

### 1. Nash 2×2 — Equilíbrio Estático
Matriz de payoffs com estratégias de cada jogador. Identifica estratégia dominante estrita.
**Output**: "Estratégia X = dominante estrita" + payoff /10 + confiança decimal

### 2. Stackelberg — Jogo Sequencial
First-mover advantage: quem age primeiro dita o jogo.
**Output**: "Ação Y = first-move ótimo" + vantagem quantificada

### 3. Bayesiano — Incerteza e Probabilidades
P(resultado | estratégia) × P(cenário) = payoff esperado.
**Output**: tabela payoffs × cenários + sensibilidade a P(evento crítico)

### 4. Shapley/Core — Jogos Coalicionais
Coalizão estável = nenhum subgrupo se sai melhor sozinho.
**Output**: "Coalizão A+B sem C = única estável" + valor de Shapley

### 5. Dilema do Prisioneiro — Cooperação/Traição
δ (fator de desconto) < limiar → cooperação colapsa.
**Output**: "Cooperação insustentável — δ < X" + timing recomendado

### 6. Sinalização de Spence — Sinais Críveis
Sinal crível = custoso de falsificar. Distingue tipos competente/incompetente.
**Output**: "Ação X = sinal separador crível" + custo de imitação

---

## SIMULAÇÕES (3 baterias empíricas)

### 7. Bateria 1: Eleitores Sintéticos (n=1.015)
- Calibração: TSE microdados, IBGE censo, PDAD-DF, histórico eleitoral 2018–2022
- 60+ atributos por agente
- Validação cruzada: desvio aceitável ±3pp vs pesquisas reais
- **Outputs**: intenção de voto por candidato, score de distanciamento esperado

### 8. Bateria 2: Consultores Lendários (n=12)
Jobs · Sun Tzu · Maquiavel · Dalio · Cialdini · Thiel · Merkel · Cunha · Dilma · Taleb · Kahneman · Rui Barbosa
- **Outputs**: ranking 0–10 por estratégia + citação representativa de 2 destaques

### 9. Bateria 3: Parlamentares/Stakeholders (n=24)
Para análise CLDF: 24 deputados com perfil de alinhamento documentado.
- **Outputs**: base pós-evento, votos para medidas, crença em governabilidade

---

## FRAMEWORKS ESTRATÉGICOS (7)

### 10. SWOT Eleitoral
- Forças · Fraquezas · Oportunidades · Ameaças
- Grid 2×2 com cores semânticas (verde/vermelho/azul/âmbar)

### 11. PESTEL
Político · Econômico · Social · Tecnológico · Ecológico · Legal
Contextualiza o macroambiente da decisão.

### 12. Análise de Stakeholders
Atores por poder × interesse: aliados / neutros / oponentes / ameaças

### 13. MCDA (10 critérios ponderados)
Critérios padrão eleitoral:
intenção de voto (18%) · rejeição (15%) · aliança PL (14%) · robustez jurídica (12%) ·
coerência narrativa (10%) · base parlamentar (8%) · centro (8%) · comunicação (5%) ·
herança de legado (5%) · flexibilidade tática (5%)
**Validação**: mudar pesos em ±5% não deve alterar o 1º lugar.

### 14. Matriz de Risco
Probabilidade × Impacto = Score
- Crítico (score > 6) · Alto (4–6) · Médio (2–4) · Baixo (< 2)
- Incluir mitigação específica + gatilho de ação para cada risco

### 15. Process Tracing
Rastrear cadeia causal em fontes primárias (contratos, depoimentos, atos).
**Output**: timeline + "elo crítico" + distinção entre documentado e inferido

### 16. Frame Analysis
Frames disponíveis e qual adotar.
**Regra INTEIA**: verbos de ação (auditei, exonerei, determinei) > verbos passivos

**Estrutura padrão:**
| Frame Atual (passivo) | Frame Alvo (ativo) | Frame Fatal (a evitar) |
|---|---|---|

---

## BLOCO MAD — 17ª Metodologia (Inovação INTEIA)

Não é uma metodologia clássica — é uma **reconfiguração ofensiva** da auditoria.

**Conceito**: A auditoria não serve apenas para se defender da crise. Quando conduzida
com controle total do escopo e ritmo, mapeia vulnerabilidades de todo o ecossistema
político (incluindo oposição e opositores internos), gerando:

1. **Kompromat sistêmico**: informações comprometedoras sobre todos os atores
2. **Efeito MAD**: Destruição Mútua Assegurada — atacar ativa exposição cruzada
3. **Captura de reféns**: o distanciamento progressivo vira operação de poder permanente

**Output**: "Ela não foge da explosão — ela adquire o detonador."

**Quando usar**: sempre que o ator analisado TIVER controle da ferramenta investigativa
(auditoria, CPI interna, controladoria, comissão) e PRECISAR de poder de dissuasão
contra múltiplos adversários simultaneamente.

---

## CALIBRAÇÃO E FONTES

**Fontes obrigatórias para análise eleitoral DF:**
- TSE: resultados 2018, 2020, 2022, pesquisas de intenção
- IBGE: censo 2022, distribuição de renda por Região Administrativa
- PDAD-DF: Pesquisa Distrital por Amostra de Domicílios
- Pesquisas públicas: Paraná Pesquisas, Real Time Big Data, Instituto Veritá
- Documentos PF, STF, STJ (públicos): fase investigativa
- Banco Central: comunicados e notas oficiais

**Limiar de confiança:**
- ≥ 0,80 → recomendação firme com veredicto único
- 0,65–0,79 → recomendação com ressalvas explícitas
- < 0,65 → apresentar múltiplos cenários sem recomendação única
