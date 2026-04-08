# SKILL: Dados Públicos Brasil (Base dos Dados)

> **Propósito**: Acessar dados públicos brasileiros (eleições, economia, segurança, demografia) via Base dos Dados para alimentar análises da Helena com dados reais.

---

## QUANDO USAR ESTA SKILL

- Calibrar agentes sintéticos com dados reais do TSE (perfil eleitorado DF)
- Validar pesquisas eleitorais cruzando com resultados históricos reais
- Enriquecer relatórios com dados oficiais (PIB, criminalidade, demografia)
- Criar seção "Dados Oficiais" em entregas com fonte verificável
- Análises socioeconômicas por região administrativa / município
- Comparar resultados sintéticos vs resultados reais de eleições passadas

---

## PLATAFORMA

**Base dos Dados** (basedosdados.org) — plataforma brasileira de dados abertos que limpa, padroniza e disponibiliza datasets públicos via BigQuery + Python + R.

- **Custo**: Zero (1 TB/mês grátis no Google Cloud)
- **Acesso**: Python SDK (`basedosdados`) ou SQL direto no BigQuery
- **Site**: https://basedosdados.org/search
- **SDK**: https://github.com/basedosdados/sdk
- **PyPI**: https://pypi.org/project/basedosdados/

---

## DATASETS RELEVANTES PARA INTEIA

| Dataset | ID BigQuery | Conteúdo | Uso Helena |
|---------|------------|----------|------------|
| **Eleições TSE** (desde 1945) | `br_tse_eleicoes` | Candidatos, resultados, bens, perfil eleitorado, financiamento | Validar pesquisas, histórico eleitoral DF |
| **Censo 2022 IBGE** | `br_ibge_censo_demografico` | Demografia por município/RA | Calibrar agentes sintéticos |
| **PIB Municipal** | `br_ibge_pib` | PIB e renda per capita por região | Perfil socioeconômico |
| **Anuário Segurança Pública** | `anuario-brasileiro-de-seguranca-publica` | Criminalidade por estado/tipo | Análise de medo/preocupação |
| **Diretórios Brasil** | `br_bd_diretorios_brasil` | Códigos IBGE municípios/estados | Joins entre datasets |
| **PNAD Contínua** | `br_ibge_pnad` | Emprego, renda, educação | Indicadores sociais |

### Tabelas-Chave do TSE (`br_tse_eleicoes`)

| Tabela | Conteúdo |
|--------|----------|
| `perfil_eleitorado` | Perfil dos eleitores por município/zona |
| `resultados_candidato` | Votos por candidato/município |
| `candidatos` | Dados dos candidatos (partido, cargo, bens) |
| `bens_candidato` | Patrimônio declarado |
| `receitas_candidato` | Financiamento de campanha |
| `despesas_candidato` | Gastos de campanha |
| `partidos` | Dados dos partidos |

---

## INSTALAÇÃO E CONFIGURAÇÃO

### 1. Instalar SDK
```bash
pip install basedosdados
```

### 2. Configuração Google Cloud (primeira vez)
```python
import basedosdados as bd

# Na primeira execução, o SDK guia a configuração:
# 1. Criar projeto gratuito no Google Cloud Console
# 2. Informar o billing_project_id
# O SDK faz o setup automático
```

### 3. Variável de ambiente (recomendado)
```bash
# .env
BD_PROJECT_ID=inteia-pesquisa
```

---

## FUNÇÕES DO SDK PYTHON

### Descoberta de Dados
```python
import basedosdados as bd

# Buscar datasets por palavra-chave
bd.list_datasets(filter_by='eleicao', with_description=True)

# Listar tabelas de um dataset
bd.list_dataset_tables('br_tse_eleicoes', with_description=True)

# Ver colunas de uma tabela
bd.get_table_columns('br_tse_eleicoes', 'perfil_eleitorado')

# Verificar tamanho antes de baixar
bd.get_table_size('br_tse_eleicoes', 'perfil_eleitorado',
                  billing_project_id='inteia-pesquisa')
```

### Carregar Dados
```python
# Tabela inteira (cuidado com tamanho)
df = bd.read_table(
    dataset_id='br_tse_eleicoes',
    table_id='perfil_eleitorado',
    billing_project_id='inteia-pesquisa'
)

# Query SQL customizada (RECOMENDADO para tabelas grandes)
df = bd.read_sql(
    query="SELECT * FROM `basedosdados.br_tse_eleicoes.perfil_eleitorado` WHERE sigla_uf = 'DF'",
    billing_project_id='inteia-pesquisa'
)
```

---

## QUERIES PRONTAS PARA HELENA

### 1. Eleitorado do DF por perfil
```python
df_eleitores_df = bd.read_sql("""
    SELECT *
    FROM `basedosdados.br_tse_eleicoes.perfil_eleitorado`
    WHERE sigla_uf = 'DF'
      AND ano = 2022
""", billing_project_id="inteia-pesquisa")
```

### 2. Resultados eleitorais DF (últimas eleições)
```python
df_resultados = bd.read_sql("""
    SELECT ano, cargo, nome_candidato, partido, numero_candidato,
           SUM(votos) as total_votos
    FROM `basedosdados.br_tse_eleicoes.resultados_candidato`
    WHERE sigla_uf = 'DF'
      AND ano >= 2018
      AND cargo = 'governador'
    GROUP BY ano, cargo, nome_candidato, partido, numero_candidato
    ORDER BY ano DESC, total_votos DESC
""", billing_project_id="inteia-pesquisa")
```

### 3. PIB do Distrito Federal
```python
df_pib = bd.read_sql("""
    SELECT *
    FROM `basedosdados.br_ibge_pib.municipio`
    WHERE id_municipio = '5300108'
    ORDER BY ano DESC
""", billing_project_id="inteia-pesquisa")
```

### 4. Segurança pública por UF
```python
df_seguranca = bd.read_sql("""
    SELECT *
    FROM `basedosdados.br_fbsp_absp.uf`
    WHERE sigla_uf = 'DF'
    ORDER BY ano DESC
""", billing_project_id="inteia-pesquisa")
```

### 5. Demografia censo por município
```python
df_censo = bd.read_sql("""
    SELECT *
    FROM `basedosdados.br_ibge_censo_demografico.setor_censitario_basico_2010`
    WHERE id_municipio = '5300108'
""", billing_project_id="inteia-pesquisa")
```

### 6. Candidatos e patrimônio
```python
df_patrimonio = bd.read_sql("""
    SELECT c.nome_candidato, c.partido, c.cargo,
           SUM(b.valor_item) as patrimonio_total
    FROM `basedosdados.br_tse_eleicoes.candidatos` c
    JOIN `basedosdados.br_tse_eleicoes.bens_candidato` b
      ON c.id_candidato_bd = b.id_candidato_bd AND c.ano = b.ano
    WHERE c.sigla_uf = 'DF'
      AND c.ano = 2022
      AND c.cargo = 'governador'
    GROUP BY c.nome_candidato, c.partido, c.cargo
    ORDER BY patrimonio_total DESC
""", billing_project_id="inteia-pesquisa")
```

### 7. Financiamento de campanha
```python
df_receitas = bd.read_sql("""
    SELECT c.nome_candidato, c.partido,
           SUM(r.valor) as total_receitas,
           COUNT(*) as qtd_doacoes
    FROM `basedosdados.br_tse_eleicoes.candidatos` c
    JOIN `basedosdados.br_tse_eleicoes.receitas_candidato` r
      ON c.id_candidato_bd = r.id_candidato_bd AND c.ano = r.ano
    WHERE c.sigla_uf = 'DF'
      AND c.ano = 2022
    GROUP BY c.nome_candidato, c.partido
    ORDER BY total_receitas DESC
""", billing_project_id="inteia-pesquisa")
```

---

## ESTRATÉGIA DE INTEGRAÇÃO COM HELENA

### Arquitetura Recomendada

```
backend/app/servicos/basedosdados_servico.py   # Módulo de acesso
backend/data/basedosdados/                      # Cache local (JSONs)
├── eleitorado_df_2022.json
├── resultados_df_2018_2022.json
├── pib_df.json
├── seguranca_df.json
└── censo_df.json
```

### Fluxo
1. **Script de coleta** (`scripts/atualizar_dados_publicos.py`) baixa datasets relevantes
2. **Cache local** em `backend/data/basedosdados/` (JSONs compactos)
3. **Helena consulta o cache** — sem latência de BigQuery em tempo real
4. **Atualização trimestral** — dados públicos não mudam com frequência

### Exemplo de Serviço Backend
```python
# backend/app/servicos/basedosdados_servico.py
import json
from pathlib import Path

CACHE_DIR = Path("backend/data/basedosdados")

def carregar_eleitorado_df() -> dict:
    """Carrega perfil do eleitorado do DF do cache local."""
    arquivo = CACHE_DIR / "eleitorado_df_2022.json"
    if arquivo.exists():
        return json.loads(arquivo.read_text(encoding="utf-8"))
    return {}

def carregar_resultados_eleicoes_df() -> dict:
    """Carrega resultados eleitorais do DF."""
    arquivo = CACHE_DIR / "resultados_df_2018_2022.json"
    if arquivo.exists():
        return json.loads(arquivo.read_text(encoding="utf-8"))
    return {}

def comparar_sintetico_vs_real(resultado_pesquisa: dict, ano: int = 2022) -> dict:
    """Compara resultado da pesquisa sintética com dados reais do TSE."""
    real = carregar_resultados_eleicoes_df()
    # ... lógica de comparação
    return {"desvio_medio": 0, "correlacao": 0, "detalhes": []}
```

---

## COMO HELENA DEVE USAR EM RELATÓRIOS

### Seção "Dados Oficiais" (template)
```markdown
## Validação com Dados Oficiais

### Fonte: TSE / Base dos Dados
- **Eleitorado DF 2022**: X eleitores registrados
- **Perfil**: Y% feminino, Z% 25-44 anos, W% ensino superior
- **Último resultado (2022)**: Candidato A (XX%), Candidato B (YY%)

### Comparação Pesquisa Sintética vs Real
| Métrica | Pesquisa INTEIA | Dado Real TSE | Desvio |
|---------|----------------|---------------|--------|
| Candidato A | XX% | YY% | Z pp |
| Candidato B | XX% | YY% | Z pp |
| Abstenção | XX% | YY% | Z pp |

**Correlação**: 0.XX (forte/moderada/fraca)
```

---

## DATASETS ADICIONAIS ÚTEIS

Para descobrir novos datasets:
```python
# Buscar por tema
bd.list_datasets(filter_by='saude')
bd.list_datasets(filter_by='educacao')
bd.list_datasets(filter_by='economia')
bd.list_datasets(filter_by='transporte')
bd.list_datasets(filter_by='meio_ambiente')

# Buscar datasets do IBGE
# URL: https://basedosdados.org/search?organization=ibge
```

### Outros datasets potenciais
| Dataset | Uso |
|---------|-----|
| `br_ibge_ipca` | Inflação — impacto no humor do eleitor |
| `br_ibge_pnad` | Emprego/desemprego — pauta eleitoral |
| `br_ms_sim` | Mortalidade — saúde pública |
| `br_inep_censo_escolar` | Educação — pauta eleitoral |
| `br_me_caged` | Mercado de trabalho formal |
| `br_bcb_sgs` | Indicadores econômicos (Selic, câmbio) |

---

## REFERÊNCIAS

| Recurso | URL |
|---------|-----|
| Site principal | https://basedosdados.org/search |
| Documentação Python | https://basedosdados.org/docs/access_data_packages |
| Tutorial Python 101 | https://dev.to/basedosdados/base-dos-dados-python-101-44lc |
| Tutorial Python 102 | https://dev.to/basedosdados/base-dos-dados-python-102-50k0 |
| SDK GitHub | https://github.com/basedosdados/sdk |
| PyPI | https://pypi.org/project/basedosdados/ |
| Eleições TSE | https://basedosdados.org/dataset/br-tse-eleicoes |
| Anuário Segurança | https://basedosdados.org/dataset/anuario-brasileiro-de-seguranca-publica |
| PIB Municipal | https://basedosdados.org/dataset/br-ibge-pib |
| Censo 2022 | https://basedosdados.org/dataset/br-ibge-censo-demografico |

---

*Skill criada em: 2026-03-04*
*Mantida por: Igor Morais Vasconcelos*
