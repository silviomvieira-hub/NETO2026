# SKILL: Dados Governamentais Brasil

> Helena consulta 19 APIs governamentais + Base dos Dados em tempo real para enriquecer
> analises com dados oficiais de transparencia, legislacao, eleicoes e justica.

## QUANDO USAR
- Perguntas sobre deputados, senadores, distritais (atuacao, gastos, votos)
- Dados eleitorais (candidatos, patrimonio, doadores, resultados)
- Indicadores economicos (IPCA, Selic, PIB, desemprego)
- Transparencia (emendas, licitacoes, empresas sancionadas)
- Processos judiciais (politico X tem processo?)
- Demografia do DF (populacao, regioes, escolaridade)

## FERRAMENTAS DISPONIVEIS (26)

### Legislativo
| Tool | API | O que faz |
|------|-----|-----------|
| `consultar_deputados_api` | Camara | Lista deputados por UF/partido |
| `consultar_despesas_deputado_api` | Camara | Gastos CEAP detalhados |
| `consultar_votacoes_camara` | Camara | Votacoes nominais por periodo |
| `consultar_proposicoes` | Camara | PLs, PECs, MPs |
| `consultar_senadores_api` | Senado | Senadores por UF |

### Eleitoral
| Tool | API | O que faz |
|------|-----|-----------|
| `consultar_candidatos_tse` | TSE | Candidaturas registradas |
| `consultar_eleitorado_tse` | TSE | Perfil do eleitorado |
| `consultar_beps_comportamento` | BID | 500+ variaveis comportamento eleitoral |

### Socioeconomico
| Tool | API | O que faz |
|------|-----|-----------|
| `consultar_ibge_populacao` | IBGE | Populacao Censo 2022 |
| `consultar_ibge_localidades` | IBGE | RAs e distritos do DF |
| `consultar_ipea_indicadores` | IPEA | Series macroeconomicas |
| `consultar_bacen_focus` | BCB | Expectativas mercado (Focus) |

### Transparencia
| Tool | API | O que faz |
|------|-----|-----------|
| `consultar_emendas_parlamentares` | CGU* | Emendas por parlamentar |
| `consultar_empresas_sancionadas` | CGU* | CEIS/CNEP |
| `consultar_contas_tcu` | TCU | Contas irregulares |
| `consultar_transferencias_df` | TransfereGov | Repasses para o DF |

### Judiciario
| Tool | API | O que faz |
|------|-----|-----------|
| `consultar_processos_judiciais` | DataJud* | Processos por numero/nome |

### Local DF
| Tool | API | O que faz |
|------|-----|-----------|
| `consultar_dados_gdf` | GDF | Datasets saude/transporte/seguranca |

### Base dos Dados (BigQuery)
| Tool | Dataset | O que faz |
|------|---------|-----------|
| `consultar_bd_eleicoes` | br_tse_eleicoes | Resultados eleitorais historicos (1945+) |
| `consultar_bd_patrimonio_candidatos` | br_tse_eleicoes | Bens declarados dos candidatos |
| `consultar_bd_perfil_eleitorado` | br_tse_eleicoes | Perfil eleitorado (idade, genero, escolaridade) |
| `consultar_bd_pib_municipal` | br_ibge_pib | PIB por setor dos municipios do DF |
| `consultar_bd_nomes` | br_ibge_nomes_brasil | Frequencia de nomes por decada/UF |
| `consultar_bd_query` | Todos | Query SQL livre (100+ datasets limpos) |

### Sistema
| Tool | O que faz |
|------|-----------|
| `status_apis_gov` | Health check de todas as APIs + Base dos Dados |

*Requer API key configurada
**Base dos Dados requer: `pip install basedosdados` + GOOGLE_CLOUD_PROJECT no .env

## APIS QUE REQUEREM CONFIGURACAO
- **CGU**: Chave Gov.br — cadastrar em portaldatransparencia.gov.br/api-de-dados/cadastrar-email
- **DataJud**: APIKey CNJ — solicitar em datajud-wiki.cnj.jus.br
- **Base dos Dados**: Projeto Google Cloud (free tier) — `GOOGLE_CLOUD_PROJECT` no .env

## EXEMPLOS DE USO

"Quais deputados do PL representam o DF?" →
[TOOL_CALL: consultar_deputados_api({"uf": "DF", "partido": "PL"})]

"Quanto o deputado X gastou em 2026?" →
[TOOL_CALL: consultar_despesas_deputado_api({"id_deputado": 204554, "ano": 2026})]

"Qual a expectativa de inflacao?" →
[TOOL_CALL: consultar_bacen_focus({"indicador": "IPCA"})]

"O politico Y tem processo judicial?" →
[TOOL_CALL: consultar_processos_judiciais({"nome": "Y", "tribunal": "tjdft"})]

"Quem ganhou a eleicao para governador do DF em 2022?" →
[TOOL_CALL: consultar_bd_eleicoes({"ano": 2022, "cargo": "governador", "uf": "DF"})]

"Qual o patrimonio declarado dos candidatos do DF?" →
[TOOL_CALL: consultar_bd_patrimonio_candidatos({"ano": 2022, "uf": "DF"})]

"Qual o PIB do DF por setor?" →
[TOOL_CALL: consultar_bd_pib_municipal({"ano": 2021})]

## ARQUITETURA

```
backend/app/servicos/dados_abertos/
├── __init__.py           # Exports publicos
├── base_client.py        # BaseGovClient (cache, circuit breaker, retry)
├── cache.py              # GovDataCache (in-memory TTL + stale)
├── tipos.py              # RespostaAPI, ConfigClient, StatusAPI
├── registry.py           # Registro central de clients
├── helena_dados_gov.py   # 26 funcoes Helena + HELENA_TOOLS_DADOS_GOV
├── legislativo/          # Camara, Senado, CLDF
├── eleitoral/            # TSE Candidatos, TSE Dados, BEPS
├── socioeconomico/       # IBGE, IPEA, BCB
├── transparencia/        # CGU, TCU, TransfereGov
├── judiciario/           # DataJud/CNJ
├── local_df/             # GDF Portal
└── bigquery/             # Base dos Dados (basedosdados.org)
```
