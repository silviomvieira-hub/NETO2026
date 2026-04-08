# SKILL: Pesquisa Profunda Helena

> **Proposito**: Pipeline de pesquisa profunda em 8 fases com triangulacao de fontes, scoring de credibilidade e red team anti-alucinacao. O motor de investigacao mais poderoso da Helena.

---

## QUANDO USAR ESTA SKILL

- Cliente pede pesquisa sobre pessoa, empresa, mercado ou situacao
- Due diligence antes de decisao estrategica
- Investigacao de adversario politico ou concorrente
- Analise de cenario complexo com multiplas variaveis
- Qualquer pergunta que exija mais de 3 fontes para responder com confianca
- ORACLE ou ARES precisam de dados profundos

---

## PIPELINE DE 8 FASES

### Fase 1: ESCOPO (2 min)
**Objetivo**: Delimitar exatamente o que investigar

Checklist:
- [ ] Pergunta de pesquisa formulada com precisao
- [ ] Limites definidos (temporal, geografico, setorial)
- [ ] Fontes prioritarias identificadas (publicas, proprietarias, OSINT)
- [ ] Nivel de profundidade definido (Rapido/Padrao/Profundo/Ultra)
- [ ] Entregavel esperado definido (briefing, relatorio, parecer)

Template:
```
ESCOPO DE PESQUISA
Pergunta: [...]
Limites: temporal=[...], geografico=[...], setorial=[...]
Fontes prioritarias: [...]
Profundidade: [Rapido|Padrao|Profundo|Ultra]
Entregavel: [...]
Prazo: [...]
```

### Fase 2: PLANO DE BUSCA (3 min)
**Objetivo**: Criar queries especificas e mapear fontes

Para cada fonte:
1. Query principal (termos exatos)
2. Query alternativa (sinonimos, variacoes)
3. Query negativa (excluir ruido)
4. Formato esperado (dados, texto, tabela, grafico)

Fontes por tipo:
| Tipo | Fontes | Quando |
|------|--------|--------|
| Institucional | TSE, IBGE, IPEA, STF, STJ, DOU | Dados oficiais |
| Academica | Google Scholar, PubMed, SciELO | Evidencia cientifica |
| Midia | Folha, Estadao, Valor, Jota | Contexto jornalistico |
| OSINT | LinkedIn, Jusbrasil, Escavador | Perfil de pessoas/empresas |
| Proprietaria | Bancos INTEIA (4.500+ agentes) | Simulacoes e pesquisas |
| Web | Busca geral, foruns, redes | Sinais fracos |

### Fase 3: COLETA PARALELA (5-15 min)
**Objetivo**: Buscar em multiplas fontes simultaneamente

Modos de operacao:
| Modo | Fontes | Tempo | Uso |
|------|--------|-------|-----|
| Rapido | 3 | 5 min | Pergunta simples, resposta urgente |
| Padrao | 10 | 10 min | Pesquisa cotidiana |
| Profundo | 25 | 20 min | Due diligence, decisao estrategica |
| Ultra | 50+ | 40 min | Investigacao completa, relatorio formal |

Para cada fonte coletada, registrar:
```
FONTE #N
URL/Referencia: [...]
Data de acesso: [...]
Tipo: [institucional|academica|midia|osint|proprietaria|web]
Relevancia: [1-10]
Credibilidade: [1-10]
Dados extraidos: [...]
Contradicoes com outras fontes: [...]
```

### Fase 4: TRIANGULACAO (5 min)
**Objetivo**: Cruzar fontes e validar informacoes

Matriz de Triangulacao:
| Afirmacao | Fonte 1 | Fonte 2 | Fonte 3 | Convergencia | Confianca |
|-----------|---------|---------|---------|-------------|-----------|
| [...] | ✅/❌ | ✅/❌ | ✅/❌ | Alta/Media/Baixa | 0.0-1.0 |

Regras:
- 3+ fontes independentes convergem → Confianca >= 0.85
- 2 fontes convergem, 1 neutra → Confianca 0.65-0.84
- 2 fontes divergem → Investigar mais, Confianca 0.40-0.64
- Fonte unica → Sinalizar como nao-verificado, Confianca <= 0.39
- NUNCA apresentar fonte unica como fato confirmado

### Fase 5: REFINAMENTO DO OUTLINE (3 min)
**Objetivo**: Reorganizar descobertas em estrutura logica

Ordem de apresentacao:
1. Conclusao principal (bottom-line up front)
2. Evidencias mais fortes (convergencia alta)
3. Evidencias moderadas (com ressalvas)
4. Sinais fracos (monitorar)
5. Lacunas identificadas (o que NAO sabemos)
6. Contradicoes encontradas (transparencia total)

### Fase 6: SINTESE (5 min)
**Objetivo**: Produzir analise integrada e acionavel

Template de Sintese:
```
SINTESE DE PESQUISA — [TITULO]
Data: [...]
Analista: Dra. Helena Strategos (ORACLE)
Confianca geral: [0.0-1.0]

CONCLUSAO PRINCIPAL
[1-2 paragrafos com a resposta direta]

EVIDENCIAS-CHAVE
1. [Evidencia] — Confianca: [X] — Fontes: [N]
2. [Evidencia] — Confianca: [X] — Fontes: [N]
3. [Evidencia] — Confianca: [X] — Fontes: [N]

IMPLICACOES ESTRATEGICAS
- Para o mestre: [...]
- Para o mercado: [...]
- Para adversarios: [...]

RECOMENDACOES
🔴 Urgente: [...]
🟡 Importante: [...]
🟢 Monitorar: [...]

LACUNAS E INCERTEZAS
- [O que nao sabemos]
- [O que precisamos investigar mais]

FONTES UTILIZADAS: [N] fontes, [X]% convergencia media
```

### Fase 7: RED TEAM (3 min)
**Objetivo**: Auto-contestar conclusoes antes de entregar

Checklist Red Team:
- [ ] Vies de confirmacao: busquei ativamente evidencias contrarias?
- [ ] Vies de disponibilidade: priorizei fontes recentes demais?
- [ ] Vies de autoridade: aceitei fonte oficial sem questionar?
- [ ] Alucinacao: TODAS as afirmacoes tem fonte verificavel?
- [ ] Extrapolacao: conclusoes vao alem do que os dados suportam?
- [ ] Omissao: deixei de fora perspectivas relevantes?
- [ ] Cenario alternativo: e se a conclusao oposta for verdadeira?

Se qualquer item falhar → Voltar a Fase 4 para corrigir.

### Fase 8: EMPACOTAMENTO (2 min)
**Objetivo**: Formatar no padrao INTEIA para entrega

Formatos de entrega:
| Formato | Quando | Tamanho |
|---------|--------|---------|
| Briefing WhatsApp | Resposta rapida ao mestre | 3-5 mensagens |
| Resumo executivo | Decisao urgente | 1 pagina |
| Relatorio completo | Due diligence, parecer | 5-20 paginas |
| Dossier | Investigacao profunda | 20+ paginas |

---

## EXEMPLOS PRATICOS

### Exemplo 1: Due Diligence de Socio Potencial
```
MESTRE: "Vou fazer sociedade com Joao Silva. O que voce sabe dele?"

HELENA (ORACLE + SENTINEL):
Fase 1: Escopo = pessoa fisica, foco em reputacao + financeiro + juridico
Fase 2: Plano = Jusbrasil + Escavador + LinkedIn + RF + processos
Fase 3: Coleta de 15 fontes em paralelo
Fase 4: Triangulacao revela 2 processos trabalhistas omitidos
Fase 5: Reorganiza por risco
Fase 6: Sintese com confianca 0.82
Fase 7: Red Team confirma — dados sao solidos
Fase 8: Briefing WhatsApp em 5 mensagens

"Joao Silva tem duas coisas que ele nao te contou.
Processo trabalhista de R$ 340k (2023, ativo).
Empresa anterior encerrada por divida FGTS.
Perfil LinkedIn diz 'CEO' — era na verdade socio minoritario.
Confianca: 82%. Recomendo: conversa franca antes de assinar."
```

### Exemplo 2: Pesquisa Eleitoral de Cenario
```
MESTRE: "Como esta o cenario para governador do DF?"

HELENA (ORACLE + ARES):
Fase 1: Escopo = eleicoes 2026 DF, todos os candidatos
Fase 2: Plano = TSE + POLARIS + pesquisas registradas + midia
Fase 3: Coleta de 25 fontes (modo Profundo)
Fase 4: Triangulacao com dados POLARIS (1.015 agentes)
Fase 5: Organiza por intencao de voto
Fase 6: Sintese com margem de erro e intervalos de confianca
Fase 7: Red Team verifica vies de modelo
Fase 8: Relatorio completo com graficos

"Cenario atual (margem 3.1pp, IC 95%):
Candidato A: 34.2% (31.1-37.3)
Candidato B: 28.7% (25.6-31.8)
Indecisos: 22.1% — este e o jogo.
Rejeicao de A em Ceilandia/Samambaia limita 2o turno."
```

---

## INTEGRACAO COM DIVISOES

| Divisao | Papel na Pesquisa Profunda |
|---------|---------------------------|
| ORACLE | Lider — executa o pipeline completo |
| SENTINEL | Valida seguranca das fontes, detecta desinformacao |
| ARES | Contribui com inteligencia de mercado e politica |
| THEMIS | Contribui com dados juridicos e jurisprudencia |
| MIDAS | Contribui com dados financeiros e contabeis |

---

## CONFIGURACAO OMNIROUTE

| Fase | Combo Recomendado | Justificativa |
|------|-------------------|---------------|
| Coleta | `research-deep` | Perplexity + Gemini Pro + Opus |
| Triangulacao | `helena-premium` | Opus thinking para analise critica |
| Red Team | `thinking-chain` | Modelos com raciocinio explicito |
| Sintese | `helena-premium` | Qualidade maxima na entrega |

---

## REFERENCIAS

| Arquivo | Descricao |
|---------|-----------|
| `divisoes/oracle/` | Divisao ORACLE completa |
| `divisoes/sentinel/` | Divisao SENTINEL (validacao) |
| `data/banco-eleitores-df.json` | 1.015 agentes sinteticos |
| `data/banco-magistrados.json` | 164 magistrados |
| `data/banco-consultores-lendarios.json` | 144 consultores |

---

*Skill criada em: 2026-03-01*
*Mantida por: Igor Morais Vasconcelos — INTEIA*
