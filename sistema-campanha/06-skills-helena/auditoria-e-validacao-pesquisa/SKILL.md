# SKILL: Auditoria e Validação de Pesquisa (Anti-Alucinação + Qualidade)

> **Propósito**: Garantir que toda pesquisa INTEIA seja auditável, estatisticamente consistente, criticada (red team) e que erros recorrentes sejam corrigidos na origem do sistema.

---

## QUANDO USAR ESTA SKILL

- Sempre que finalizar uma pesquisa (antes de entregar ao cliente).
- Quando houver resultados “bons demais para ser verdade”.
- Quando aparecerem incoerências (ex.: probabilidade 100% sem separar gargalos reais).
- Quando o sistema repetir um erro (corrigir na origem: prompt/template/código).

---

## CHECKS OBRIGATÓRIOS (Quality Gates)

### 1) Integridade do Dataset

- [ ] `N` entrevistados conforme plano
- [ ] Taxa de respostas válidas >= 95%
- [ ] Campos obrigatórios preenchidos (sem null em massa)
- [ ] Sem duplicatas óbvias (mesmo eleitor repetido sem justificativa)
- [ ] Logs de erro (timeouts/retry) documentados

### 2) Representatividade / Estratificação

- [ ] Distribuições por estrato (RA, sexo, idade, cluster) coerentes com a base
- [ ] Divergências > 5pp precisam de justificativa (oversample intencional) ou correção (re-weight)
- [ ] Se houver ponderação: registrar pesos, método e efeito

### 3) Validação Estatística Básica

- [ ] Margem de erro calculada e registrada
- [ ] Intervalos de confiança para métricas principais (quando aplicável)
- [ ] Teste qui-quadrado para cruzamentos relevantes (quando categórico)
- [ ] Teste de diferença de proporções (quando comparar grupos)

### 4) Estabilidade / Sensibilidade

- [ ] Rodar pelo menos 2 seeds/amostras (quando for simulação)
- [ ] Se os resultados mudarem muito: registrar instabilidade e reduzir confiança

### 5) Anti-Alucinação (Classificação de Afirmativas)

Para cada afirmação forte do relatório, marcar:

- `DADO_INTERNO`: citar evidência (estatística, tabela, trecho)
- `FONTE_EXTERNA`: citar URL + data de acesso
- `INFERENCIA`: listar premissas e incertezas

Regra: relatório para cliente não pode conter “fatos externos” sem link.

---

## VALIDAÇÃO PSICOMÉTRICA DE AGENTES SINTÉTICOS

Quando a pesquisa usa agentes sintéticos (eleitores IA), aplicar checks ADICIONAIS que verificam se os agentes se comportam como perfis reais — não como papagaios estatísticos.

### Consistência interna (o agente é coerente consigo mesmo?)

- [ ] Se o mesmo agente responde perguntas sobre o mesmo tema em momentos diferentes, as respostas convergem? (Análogo a Cronbach's α ≥ 0.70)
- [ ] Se perguntar a mesma coisa de formas diferentes, o agente responde de forma consistente? Se não, o perfil está mal definido

### Validade convergente (agentes parecidos respondem parecido?)

- [ ] Agentes do mesmo cluster (ex: "mulheres classe C de Ceilândia") devem ter respostas correlacionadas entre si
- [ ] Se não correlacionam, o cluster não é real — está agrupando gente que não tem nada em comum

### Validade discriminante (agentes diferentes respondem diferente?)

- [ ] Agentes de clusters OPOSTOS (ex: "apoiador convicto" vs "opositor ideológico") devem divergir significativamente
- [ ] Se respondem igual, o sistema não está diferenciando — os perfis são genéricos demais

### Calibração de expectativa (LLM ≠ humano)

- [ ] Agentes sintéticos explicam ~44% da variância em intenção (R²≈0.44), humanos ~60%. Esperar paridade é erro
- [ ] Se resultado do agente sintético parecer "perfeito demais" (R²>0.80), desconfiar — pode ser overfitting ao prompt
- [ ] Registrar SEMPRE: "pesquisa com agentes sintéticos, resultados são indicativos, não definitivos"

### Resistência a contaminação

- [ ] Usar perguntas de ATITUDE e OPINIÃO, não perguntas factuais com resposta certa/errada
- [ ] Perguntas sobre preferências, medos, valores, prioridades — LLMs não podem "colar" porque não existe gabarito
- [ ] Evitar perguntas que podem ter sido vistas no treinamento (ex: pesquisas eleitorais históricas com resultado público)

### Assimetria PPV vs NPV — quando o modelo confirma vs quando descarta

Modelos de classificação (incluindo agentes sintéticos) tipicamente são MELHORES para CONFIRMAR do que para DESCARTAR:
- [ ] Se o modelo diz "este eleitor É apoiador" (positivo), a confiança é alta (~90%)
- [ ] Se o modelo diz "este eleitor NÃO é apoiador" (negativo), a confiança é BAIXA (~40%)
- [ ] Registrar SEMPRE qual direção da predição é mais confiável e avisar o cliente
- [ ] Nunca usar resultado negativo do modelo para descartar hipótese — só para priorizar investigação

### Viés retrospectivo — o prompt não pode conter a resposta

- [ ] Se o prompt do agente sintético já contém pistas da "resposta certa", o resultado está enviesado
- [ ] Teste: remover toda informação de contexto do prompt e rodar de novo. Se o resultado mudar drasticamente, o contexto estava fazendo o trabalho, não o agente
- [ ] Em pesquisa eleitoral: o perfil do eleitor sintético NÃO deve conter a intenção de voto — deve conter apenas características demográficas e psicográficas. A intenção deve EMERGIR da simulação

### O formato da pergunta É o resultado — não é neutro

O maior risco de uma pesquisa com agentes sintéticos não é o modelo errar — é a PERGUNTA forçar a resposta errada.

- [ ] **Nunca forçar A/B/C/D quando texto livre é possível** — Modelos que recomendam a resposta CERTA em texto livre marcam a resposta ERRADA quando forçados a escolher entre opções. Diferença medida: 0% vs 100% de acerto para o MESMO caso. Se a pesquisa usa múltipla escolha, rodar TAMBÉM em texto livre e comparar. Se os resultados divergem, o formato está enviesando
- [ ] **Nunca suprimir conhecimento do modelo** — Instruções como "responda apenas com base nesta informação" removem o valor do modelo. O treinamento É o conhecimento. Suprimir = derrotar o propósito
- [ ] **Nunca suprimir perguntas de clarificação** — Se o modelo quer perguntar algo antes de responder, isso é SINAL de que o input é ambíguo. Forçar resposta sem clarificação produz resultado pior que permitir follow-up
- [ ] **Multi-turn > single-shot para qualquer diagnóstico/classificação** — Entrevistas com eleitores sintéticos devem permitir pelo menos 2-3 turnos de interação. Uma pergunta única produz classificação rasa. Interação progressiva resolve ambiguidade e revela nuance
- [ ] **Testar o formato ANTES de testar o conteúdo** — Rodar o mesmo caso em 3 formatos diferentes (múltipla escolha, escala Likert, texto livre). Se os resultados mudam muito entre formatos, o formato está dominando — qualquer conclusão sobre o conteúdo é prematura

### Reprodutibilidade

- [ ] Toda pesquisa deve ser replayável: guardar prompt exato, modelo, temperatura, seed, versão do agente
- [ ] Registrar no log: modelo usado, combo OmniRoute, timestamp, parâmetros
- [ ] Se alguém rodar de novo com os mesmos parâmetros, deve chegar em resultado estatisticamente equivalente

---

## RED TEAM (CRÍTICA OBRIGATÓRIA)

Executar uma revisão cética antes de fechar:

Perguntas padrão:
- O que nesse resultado pode ser artefato do prompt/modelo?
- Há incentivo/viés do agente sintético para “parecer razoável”?
- Existe hipótese alternativa mais simples?
- Qual evidência derrubaria a principal conclusão?
- Qual variável oculta pode estar dirigindo o resultado?

Saída mínima:
- 3 contra-hipóteses
- 3 inconsistências
- 3 sinais de monitoramento (early warnings)

---

## CORRIGIR ERROS NA ORIGEM (Sistema > Caso isolado)

Quando algo der errado, classificar a correção:

1) **Prompt** (instruções incompletas/ambíguas)
2) **Template/Relatório** (labels confusas, mistura de métricas)
3) **Código** (bug, parsing, agregação)
4) **Dados** (banco inconsistente, campos errados)
5) **Processo** (faltou gate/checagem)

Aplicar correção no lugar certo e registrar:
- `WORK_LOG.md` (o que aconteceu e como foi prevenido)
- Atualizar skill/template/command relevante

---

## TEMPLATE: SEÇÃO "VALIDAÇÃO" (para colar em VALIDACAO.md)

```markdown
## Validação e Qualidade

### Amostra
- N: {n}
- Confiança: 95%
- Margem de erro (p=0.5): ±{moe}%

### Representatividade
- Estratos checados: {estratos}
- Divergências > 5pp: {lista ou "nenhuma"}
- Ponderação: {sim/nao} (método: {metodo})

### Integridade
- Respostas válidas: {validas}/{n}
- Erros/retries: {qtd}
- Observações: {texto}

### Red Team (crítica)
- Contra-hipótese 1: ...
- Contra-hipótese 2: ...
- Contra-hipótese 3: ...

### Limitações
- (1) ...
- (2) ...
- (3) ...
```

---

## REFERÊNCIAS

| Arquivo | Uso |
|--------|-----|
| `scripts/validacao_estatistica.py` | checks/relatórios de validação |
| `docs/inteia/METODOLOGIA.md` | parâmetros e trilha de auditoria |
| `.claude/commands/validation/system-review.md` | correção na origem |

---

## AUDITORIA DE SYSTEM PROMPTS (Arbiter — Mason, UBC/Georgia Tech, 2026)

> Fonte: arXiv:2603.08993v1, "Arbiter: Detecting Interference in LLM Agent System Prompts"
> Corpus: Claude Code (1.490 linhas), Codex CLI (298), Gemini CLI (245)
> Achados: 152 findings (scouring) + 21 interferencias hand-labeled
> Custo total da auditoria cross-vendor: $0.27 USD
> Confianca: 0.92 — Validacao externa (Google confirmou bug encontrado pelo scourer)

### O Paradoxo do Observador (Principio Fundamental)

**"O agente que resolve o conflito NAO PODE ser o agente que o detecta."**

Quando um LLM encontra instrucoes contraditorias no system prompt, ele "resolve" silenciosamente
por heuristica de treinamento. Nenhum erro e levantado. A contradicao persiste e o comportamento
varia entre invocacoes. Por isso: auditoria de prompts EXIGE avaliacao EXTERNA.

**Implicacao para Helena**: Helena nao pode auditar suas proprias skills/prompts para contradições.
Usar modelo diferente (ou multi-modelo via OmniRoute) para auditar.

### Taxonomia de Arquitetura de Prompts

| Arquitetura | Exemplo | Classe de Bug | Onde Aparecem |
|-------------|---------|---------------|---------------|
| **Monolitica** | Claude Code (1.490 linhas), nosso CLAUDE.md (~500 linhas) | Growth-level bugs | Fronteiras entre subsistemas |
| **Flat** | Codex CLI (298 linhas) | Trade-offs de simplicidade | Menos bugs, menos capacidade |
| **Modular** | Gemini CLI (245 linhas, TypeScript render) | Design-level bugs | Costuras entre modulos |

**Nosso CLAUDE.md e MONOLITICO** — susceptivel a contradicoes entre secoes adicionadas
por times/sessoes diferentes. Exemplo classico do paper: TodoWrite "SEMPRE usar" vs "NUNCA usar"
no contexto de commit — mesma classe de bug que pode existir no nosso arquivo.

### Protocolo Arbiter para Auditoria INTEIA

**Fase 1: Dirigida (Deterministica)**
1. Decompor prompt em blocos classificados (tier, categoria, modalidade, escopo)
2. Pre-filtrar pares de blocos com sobreposicao de escopo
3. Aplicar 5 regras formais:
   - Conflito mandate-proibicao (SEMPRE vs NUNCA)
   - Redundancia por sobreposicao de escopo
   - Ambiguidade de prioridade
   - Dependencia implicita
   - Duplicacao verbatim

**Fase 2: Scouring Multi-Modelo (Nao-Dirigida)**
1. Enviar prompt completo para LLM com instrucao vaga: "leia com cuidado e anote o que achar interessante"
2. Cada passe recebe achados acumulados dos passes anteriores
3. Cada passe usa modelo DIFERENTE (complementaridade > consenso)
4. Parar quando 3 modelos consecutivos dizem "nao ha mais nada"
5. Custo esperado: < $0.30 para prompt de 500-1500 linhas

**Modelos recomendados para scouring (por foco analitico):**

| Modelo | Foco Caracteristico |
|--------|-------------------|
| Claude Opus | Contradicoes estruturais, superficies de seguranca |
| DeepSeek V3.2 | Referencias ocultas, brechas de delegacao |
| Kimi K2.5 | Exploracao economica, exaustao de recursos |
| Grok 4.1 | Gaps de permissao, gerenciamento de estado |
| MiniMax M2.5 | Falhas de arquitetura de confianca, instrucoes impossiveis |
| Qwen3-235B | Contradicoes contextuais, ilusoes de preservacao de estado |

### Padroes Universais (Encontrados em TODOS os 3 vendors)

1. **Autonomia vs Restricao**: "persista ate completar" + "pergunte antes de agir" (tensao inerente)
2. **Ambiguidade de Hierarquia**: multiplas fontes de autoridade sem resolucao explicita de conflitos
3. **Modos Comportamentais**: regras que mudam por estado runtime sem especificar interacao com regras base

### Quando Aplicar

- Apos criar/editar CLAUDE.md com mudancas significativas
- Apos adicionar nova skill com mandatos ou proibicoes
- Antes de deploy de mudancas em helena_prompt.py (persona Helena)
- Review periodica trimestral do CLAUDE.md
- Custo: $0.30 via OmniRoute (7 passes, 7 modelos diferentes)

---

*Skill criada em: 2026-01-30*
*Atualizada: 2026-03-11 (Arbiter — auditoria de system prompts)*
*Mantida por: INTEIA / Igor Morais (com apoio de IA)*
