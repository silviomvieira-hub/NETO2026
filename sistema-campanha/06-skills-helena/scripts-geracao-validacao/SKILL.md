# SKILL: Scripts de Geração e Validação

> **Propósito**: Catálogo completo dos 56 scripts Python do projeto — geração de dados, auditoria, correção, validação estatística, enriquecimento via APIs públicas e simulações.

---

## QUANDO USAR ESTA SKILL

- Gerar novos agentes sintéticos
- Validar dados existentes
- Corrigir inconsistências em JSONs
- Enriquecer perfis com APIs externas
- Executar simulações eleitorais via script
- Importar/exportar dados

---

## LOCALIZAÇÃO

```
scripts/                    # 56 scripts Python
├── Geração (6 scripts)
├── Auditoria (7 scripts)
├── Correção (12 scripts)
├── Validação (5 scripts)
├── Enriquecimento (5 scripts)
├── Importação (6 scripts)
├── Simulação (4 scripts)
├── Análise (3 scripts)
├── Infraestrutura (5 scripts)
└── Utilidades (3 scripts)

# Scripts raiz (2)
gerar_relatorio_coerencia_completo.py
```

---

## SCRIPTS DE GERAÇÃO (6)

| Script | Função | Input | Output |
|--------|--------|-------|--------|
| `gerar_eleitores_df_v4.py` | Gera eleitores sintéticos com IA | Parâmetros (qtd, RA, cluster) | `banco-eleitores-df.json` |
| `gerar_parlamentares_brasil_completo.py` | Gera lista completa de parlamentares | APIs Câmara/Senado | `banco-parlamentares-brasil.json` |
| `gerar_parlamentares_congresso.py` | Gera parlamentares do Congresso | API dados abertos | JSONs de deputados/senadores |
| `adicionar_consultores_141_142.py` | Adiciona consultores específicos | Manual | `banco-consultores-lendarios.json` |
| `complementar_gestores.py` | Complementa dados de gestores | IA + manual | `banco-gestores.json` |
| `preencher_padroes_decisao.py` | Preenche padrões de decisão | IA analisa perfis | Atualiza eleitores |

### Como Gerar Eleitores
```bash
# Gerar 100 eleitores de Ceilândia, classe média-baixa
python scripts/gerar_eleitores_df_v4.py \
  --quantidade 100 \
  --regiao "Ceilândia" \
  --cluster "G3_media_baixa"

# Gerar lote diversificado
python scripts/gerar_eleitores_df_v4.py --quantidade 500
```

---

## SCRIPTS DE AUDITORIA (7)

| Script | Alvo | Checks |
|--------|------|--------|
| `auditar_corrigir_eleitores.py` | Eleitores | Renda↔cluster, idade↔voto, RA↔perfil |
| `auditar_corrigir_gestores.py` | Gestores | Cargo↔escolaridade, experiência |
| `auditar_corrigir_magistrados.py` | Magistrados | Tribunal↔cargo, formação |
| `auditar_corrigir_parlamentares.py` | Parlamentares | Partido↔orientação, mandato |
| `auditar_consultores.py` | Consultores v1 | Categoria↔expertise |
| `auditar_consultores_v2.py` | Consultores v2 | Tier↔qualidade, duplicatas |
| `analise_inconsistencias.py` | Todos | Inconsistências cross-dataset |

### Executar Auditoria Completa
```bash
# Auditar eleitores (corrige automaticamente)
python scripts/auditar_corrigir_eleitores.py

# Auditar todos os datasets
python scripts/analise_inconsistencias.py
```

---

## SCRIPTS DE CORREÇÃO (12)

| Script | Versão | O que corrige |
|--------|--------|--------------|
| `correcao_escolaridade_v6.py` | v6 | Escolaridade vs ocupação/renda |
| `correcao_final_v5.py` | v5 | Correções gerais consolidadas |
| `correcao_final_90pct.py` | - | Alvo 90% consistência |
| `corrigir_inconsistencias_v1.py` | v1 | Inconsistências básicas |
| `ajustar_estatisticas_v1.py` | v1 | Distribuições estatísticas |
| `ajustar_estatisticas_v2.py` | v2 | Distribuições refinadas |
| `ajuste_definitivo.py` | - | Ajuste final consolidado |
| `ajuste_final_90pct.py` | - | Ajuste para 90% target |
| `ajustar_orientacao_v3.py` | v3 | Orientação política |
| `ajustar_final_v4.py` | v4 | Ajuste final geral |
| `fix_eleitores_v2.py` | v2 | Fix targeted eleitores |
| `fix_gestores_v2.py` | v2 | Fix targeted gestores |
| `fix_magistrados_v2.py` | v2 | Fix targeted magistrados |
| `fix_parlamentares_v2.py` | v2 | Fix targeted parlamentares |

### Pipeline de Correção Recomendado
```bash
# 1. Auditar primeiro
python scripts/auditar_corrigir_eleitores.py

# 2. Corrigir inconsistências
python scripts/corrigir_inconsistencias_v1.py

# 3. Ajustar estatísticas
python scripts/ajustar_estatisticas_v2.py

# 4. Correção final
python scripts/correcao_final_v5.py

# 5. Validar resultado
python scripts/validacao_final.py
```

---

## SCRIPTS DE VALIDAÇÃO (5)

| Script | Função | Métricas |
|--------|--------|----------|
| `validacao_estatistica.py` | Validação estatística completa | Chi², margem erro, confiança |
| `validacao_final.py` | Validação final pós-correção | Consistência geral |
| `validacao_persistente.py` | Validação contínua | Monitoramento |
| `validacao_rapida_governador.py` | Validação rápida de pesquisa governador | Amostra, margem |
| `analise_final.py` | Análise final de qualidade | Score global |

### Métricas de Validação
```python
# Exemplo de saída da validação
{
    "total_eleitores": 1001,
    "consistencia_geral": 0.94,      # 94%
    "erros_criticos": 0,
    "warnings": 12,
    "distribuicao_genero": {"M": 0.48, "F": 0.52},
    "distribuicao_cluster": {"G1": 0.15, "G2": 0.30, "G3": 0.35, "G4": 0.20},
    "margem_erro": 3.1,               # ±3.1%
    "nivel_confianca": 0.95            # 95%
}
```

---

## SCRIPTS DE ENRIQUECIMENTO (5)

| Script | Fonte | Dados Obtidos |
|--------|-------|---------------|
| `enriquecer_deputados_api_camara.py` | API Câmara dos Deputados | Foto, partidos, comissões, votações |
| `enriquecer_senadores_api_senado.py` | API Senado Federal | Foto, mandatos, projetos |
| `enriquecer_parlamentares.py` | Múltiplas APIs | Dados consolidados |
| `converter_parlamentares_frontend.py` | JSON backend → frontend | Formato compatível TypeScript |
| `converter_personas_gestores.py` | Formato antigo → novo | Migração de schema |

### APIs Públicas Utilizadas
```python
# API Câmara dos Deputados
BASE_URL = "https://dadosabertos.camara.leg.br/api/v2"
# Endpoints: /deputados, /deputados/{id}, /deputados/{id}/despesas

# API Senado Federal
BASE_URL = "https://legis.senado.leg.br/dadosabertos"
# Endpoints: /senador/lista/atual, /senador/{codigo}
```

---

## SCRIPTS DE IMPORTAÇÃO (6)

| Script | Fonte | Destino |
|--------|-------|---------|
| `importar_candidatos.py` | JSON/CSV | `banco-candidatos-df-2026.json` |
| `importar_dados_podc.py` | Dados PODC | Backend PostgreSQL |
| `importar_entrevistas.py` | Dados legados | Backend PostgreSQL |
| `sincronizar_entrevistas_sistema.py` | Frontend ↔ Backend | Sync bidirecional |
| `sincronizar_sessoes.py` | Sessões locais → BD | PostgreSQL |
| `normalizar_banco_one_shot.py` | JSON inconsistente | JSON normalizado |

---

## SCRIPTS DE SIMULAÇÃO (4)

| Script | Tipo | Output |
|--------|------|--------|
| `pesquisa_governador_2026.py` | Pesquisa completa governador | Relatório + dados |
| `pesquisa_valdelino_2026.py` | Pesquisa específica candidato | Relatório candidato |
| `simulacao_stress_politico_celina.py` | Stress test político | Cenários de crise |
| `simulacao_cpi_banco_master.py` | Simulação CPI | Impacto político |

### Executar Simulação
```bash
# Pesquisa governador 2026 (usa Claude API)
python scripts/pesquisa_governador_2026.py

# Stress test político
python scripts/simulacao_stress_politico_celina.py
```

---

## SCRIPTS DE INFRAESTRUTURA (5)

| Script | Função |
|--------|--------|
| `add_cors_vps.py` | Adiciona CORS ao VPS OmniRoute |
| `check_omniroute_providers.py` | Verifica status dos providers |
| `ssh_vps.py` | Conexão SSH ao VPS |
| `inject_claude_token.py` | Injeta token Claude |
| `inject_token_vps.py` | Injeta token no VPS |

---

## SCRIPTS DE ANÁLISE (3)

| Script | Função |
|--------|--------|
| `analisar_resultados_stress.py` | Analisa resultados de stress test |
| `gama_helena_pipeline.py` | Pipeline Helena/Gama |
| `validar_pesquisa_html.py` | Valida relatórios HTML |

---

## REGRAS PARA NOVOS SCRIPTS

1. **Nomenclatura**: `verbo_objeto_vN.py` (ex: `auditar_consultores_v3.py`)
2. **Localização**: sempre em `scripts/`
3. **Logging**: usar `structlog` ou `logging` padrão
4. **Backup**: criar backup do JSON antes de modificar
5. **Validação**: rodar `validacao_final.py` após qualquer correção
6. **Idempotência**: scripts de correção devem ser idempotentes

### Template de Script
```python
#!/usr/bin/env python3
"""
Descrição do script.
Autor: INTEIA
Data: 2026-02-28
"""
import json
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

AGENTES_DIR = Path("agentes")
BACKUP_DIR = Path("agentes/backups")

def main():
    # 1. Carregar dados
    with open(AGENTES_DIR / "banco-eleitores-df.json", "r", encoding="utf-8") as f:
        eleitores = json.load(f)

    logger.info(f"Carregados {len(eleitores)} eleitores")

    # 2. Processar
    modificados = 0
    for eleitor in eleitores:
        # Lógica de processamento
        pass

    # 3. Salvar (com backup)
    BACKUP_DIR.mkdir(exist_ok=True)
    # ... salvar backup e resultado

    logger.info(f"Modificados: {modificados}")

if __name__ == "__main__":
    main()
```

---

*Skill criada em 2026-02-28 | 56 scripts Python catalogados*
