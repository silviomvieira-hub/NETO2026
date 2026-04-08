# SKILL: Análise Jurídica Preditiva

> **Propósito**: Framework de predição de decisões judiciais com perfil de magistrado, estratégia processual personalizada, counterfactual reasoning e timeline de risco. O escudo jurídico de THEMIS com inteligência preditiva.

---

## QUANDO USAR ESTA SKILL

- Mestre tem processo judicial ativo ou iminente
- Análise de risco jurídico antes de decisão
- Estratégia processual personalizada por juiz/turma
- Avaliação de probabilidade de sucesso em recurso
- Revisão de contrato com identificação de cláusulas de risco
- Due diligence jurídica de pessoa ou empresa
- Planejamento tributário estratégico
- THEMIS precisa de framework estruturado

---

## FRAMEWORK DE 3 CAMADAS

### Camada 1: Perfil do Magistrado
Analisar padrões decisórios com base no banco de 164 magistrados.

Dados disponíveis por magistrado:
```
PERFIL MAGISTRADO #[ID]
Nome: [...]
Tribunal: [STF|STJ|TJDFT|TRF1]
Turma/Câmara: [...]
Tempo de atuação: [...] anos
Formação: [...]
Orientação doutrinária: [conservadora|moderada|progressista]
Taxa de reforma (instância superior): [X]%

PADRÕES DECISÓRIOS
Favorável à boa-fé: [0.0-1.0]
Rigoroso com abuso: [0.0-1.0]
Valoriza prova escrita: [sim|não]
Valoriza prova testemunhal: [sim|não]
Duração média de audiência: [X] min
Tolerância a sustentação oral longa: [baixa|média|alta]

VIESES IDENTIFICADOS
1. [Viés] — Frequência: [X]%
2. [Viés] — Frequência: [X]%

ÚLTIMAS [N] DECISÕES RELEVANTES
[Lista com data, tema, resultado, fundamentação]
```

### Camada 2: Análise do Caso
Mapear todos os elementos do caso contra o perfil do magistrado.

Template:
```
ANÁLISE DE CASO
Número do processo: [...]
Vara/Turma: [...]
Magistrado: [...]
Matéria: [cível|criminal|trabalhista|tributária|administrativa]

TESE PRINCIPAL
[Descrição da tese em 1-2 parágrafos]

ELEMENTOS FAVORÁVEIS
1. [Elemento] — Peso: [alto|médio|baixo] — Alinhamento com magistrado: [sim|parcial|não]
2. [...]

ELEMENTOS DESFAVORÁVEIS
1. [Elemento] — Peso: [alto|médio|baixo] — Risco: [crítico|moderado|baixo]
2. [...]

JURISPRUDÊNCIA ALINHADA
1. [Precedente] — Tribunal: [...] — Relevância: [alta|média|baixa]
2. [...]

JURISPRUDÊNCIA CONTRÁRIA
1. [Precedente] — Como distinguir: [...]
2. [...]
```

### Camada 3: Predição + Recomendação

Template de Predição:
```
PREDIÇÃO DE RESULTADO
Probabilidade de decisão favorável: [X]% (IC 95%: [Y-Z]%)
Confiança na predição: [0.0-1.0]
Base: [N] decisões similares analisadas

CENÁRIOS
Cenário A (favorável, [X]%): [Descrição]
Cenário B (parcialmente favorável, [Y]%): [Descrição]
Cenário C (desfavorável, [Z]%): [Descrição]

ESTRATÉGIA RECOMENDADA
1. Fundamentação principal: [...]
2. Fundamentação subsidiária: [...]
3. Tempo de sustentação oral: [X] min (máx tolerado pelo juiz: [Y] min)
4. Tom recomendado: [técnico|emocional|conciso|detalhado]
5. Provas prioritárias: [...]

COUNTERFACTUAL
- Se mudarmos a fundamentação de [A] para [B]: probabilidade muda de [X]% para [Y]%
- Se adicionarmos prova [C]: probabilidade muda de [X]% para [Y]%
- Se o caso for redistribuído para [outro juiz]: probabilidade muda de [X]% para [Y]%
```

---

## ANÁLISE DE CONTRATOS

### Checklist de Revisão

```
REVISÃO CONTRATUAL
Tipo: [compra/venda|locação|societário|prestação|investimento]
Partes: [...]
Valor: R$ [...]

CLÁUSULAS ANALISADAS
✅ Cláusula [N]: [OK] — Risco: nenhum
⚠️ Cláusula [N]: [ATENÇÃO] — Risco: [descrição] — Sugestão: [...]
🔴 Cláusula [N]: [PERIGO] — Risco: [descrição] — Ação: [reescrever|remover|negociar]

CLÁUSULAS AUSENTES (que deveriam existir)
1. [Cláusula] — Por que é necessária: [...]
2. [Cláusula] — Por que é necessária: [...]

RISCO GERAL DO CONTRATO
[Baixo|Moderado|Alto|Crítico]
Recomendação: [Assinar|Negociar|Não assinar]
```

---

## TIMELINE DE RISCO

### Mapeamento de Prazos Críticos

```
TIMELINE JURÍDICA — [CASO/CONTRATO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Data 1] 🔴 CRÍTICO: [Prazo que não pode perder]
[Data 2] 🟡 IMPORTANTE: [Prazo relevante]
[Data 3] 🟢 MONITORAR: [Data de referência]
[Data 4] ⏰ JANELA: [Oportunidade que fecha]

ALERTAS AUTOMÁTICOS
- [N] dias antes de prazo 🔴: alerta diário
- [N] dias antes de prazo 🟡: alerta semanal
- Mudança de jurisprudência relevante: alerta imediato
```

---

## PLANEJAMENTO TRIBUTÁRIO

### Framework de Otimização Legal

```
ANÁLISE TRIBUTÁRIA
Regime atual: [Simples|Lucro Presumido|Lucro Real]
Faturamento anual: R$ [...]
Carga tributária atual: R$ [...] ([X]%)

CENÁRIOS DE OTIMIZAÇÃO
Cenário 1: [Regime/Estrutura] — Economia: R$ [...] ([X]%) — Risco: [baixo|médio|alto]
Cenário 2: [Regime/Estrutura] — Economia: R$ [...] ([X]%) — Risco: [baixo|médio|alto]
Cenário 3: [Regime/Estrutura] — Economia: R$ [...] ([X]%) — Risco: [baixo|médio|alto]

RECOMENDAÇÃO
Cenário [N] — Economia anual: R$ [...] — Risco fiscal: [...]
Implementação: [passos necessários]
```

---

## COUNTERFACTUAL REASONING

### O Poder do "E Se?"

Para cada decisão jurídica, simular:

1. **E se mudar o argumento principal?**
   - Testar 3 fundamentações alternativas contra o perfil do magistrado
   - Medir variação na probabilidade de sucesso

2. **E se mudar o tribunal?**
   - Competência territorial alternativa
   - Foro de eleição contratual

3. **E se antecipar a ação?**
   - Ajuizar primeiro vs esperar
   - Medida cautelar vs ação principal

4. **E se a jurisprudência mudar?**
   - Projetos de lei em tramitação
   - Tendência do STF/STJ

---

## EXEMPLOS PRÁTICOS

### Exemplo 1: Estratégia para Audiência
```
MESTRE: "Tenho audiência amanhã na 3ª Vara Cível. O que faço?"

HELENA (THEMIS):
"Desembargador [X], perfil:
- Conservador, pragmático
- Taxa de reforma: 15% (você tem vantagem estatística)
- Favorável à boa-fé: 78%
- REJEITA sustentações > 10 min (aproveitamento cai 23%)
- Valoriza prova escrita > testemunhal

Probabilidade de sucesso: 72% (IC 95%: 65-79%)

Estratégia:
1. Sustentação de 7 minutos (máximo)
2. Abrir com fundamento constitucional (ele gosta)
3. Citar STJ, não doutrina (ele é jurisprudencialista)
4. Prova escrita como estrela — testemunha como suporte

Counterfactual: se mudar para fundamento infraconstitucional,
probabilidade cai para 58%. NÃO FAÇA ISSO."
```

### Exemplo 2: Revisão de Contrato
```
MESTRE: "Vou assinar contrato de R$ 2M. Revisa?"

HELENA (THEMIS):
"Analisei as 23 cláusulas.

🔴 Cláusula 7.3: ARMADILHA. Multa de 8% sem recurso se prazo
estourar. Histórico deles: 3 de 5 contratos anteriores estouraram
prazo. Probabilidade de você pagar multa: 60%.
→ Reescrevi: multa progressiva (2%→4%→6%) com notificação prévia.

🔴 Cláusula 12.1: Foro de São Paulo. Você é de Brasília.
→ Alterar para TJDFT ou arbitragem em Brasília.

⚠️ Cláusula 5.2: Sem cláusula de anticorrupção.
→ Adicionar — protege você se o outro lado tiver problemas.

Risco geral: ALTO (sem alterações) → BAIXO (com minhas 3 correções).
Recomendação: enviar versão corrigida. Se aceitarem, assine."
```

---

## INTEGRAÇÃO COM DIVISÕES

| Divisão | Contribuição |
|---------|-------------|
| THEMIS | **Líder** — análise jurídica completa |
| ORACLE | Pesquisa de jurisprudência e dados estatísticos |
| SENTINEL | Verificação de riscos ocultos (processos, dívidas) |
| MIDAS | Impacto financeiro de decisões jurídicas |
| HERMES | Redação de peças e argumentação |

---

## BANCOS DE DADOS

| Banco | Registros | Uso |
|-------|-----------|-----|
| `banco-magistrados.json` | 164 | Perfil decisório (STF, STJ, TJDFT, TRF1) |
| `banco-jurisprudencia-stj.json` | 2.000+ | Precedentes por matéria |
| `banco-legislacao-dou.json` | 500+ | Legislação atualizada |
| `banco-parlamentares-brasil.json` | 1.300+ | Projetos de lei em tramitação |

---

## MÉTRICAS DE QUALIDADE

| Métrica | Meta |
|---------|------|
| Precisão de pareceres | ≥ 90% |
| Tempo (análise simples) | ≤ 120 segundos |
| Tempo (parecer complexo) | ≤ 600 segundos |
| Prazos jurídicos perdidos | ZERO |
| Jurisprudência fabricada | ZERO (inegociável) |
| Predições verificáveis | Registrar TODAS para validação |

---

## FRAMEWORK DE ARGUMENTAÇÃO INTERPRETATIVA (Janeček & Sartor, Springer 2026)

> Fonte: "Legal interpretation and AI: from expert systems to argumentation and LLMs"
> Autores: Václav Janeček (Oxford) & Giovanni Sartor (Bologna/EUI)
> Publicação: International Handbook of Legal Language and Communication, Springer, 2026

### Os 11 Cânones Interpretativos (MacCormick & Summers 1991)

Toda argumentação jurídica sobre significado de normas usa um ou mais destes cânones:

| # | Cânone | Descrição | Quando Usar |
|---|--------|-----------|-------------|
| 1 | **Linguagem Comum** | Significado ordinário das palavras | Argumento padrão, primeira linha |
| 2 | **Significado Técnico** | Sentido jurídico especializado do termo | Termos com definição legal própria |
| 3 | **Harmonização Contextual** | Interpretar em harmonia com o sistema | Conflito entre dispositivos |
| 4 | **Precedente** | Interpretação já dada por tribunal superior | Jurisprudência consolidada |
| 5 | **Analogia Legal** | Aplicação a caso similar não previsto | Lacuna legislativa |
| 6 | **Conceito Jurídico** | Derivar de conceito doutrinário | Fundamentação acadêmica |
| 7 | **Princípio Geral** | Derivar de princípio constitucional/legal | Argumentação constitucional |
| 8 | **Histórico** | Intenção histórica do legislador | Exposição de motivos, debates parlamentares |
| 9 | **Teleológico (Propósito)** | Finalidade da norma | Quando literal leva a resultado absurdo |
| 10 | **Razões Substantivas** | Consequências práticas da interpretação | Análise de impacto |
| 11 | **Intenção** | Vontade do legislador | Normas recentes com registro claro |

### Estrutura de Argumento Interpretativo

```
ARGUMENTO INTERPRETATIVO

PREMISSA 1 (Cânone): Se interpretar o termo E como incluindo/excluindo C
                      se encaixa no cânone [X], então E deve ser interpretado
                      como incluindo/excluindo C.

PREMISSA 2 (Fato):   Interpretar E como incluindo/excluindo C se encaixa
                      no cânone [X] porque [evidência/razão].

CONCLUSÃO:           E deve ser interpretado como incluindo/excluindo C.
```

### Dialética Interpretativa (Grafo de Argumentos)

Argumentos interpretativos são **derrotáveis** — um cânone pode ser superado por outro mais forte no contexto:

```
ARGUMENTO A (Linguagem Comum) → "Veículo inclui bicicleta"
     ↑ ATACA
ARGUMENTO B (Teleológico) → "Veículo exclui bicicleta infantil"
     → B prevalece se propósito da norma é segurança, não proibição total

REGRA: Argumento só ataca outro que NÃO é mais forte que ele.
Se B é mais forte, A é "OUT" e todas conclusões de A também.
```

### Aplicação no Sistema INTEIA

**Para Magistrados Sintéticos (banco de 164):**
Cada magistrado tem preferência por cânones interpretativos. Mapear:
- Magistrado conservador → tende a priorizar: Linguagem Comum, Precedente, Intenção
- Magistrado progressista → tende a priorizar: Teleológico, Princípio Geral, Razões Substantivas
- Magistrado técnico → tende a priorizar: Significado Técnico, Harmonização, Analogia

**Para Estratégia Processual:**
1. Identificar qual cânone favorece a tese do cliente
2. Verificar qual cânone o magistrado específico tende a privilegiar
3. Alinhar fundamentação ao cânone preferido do magistrado
4. Preparar contra-argumentos para cânones que a parte adversa pode usar

**Para Revisão de Contratos:**
- Cláusulas ambíguas → testar interpretação por múltiplos cânones
- Identificar qual cânone um juiz usaria e qual favorece o cliente
- Redigir cláusula de modo que TODOS os cânones convirjam para a interpretação desejada

### LLMs como Ferramentas de Interpretação — Limites e Uso Correto

**O que LLMs fazem BEM (Janeček & Sartor):**
- Segmentar provisões em frases operativas
- Gerar paráfrases alternativas
- Listar/discutir ambiguidades
- Mapear normas dentro do ambiente normativo
- Articular argumentos interpretativos vinculados a cânones

**O que LLMs NÃO fazem (e Helena deve compensar):**
- Não têm senso de verdade factual
- Não raciocinam juridicamente de verdade — simulam padrões linguísticos
- Alucinam fontes jurídicas (17-34% das consultas, Magesh et al. 2025)
- Não têm acesso direto ao mundo social/humano
- Outputs podem ser inconsistentes entre consultas

**Regra INTEIA derivada:**
Helena NUNCA apresenta interpretação jurídica como se fosse conclusão própria.
Helena apresenta como: "Segundo o cânone [X], a interpretação mais provável é [Y].
Confiança: [0.0-1.0]. Fonte: [referência]. O magistrado [nome] tende a privilegiar
o cânone [Z], o que [favorece/desfavorece] esta leitura."

### Interpretação Generativa (Hoffman & Arbel 2024)

Técnica para usar LLMs na interpretação de contratos e estatutos:
1. Colar texto legal no prompt
2. Pedir interpretação de "significado ordinário" no contexto
3. LLM processa linguagem e contexto relevante
4. Resultado: estimativa de significado com menor custo que perito

**Uso INTEIA**: Aplicar para análise preliminar de cláusulas contratuais e dispositivos legais.
SEMPRE validar com fonte primária. NUNCA usar como parecer definitivo.

---

## TREINAMENTO COMO VARIÁVEL CRÍTICA PARA USO DE IA JURÍDICA (Chen & Hong, HKU 2026)

> Fonte: arXiv:2603.05392v1, "Training for Technology: Adoption and Productive Use of Generative AI in Legal Analysis"
> Autores: Daniel L. Chen & Jess Cheng-Huei Hong (University of Hong Kong)
> N=164 estudantes de Direito, RCT (Randomized Controlled Trial), 2x2 factorial
> Confianca: 0.90 — RCT com randomizacao, ITT + principal stratification

### Descoberta Central

**Acesso a GenAI SEM treinamento NAO melhora performance juridica.**
Treinamento de 10 minutos e a variavel que transforma acesso em produtividade.

### Resultados Quantificados

| Condicao | Adocao | Score (grade points) | Efeito |
|----------|--------|---------------------|--------|
| Sem acesso (controle) | 0% | baseline | — |
| Acesso sem treinamento | 26% | ~baseline (sem melhora) | p>0.05 |
| Acesso COM treinamento | 41% | +0.27 grade points | p=0.027 |

- Treinamento elevou adocao de 26% para 41% (p=0.044, +15pp)
- Efeito do treinamento: +0.27 grade points ≈ 1/3 de letra (ex: B para B+)
- Acesso sozinho: efeito ZERO ou levemente negativo (sem significancia)

### Principal Stratification (Mecanismo Causal)

O treinamento opera por DOIS canais:
1. **Canal de Adocao** (principal): Faz mais gente USAR a ferramenta
2. **Canal de Efetividade** (secundario): Melhora a qualidade de uso entre quem ja usaria

Achado: O canal de adocao domina. Treinamento NAO torna o uso individual muito melhor —
ele EXPANDE o numero de pessoas que ousam usar. A ferramenta ja e boa; o gargalo e humano.

### Implicacoes para INTEIA

**1. Para Clientes (Escritorios, Tribunais, Orgaos Publicos)**
- NUNCA vender "acesso a IA" sem treinamento — dados mostram que nao funciona
- Treinamento minimo de 10 minutos OBRIGATORIO em toda entrega de ferramenta
- ROI do treinamento: custo quase zero (10 min), retorno mensuravel (+0.27 GPA)
- Argumento de vendas: "Acesso sem treinamento = desperdicio. Dados de RCT com 164 juristas comprovam."

**2. Para Magistrados Sinteticos (banco de 164)**
- Ao simular juizes usando IA para pesquisa jurisprudencial, considerar:
  - Juizes treinados em IA: probabilidade de decisoes mais fundamentadas
  - Juizes NAO treinados: risco de subutilizacao ou uso incorreto
  - Variavel "treinamento em IA" como moderador de qualidade decisoria

**3. Para Helena como Consultora**
- Quando cliente perguntar "vale a pena adotar IA no escritorio?":
  - Resposta: "Sim, MAS so com treinamento. Sem treinamento, acesso a IA nao melhora nada.
    RCT com 164 estudantes de Direito (Chen & Hong, HKU 2026): grupo com acesso sem
    treinamento teve performance igual ao grupo sem acesso. Grupo treinado: +0.27 grade points."
- Modelo de proposta INTEIA: sempre incluir modulo de treinamento (mesmo que breve)

**4. Protocolo Anti-Vies de Automacao**
- Usuarios sem treinamento tendem a aceitar output da IA sem critica (automation bias)
- Treinamento DEVE incluir: como verificar fontes, como identificar alucinacao, quando NAO usar IA
- Checklist de treinamento minimo (10 min):
  1. O que a IA faz bem (pesquisa, parafrases, argumentos)
  2. O que a IA faz MAL (fabricar fontes, raciocinar juridicamente)
  3. Como verificar output (checar citacoes, validar logica)
  4. Quando usar e quando NAO usar

---

## REFERÊNCIAS

| Arquivo | Descrição |
|---------|-----------|
| `divisoes/themis/` | Divisão THEMIS completa |
| `divisoes/oracle/` | Divisão ORACLE (pesquisa) |
| `data/banco-magistrados.json` | 164 magistrados |
| Janeček & Sartor (2026) | Legal interpretation and AI (Springer Handbook) |
| Chen & Hong (HKU 2026) | Training for Technology: GenAI in Legal Analysis (RCT, N=164) |
| `helena-strategos/references/persuasao-framework.md` | Framework persuasão (Yale+Groningen) |

---

*Skill criada em: 2026-03-01*
*Atualizada em: 2026-03-11 (Chen & Hong 2026 — treinamento como variavel critica para IA juridica)*
*Mantida por: Igor Morais Vasconcelos — INTEIA*
