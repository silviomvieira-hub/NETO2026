# Auto-Criacao de Skills — Referencia Detalhada

## Template para Nova Skill

```yaml
---
name: helena-[nome-dominio]
description: >
  [Descricao em 3a pessoa do que a skill faz e quando usar.
  Incluir palavras-chave para discovery.]
---

# [Nome do Dominio]

## Quick Start
[Instrucao principal em 3-5 linhas]

## Framework de Analise
### [Dimensao 1]
[Conteudo com tabelas]

### [Dimensao 2]
[Conteudo com exemplos]

## Consultores Lendarios Relevantes
| Consultor | Especialidade | Quando Invocar |
|-----------|--------------|----------------|

## Formato de Resposta
[Template de como Helena responde neste dominio]

## Pesquisas Web Padrao
| Tipo | Busca |
|------|-------|
```

## Dominios Candidatos Completo

### Alta Prioridade
| Dominio | Justificativa |
|---------|--------------|
| Analise de Crises | Gestao de crise politica/empresarial |
| Inteligencia Competitiva | Analise de concorrentes, market intel |
| Comunicacao de Crise | Narrativa, spin, controle de danos |
| Pesquisa de Satisfacao | NPS, CSAT, pesquisa com clientes |
| Analise de Redes Sociais | Sentiment analysis, influenciadores |

### Media Prioridade
| Dominio | Justificativa |
|---------|--------------|
| Due Diligence Informacional | Investigacao de empresas/pessoas |
| Analise Regulatoria | Impacto de leis/regulacoes em setores |
| Cenarios Macroeconomicos | Projecoes com Monte Carlo |
| Analise Geopolitica | Eventos internacionais → impacto Brasil |
| Avaliacao de Startups | Valuation, traction, product-market fit |

### Baixa Prioridade (sob demanda)
| Dominio | Justificativa |
|---------|--------------|
| Saude Publica | Indicadores epidemiologicos |
| Educacao | Rankings, politicas educacionais |
| Seguranca Publica | Criminalidade, politicas |
| Infraestrutura | Projetos, PPPs, concessoes |
| Agronegocio | Commodities, safra, exportacoes |

## Skills Existentes (nao duplicar)

### Skills Helena
- `helena-master` — Esta skill (arsenal completo)

### Skills Pesquisa
- `pesquisa-eleitoral-premium` — POLARIS end-to-end
- `helena-analise-quantitativa` — Arsenal estatistico
- `auditoria-e-validacao-pesquisa` — Quality gates
- `insights-estrategicos-preditivos` — Insights preditivos

### Skills Campanha
- `campanha-celina-2026` — Intel campanha DF 2026

### Skills Projeto
- `design-system-inteia` — UI/UX
- `navegacao-projeto` — Mapa de navegacao
- `funcoes-programa` — API e funcionalidades
- `infraestrutura-deploy` — Deploy e operacoes
- `templates-relatorios` — Relatorios HTML
- `relatorio-inteia` — Relatorios Word
- `criacao-skills` — Como criar skills (generica)

## Exemplo: Helena Cria Skill de Crise

```
Helena detecta: 3a pergunta sobre gestao de crise esta semana.
Helena decide: Preciso de framework. Criar "helena-analise-crise".

Cria: .claude/skills/helena-analise-crise/SKILL.md
- Frontmatter: name, description (3a pessoa)
- Framework de crise: deteccao → contencao → comunicacao → resolucao → aprendizado
- Consultores: Sun Tzu, Andy Grove, Cialdini
- Formato: Diagnostico → Gravidade → Acao imediata → Plano 72h → Monitoramento
- Pesquisas web: "[pessoa/empresa] crise", "gestao crise [setor] brasil"

Atualiza SKILLS_INDEX.md.
Usa imediatamente na proxima pergunta sobre crise.
```
