# Requirements: CampanhaApp

**Defined:** 2026-04-09
**Core Value:** Transformar a militancia em um jogo engajante que gera uma base de leads qualificada para o candidato

## v1 Requirements

Requirements for initial release (Campanha Neto Rodrigues 2026).

### Infraestrutura & Backend

- [ ] **INFRA-01**: Sistema usa Supabase como backend (PostgreSQL, Auth, Storage, Realtime)
- [ ] **INFRA-02**: Dados migrados de localStorage para PostgreSQL via Supabase
- [ ] **INFRA-03**: PWA instalavel no celular com manifest.json e service worker
- [ ] **INFRA-04**: App funciona offline com dados em cache (IndexedDB) e sincroniza ao reconectar
- [ ] **INFRA-05**: Codigo modularizado em arquivos separados (CSS, JS por modulo, HTML base)
- [ ] **INFRA-06**: Deploy automatizado via Vercel com integracao GitHub
- [ ] **INFRA-07**: Variaveis de ambiente para credenciais Supabase (nunca hardcoded)

### Autenticacao & Acesso

- [ ] **AUTH-01**: Usuario pode fazer login com username e senha
- [ ] **AUTH-02**: Sessao persiste entre recargas do navegador
- [ ] **AUTH-03**: Admin tem acesso total a todos os modulos e dados de todas as regioes
- [ ] **AUTH-04**: Coordenador ve apenas dados da(s) sua(s) regiao(oes) e seus cabos eleitorais
- [ ] **AUTH-05**: Cabo eleitoral tem tela simplificada para acoes de campo (cadastrar apoiador, subir foto, ver missoes)
- [ ] **AUTH-06**: Pagina de troca de senha acessivel ao usuario logado
- [ ] **AUTH-07**: Redirect automatico para login quando sessao expira
- [ ] **AUTH-08**: Row Level Security (RLS) no Supabase isola dados por nivel de acesso

### Dashboard

- [ ] **DASH-01**: Dashboard mostra countdown para a eleicao (04/10/2026) com contagem regressiva
- [ ] **DASH-02**: Cards estatisticos com totais: cidades visitadas, equipe, demandas, pesquisas, lideres, XP
- [ ] **DASH-03**: Lista de proximos compromissos da agenda
- [ ] **DASH-04**: Feed de atividades recentes da equipe
- [ ] **DASH-05**: Dashboard carrega dados em tempo real do Supabase

### Cidades & Territorio

- [ ] **TERR-01**: Mapa interativo do DF com as 33 Regioes Administrativas
- [ ] **TERR-02**: Cada RA mostra status de cobertura (visitada/nao visitada) com cor diferenciada
- [ ] **TERR-03**: Clicar na RA mostra detalhes: visitas, lideres cadastrados, demandas, apoiadores
- [ ] **TERR-04**: Registrar visita a uma cidade com data e observacoes
- [ ] **TERR-05**: Estatisticas de cobertura territorial (% RAs visitadas, total de visitas)
- [ ] **TERR-06**: Marcadores no mapa para lideres e demandas geolocalizados

### Agenda

- [ ] **AGEN-01**: Criar compromisso com data, hora, titulo, local, tipo e observacoes
- [ ] **AGEN-02**: Tipos de evento: reuniao, visita, evento, debate, caminhada, live, outro
- [ ] **AGEN-03**: Buscar compromissos por titulo ou local
- [ ] **AGEN-04**: Excluir compromisso
- [ ] **AGEN-05**: Estatisticas: eventos hoje, esta semana, total
- [ ] **AGEN-06**: Alertas do calendario eleitoral TSE com prazos legais

### Pessoas & Equipe

- [ ] **PESS-01**: Cadastrar membro da equipe com nome, telefone, funcao, regiao e observacoes
- [ ] **PESS-02**: Funcoes disponiveis: coordenador, apoiador, voluntario, lideranca, assessor, digital, motorista
- [ ] **PESS-03**: Buscar pessoa por nome ou regiao
- [ ] **PESS-04**: Estatisticas por funcao (total, coordenadores, voluntarios, liderancas)
- [ ] **PESS-05**: Excluir membro da equipe
- [ ] **PESS-06**: Link direto para WhatsApp do membro (wa.me)

### Lideres Comunitarios

- [ ] **LIDE-01**: Cadastrar lider com nome, telefone, regiao, tipo, alcance e observacoes
- [ ] **LIDE-02**: Tipos de lideranca: comunitaria, religiosa, sindical, estudantil, empresarial, politica, digital, social
- [ ] **LIDE-03**: Estimar alcance (numero de pessoas que o lider influencia)
- [ ] **LIDE-04**: Buscar lideres por nome ou regiao
- [ ] **LIDE-05**: Estatisticas: total de lideres, alcance total, distribuicao por tipo

### Mapeamento Politico (Quem e Quem)

- [ ] **MAPA-01**: Cadastrar figura politica com nome, cargo, relacao, regiao e observacoes
- [ ] **MAPA-02**: Classificar relacao: aliado, neutro, adversario, potencial aliado
- [ ] **MAPA-03**: Buscar por nome ou cargo
- [ ] **MAPA-04**: Visualizacao com cores por tipo de relacao

### Demandas da Comunidade

- [ ] **DEMA-01**: Registrar demanda com titulo, regiao, categoria, prioridade, descricao e solicitante
- [ ] **DEMA-02**: Categorias: infraestrutura, saude, educacao, seguranca, transporte, social, meio ambiente
- [ ] **DEMA-03**: Prioridades: alta, media, baixa com cores visuais
- [ ] **DEMA-04**: Marcar demanda como resolvida
- [ ] **DEMA-05**: Filtrar demandas por prioridade e status
- [ ] **DEMA-06**: Estatisticas: abertas, urgentes, resolvidas, total

### Pesquisas Eleitorais

- [ ] **PESQ-01**: Registrar pesquisa com data, instituto, % do candidato, 1o colocado, amostra e margem
- [ ] **PESQ-02**: Grafico comparativo visual (barras) Neto vs 1o colocado
- [ ] **PESQ-03**: Tabela historica de todas as pesquisas
- [ ] **PESQ-04**: Estatisticas: ultima %, 1o colocado, total de pesquisas

### Materiais de Campanha

- [ ] **MATE-01**: Cadastrar material com nome, fase, pedido, estoque, distribuido, fornecedor
- [ ] **MATE-02**: Status automatico baseado em estoque/pedido (OK, Atencao, Critico)
- [ ] **MATE-03**: Estatisticas: total de itens, em estoque, distribuidos
- [ ] **MATE-04**: Log de distribuicao por regiao

### Gamificacao

- [ ] **GAME-01**: Sistema de XP com 10 niveis (Novato ate Imbativel) e icones por nivel
- [ ] **GAME-02**: Ranking de colaboradores ordenado por XP com medalhas (ouro, prata, bronze)
- [ ] **GAME-03**: Missoes do dia com titulo, descricao, categoria, prazo, XP e responsaveis
- [ ] **GAME-04**: Bonus de XP para o primeiro a concluir a missao
- [ ] **GAME-05**: Sistema de streaks (sequencia de dias ativos) com bonus em 3, 7 e 15 dias
- [ ] **GAME-06**: 12 trofeus desbloqueáveis por conquistas especificas
- [ ] **GAME-07**: Registrar XP manual por 14 tipos de acoes diferentes
- [ ] **GAME-08**: Upload de foto/print como comprovacao de atividade para ganhar XP
- [ ] **GAME-09**: Feed de ultimas jogadas (historico de XP ganho)
- [ ] **GAME-10**: Tabela de pontuacao visivel (como ganhar XP por categoria)

### Captacao de Leads (QR Code)

- [ ] **LEAD-01**: Gerar QR Code unico por cabo eleitoral que linka para formulario de apoiador
- [ ] **LEAD-02**: Formulario publico (sem login) para apoiador preencher: nome, telefone, regiao, como conheceu
- [ ] **LEAD-03**: Apoiador cadastrado via QR Code gera XP automatico para o cabo eleitoral dono do QR
- [ ] **LEAD-04**: Base de leads centralizada com todos apoiadores captados
- [ ] **LEAD-05**: Rastreamento de origem de cada lead (qual cabo eleitoral, qual QR, qual evento)
- [ ] **LEAD-06**: Consentimento LGPD explicito no formulario de cadastro
- [ ] **LEAD-07**: Export de leads para WhatsApp (lista de telefones formatada)

### Relatorios

- [ ] **RELA-01**: Gerar relatorio PDF com resumo da campanha (leads, visitas, equipe, pesquisas)
- [ ] **RELA-02**: Relatorio por regiao (dados filtrados por RA)
- [ ] **RELA-03**: Relatorio de gamificacao (ranking, XP distribuido, missoes concluidas)
- [ ] **RELA-04**: Export de dados em JSON para backup

### Captacao de Investimentos / Financeiro

- [ ] **FINA-01**: Cadastro de doadores/investidores com nome, telefone, valor doado, data
- [ ] **FINA-02**: Meta de arrecadacao com barra de progresso visual
- [ ] **FINA-03**: Categorias de despesa (material, transporte, alimentacao, digital, estrutura)
- [ ] **FINA-04**: Controle de orcamento: receitas vs despesas por categoria
- [ ] **FINA-05**: Alerta quando orcamento de categoria ultrapassa limite

### Operacoes de Campo

- [ ] **CAMP-01**: Controle de veiculos da campanha (placa, motorista, quilometragem)
- [ ] **CAMP-02**: Vales combustivel com controle de gasto por veiculo
- [ ] **CAMP-03**: Checklist de pre-campanha e campanha (itens obrigatorios por fase eleitoral)
- [ ] **CAMP-04**: Subcoordenacoes por segmento (juventude, mulheres, religioso, empresarial)
- [ ] **CAMP-05**: Bandeiracos/eventos externos com local, data e controle de conflito

### Compliance & Dados

- [ ] **COMP-01**: Dados eleitorais do DF por RA (eleitorado, fonte TRE-DF)
- [ ] **COMP-02**: Calendario eleitoral TSE com alertas de prazos legais
- [ ] **COMP-03**: Modulo juridico com timeline de obrigacoes eleitorais
- [ ] **COMP-04**: Consentimento LGPD em todos os formularios de coleta de dados pessoais

### Multi-Tenant (Comercializacao)

- [ ] **MULT-01**: Personalizacao de cores, logo e nome do candidato por instancia
- [ ] **MULT-02**: Configuracao de regioes/cidades por candidato (nao apenas DF)
- [ ] **MULT-03**: Isolamento total de dados entre candidatos via Supabase RLS
- [ ] **MULT-04**: Onboarding simplificado para novo candidato (wizard de configuracao)

### UX & Interface

- [ ] **UXUI-01**: Design responsivo mobile-first (funciona bem em celular de campo)
- [ ] **UXUI-02**: Dark theme profissional com identidade visual configuravel
- [ ] **UXUI-03**: Sidebar colapsavel em mobile com menu hamburger
- [ ] **UXUI-04**: Animacoes sutis (fadeIn, glow) para feedback visual
- [ ] **UXUI-05**: Confetti ao completar acoes importantes (engajamento)
- [ ] **UXUI-06**: Organograma interativo da campanha
- [ ] **UXUI-07**: Metricas de redes sociais (acompanhamento manual de WhatsApp, Instagram, TikTok)
- [ ] **UXUI-08**: War Room / feed em tempo real de atividades da equipe em campo

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Notificacoes Avancadas

- **NOTI-01**: Notificacoes push via PWA para novas missoes e eventos
- **NOTI-02**: Alerta quando apoiador e cadastrado via QR Code do cabo eleitoral
- **NOTI-03**: Resumo diario automatico para coordenadores

### Inteligencia & Automacao

- **INTEL-01**: Auto-research de dados eleitorais publicos (inspirado em Karpathy auto-research)
- **INTEL-02**: Sugestao automatica de regioes com menor cobertura para priorizar visitas
- **INTEL-03**: Deteccao de padroes de engajamento (quais acoes geram mais leads)
- **INTEL-04**: Mapa de calor por densidade de apoiadores cadastrados

### Agenda Avancada

- **AGEN-07**: Agenda de salas do comite com controle de conflito de horario
- **AGEN-08**: Patrimonio do comite (inventario de ativos, condicao, valor)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| App nativo (Play Store / App Store) | PWA atende, sem custo de publicacao, atualiza instantaneo |
| API WhatsApp Business | Custo alto, complexidade, links wa.me sao suficientes |
| Pagamento integrado | Venda unica manual, sem PCI-DSS |
| AI Chatbot | Complexidade alta, foco no operacional |
| Live streaming | Usar Instagram/YouTube existentes |
| Email marketing | Usar Mailchimp/SendGrid se necessario |
| Banco de dados eleitores nacional | Privacidade (LGPD), custo de aquisicao |
| SMS | Custo por mensagem, WhatsApp domina no Brasil |
| Reporting TSE/compliance fiscal | Contadores/advogados especializados |
| Social media posting | APIs instáveis, usuarios postam manualmente |
| Voter scoring preditivo | Requer data science, custo alto |
| Video call integrado | Zoom/Meet ja resolvem bem |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 3 | Pending |
| INFRA-04 | Phase 3 | Pending |
| INFRA-05 | Phase 1 | Pending |
| INFRA-06 | Phase 3 | Pending |
| INFRA-07 | Phase 1 | Pending |
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| AUTH-05 | Phase 1 | Pending |
| AUTH-06 | Phase 1 | Pending |
| AUTH-07 | Phase 1 | Pending |
| AUTH-08 | Phase 1 | Pending |
| DASH-01 | Phase 2 | Pending |
| DASH-02 | Phase 2 | Pending |
| DASH-03 | Phase 2 | Pending |
| DASH-04 | Phase 2 | Pending |
| DASH-05 | Phase 2 | Pending |
| TERR-01 | Phase 2 | Pending |
| TERR-02 | Phase 2 | Pending |
| TERR-03 | Phase 2 | Pending |
| TERR-04 | Phase 2 | Pending |
| TERR-05 | Phase 2 | Pending |
| TERR-06 | Phase 2 | Pending |
| AGEN-01 | Phase 2 | Pending |
| AGEN-02 | Phase 2 | Pending |
| AGEN-03 | Phase 2 | Pending |
| AGEN-04 | Phase 2 | Pending |
| AGEN-05 | Phase 2 | Pending |
| AGEN-06 | Phase 6 | Pending |
| PESS-01 | Phase 2 | Pending |
| PESS-02 | Phase 2 | Pending |
| PESS-03 | Phase 2 | Pending |
| PESS-04 | Phase 2 | Pending |
| PESS-05 | Phase 2 | Pending |
| PESS-06 | Phase 2 | Pending |
| LIDE-01 | Phase 2 | Pending |
| LIDE-02 | Phase 2 | Pending |
| LIDE-03 | Phase 2 | Pending |
| LIDE-04 | Phase 2 | Pending |
| LIDE-05 | Phase 2 | Pending |
| MAPA-01 | Phase 2 | Pending |
| MAPA-02 | Phase 2 | Pending |
| MAPA-03 | Phase 2 | Pending |
| MAPA-04 | Phase 2 | Pending |
| DEMA-01 | Phase 2 | Pending |
| DEMA-02 | Phase 2 | Pending |
| DEMA-03 | Phase 2 | Pending |
| DEMA-04 | Phase 2 | Pending |
| DEMA-05 | Phase 2 | Pending |
| DEMA-06 | Phase 2 | Pending |
| PESQ-01 | Phase 2 | Pending |
| PESQ-02 | Phase 2 | Pending |
| PESQ-03 | Phase 2 | Pending |
| PESQ-04 | Phase 2 | Pending |
| MATE-01 | Phase 2 | Pending |
| MATE-02 | Phase 2 | Pending |
| MATE-03 | Phase 2 | Pending |
| MATE-04 | Phase 2 | Pending |
| GAME-01 | Phase 4 | Pending |
| GAME-02 | Phase 4 | Pending |
| GAME-03 | Phase 4 | Pending |
| GAME-04 | Phase 4 | Pending |
| GAME-05 | Phase 4 | Pending |
| GAME-06 | Phase 4 | Pending |
| GAME-07 | Phase 4 | Pending |
| GAME-08 | Phase 4 | Pending |
| GAME-09 | Phase 4 | Pending |
| GAME-10 | Phase 4 | Pending |
| LEAD-01 | Phase 4 | Pending |
| LEAD-02 | Phase 4 | Pending |
| LEAD-03 | Phase 4 | Pending |
| LEAD-04 | Phase 4 | Pending |
| LEAD-05 | Phase 4 | Pending |
| LEAD-06 | Phase 4 | Pending |
| LEAD-07 | Phase 4 | Pending |
| RELA-01 | Phase 6 | Pending |
| RELA-02 | Phase 6 | Pending |
| RELA-03 | Phase 6 | Pending |
| RELA-04 | Phase 6 | Pending |
| FINA-01 | Phase 5 | Pending |
| FINA-02 | Phase 5 | Pending |
| FINA-03 | Phase 5 | Pending |
| FINA-04 | Phase 5 | Pending |
| FINA-05 | Phase 5 | Pending |
| CAMP-01 | Phase 5 | Pending |
| CAMP-02 | Phase 5 | Pending |
| CAMP-03 | Phase 5 | Pending |
| CAMP-04 | Phase 5 | Pending |
| CAMP-05 | Phase 5 | Pending |
| COMP-01 | Phase 6 | Pending |
| COMP-02 | Phase 6 | Pending |
| COMP-03 | Phase 6 | Pending |
| COMP-04 | Phase 6 | Pending |
| MULT-01 | Phase 7 | Pending |
| MULT-02 | Phase 7 | Pending |
| MULT-03 | Phase 7 | Pending |
| MULT-04 | Phase 7 | Pending |
| UXUI-01 | Phase 3 | Pending |
| UXUI-02 | Phase 3 | Pending |
| UXUI-03 | Phase 3 | Pending |
| UXUI-04 | Phase 3 | Pending |
| UXUI-05 | Phase 6 | Pending |
| UXUI-06 | Phase 6 | Pending |
| UXUI-07 | Phase 6 | Pending |
| UXUI-08 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 92 total
- Mapped to phases: 92
- Unmapped: 0

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-09 after roadmap creation*
