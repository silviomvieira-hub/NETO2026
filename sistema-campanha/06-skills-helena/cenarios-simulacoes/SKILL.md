# SKILL: Cenários e Simulações Eleitorais

> **Propósito**: Documentação completa do sistema de simulação eleitoral — cenários 1º/2º turno, Monte Carlo multiseed, stress tests, swing voters, análise de rejeição e estimativas preditivas.

---

## QUANDO USAR ESTA SKILL

- Simular cenários eleitorais (1º ou 2º turno)
- Executar simulações Monte Carlo
- Analisar stress tests políticos
- Identificar e analisar swing voters
- Calcular estimativas e projeções
- Comparar cenários entre si

---

## ARQUITETURA DO SISTEMA DE SIMULAÇÃO

### Backend

```
backend/app/
├── api/rotas/
│   └── cenarios_eleitorais.py    # 13 endpoints
├── servicos/
│   └── cenario_eleitoral_servico.py  # Lógica de simulação
├── esquemas/
│   └── cenario_eleitoral.py      # Schemas Pydantic
└── modelos/
    └── cenario_eleitoral.py      # ORM PostgreSQL
```

### Frontend

```
frontend/src/
├── app/(dashboard)/
│   ├── cenarios/page.tsx         # Página de cenários
│   ├── estimativas/page.tsx      # Estimativas
│   ├── stress-tests/page.tsx     # Stress tests
│   └── swing-voters/page.tsx     # Indecisos
├── components/
│   ├── cenarios/
│   │   ├── SimuladorCenario.tsx
│   │   ├── ResultadosCenario.tsx
│   │   └── AnaliseRejeicao.tsx
│   ├── estimativas/
│   │   ├── CardCandidato.tsx
│   │   ├── GraficoAgregado.tsx
│   │   ├── GraficoRejeicao.tsx
│   │   ├── MetricasResumo.tsx
│   │   ├── PrevisaoModelo.tsx
│   │   ├── ComparadorInstitutos.tsx
│   │   ├── AvaliacaoGoverno.tsx
│   │   ├── SimuladorSegundoTurno.tsx
│   │   └── TabelaPesquisas.tsx
│   └── swing-voters/
│       └── SwingVotersAnalise.tsx
└── stores/
    └── cenarios-store.ts         # Estado Zustand
```

---

## ENDPOINTS DE CENÁRIOS (13)

| Método | Rota | Função |
|--------|------|--------|
| GET | `/cenarios/` | Listar cenários salvos |
| POST | `/cenarios/` | Criar cenário |
| GET | `/cenarios/{id}` | Obter cenário |
| PUT | `/cenarios/{id}` | Atualizar |
| DELETE | `/cenarios/{id}` | Deletar |
| POST | `/cenarios/{id}/executar` | Executar simulação |
| POST | `/cenarios/simular-rapido` | Simulação rápida 1º turno |
| POST | `/cenarios/simular-multiseed` | Monte Carlo (N seeds) |
| POST | `/cenarios/simular-multiseed/exportar-csv` | Export Monte Carlo |
| POST | `/cenarios/{id}/simular-segundo-turno` | Simulação 2º turno |
| POST | `/cenarios/analisar-rejeicao` | Análise de rejeição |
| GET | `/cenarios/rejeicao/candidato/{id}` | Rejeição por candidato |
| POST | `/cenarios/comparar` | Comparar cenários |

---

## TIPOS DE SIMULAÇÃO

### 1. Simulação Rápida (1º Turno)

```python
# POST /cenarios/simular-rapido
{
    "candidatos": [
        {"id": 1, "nome": "Celina Leão", "partido": "PP"},
        {"id": 2, "nome": "Candidato B", "partido": "PT"},
        {"id": 3, "nome": "Candidato C", "partido": "PL"}
    ],
    "amostra_tamanho": 500,        # Quantos eleitores
    "filtros_amostra": {            # Filtros opcionais
        "cluster": "G2_media_alta",
        "regiao": "Plano Piloto"
    }
}

# Resposta
{
    "resultados": {
        "Celina Leão": { "votos": 185, "percentual": 37.0, "margem_erro": 4.3 },
        "Candidato B": { "votos": 140, "percentual": 28.0, "margem_erro": 3.9 },
        "Candidato C": { "votos": 95, "percentual": 19.0, "margem_erro": 3.4 },
        "Indecisos": { "votos": 50, "percentual": 10.0 },
        "Brancos/Nulos": { "votos": 30, "percentual": 6.0 }
    },
    "nivel_confianca": 0.95,
    "margem_erro_global": 4.4,
    "amostra_efetiva": 500
}
```

### 2. Monte Carlo Multiseed

Executa N simulações independentes com seeds aleatórias para estimar distribuição de probabilidades.

```python
# POST /cenarios/simular-multiseed
{
    "candidatos": [...],
    "num_simulacoes": 1000,         # N seeds
    "amostra_por_simulacao": 300,
    "filtros_amostra": {}
}

# Resposta
{
    "simulacoes_executadas": 1000,
    "resultados_agregados": {
        "Celina Leão": {
            "media": 36.2,
            "mediana": 36.5,
            "desvio_padrao": 2.8,
            "intervalo_confianca_95": [30.8, 41.6],
            "probabilidade_vencer": 0.72,        # 72%
            "probabilidade_segundo_turno": 0.95
        }
    },
    "correlacoes": {
        "Celina_vs_CandidatoB": -0.65    # Correlação negativa
    },
    "cenario_mais_provavel": "Celina + CandidatoB no 2º turno"
}
```

### 3. Simulação 2º Turno

```python
# POST /cenarios/{id}/simular-segundo-turno
{
    "candidato_1": {"id": 1, "nome": "Celina Leão"},
    "candidato_2": {"id": 2, "nome": "Candidato B"},
    "amostra_tamanho": 800,
    "considerar_rejeicao": true,
    "migrar_votos": true            # Migração dos eliminados
}

# Resposta
{
    "resultado": {
        "Celina Leão": { "votos": 440, "percentual": 55.0 },
        "Candidato B": { "votos": 280, "percentual": 35.0 },
        "Brancos/Nulos": { "votos": 80, "percentual": 10.0 }
    },
    "migracao_votos": {
        "de_CandidatoC": {
            "para_Celina": 0.45,
            "para_CandidatoB": 0.30,
            "para_brancos": 0.25
        }
    },
    "fator_rejeicao_impacto": 0.15
}
```

### 4. Análise de Rejeição

```python
# POST /cenarios/analisar-rejeicao
{
    "candidatos": [...],
    "amostra_tamanho": 500
}

# Resposta
{
    "rejeicao_por_candidato": {
        "Celina Leão": {
            "taxa_rejeicao": 22.4,
            "perfil_rejeitores": {
                "orientacao": {"esquerda": 0.45, "centro-esquerda": 0.25},
                "cluster": {"G4_baixa": 0.35, "G3_media_baixa": 0.30},
                "faixa_etaria": {"18-25": 0.20, "45-60": 0.30}
            },
            "motivos_principais": ["vinculada ao governo atual", "pouca experiência"]
        }
    },
    "comparativo_rejeicao": [
        {"candidato": "Candidato B", "rejeicao": 38.2},
        {"candidato": "Celina Leão", "rejeicao": 22.4}
    ]
}
```

---

## STRESS TESTS

### Tipos de Stress Test

| Tipo | Descrição | Variáveis |
|------|-----------|-----------|
| **Escândalo** | Impacto de escândalo político | Gravidade, mídia, timing |
| **Crise Econômica** | Desemprego, inflação | Intensidade, duração |
| **Aliança** | Coligação/apoio inesperado | Partido, candidato |
| **Desinformação** | Fake news viral | Alcance, credibilidade |
| **Evento Externo** | Catástrofe, pandemia | Severidade |

### Como Funciona

```
1. Estado Base
   → Pesquisa normal (sem estresse)
   → Baseline de intenção de voto

2. Aplicar Estressor
   → Modificar perfis dos eleitores conforme cenário
   → Recalcular intenção de voto

3. Medir Impacto
   → Delta vs baseline
   → Quais segmentos mudaram
   → Pontos de ruptura
   → Resiliência do candidato

4. Relatório
   → Comparativo visual
   → Recomendações estratégicas
```

### Frontend: Stress Tests

```
/stress-tests
├── Seletor de cenário de stress
├── Configuração de parâmetros
├── Execução (barra de progresso)
└── Resultados
    ├── Gráfico antes/depois
    ├── Heatmap de impacto por RA
    ├── Segmentos mais afetados
    └── Recomendações
```

---

## SWING VOTERS (Indecisos)

### Análise de Swing Voters

```
/swing-voters
├── Identificação
│   ├── probabilidade_mudanca_voto > 0.5
│   ├── intencao_voto == "Indeciso"
│   └── sensibilidade_escandalo == "alta"
├── Perfil Demográfico
│   ├── Distribuição por RA
│   ├── Distribuição por cluster
│   └── Distribuição por idade
├── Fatores de Decisão
│   ├── fator_decisao_voto (ranking)
│   ├── influencia_rede_social
│   └── fontes_informacao
└── Estratégia de Conversão
    ├── Mensagens personalizadas
    ├── Canais preferenciais
    └── Timing ideal
```

### Critérios de Identificação

```python
def identificar_swing_voter(eleitor):
    score = 0
    if eleitor.probabilidade_mudanca_voto > 0.5: score += 3
    if eleitor.intencao_voto == "Indeciso": score += 3
    if eleitor.interesse_politico in ["baixo", "medio"]: score += 1
    if eleitor.sensibilidade_escandalo == "alta": score += 1
    if eleitor.influencia_rede_social > 0.6: score += 1
    return score >= 4  # Swing voter se score >= 4
```

---

## ESTIMATIVAS E PROJEÇÕES

### Componentes da Página `/estimativas`

| Componente | Função |
|-----------|--------|
| `CardCandidato` | Card com intenção de voto atual |
| `GraficoAgregado` | Gráfico consolidado de candidatos |
| `GraficoRejeicao` | Gráfico de rejeição por candidato |
| `MetricasResumo` | KPIs principais |
| `PrevisaoModelo` | Previsão ML (tendência) |
| `ComparadorInstitutos` | Comparar com pesquisas reais |
| `AvaliacaoGoverno` | Aprovação do governo atual |
| `SimuladorSegundoTurno` | Simulador interativo 2º turno |
| `TabelaPesquisas` | Histórico de pesquisas |

### Dados de Referência

```typescript
// frontend/src/data/pesquisas-eleitorais-2026.ts
// Pesquisas reais de institutos para comparação
const pesquisasReais = [
  { instituto: "Datafolha", data: "2025-12-15", celina: 35, candidatoB: 28 },
  { instituto: "IPEC", data: "2025-11-20", celina: 33, candidatoB: 30 },
  // ...
];
```

---

## REGRAS ESTATÍSTICAS

### Margem de Erro
```
ME = Z × √(p(1-p)/n)
Onde:
  Z = 1.96 (95% confiança)
  p = proporção observada
  n = tamanho da amostra
```

### Clamp de Probabilidade
```python
# REGRA: Nunca usar 0% ou 100%
probabilidade = max(0.01, min(0.99, probabilidade_calculada))
# Sempre registrar incerteza
```

### Tamanho de Amostra Recomendado

| Precisão Desejada | Amostra Mín. | Margem (95%) |
|-------------------|-------------|--------------|
| Alta | 1000 | ±3.1% |
| Média | 500 | ±4.4% |
| Rápida | 300 | ±5.7% |
| Indicativa | 100 | ±9.8% |

---

## COMPONENTES VISUAIS

### Gráficos Usados em Cenários

| Gráfico | Componente | Lib |
|---------|-----------|-----|
| Barras horizontais | `GraficoAgregado` | Recharts |
| Pizza/Donut | `ResultadosCenario` | Recharts |
| Linha temporal | `GraficoTendenciaTemporal` | Recharts |
| Heatmap por RA | `MapaCalorDF` | Custom |
| Radar psicográfico | `RadarChartPerfil` | Recharts |
| Violin distribuição | `ViolinPlot` | Plotly |
| Sankey fluxo votos | `SankeyDiagram` | Plotly |

---

## FLUXO COMPLETO DE SIMULAÇÃO

```
1. Criar cenário
   POST /cenarios/
   → Define candidatos + parâmetros

2. Selecionar amostra
   GET /eleitores/?filtros...
   → Amostra representativa

3. Executar simulação
   POST /cenarios/{id}/executar
   → IA (OmniRoute) + cálculos

4. Resultados 1º turno
   → Percentuais, margem, confiança

5. Se necessário: 2º turno
   POST /cenarios/{id}/simular-segundo-turno
   → Migração de votos

6. Monte Carlo (robustez)
   POST /cenarios/simular-multiseed
   → 1000 simulações, probabilidades

7. Stress test (opcional)
   → Cenários de crise

8. Relatório
   → Exportar PDF/XLSX
   → Dashboard visual
```

---

*Skill criada em 2026-02-28 | Simulação completa: 1º/2º turno, Monte Carlo, stress, swing voters*
