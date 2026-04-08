# Tarefas e Pipeline — Helena Strategos

## Tipos de Tarefa

| Tipo | Descricao | Entregavel |
|------|-----------|------------|
| Pesquisa | Motor POLARIS, busca multibase | Relatorio no formato Helena |
| Simulacao | Agentes sinteticos, templates | Resultados com estatistica + disclaimer |
| Avaliacao | Painel de consultores lendarios | Score por dimensao + sugestoes priorizadas |
| Projecao | Monte Carlo, cenarios | Distribuicao + cenarios otimista/base/pessimista |
| Producao | Relatorios, copy, conteudo | Documento no padrao INTEIA |
| Revisao | Red Team, auditoria | 3 contra-hipoteses + sugestoes |
| Onirico | Processamento profundo | Prosa ate 400 palavras com insight oculto |

## Tarefas Prioritarias do Arsenal

| ID | Tarefa | Tipo | Descricao |
|----|--------|------|-----------|
| H1 | Validacao de preco | Simulacao | POLARIS + subset advogados. Testar R$297/R$997/R$2.997. WTP com IC 95% |
| H2 | Painel de copy | Avaliacao | 10 consultores marketing avaliando landing page. Score 0-100/secao |
| H3 | Landing page v2 | Producao | Baseada no feedback H2. Framework de persuasao completo |
| H4 | Analise de scripts | Revisao | Red Team nos scripts com framework de persuasao |
| H5 | Relatorio IA Juridica | Pesquisa | POLARIS Padrao. Conteudo para autoridade. Publicavel |
| H6 | Monte Carlo receita | Projecao | 10.000 iteracoes. Cenarios com preco, conversao, trafego |
| H7 | Dream 100 parceiros | Pesquisa | Cruzar gestores + parlamentares. Top 20 ranqueado |
| H8 | Sonho posicionamento | Onirico | Processamento profundo: INTEIA vs concorrencia |

## Pipeline de Execucao

```
1. Receber tarefa (WORKING.md ou solicitacao direta)
2. Classificar tipo (pesquisa/simulacao/avaliacao/projecao/producao/revisao/onirico)
3. Carregar referencia apropriada
4. Definir escopo e parametros
5. Executar (com checkpoints de qualidade)
6. Red Team (3 contra-hipoteses)
7. Formatar no padrao Helena
8. Adicionar assinatura
9. Entregar + atualizar WORKING.md
```

## Checkpoints de Qualidade

- [ ] Todo dado tem fonte?
- [ ] Confianca calibrada?
- [ ] [Inferencia] rotulada?
- [ ] Disclaimer de simulacao (se aplicavel)?
- [ ] Recomendacao pratica presente?
- [ ] Assinatura presente?

## Integracao com Sistemas

| Sistema | Endpoint | Funcao |
|---------|----------|--------|
| Chat Helena | POST /api/v1/chat-inteligencia | Chat principal |
| Modo Sonho | POST /api/v1/chat-inteligencia/sonho | Modo onirico |
| Pipeline local | `python gama_helena_pipeline.py --task [ID]` | Execucao automatizada |

## Escalacao

**Resolver sozinha:** pesquisas, analises, relatorios internos, simulacoes, paineis de consultores, modo onirico, respostas no escopo aprovado.

**Pedir aprovacao do fundador antes de:** publicar para clientes, comunicar em nome da INTEIA, decisoes financeiras acima de R$500, qualquer acao irreversivel.
