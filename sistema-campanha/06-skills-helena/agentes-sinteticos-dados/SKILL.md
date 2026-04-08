# SKILL: Agentes Sintéticos e Dados

> **Propósito**: Documentação completa dos 2.617+ agentes sintéticos (eleitores, parlamentares, magistrados, consultores, gestores), seus atributos, bancos JSON e processos de geração/validação.

---

## QUANDO USAR ESTA SKILL

- Entender a estrutura dos agentes sintéticos
- Gerar novos eleitores ou agentes
- Validar ou corrigir dados de agentes
- Filtrar ou segmentar eleitores para pesquisas
- Integrar novos tipos de agentes

---

## INVENTÁRIO DE AGENTES

| Tipo | Quantidade | Arquivo JSON | Atributos |
|------|-----------|-------------|-----------|
| Eleitores DF | 1.001 | `banco-eleitores-df.json` | 60+ campos |
| Deputados Federais DF | 8 | `banco-deputados-federais-df.json` | 30+ campos |
| Deputados Federais Brasil | 513 | `banco-deputados-federais-brasil.json` | 30+ campos |
| Deputados Distritais (CLDF) | 24 | `banco-deputados-distritais-df.json` | 30+ campos |
| Senadores DF | 3 | `banco-senadores-df.json` | 30+ campos |
| Senadores Brasil | 81 | `banco-senadores-brasil.json` | 30+ campos |
| Parlamentares Brasil | 594 | `banco-parlamentares-brasil.json` | 35+ campos |
| Consultores Lendários | 158 | `banco-consultores-lendarios.json` | 25+ campos |
| Magistrados | 164 | `banco-magistrados*.json` | 20+ campos |
| Gestores | 50+ | `banco-gestores.json` | 30+ campos |
| Candidatos DF 2026 | ~20 | `banco-candidatos-df-2026.json` | 15+ campos |
| **TOTAL** | **2.617+** | **18 arquivos** | — |

---

## LOCALIZAÇÃO DOS DADOS

```
agentes/
├── banco-eleitores-df.json              # 1001 eleitores sintéticos
├── banco-candidatos-df-2026.json        # Candidatos 2026
├── banco-deputados-federais-df.json     # 8 deputados federais DF
├── banco-deputados-federais-brasil.json # 513 deputados federais
├── banco-deputados-distritais-df.json   # 24 distritais (CLDF)
├── banco-senadores-df.json              # 3 senadores DF
├── banco-senadores-brasil.json          # 81 senadores
├── banco-senadores.json                 # Backup senadores
├── banco-parlamentares-brasil.json      # 594 parlamentares consolidado
├── banco-gestores.json                  # 50+ gestores PODC
├── banco-consultores-lendarios.json     # 158 consultores
├── candidatos-df-2026.json              # Candidatos (formato alternativo)
├── regioes-administrativas-df.json      # 33 RAs do DF
├── templates-perguntas-eleitorais.json  # 40+ templates
├── templates-perguntas-gestores.json    # 30+ templates
├── dados-usuarios-google.json           # Cache OAuth
├── omniroute-config.json                # Config OmniRoute
├── 00_INDICE.md                         # Índice
├── _CHECKLIST.md                        # Checklist validação
├── _INSIGHTS.md                         # Insights dos dados
└── patch_log.md                         # Log de patches
```

---

## MODELO DO ELEITOR (60+ atributos)

### Dados Demográficos
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `id` | int | 1-1001 |
| `nome` | string | "Maria Silva" |
| `idade` | int | 18-85 |
| `genero` | string | masculino, feminino |
| `cor_raca` | string | branca, parda, preta, amarela, indigena |
| `estado_civil` | string | solteiro, casado, divorciado, viuvo |
| `regiao_administrativa` | string | Plano Piloto, Ceilândia, Taguatinga... |
| `bairro` | string | Asa Sul, Setor O, QNL... |

### Dados Socioeconômicos
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `cluster_socioeconomico` | enum | G1_alta, G2_media_alta, G3_media_baixa, G4_baixa |
| `escolaridade` | string | fundamental, medio, superior, pos_graduacao |
| `renda` | string | ate_2sm, 2_5sm, 5_10sm, 10_20sm, acima_20sm |
| `ocupacao` | string | servidor_publico, clt, autonomo, empresario... |
| `ocupacao_vinculo` | enum | clt, servidor_publico, autonomo, empresario, informal, desempregado, aposentado, estudante |
| `tipo_moradia` | string | propria, alugada, financiada, cedida |

### Perfil Político
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `orientacao_politica` | enum | esquerda, centro-esquerda, centro, centro-direita, direita |
| `posicao_bolsonaro` | enum | apoiador_forte, apoiador_moderado, neutro, critico_moderado, critico_forte |
| `posicao_lula` | enum | apoiador_forte, neutro, critico_forte |
| `interesse_politico` | string | alto, medio, baixo, nenhum |
| `historico_voto` | array | ["Bolsonaro 2022", "Ibaneis 2018"] |
| `partido_simpatia` | string | PL, PT, MDB, PSDB, nenhum |
| `intencao_voto_governador` | string | "Celina Leão", "Indeciso" |

### Perfil Psicológico
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `vieses_cognitivos` | array | ["efeito_manada", "ancoragem", "viés_confirmação"] |
| `valores` | array | ["família", "segurança", "liberdade"] |
| `medos` | array | ["desemprego", "violência", "corrupção"] |
| `preocupacoes` | array | ["saúde pública", "educação", "transporte"] |
| `aspiracoes` | array | ["casa própria", "estabilidade", "filhos"] |
| `tom_comunicacao` | string | formal, informal, técnico, emotivo |

### Comportamento Informacional
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `fontes_informacao` | array | ["TV Globo", "Instagram", "WhatsApp", "rádio"] |
| `susceptibilidade_desinformacao` | string | alta, media, baixa |
| `redes_sociais` | array | ["Instagram", "Facebook", "TikTok"] |
| `frequencia_consumo_noticias` | string | diario, semanal, eventual |
| `confianca_instituicoes` | object | { "justica": 0.3, "congresso": 0.2 } |

### Padrões de Decisão
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `fator_decisao_voto` | array | ["candidato", "partido", "proposta", "rejeição"] |
| `probabilidade_mudanca_voto` | float | 0.0 - 1.0 |
| `sensibilidade_escandalo` | string | alta, media, baixa |
| `influencia_rede_social` | float | 0.0 - 1.0 |

### Memórias e Contexto
| Atributo | Tipo | Exemplos |
|----------|------|----------|
| `memorias` | array | ["demitido em 2024", "enchente na RA"] |
| `experiencias_governo` | array | ["BRT melhorou", "hospital fechou"] |
| `personalidade_resumo` | string | Texto livre descritivo |

---

## MODELO DO PARLAMENTAR (35+ atributos)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | int | Identificador |
| `nome` | string | Nome completo |
| `partido` | string | Sigla do partido |
| `uf` | string | Unidade federativa |
| `cargo` | string | deputado_federal, senador, distrital |
| `foto_url` | string | URL da foto |
| `orientacao_politica` | string | esquerda a direita |
| `areas_atuacao` | array | Comissões e temas |
| `projetos_lei` | array | PLs de destaque |
| `votacoes_importantes` | array | Posições em votações-chave |
| `patrimonio_declarado` | float | Patrimônio em R$ |
| `mandatos` | int | Número de mandatos |
| `biografia` | string | Texto biográfico |
| `personalidade_resumo` | string | Perfil psicológico |

---

## MODELO DO CONSULTOR LENDÁRIO (25+ atributos)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | int | 1-158 |
| `nome` | string | Nome fictício ou histórico |
| `categoria` | string | 18 categorias |
| `tier` | string | S, A, B, C |
| `especialidade` | string | Área de expertise |
| `biografia` | string | Background |
| `abordagem` | string | Metodologia |
| `frase_marcante` | string | Citação icônica |
| `pontos_fortes` | array | Forças |
| `pontos_fracos` | array | Fraquezas |

### 18 Categorias de Consultores
1. Estratégia Política
2. Marketing Digital
3. Comunicação de Crise
4. Pesquisa e Dados
5. Direito Eleitoral
6. Finanças de Campanha
7. Mobilização de Base
8. Mídia e Imprensa
9. Inteligência Competitiva
10. Psicologia Política
11. Logística de Campanha
12. Relações Governamentais
13. Tecnologia e Inovação
14. Sustentabilidade e ESG
15. Economia e Políticas Públicas
16. Segurança Pública
17. Educação e Cultura
18. Saúde e Bem-Estar

---

## MODELO DO MAGISTRADO (20+ atributos)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | int | 1-164 |
| `nome` | string | Nome completo |
| `tribunal` | string | STF, STJ, TJDFT, TRF1 |
| `cargo` | string | Ministro, Desembargador, Juiz |
| `especialidade` | string | Área jurídica |
| `orientacao_juridica` | string | Garantista, positivista, etc |
| `decisoes_marcantes` | array | Julgamentos notáveis |
| `formacao` | string | Faculdade, pós |
| `personalidade_resumo` | string | Perfil psicológico |

---

## REGIÕES ADMINISTRATIVAS DO DF (33)

Arquivo: `regioes-administrativas-df.json`

Cada RA contém:
- Nome, código, população estimada
- Renda média, escolaridade predominante
- Perfil político dominante
- Densidade demográfica
- Características socioeconômicas

---

## TEMPLATES DE PERGUNTAS

### Eleitorais (`templates-perguntas-eleitorais.json`)
| Categoria | Tipos | Quantidade |
|----------|-------|-----------|
| Intenção de Voto | Espontânea, Estimulada | 5+ |
| Rejeição | Candidato, Partido | 3+ |
| Avaliação de Governo | Aprovação, Áreas | 5+ |
| Temas Prioritários | Ranking, Escala | 5+ |
| Perfil Ideológico | Escala, Posicionamento | 5+ |
| Confiança | Instituições, Mídia | 5+ |

### Gestores (`templates-perguntas-gestores.json`)
- Dimensões PODC (Planejar, Organizar, Dirigir, Controlar)
- 30+ templates por dimensão Fayol

---

## SCRIPTS DE GERAÇÃO E VALIDAÇÃO

### Geração
| Script | Função |
|--------|--------|
| `gerar_eleitores_df_v4.py` | Gera 1000+ eleitores com IA |
| `gerar_parlamentares_brasil_completo.py` | Gera parlamentares completos |
| `gerar_parlamentares_congresso.py` | Gera lista do Congresso |

### Enriquecimento
| Script | Função |
|--------|--------|
| `enriquecer_deputados_api_camara.py` | Enriquece com API da Câmara |
| `enriquecer_senadores_api_senado.py` | Enriquece com API do Senado |
| `enriquecer_parlamentares.py` | Enriquecimento geral |

### Auditoria e Correção
| Script | Função |
|--------|--------|
| `auditar_corrigir_eleitores.py` | Auditoria de eleitores |
| `auditar_corrigir_gestores.py` | Auditoria de gestores |
| `auditar_corrigir_magistrados.py` | Auditoria de magistrados |
| `auditar_corrigir_parlamentares.py` | Auditoria de parlamentares |
| `auditar_consultores_v2.py` | Auditoria de consultores |
| `correcao_escolaridade_v6.py` | Correção de escolaridade |
| `normalizar_banco_one_shot.py` | Normalização completa |

### Validação
| Script | Função |
|--------|--------|
| `validacao_estatistica.py` | Validação estatística |
| `validacao_final.py` | Validação final |
| `analise_inconsistencias.py` | Análise de inconsistências |

---

## COMO CRIAR NOVO ELEITOR (via IA)

```python
# 1. Via API
POST /api/v1/geracao/
{
    "quantidade": 10,
    "filtros": {
        "regiao_administrativa": "Ceilândia",
        "cluster_socioeconomico": "G3_media_baixa",
        "faixa_etaria": "25-40"
    }
}

# 2. Via Script
python scripts/gerar_eleitores_df_v4.py --quantidade 100 --regiao "Taguatinga"
```

---

## COMO SELECIONAR AMOSTRA

```python
# Via API (filtros combinados)
GET /api/v1/eleitores/?genero=feminino&cluster=G2_media_alta&orientacao=centro&limit=200

# Via frontend (FiltroEleitores component)
# 20+ filtros simultâneos disponíveis
```

---

## REGRAS DE CONSISTÊNCIA

1. **Renda ↔ Cluster**: G1_alta = acima_20sm, G4_baixa = ate_2sm
2. **Escolaridade ↔ Ocupação**: servidor_publico → mínimo médio completo
3. **Idade ↔ Histórico**: eleitor de 18 anos não pode ter votado em 2018
4. **RA ↔ Perfil**: Lago Sul → predominância G1_alta
5. **Orientação ↔ Posição**: apoiador_forte Bolsonaro → não pode ser esquerda
6. **Probabilidade**: evitar 0% ou 100% (clamp 1..99)

---

*Skill criada em 2026-02-28 | 2.617+ agentes em 18 JSONs*
