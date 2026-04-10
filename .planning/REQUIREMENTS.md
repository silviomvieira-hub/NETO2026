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
- [ ] **AUTH-04**: Colaborador (= coordenador de area) ve apenas dados da sua area de influencia e dos eleitores vinculados a ele
- [ ] **AUTH-05**: Tela simplificada para colaborador focada em acoes de campo (cadastrar eleitor, gerenciar grupo WA, subir foto, ver missoes, ranking)
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

### Colaboradores (Coordenadores) & Organograma

> Modelo: o sistema tem apenas DUAS classes de pessoas. **Colaborador** (=coordenador de uma area, trabalha, ganha pontos, gamificado) e **Eleitor** (=lead vinculado a 1 colaborador, so vota). Toda pessoa da campanha so existe se tiver uma area de influencia para coordenar.

- [ ] **PESS-01**: Cadastrar colaborador com nome, telefone, area de influencia (obrigatoria), funcao especifica e observacoes
- [ ] **PESS-02**: Toda area de influencia e ou (a) Geografica = 1 das 33 RAs do DF, ou (b) Horizontal = setor tematico (concessionarias, juventude, mulheres, igrejas, comercio, servidores, educacao, saude, seguranca, cultura, esporte, LGBTQIA+, cooperativas, terceira idade, etc)
- [ ] **PESS-03**: Funcao individual (cargo) registrada no perfil de cada colaborador (campo, formacao, logistica, juridico, digital, motorista, etc) — visivel ao candidato
- [ ] **PESS-04**: Validacao: nao e possivel cadastrar colaborador sem area de influencia atribuida
- [ ] **PESS-05**: Buscar colaborador por nome, area ou funcao
- [ ] **PESS-06**: Estatisticas: total de colaboradores, areas atribuidas vs vagas em aberto, colaboradores por tipo de area (geo/horizontal)
- [ ] **PESS-07**: Link direto WhatsApp (wa.me) do colaborador
- [ ] **PESS-08**: Organograma visual da campanha listando todas as 33 RAs + areas horizontais com slot para coordenador (preenchido ou vago) — entrada de cadastro principal
- [ ] **PESS-09**: Toda area pode ter 1 coordenador titular + N sublideres
- [ ] **PESS-10**: Reatribuir area de um colaborador (transferir ou desligar)

### Coordenador Geral (Funcao Unica)

> Modelo: existe **1 unico Coordenador Geral** na campanha — funcao centralizadora e nao competitiva (fora do ranking gamificado). E quem valida iniciativas criativas, cria missoes/metas/tarefas e distribui materiais. Todos os outros colaboradores sao coordenadores de area normais e disputam o ranking.

- [ ] **CGER-01**: Funcao "Coordenador Geral" exclusiva e unica no sistema (1 por campanha)
- [ ] **CGER-02**: Coord. Geral nao aparece no ranking competitivo
- [ ] **CGER-03**: Coord. Geral tem permissao de aprovar/rejeitar comprovacoes criativas enviadas pelos colaboradores
- [ ] **CGER-04**: Coord. Geral pode ajustar XP sugerido ao aprovar comprovacao
- [ ] **CGER-05**: Coord. Geral pode transformar uma comprovacao criativa aprovada em missao oficial recorrente da campanha
- [ ] **CGER-06**: Coord. Geral cadastra missoes do dia, metas semanais e tarefas distribuidas aos coordenadores de area
- [ ] **CGER-07**: Coord. Geral controla distribuicao de materiais de campanha aos coordenadores de area
- [ ] **CGER-08**: Dashboard exclusivo do Coord. Geral com fila de comprovacoes pendentes, alertas de inatividade e cobranca

> NOTA: removida a antiga secao "Lideres Comunitarios" (LIDE-XX). O sistema nao usa mais o conceito de "lider" — pessoas externas com influencia comunitaria sao registradas como Eleitores influentes vinculados a um colaborador, ou se trabalham ativamente, viram Colaboradores de area horizontal.

### Demandas da Comunidade

- [ ] **DEMA-01**: Registrar demanda com titulo, regiao, categoria, prioridade, descricao e solicitante
- [ ] **DEMA-02**: Categorias: infraestrutura, saude, educacao, seguranca, transporte, social, meio ambiente
- [ ] **DEMA-03**: Prioridades: alta, media, baixa com cores visuais
- [ ] **DEMA-04**: Marcar demanda como resolvida
- [ ] **DEMA-05**: Filtrar demandas por prioridade e status
- [ ] **DEMA-06**: Estatisticas: abertas, urgentes, resolvidas, total

### Pesquisas Eleitorais

- [ ] **PESQ-01**: Registrar pesquisa com data, instituto, % do candidato, 1o colocado, amostra e margem
- [ ] **PESQ-02**: Grafico comparativo visual (barras) Neto vs concorrentes
- [ ] **PESQ-03**: Tabela historica de todas as pesquisas
- [ ] **PESQ-04**: Estatisticas: ultima %, 1o colocado, total de pesquisas, delta vs lider, evolucao em 30/60/90d
- [ ] **PESQ-05**: Auto-busca automatica de novas pesquisas (Datafolha, Quaest, IPEC e similares) via crawl/scraping com cadastro automatico no sistema
- [ ] **PESQ-06**: Notificacao no dashboard quando nova pesquisa relevante for detectada
- [ ] **PESQ-07**: Distincao entre pesquisas estimuladas, espontaneas e de aprovacao pessoal
- [ ] **PESQ-08**: Helena cruza pesquisa com dados internos (RAs onde estamos crescendo vs pesquisa) para gerar insight

### Materiais de Campanha

- [ ] **MATE-01**: Cadastrar material com nome, fase, pedido, estoque, distribuido, fornecedor
- [ ] **MATE-02**: Status automatico baseado em estoque/pedido (OK, Atencao, Critico)
- [ ] **MATE-03**: Estatisticas: total de itens, em estoque, distribuidos
- [ ] **MATE-04**: Log de distribuicao por regiao

### Gamificacao (Automatica + Criativa)

> Filosofia: maximizar XP **automatico** (o sistema observa e pontua sozinho) e reservar a validacao manual do Coord. Geral so para iniciativas criativas nao previstas. Niveis renomeados sem o termo "lider": Coord. Iniciante → Coord. Ativo → Coord. Senior → Coord. Master.

- [ ] **GAME-01**: Sistema de XP com niveis Coord. Iniciante / Ativo / Senior / Master (sem termo "lider")
- [ ] **GAME-02**: Ranking de colaboradores ordenado por XP com medalhas (ouro, prata, bronze) — visivel a todos para criar competicao saudavel
- [ ] **GAME-03**: Ranking persistente (mini-widget) visivel em todas as telas do sistema dos coordenadores
- [ ] **GAME-04**: Highlight do "Campeao Coordenador" (top 1) com nome em destaque no dashboard
- [ ] **GAME-05**: Card de coordenador clicavel abrindo perfil completo (eleitores cadastrados, grupos, XP, posts captados, ultima atividade)
- [ ] **GAME-06**: XP automatico — eventos pontuados sem intervencao humana: cadastrar eleitor (+10), eleitor confirmado em grupo WA (+5), post pro-candidato detectado pelo bot (+3), check-in em campo (+2), missao concluida (+XP da missao), streak diario (+bonus), responder demanda (+5), participar de evento agendado (+10)
- [ ] **GAME-07**: Sistema de streaks (sequencia de dias ativos) com bonus em 3, 7 e 15 dias — automatico
- [ ] **GAME-08**: Comprovacoes criativas — colaborador envia 1+ fotos + descricao de iniciativa nao prevista (churrasco com apoiadores, bicicletada, adesivaco, cafe com referencias, etc)
- [ ] **GAME-09**: Comprovacao criativa entra em fila de validacao do Coord. Geral
- [ ] **GAME-10**: Coord. Geral aprova/rejeita comprovacao com XP ajustavel (sistema sugere valor base)
- [ ] **GAME-11**: Coord. Geral pode promover uma comprovacao aprovada a "missao oficial recorrente" (ex: bicicletada virou missao semanal RA V)
- [ ] **GAME-12**: Trofeus desbloqueaveis por conquistas especificas (10 por demo, expansivel)
- [ ] **GAME-13**: Feed de ultimas jogadas (historico de XP ganho com origem: auto vs validacao)
- [ ] **GAME-14**: Tabela de pontuacao visivel (como ganhar XP por categoria)

### Eleitores / Leads (QR Code + Vinculo Obrigatorio)

> Modelo: **Eleitor** = a segunda (e unica outra) classe de pessoa do sistema. So vota, nao trabalha. **Todo eleitor obrigatoriamente esta vinculado a 1 colaborador** (quem cadastrou ou quem foi atribuido), que ganha pontos por ele e e responsavel por mante-lo em pelo menos 1 grupo de WhatsApp.

- [ ] **LEAD-01**: Gerar QR Code unico por colaborador que linka para formulario de cadastro de eleitor
- [ ] **LEAD-02**: Formulario publico (sem login) para eleitor preencher: nome, telefone, RA, como conheceu, opt-in WhatsApp
- [ ] **LEAD-03**: Eleitor cadastrado via QR Code gera XP automatico para o colaborador dono do QR
- [ ] **LEAD-04**: Base de eleitores centralizada com vinculo obrigatorio a 1 colaborador
- [ ] **LEAD-05**: Rastreamento de origem (colaborador, QR, evento, data)
- [ ] **LEAD-06**: Consentimento LGPD explicito + aviso de monitoramento de grupos de WhatsApp
- [ ] **LEAD-07**: Validacao: ao cadastrar eleitor, atribuir obrigatoriamente a 1 colaborador (default = quem cadastrou)
- [ ] **LEAD-08**: Validacao secundaria: ao criar eleitor, sugerir grupo(s) de WhatsApp da area do colaborador para insercao imediata
- [ ] **LEAD-09**: Reatribuir eleitor para outro colaborador (transferencia de carteira)
- [ ] **LEAD-10**: Dashboard por colaborador: quantos eleitores cadastrou, quantos estao em grupo, taxa de cobertura
- [ ] **LEAD-11**: Export de eleitores para WhatsApp (lista de telefones formatada)

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

### Grupos de WhatsApp & Numero Monitor

- [ ] **WPP-01**: Aba dedicada de Grupos de WhatsApp no menu principal do sistema
- [ ] **WPP-02**: Cadastrar grupo com nome, tipo (geografica/horizontal), area vinculada (RA ou setor), admin (colaborador responsavel), link de convite e descricao
- [ ] **WPP-03**: Toda area do organograma (33 RAs + areas horizontais) pode ter 1 ou mais grupos vinculados
- [ ] **WPP-04**: Regra de compliance: todo eleitor deve estar em pelo menos 1 grupo de WhatsApp
- [ ] **WPP-05**: Regra de compliance: todo colaborador deve cuidar de no minimo 1 grupo de WhatsApp (admin)
- [ ] **WPP-06**: Dashboard de compliance: % de eleitores em grupo, % de colaboradores com grupo, lista de quem esta fora da regra
- [ ] **WPP-07**: Distribuicao automatica sugerida: eleitores fora de grupo agrupados pela RA e atribuidos ao colaborador da regiao
- [ ] **WPP-08**: Numero monitor proprio da campanha (Helena Bot) adicionado a todos os grupos
- [ ] **WPP-09**: Numero monitor captura todas as mensagens dos grupos e armazena com timestamp, autor, grupo e conteudo
- [ ] **WPP-10**: Classificacao automatica de cada post: PRO-candidato, NEUTRO, ATAQUE (analise de sentimento + keywords)
- [ ] **WPP-11**: Cada post PRO-candidato gera XP automatico para o colaborador que postou (gamificacao)
- [ ] **WPP-12**: Deteccao de ataques/fake news com alerta em tempo real para a coordenacao + sugestao de resposta da Helena
- [ ] **WPP-13**: Metricas por grupo: membros, mensagens/dia, crescimento semanal, ultimo admin ativo, sentimento medio
- [ ] **WPP-14**: Status do grupo: ATIVO, INATIVO (>72h sem mensagem), OFICIAL (broadcast da campanha)
- [ ] **WPP-15**: Alerta automatico quando grupo fica inativo >72h com cobranca ao admin responsavel
- [ ] **WPP-16**: Botao de reatribuicao de admin quando colaborador some
- [ ] **WPP-17**: Feed em tempo real das ultimas N capturas (autor, grupo, sentimento, snippet)
- [ ] **WPP-18**: Relatorio de engajamento por grupo com top postadores e melhores horarios
- [ ] **WPP-19**: Mensagem broadcast programada da coordenacao para 1 ou mais grupos
- [ ] **WPP-20**: Link wa.me direto do contato individual de cada colaborador e eleitor
- [ ] **WPP-21**: Conformidade LGPD: aviso explicito de monitoramento ao entrar no grupo, opt-out garantido
- [ ] **WPP-22**: Implementacao do bot via WhatsApp Business API (Meta Cloud API) ou solucao equivalente (whatsapp-web.js como fallback)

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
