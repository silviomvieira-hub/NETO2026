# HELENA MAPA — Diagramas de Navegacao para IAs

> **Proposito**: Mapa visual completo do sistema Helena para qualquer IA que precise implementar, debugar ou estender funcionalidades. Cada diagrama Mermaid e autocontido e indica arquivos exatos.
>
> **Ultima atualizacao**: 2026-03-01

---

## 1. ARQUITETURA GERAL

```mermaid
graph TB
    subgraph FRONTEND["Frontend — Next.js 14 / Vercel"]
        UI["HelenaFullscreen.tsx<br/>HelenaChat.tsx<br/>(2 interfaces)"]
        STORE["helena-store.ts<br/>(Zustand + persist)"]
        APIPROXY["app/api/helena*/route.ts<br/>(7 proxies Vercel)"]
        COMPONENTS["HelenaMarkdown<br/>HelenaConversasList<br/>HelenaMemoriasPanel<br/>HelenaStatusProgresso<br/>HelenaQuickTake"]
        LIB["helena-api.ts<br/>(HELENA_BACKEND URL)"]
    end

    subgraph BACKEND["Backend — FastAPI / Render"]
        CHAT["chat_inteligencia.py<br/>(2.267 linhas, 18 endpoints)"]
        CONV["helena_conversas.py<br/>(229 linhas, 4 endpoints)"]
        MEM["helena_memorias.py<br/>(245 linhas, 7 endpoints)"]
        VETORIAL["helena_memoria_vetorial.py<br/>(234 linhas, 2 endpoints)"]
        NOTIF["helena_notificacoes.py<br/>(252 linhas, 3 endpoints)"]
        UPLOAD["helena_upload.py<br/>(133 linhas, 2 endpoints)"]
    end

    subgraph SERVICOS["Servicos — Logica de Negocio"]
        SRV["helena_servico.py<br/>(1.945 linhas)"]
        TOOLS["helena_tools.py<br/>(2.636 linhas, 22 ferramentas)"]
        MEMCHAT["helena_memoria_chat.py<br/>(471 linhas)"]
        MEMSRV["helena_memoria_servico.py<br/>(276 linhas)"]
        MEMVET["helena_memoria_vetorial.py<br/>(491 linhas)"]
        DOCS["helena_documentos.py<br/>(458 linhas)"]
        EMAIL["helena_email.py<br/>(433 linhas)"]
        NAV["helena_navegacao.py<br/>(486 linhas)"]
        PLAN["helena_planilhas.py<br/>(368 linhas)"]
        NOTIFSERV["helena_notificacoes.py<br/>(919 linhas)"]
        EMBEDDINGS["helena_embeddings.py<br/>(258 linhas)"]
        UPLOADSERV["helena_upload.py<br/>(572 linhas)"]
    end

    subgraph IA["Provedores IA"]
        OMNI["OmniRoute<br/>(gateway privado via env)<br/>150 modelos, 15 provedores"]
        CLAUDE["Claude API<br/>(fallback pago)"]
    end

    subgraph DB["Persistencia"]
        PG["PostgreSQL<br/>(Render)"]
        CHROMA["ChromaDB<br/>(vetorial, opcional)"]
        FILES["Markdown files<br/>(memoria local)"]
    end

    UI -->|SSE direto| CHAT
    UI --> STORE
    STORE --> LIB
    APIPROXY -->|proxy REST| CHAT
    CHAT --> SRV
    CHAT --> TOOLS
    CHAT --> MEMCHAT
    SRV --> OMNI
    OMNI -->|fallback| CLAUDE
    SRV --> PG
    MEMCHAT --> FILES
    MEMSRV --> PG
    MEMVET --> CHROMA
    EMBEDDINGS --> CHROMA

    style FRONTEND fill:#1e293b,stroke:#d69e2e,color:#f8fafc
    style BACKEND fill:#1e293b,stroke:#3b82f6,color:#f8fafc
    style SERVICOS fill:#1e293b,stroke:#22c55e,color:#f8fafc
    style IA fill:#1e293b,stroke:#a855f7,color:#f8fafc
    style DB fill:#1e293b,stroke:#ef4444,color:#f8fafc
```

---

## 2. FLUXO SSE STREAMING (7 Etapas)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as HelenaFullscreen.tsx
    participant B as chat_inteligencia.py
    participant S as helena_servico.py
    participant O as OmniRoute

    U->>F: Digita mensagem
    F->>F: setCarregando(true)
    F->>B: POST /api/v1/chat-inteligencia/stream

    Note over B: SSE EventSource aberto

    B-->>F: event: session {sessao_id}

    rect rgb(30, 41, 59)
        Note over B: ETAPA 1/7
        B-->>F: status: "Preparando base de conhecimento..." (brain)
        B->>B: Carrega contexto Colmeia + usuarios fixos
    end

    rect rgb(30, 41, 59)
        Note over B: ETAPA 2/7
        B-->>F: status: "Consultando memoria semantica..." (brain)
        B->>B: pgvector embedding search + contexto eleitoral
    end

    rect rgb(30, 41, 59)
        Note over B: ETAPA 3/7
        B-->>F: status: "Inteligencia eleitoral carregada" (database)
    end

    rect rgb(30, 41, 59)
        Note over B: ETAPA 4/7
        B-->>F: status: "Calibrando N ferramentas analiticas..." (tools)
        B->>B: Monta lista ferramentas (22 tools)
    end

    rect rgb(30, 41, 59)
        Note over B: ETAPA 5/7
        B-->>F: status: "Montando contexto estrategico..." (shield)
        B->>B: System prompt + persona + memorias + HELENA_META_INFRA
    end

    rect rgb(30, 41, 59)
        Note over B: ETAPA 6/7
        B-->>F: status: "Helena analisando com {modelo}..." (ai)
        B->>O: POST streaming (3 retries com backoff)
        O->>S: Route para provider disponivel
        Note over O: >20s sem token? → "Raciocinio profundo..."
    end

    rect rgb(30, 41, 59)
        Note over B: ETAPA 7/7
        B-->>F: status: "Formulando resposta..." (ai)
        loop Tokens
            O-->>B: token chunk
            B-->>F: data: {token: "..."}
        end
    end

    B-->>F: data: {done: true, tokens_usados, provider, features}
    F->>F: setCarregando(false), adiciona mensagem assistant

    Note over F: Se compactacao_necessaria no done:
    F->>F: Mensagem system "Sessao compactada"
    F->>F: setTimeout → compactarSessao(nova_sessao_id)
```

---

## 3. COMPACTACAO REAL 400k TOKENS

```mermaid
flowchart TD
    A["Mensagem N chega"] --> B["Backend responde normalmente"]
    B --> C{"tokens_sessao >= 400k?"}
    C -->|Nao| D["Fim normal"]
    C -->|Sim| E["_executar_compactacao()"]

    E --> F["Busca interacoes da sessao"]
    F --> G["Gera resumo via LLM<br/>(combo haiku-tasks, 15s timeout)"]
    G --> H{"LLM respondeu JSON valido?"}
    H -->|Sim| I["Extrai campos estruturados"]
    H -->|Nao| J["Fallback: regex extraction"]
    J --> I

    I --> K["Cria nova ConversaHelena<br/>sessao_anterior_id = sessao_antiga<br/>resumo_compactacao = JSON resumo"]
    K --> L["Marca sessao antiga<br/>compactada = True"]
    L --> M["Emite no evento done:<br/>compactacao_necessaria=true<br/>nova_sessao_id<br/>resumo"]

    M --> N["Frontend recebe done"]
    N --> O["Mensagem system:<br/>'Sessao compactada'"]
    O --> P["setTimeout 1.5s"]
    P --> Q["store.compactarSessao(novaSessaoId)<br/>Limpa mensagens + troca sessaoId"]

    Q --> R["Proxima mensagem na nova sessao"]
    R --> S["_obter_resumo_sessao_anterior()"]
    S --> T["Injeta no system prompt:<br/>[CONTEXTO SESSAO ANTERIOR]<br/>{resumo}<br/>[FIM]"]
    T --> U["Helena sabe tudo<br/>que foi discutido antes"]

    subgraph DB["Modelo ConversaHelena"]
        DB1["sessao_anterior_id: str | null"]
        DB2["resumo_compactacao: text | null"]
        DB3["compactada: bool (default false)"]
    end

    K -.-> DB

    style E fill:#d69e2e,stroke:#b7791f,color:#000
    style U fill:#22c55e,stroke:#16a34a,color:#000
```

---

## 4. MAPA DE ARQUIVOS — BACKEND

```mermaid
graph LR
    subgraph ROTAS["backend/app/api/rotas/"]
        R1["chat_inteligencia.py<br/>2.267 linhas | 18 endpoints<br/>━━━━━━━━━━━━━━━━━━━━<br/>POST / (chat sincrono)<br/>POST /stream (SSE)<br/>POST /sonho<br/>POST /auditoria<br/>GET /historico/{id}<br/>GET /todas<br/>GET /analytics<br/>GET /admin/uso-contas<br/>GET /memoria/indice<br/>GET /memoria/busca<br/>GET /memoria/sessao/{id}<br/>POST /memoria/compactar/{id}<br/>GET /briefing<br/>POST /briefing/gerar<br/>GET /ferramentas<br/>POST /ferramentas/executar<br/>POST /migrate/compactacao"]
        R2["helena_conversas.py<br/>229 linhas | 4 endpoints<br/>━━━━━━━━━━━━━━━━━━━━<br/>GET /helena/conversas<br/>GET /helena/conversas/{id}<br/>PUT /helena/conversas/{id}<br/>DELETE /helena/conversas/{id}"]
        R3["helena_memorias.py<br/>245 linhas | 7 endpoints<br/>━━━━━━━━━━━━━━━━━━━━<br/>GET /helena/memorias<br/>POST /helena/memorias<br/>GET /helena/memorias/contexto<br/>POST /helena/memorias/compactar/{id}<br/>GET /helena/memorias/export/md<br/>DELETE /helena/memorias/{id}<br/>POST /helena/memorias/decair"]
        R4["helena_memoria_vetorial.py<br/>234 linhas | 2 endpoints"]
        R5["helena_notificacoes.py<br/>252 linhas | 3 endpoints"]
        R6["helena_upload.py<br/>133 linhas | 2 endpoints"]
    end

    subgraph SERVICOS["backend/app/servicos/"]
        S1["helena_servico.py — 1.945 linhas<br/>Orquestracao principal IA"]
        S2["helena_tools.py — 2.636 linhas<br/>22 ferramentas dinamicas"]
        S3["helena_memoria_chat.py — 471 linhas<br/>Memoria de conversa (contexto)"]
        S4["helena_memoria_servico.py — 276 linhas<br/>CRUD memorias persistentes"]
        S5["helena_memoria_vetorial.py — 491 linhas<br/>ChromaDB busca semantica"]
        S6["helena_documentos.py — 458 linhas<br/>PDF/DOCX processing"]
        S7["helena_email.py — 433 linhas<br/>SMTP + templates Jinja2"]
        S8["helena_navegacao.py — 486 linhas<br/>Playwright automacao web"]
        S9["helena_planilhas.py — 368 linhas<br/>Excel/CSV processing"]
        S10["helena_notificacoes.py — 919 linhas<br/>Briefing + push + email"]
        S11["helena_embeddings.py — 258 linhas<br/>sentence-transformers"]
        S12["helena_upload.py — 572 linhas<br/>Upload + validacao"]
    end

    subgraph PERSONA["backend/app/servicos/"]
        P1["helena_persona.md<br/>~1000 linhas — Persona completa"]
        P2["helena_sonho_persona.md<br/>~400 linhas — Modo onirico"]
    end

    subgraph MODELOS["backend/app/modelos/"]
        M1["conversa_helena.py — 136 linhas<br/>ConversaHelena (sessao, titulo,<br/>tokens, compactacao)"]
        M2["memoria_helena.py — 120 linhas<br/>MemoriaHelena (tipo, conteudo,<br/>relevancia, tags)"]
        M3["interacao_chat.py<br/>InteracaoChat (pergunta,<br/>resposta, tokens, metadados)"]
    end

    R1 --> S1
    R1 --> S2
    R1 --> S3
    R2 --> M1
    R3 --> M2
    S1 --> P1
    S1 --> P2

    style ROTAS fill:#1e3a5f,stroke:#3b82f6,color:#f8fafc
    style SERVICOS fill:#1a3a2a,stroke:#22c55e,color:#f8fafc
    style PERSONA fill:#3a2a1a,stroke:#d69e2e,color:#f8fafc
    style MODELOS fill:#3a1a2a,stroke:#ef4444,color:#f8fafc
```

---

## 5. MAPA DE ARQUIVOS — FRONTEND

```mermaid
graph LR
    subgraph PAGES["frontend/src/app/(dashboard)/helena/"]
        PG1["page.tsx — Chat principal"]
        PG2["layout.tsx — Layout wrapper"]
        PG3["memorias/page.tsx — Gerenciar memorias"]
    end

    subgraph COMPONENTS["frontend/src/components/helena/"]
        C1["HelenaFullscreen.tsx — 717 linhas<br/>Chat imersivo + SSE streaming<br/>+ compactacao + TTS"]
        C2["HelenaChat.tsx — 742 linhas<br/>Widget chat + upload + sonho"]
        C3["HelenaMarkdown.tsx — 301 linhas<br/>Markdown + syntax highlight<br/>+ tabelas + code blocks"]
        C4["HelenaConversasList.tsx — 177 linhas<br/>Lista conversas + busca + fav"]
        C5["HelenaMemoriasPanel.tsx — 299 linhas<br/>Painel memorias CRUD"]
        C6["HelenaStatusProgresso.tsx — 78 linhas<br/>Barra progresso + icone pulsante<br/>(7 icones Lucide mapeados)"]
        C7["HelenaQuickTake.tsx — 165 linhas<br/>Widget resposta rapida"]
        C8["index.ts — Barrel exports"]
    end

    subgraph STATE["frontend/src/stores/"]
        ST1["helena-store.ts — 328 linhas<br/>Zustand + persist<br/>━━━━━━━━━━━━━━━━<br/>Estado: mensagens, sessaoId,<br/>carregando, modoSonho,<br/>conversas, memorias<br/>━━━━━━━━━━━━━━━━<br/>Actions: enviarMensagem,<br/>enviarSonho, novaSessao,<br/>compactarSessao,<br/>carregarConversas,<br/>carregarHistorico,<br/>carregarMemorias"]
    end

    subgraph APIROUTES["frontend/src/app/api/"]
        A1["helena/route.ts — Chat proxy"]
        A2["helena-conversas/route.ts"]
        A3["helena-memorias/route.ts"]
        A4["helena-pesquisas/route.ts"]
        A5["helena-deep-research/route.ts"]
        A6["helena-tts/route.ts — ElevenLabs"]
        A7["warroom-helena/route.ts"]
    end

    subgraph LIB["frontend/src/lib/"]
        L1["helena-api.ts — 6 linhas<br/>HELENA_BACKEND constant<br/>(api.inteia.com.br direto)"]
    end

    PG1 --> C1
    C1 --> ST1
    C2 --> ST1
    ST1 --> L1
    C1 -->|SSE direto| L1
    C4 --> ST1
    C5 --> ST1
    APIROUTES -->|proxy REST| L1

    style PAGES fill:#1e293b,stroke:#d69e2e,color:#f8fafc
    style COMPONENTS fill:#1e293b,stroke:#3b82f6,color:#f8fafc
    style STATE fill:#1e293b,stroke:#22c55e,color:#f8fafc
    style APIROUTES fill:#1e293b,stroke:#a855f7,color:#f8fafc
    style LIB fill:#1e293b,stroke:#ef4444,color:#f8fafc
```

---

## 6. SISTEMA DE MEMORIAS

```mermaid
flowchart TB
    subgraph TIPOS["3 Camadas de Memoria"]
        direction TB
        T1["CHAT — Contexto Imediato<br/>tabela: interacoes_chat<br/>Escopo: por sessao<br/>Ultimas 10 msgs como historico"]
        T2["HELENA — Longo Prazo<br/>tabela: memorias_helena<br/>9 tipos: resumo_conversa, licao,<br/>insight, decisao, fato, calibracao,<br/>decisao_campanha, tendencia, adversario"]
        T3["CONVERSA — Historico<br/>tabela: conversas_helena<br/>Escopo: agrupamento por sessao<br/>+ compactacao 400k tokens"]
    end

    subgraph CICLO["Ciclo de Vida"]
        direction TB
        CV1["1. CRIACAO<br/>Apos interacao significativa<br/>Relevancia inicial: 1.0"]
        CV2["2. DECAY<br/>POST /helena/memorias/decair<br/>relevancia *= 0.95/dia"]
        CV3["3. COMPACTACAO<br/>POST /helena/memorias/compactar/{id}<br/>Consolida similares, remove redundancias"]
        CV4["4. RECUPERACAO<br/>GET /helena/memorias/contexto<br/>Top-K por relevancia x recencia"]
        CV5["5. EXPORT<br/>GET /helena/memorias/export/md<br/>Markdown completo"]
        CV1 --> CV2 --> CV3 --> CV4 --> CV5
    end

    subgraph BUSCA["Busca Semantica"]
        B1["PostgreSQL ILIKE<br/>(busca textual basica)"]
        B2["ChromaDB + Embeddings<br/>(busca vetorial semantica)"]
        B3["pgvector<br/>(dentro do streaming SSE)"]
    end

    T1 -->|"registrar_interacao()"| CV1
    T2 -->|"criar_memoria()"| CV1
    T3 -->|"_atualizar_conversa_helena()"| CV1
    CV4 --> B1
    CV4 --> B2
    CV4 --> B3

    style TIPOS fill:#1e293b,stroke:#d69e2e,color:#f8fafc
    style CICLO fill:#1e293b,stroke:#3b82f6,color:#f8fafc
    style BUSCA fill:#1e293b,stroke:#22c55e,color:#f8fafc
```

---

## 7. FERRAMENTAS HELENA (22 Tools)

```mermaid
graph TB
    subgraph CONSULTA["Consulta de Dados (4)"]
        T1["consultar_eleitores<br/>1.001 eleitores DF<br/>15+ filtros"]
        T2["consultar_magistrados<br/>164 juizes STF/STJ/TJDFT/TRF1"]
        T3["consultar_consultores<br/>144 gemeos digitais historicos"]
        T4["consultar_parlamentares<br/>594 Senado/Camara/CLDF"]
    end

    subgraph ESTAT["Estatistica (4)"]
        T5["estatisticas_eleitores<br/>Distribuicao qualquer campo"]
        T6["calcular_margem_erro<br/>z * sqrt(p*(1-p)/n)"]
        T7["calcular_intervalo_confianca<br/>t-Student ou Normal"]
        T8["cruzar_variaveis<br/>Cross-tabulation contingencia"]
    end

    subgraph POLARIS["Motor POLARIS (3)"]
        T9["executar_projecao_eleitoral<br/>Monte Carlo + 4 cenarios"]
        T10["calcular_estatisticas_polaris<br/>Chi², proporcoes, correlacao"]
        T11["gerar_recomendacoes_polaris<br/>7 eixos priorizados"]
    end

    subgraph CAMPANHA["Campanha (4)"]
        T12["rodar_pesquisa_rapida<br/>Pesquisa de intencao de voto"]
        T13["gerar_mensagem_campanha<br/>Mensagem por regiao/publico"]
        T14["simular_cenario_rapido<br/>Cenario com dados existentes"]
        T15["analisar_adversario<br/>Intel sobre concorrentes"]
    end

    subgraph VISUAL["Visualizacao (2)"]
        T16["gerar_grafico<br/>Barra, pizza, linha, horizontal<br/>PNG base64 paleta INTEIA"]
        T17["simular_cenario_monte_carlo<br/>Monte Carlo com N simulacoes"]
    end

    subgraph ADMIN["Super Admin (5)"]
        T18["listar_arquivos_codigo"]
        T19["ler_arquivo_codigo"]
        T20["escrever_arquivo_codigo"]
        T21["buscar_no_codigo<br/>(ripgrep)"]
        T22["executar_comando_codigo<br/>(shell)"]
        T23["listar_variaveis_ambiente"]
    end

    DISPATCH["executar_ferramenta(nome, params)<br/>helena_tools.py:2508"] --> CONSULTA
    DISPATCH --> ESTAT
    DISPATCH --> POLARIS
    DISPATCH --> CAMPANHA
    DISPATCH --> VISUAL
    DISPATCH --> ADMIN

    style CONSULTA fill:#1a3a5f,stroke:#3b82f6,color:#f8fafc
    style ESTAT fill:#1a3a2a,stroke:#22c55e,color:#f8fafc
    style POLARIS fill:#3a2a1a,stroke:#d69e2e,color:#f8fafc
    style CAMPANHA fill:#2a1a3a,stroke:#a855f7,color:#f8fafc
    style VISUAL fill:#3a1a2a,stroke:#ef4444,color:#f8fafc
    style ADMIN fill:#2a2a2a,stroke:#64748b,color:#f8fafc
```

---

## 8. CADEIA DE PROVIDERS (OmniRoute)

```mermaid
flowchart LR
    subgraph HELENA["Helena pede resposta"]
        REQ["POST /stream<br/>ou POST /"]
    end

    subgraph OMNIROUTE["OmniRoute Gateway<br/>OMNIROUTE_URL"]
        COMBO["Combo: helena-premium<br/>(priority mode)"]
        P1["1. Claude Max<br/>(cc/claude-opus-4-6)"]
        P2["2. GPT-5<br/>(cx/gpt-5)"]
        P3["3. Gemini Pro<br/>(gc/gemini-3-pro)"]
        P4["4. Antigravity<br/>(ag/claude-opus-4-6-thinking)"]
        P5["5. GPT-4o<br/>(openai/gpt-4o)"]
    end

    subgraph FALLBACK["Fallbacks"]
        F1["Claude Code CLI<br/>(local, se disponivel)"]
        F2["API Anthropic<br/>(CLAUDE_API_KEY, pago)"]
    end

    REQ --> COMBO
    COMBO -->|"1o tentativa"| P1
    P1 -->|"falhou"| P2
    P2 -->|"falhou"| P3
    P3 -->|"falhou"| P4
    P4 -->|"falhou"| P5
    P5 -->|"todos falharam"| F1
    F1 -->|"falhou"| F2

    style HELENA fill:#1e293b,stroke:#d69e2e,color:#f8fafc
    style OMNIROUTE fill:#1e293b,stroke:#a855f7,color:#f8fafc
    style FALLBACK fill:#1e293b,stroke:#ef4444,color:#f8fafc
```

---

## 9. ENDPOINTS COMPLETOS — Referencia Rapida

```mermaid
graph TB
    subgraph CHAT["/api/v1/chat-inteligencia/ — 18 endpoints"]
        direction TB
        E1["POST / — Chat sincrono"]
        E2["POST /stream — SSE streaming 7 etapas"]
        E3["POST /sonho — Modo onirico"]
        E4["POST /auditoria — Auditar resposta"]
        E5["GET /historico/{id} — Historico sessao"]
        E6["GET /todas — Todas conversas"]
        E7["GET /analytics — Analytics uso"]
        E8["GET /admin/uso-contas — Auditoria admin"]
        E9["GET /memoria/indice — Indice memorias"]
        E10["GET /memoria/busca — Buscar memorias"]
        E11["GET /memoria/sessao/{id} — Memorias por sessao"]
        E12["POST /memoria/compactar/{id} — Compactar manual"]
        E13["GET /briefing — Obter briefing"]
        E14["POST /briefing/gerar — Gerar briefing"]
        E15["GET /ferramentas — Listar ferramentas"]
        E16["POST /ferramentas/executar — Executar ferramenta"]
        E17["POST /migrate/compactacao — Migrar DB"]
    end

    subgraph CONV["/api/v1/helena/ — Conversas (4)"]
        EC1["GET /conversas"]
        EC2["GET /conversas/{id}"]
        EC3["PUT /conversas/{id}"]
        EC4["DELETE /conversas/{id}"]
    end

    subgraph MEMO["/api/v1/helena/ — Memorias (7)"]
        EM1["GET /memorias"]
        EM2["POST /memorias"]
        EM3["GET /memorias/contexto"]
        EM4["POST /memorias/compactar/{id}"]
        EM5["GET /memorias/export/md"]
        EM6["DELETE /memorias/{id}"]
        EM7["POST /memorias/decair"]
    end

    subgraph VET["/api/v1/helena/ — Vetorial (2)"]
        EV1["POST /busca-semantica"]
        EV2["POST /sincronizar-chromadb"]
    end

    subgraph NOT["/api/v1/helena/ — Notificacoes (3)"]
        EN1["POST /briefing"]
        EN2["POST /relatorio-semanal"]
        EN3["POST /push-subscribe"]
    end

    subgraph UPL["/api/v1/helena/ — Upload (2)"]
        EU1["POST /upload-documentos"]
        EU2["POST /upload-planilhas"]
    end

    style CHAT fill:#1a3a5f,stroke:#3b82f6,color:#f8fafc
    style CONV fill:#1a3a2a,stroke:#22c55e,color:#f8fafc
    style MEMO fill:#3a2a1a,stroke:#d69e2e,color:#f8fafc
    style VET fill:#2a1a3a,stroke:#a855f7,color:#f8fafc
    style NOT fill:#3a1a1a,stroke:#ef4444,color:#f8fafc
    style UPL fill:#2a2a2a,stroke:#64748b,color:#f8fafc
```

---

## 10. FUNCOES-CHAVE DO BACKEND — Onde esta o que

```mermaid
graph TB
    subgraph CHAT_INT["chat_inteligencia.py — Funcoes internas"]
        F1["_status_event() :326<br/>Gera evento SSE de status"]
        F2["_obter_resumo_sessao_anterior() :332<br/>Busca resumo de sessao compactada"]
        F3["_executar_compactacao() :361<br/>Compacta sessao >= 400k tokens"]
        F4["_obter_tokens_sessao() :421<br/>Soma tokens da sessao no DB"]
        F5["_obter_interacoes_sessao() :437<br/>Busca interacoes para resumo"]
        F6["_salvar_interacao() :671<br/>Persiste pergunta+resposta no DB"]
        F7["_atualizar_conversa_helena() :734<br/>Cria/atualiza ConversaHelena"]
        F8["_gerar_resposta_provider() :766<br/>Envia para OmniRoute/CLI/API"]
        F9["_calcular_contexto_pct() :869<br/>% uso da janela de contexto"]
        F10["gerar_stream() :894<br/>Generator SSE principal"]
    end

    subgraph HELENA_SRV["helena_servico.py — Classe HelenaServico"]
        S1["processar_mensagem()<br/>Orquestracao principal"]
        S2["processar_sonho()<br/>Modo onirico"]
        S3["_resolver_provider()<br/>Decide: OmniRoute/CLI/API"]
        S4["_montar_historico_api()<br/>Formata historico para IA"]
        S5["gerar_resumo_compactacao()<br/>Resume sessao via LLM leve"]
    end

    subgraph TOOLS_SRV["helena_tools.py — Ferramentas"]
        T1["executar_ferramenta() :2508<br/>Dispatch por nome"]
        T2["listar_ferramentas() :2567<br/>Lista disponivel para contexto"]
        T3["HELENA_TOOLS :2015<br/>Registry 17 ferramentas normais"]
        T4["HELENA_TOOLS_SUPER_ADMIN :2434<br/>Registry 6 ferramentas admin"]
    end

    F10 -->|"chama"| F1
    F10 -->|"chama"| F2
    F10 -->|"chama"| F6
    F10 -->|"chama"| F7
    F10 -->|"chama"| F8
    F10 -->|"chama"| F3
    F8 -->|"delega"| S1
    F3 -->|"chama"| S5

    style CHAT_INT fill:#1a3a5f,stroke:#3b82f6,color:#f8fafc
    style HELENA_SRV fill:#1a3a2a,stroke:#22c55e,color:#f8fafc
    style TOOLS_SRV fill:#3a2a1a,stroke:#d69e2e,color:#f8fafc
```

---

## 11. DADOS QUE HELENA ACESSA

```mermaid
graph LR
    subgraph JSON["Bancos JSON (4 arquivos)"]
        J1["banco-eleitores-df.json<br/>1.001 eleitores sinteticos<br/>60+ atributos cada"]
        J2["banco-magistrados.json<br/>164 juizes STF/STJ/TJDFT/TRF1"]
        J3["banco-consultores-lendarios.json<br/>144 gemeos digitais historicos"]
        J4["banco-parlamentares.json<br/>594 Senado/Camara/CLDF"]
    end

    subgraph POSTGRES["PostgreSQL"]
        P1["interacoes_chat<br/>Perguntas + respostas"]
        P2["conversas_helena<br/>Sessoes + metadados + compactacao"]
        P3["memorias_helena<br/>Memorias persistentes 9 tipos"]
        P4["calibracoes_helena<br/>Feedback loops"]
    end

    subgraph CHROMADB["ChromaDB (opcional)"]
        C1["Embeddings semanticos<br/>sentence-transformers"]
    end

    subgraph FILES["Filesystem"]
        F1["memorias/*.md<br/>Snapshots Markdown por sessao"]
        F2["helena_persona.md<br/>Persona completa"]
        F3["helena_sonho_persona.md<br/>Persona modo onirico"]
    end

    TOOLS["helena_tools.py"] --> JSON
    CHAT["chat_inteligencia.py"] --> POSTGRES
    MEMSRV["helena_memoria_servico.py"] --> POSTGRES
    MEMVET["helena_memoria_vetorial.py"] --> CHROMADB
    MEMCHAT["helena_memoria_chat.py"] --> FILES
    HELENA["helena_servico.py"] --> FILES

    style JSON fill:#1a3a5f,stroke:#3b82f6,color:#f8fafc
    style POSTGRES fill:#1a3a2a,stroke:#22c55e,color:#f8fafc
    style CHROMADB fill:#2a1a3a,stroke:#a855f7,color:#f8fafc
    style FILES fill:#3a2a1a,stroke:#d69e2e,color:#f8fafc
```

---

## 12. SKILLS — Indice para IAs

```mermaid
graph TB
    subgraph SKILLS["Skills Helena — .claude/skills/"]
        SK1["helena-master/SKILL.md<br/>422 linhas — Arsenal completo<br/>Pesquisa, relatorios, agentes,<br/>teoria dos jogos, persuasao"]
        SK2["helena-chat-memorias/SKILL.md<br/>427 linhas — Chat + memorias<br/>SSE streaming, compactacao,<br/>endpoints, fluxo completo"]
        SK3["helena-analise-quantitativa/SKILL.md<br/>120 linhas — Estatistica<br/>30+ metodos, ML, NLP"]
        SK4["helena-master/HELENA_MAPA.md<br/>ESTE ARQUIVO<br/>Diagramas Mermaid navegacao"]
    end

    subgraph REFS["helena-master/reference/"]
        R1["agentes-sinteticos.md"]
        R2["arsenal-estatistico.md"]
        R3["business-intel.md"]
        R4["polaris-protocol.md"]
        R5["persuasao-framework.md"]
        R6["teoria-dos-jogos.md"]
        R7["multi-agente.md"]
        R8["+ 9 outros..."]
    end

    SK1 --> REFS

    style SKILLS fill:#1e293b,stroke:#d69e2e,color:#f8fafc
    style REFS fill:#1e293b,stroke:#64748b,color:#f8fafc
```

---

## GUIA RAPIDO — "Onde mexer para..."

| Tarefa | Arquivo Principal | Linha/Funcao |
|--------|-------------------|--------------|
| Mudar persona Helena | `backend/app/servicos/helena_persona.md` | Documento inteiro |
| Adicionar ferramenta | `backend/app/servicos/helena_tools.py` | `HELENA_TOOLS` dict :2015 |
| Novo endpoint chat | `backend/app/api/rotas/chat_inteligencia.py` | `router` :77 |
| Mudar status SSE | `backend/app/api/rotas/chat_inteligencia.py` | `_status_event()` :326 |
| Mudar compactacao | `backend/app/api/rotas/chat_inteligencia.py` | `_executar_compactacao()` :361 |
| Mudar threshold 400k | `backend/app/api/rotas/chat_inteligencia.py` | `GATILHO_COMPACTACAO_TOKENS` :157 |
| UI do chat | `frontend/src/components/helena/HelenaFullscreen.tsx` | Componente inteiro |
| Estado global | `frontend/src/stores/helena-store.ts` | Zustand store |
| Barra progresso | `frontend/src/components/helena/HelenaStatusProgresso.tsx` | 78 linhas |
| Markdown render | `frontend/src/components/helena/HelenaMarkdown.tsx` | 301 linhas |
| URL backend | `frontend/src/lib/helena-api.ts` | `HELENA_BACKEND` |
| Modelo DB conversa | `backend/app/modelos/conversa_helena.py` | `ConversaHelena` |
| Modelo DB memoria | `backend/app/modelos/memoria_helena.py` | `MemoriaHelena` |
| Provider IA | `backend/app/servicos/helena_servico.py` | `_resolver_provider()` |
| TTS (voz) | `frontend/src/app/api/helena-tts/route.ts` | ElevenLabs proxy |
| Notificacoes | `backend/app/servicos/helena_notificacoes.py` | 919 linhas |
| Upload docs | `backend/app/servicos/helena_upload.py` | 572 linhas |

---

*Mapa gerado em 2026-03-01 | ~20.000 linhas de codigo | 36 endpoints | 22 ferramentas | 12 servicos | 7 componentes*
