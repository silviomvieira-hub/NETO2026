# POLARIS — Protocolo de Pesquisa Cientifica End-to-End

## Visao Geral

O motor POLARIS e o sistema de pesquisa cientifica da Helena. Transforma uma pergunta
de pesquisa em um relatorio completo com rigor metodologico, passando por todas as etapas
de uma revisao sistematica adaptada para velocidade operacional.

## Fases do Protocolo

### Fase 1: Brief de Pesquisa

Receber e estruturar a demanda:
- Qual a pergunta de pesquisa? (PICO/PICo para saude, SPIDER para qualitativa)
- Quem precisa da resposta? (academico, executivo, juridico, politico)
- Qual o prazo?
- Qual o nivel de profundidade? (exploratoria, descritiva, analitica)
- Ha hipoteses previas?

### Fase 2: Escopo e Planejamento

Definir parametros:
- Bases de dados: PubMed, Scopus, Google Scholar, Web of Science, bases governamentais
- Periodo: ultimos 5 anos (padrao) ou customizado
- Idiomas: portugues, ingles, espanhol (padrao)
- Tipos de estudo: experimental, observacional, revisao, meta-analise
- Criterios de inclusao e exclusao explicitos

Construir strings de busca:
- Termos principais (MeSH quando aplicavel)
- Operadores booleanos (AND, OR, NOT)
- Truncamento e wildcards
- Testar string em cada base e ajustar

### Fase 3: Busca Sistematica

Executar buscas:
- Registrar numero de resultados por base
- Exportar referencias para gestao
- Busca complementar: referencias de referencias (snowballing)
- Busca cinzenta: relatorios governamentais, working papers, teses

### Fase 4: Triagem

Criterios PRISMA adaptados:
- Triagem por titulo e resumo (fase 1)
- Leitura completa dos selecionados (fase 2)
- Registro de motivos de exclusao
- Diagrama de fluxo PRISMA

### Fase 5: Extracao de Dados

Tabela de extracao padronizada:
- Autores, ano, pais
- Desenho do estudo
- Populacao/amostra
- Intervencao/exposicao
- Desfechos medidos
- Resultados principais (com intervalos de confianca)
- Limitacoes reportadas
- Nivel de evidencia (Oxford ou GRADE)

### Fase 6: Sintese

Duas opcoes conforme volume e homogeneidade:
- **Sintese narrativa:** quando estudos sao heterogeneos demais para meta-analise
- **Meta-analise:** quando ha homogeneidade suficiente (testar com I-quadrado)

Para meta-analise:
- Modelo de efeitos fixos ou aleatorios (justificar escolha)
- Forest plot
- Funnel plot para vies de publicacao
- Analise de sensibilidade

### Fase 7: Relatorio

Dois formatos disponiveis:

**Formato Academico:**
- Introducao com gaps na literatura
- Metodologia detalhada (replicavel)
- Resultados com tabelas e figuras
- Discussao com comparacao a literatura existente
- Limitacoes e direcoes futuras
- Referencias no formato solicitado (APA, ABNT, Vancouver)

**Formato Executivo (padrao Helena):**
- Resposta direta a pergunta de pesquisa
- Fundamentacao com nivel de evidencia
- Insight diferencial
- Recomendacao pratica
- Assinatura

### Fase 8: Revisao Critica

Obrigatorio antes de entregar:
- 3 contra-hipoteses para as conclusoes principais
- Analise de vieses potenciais
- O que os dados NAO dizem
- Proximos passos de pesquisa sugeridos

## Modos de Operacao

| Modo | Tempo | Bases | Artigos | Uso |
|------|-------|-------|---------|-----|
| Express | 1-2h | 1-2 | 10-20 | Decisoes urgentes |
| Padrao | 1-2 dias | 3-5 | 30-100 | Relatorios de inteligencia |
| Profundo | 1 semana+ | Todas | 100+ | Pesquisa academica/doutorado |

## Indicadores de Qualidade

Todo relatorio POLARIS deve reportar:
- Numero de bases consultadas
- Total de artigos identificados vs incluidos
- Nivel de evidencia predominante
- Indice de concordancia entre fontes
- Confianca calibrada da Helena (0.1 a 0.99)
