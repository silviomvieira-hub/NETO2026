# Funcionalidades Completas — CampanhaApp NETO 2026

**Consolidado em:** 2026-04-10
**Fonte:** Todas as solicitacoes feitas pelo usuario durante sessoes de desenvolvimento do demo e planejamento do sistema.

---

## Modelo Conceitual (Regras de Ouro)

| Regra | Descricao |
|-------|-----------|
| **So 2 classes de pessoa** | **Coordenador** (trabalha, gamificado, tem area) e **Eleitor** (so vota, lead vinculado) |
| **Sem "lider"** | O termo "lider" nao existe no sistema. Pessoas externas influentes = "referencias" |
| **Sem "colaborador"** | Todos sao coordenadores. Quem trabalha na campanha = coordenador |
| **Sem "Quem e Quem"** | Removido. Nao faz sentido como modulo |
| **Area obrigatoria** | Coordenador so existe se tiver area de influencia (geografica ou horizontal) |
| **Vinculo obrigatorio** | Todo eleitor vinculado a 1 coordenador |
| **Todo eleitor em grupo WA** | Regra de compliance |
| **Todo coordenador admin ≥1 grupo** | Regra de compliance |
| **Gamificacao maxima automatica** | Sistema da XP sozinho. Coord. Geral so valida iniciativas criativas |

---

## 1. Tela Inicial (Splash)

- [ ] Tela fullscreen ao abrir o app — cobre a tela inteira edge-to-edge
- [ ] Foto grande do candidato (Neto) ocupando area central
- [ ] Foto piscando (animacao pulse de brilho e escala)
- [ ] Nome "NETO RODRIGUES" com glow
- [ ] "Deputado Distrital · DF 2026"
- [ ] Frase **"VAMOS TRABALHAR"** em destaque, pulsando, gradiente verde/dourado animado
- [ ] Tag "Pre-Campanha 2026"
- [ ] CTA "Toque para entrar →"
- [ ] Confete ao abrir a pagina (mentalidade positiva, moral alto)
- [ ] Confete ao clicar (reforco de uso do sistema)
- [ ] Confete ao entrar no dashboard (reforco positivo no destino)
- [ ] Clique em qualquer lugar fecha splash e abre dashboard

---

## 2. Dashboard Principal (Aba Inteligencia)

### 2.1 Countdown Eleicao
- [ ] Numero grande pulsante com dias faltando ate 04/10/2026
- [ ] "ate 04/10/2026 · Eleicao 2026"
- [ ] Barra de fases: Pre-campanha (ativa) | Campanha | 2o turno

### 2.2 Ranking Persistente (em TODAS as telas)
- [ ] Mini-widget no topo de TODAS as abas/views
- [ ] Top 5-6 coordenadores com medalhas, nome, XP, numero de grupos
- [ ] Clique vai pra aba Coordenadores (ranking completo)
- [ ] Competicao saudavel visivel em todos os sistemas dos coordenadores

### 2.3 Briefing Helena (Inteligencia)
- [ ] Card com briefing do dia da IA Helena
- [ ] "O que importa agora" — sintese das prioridades
- [ ] Acoes recomendadas com justificativa

### 2.4 Aniversariantes do Dia
- [ ] Lista consolidada de aniversariantes (coordenadores + eleitores)
- [ ] Card com nome, idade, classificacao (eleitor/coordenador), area, vinculo
- [ ] Botao **Ligar** (abre discador)
- [ ] Botao **WhatsApp** (wa.me com mensagem template)
- [ ] Helena gera roteiro contextual da ligacao (area, ultima interacao, demanda)
- [ ] Notificacao push pro coordenador responsavel tambem cumprimentar
- [ ] Marcar "ligacao feita" gera XP + historico no perfil
- [ ] Filtro: aniversariantes da semana / mes / proximos 30 dias
- [ ] Campo data de aniversario obrigatorio no cadastro de coordenador e eleitor

### 2.5 Agenda de Hoje (Cronograma Operacional)
- [ ] Plano operacional do dia dividido em 3 trilhas:
  - **Candidato** — compromissos pessoais do Neto com horarios
  - **Coordenacao** — tarefas da coordenacao central
  - **Coordenadores** — frentes de campo com responsaveis nomeados e funcao
- [ ] Itens concluidos riscados (done)
- [ ] Item atual destacado com tag "AGORA"
- [ ] Badge D-XXX (dias faltando)

### 2.6 Proximos Dias (Preview)
- [ ] Preview de 5 dias com compromissos-chave por cor (candidato/coord/campo)
- [ ] Dias de alta intensidade destacados em vermelho
- [ ] Botao "Ver cronograma completo"

### 2.7 Cronograma Completo (Modal — 14 dias)
- [ ] Detalhamento dia a dia (D-179 ate D-166 no demo)
- [ ] Cada dia: data + badge (HOJE / ALTA / CLDF / Midia / Feriado)
- [ ] Linhas tagged por trilha: Cand / Coord / Coord (campo)
- [ ] Bloco "Foco do dia" com insight Helena

### 2.8 Acoes Prioritarias (Helena)
- [ ] 3 acoes de hoje recomendadas pela IA
- [ ] Cada acao: prioridade (ALTA/MEDIA/BAIXA), deadline, justificativa, draft pronto
- [ ] Botoes: executar, marcar feito, dispensar

### 2.9 Alertas Ativos
- [ ] Alertas criticos (adversario, operacional)
- [ ] Link para analise Helena

### 2.10 Noticias Relevantes
- [ ] Feed de noticias com impacto (ALTO/MEDIO)
- [ ] Tags tematicas
- [ ] Insight Helena ("usar no post", "mencionar na visita")
- [ ] Botoes: Ler, Usar, Arquivar

### 2.11 Camada Invisivel (Insights Helena)
- [ ] Insights gerados pela IA que ninguem mais ve
- [ ] **Cruzamento de dados**: Helena cruza Cidades Visitadas x Coordenadores x Grupos WA x Demandas para gerar insights acionaveis
- [ ] Exemplo: "Gama visitado 1x mas tem 4 coords ativos com 187 membros WA e 12 demandas abertas = janela de oportunidade"
- [ ] Exemplo: "Creches triplicaram demanda, nenhum adversario mencionou = janela de 3 semanas"
- [ ] Metricas: janela estimada, confianca, fontes cruzadas
- [ ] Botao "Gerar plano de acao completo" → abre modal com steps

### 2.12 Pesquisas Eleitorais
- [ ] Pesquisas pre-populadas (Datafolha, Quaest, IPEC)
- [ ] Barras visuais comparativas (Neto em verde, 1o colocado em dourado)
- [ ] Tipos: estimulada, espontanea, aprovacao pessoal
- [ ] Metricas: amostra, margem, delta vs 1o, evolucao 30d
- [ ] **Auto-busca automatica**: Helena monitora 3+ institutos e cadastra pesquisas novas automaticamente
- [ ] Notificacao quando pesquisa nova detectada
- [ ] Helena cruza pesquisa com dados internos pra gerar insight

### 2.13 Pulso da Campanha (Cards Clicaveis)
- [ ] Cards com metricas-chave, todos clicaveis abrindo detalhes:
  - **Eleitores cadastrados** (total + delta semana)
  - **Coordenadores** (total) → abre aba Coordenadores
  - **Cidades visitadas** (X/33) → abre aba Organograma
  - **Atividades hoje** (fotos enviadas)
  - **Campeao Coordenador** (nome + XP + area — card dourado com glow)
  - **Demandas abertas** (total + novas hoje)
  - Ceilandia / Taguatinga (RAs com destaque positivo ou negativo)

---

## 3. Aba Organograma

### 3.1 Visao Geral
- [ ] Stats: areas atribuidas / vagas em aberto / total areas
- [ ] Explicacao do modelo 2 classes (coordenador vs eleitor)

### 3.2 Areas Geograficas (33 RAs do DF)
- [ ] Grid com TODAS as 33 Regioes Administrativas (RA I a RA XXXIII)
- [ ] Cada slot mostra: nome da RA, coordenador atribuido (ou "VAGA — atribuir")
- [ ] Slots preenchidos: metricas (eleitores, leads/semana)
- [ ] Slots criticos em vermelho (ex: Ceilandia -18%, 72h sem check-in)
- [ ] Slots top em dourado (ex: Sobradinho TOP 1)
- [ ] Clicar em slot abre cadastro/edicao do coordenador

### 3.3 Areas Horizontais (Setores Tematicos)
- [ ] 15+ areas independentes de RA: Concessionarias, Juventude, Mulheres, Igrejas Evangelicas, Igrejas Catolicas, Comercio/Feirantes, Servidores Publicos, Educacao/Professores, Saude/Profissionais, Seguranca PM/BM, Cultura, Esporte, LGBTQIA+, Cooperativas, Terceira Idade
- [ ] Mesma logica de slot (preenchido ou vaga)
- [ ] Area pode ter 1 titular + N sub-coordenadores

### 3.4 Cadastro de Coordenador
- [ ] Nome, telefone, area de influencia (obrigatoria), funcao especifica, data de aniversario
- [ ] Nao permite cadastrar sem area
- [ ] Funcao individual visivel ao candidato (campo, formacao, logistica, juridico, digital, motorista, etc)

---

## 4. Aba Coordenadores (Ranking Gamificado)

### 4.1 Stats Gerais
- [ ] Total de coordenadores / eleitores cadastrados / delta semanal

### 4.2 Filtros
- [ ] Todos / Geograficas / Horizontais / Top 5 / Atencao

### 4.3 Coordenador Geral (Funcao Unica)
- [ ] 1 unico por campanha — fora do ranking competitivo
- [ ] Aprova/rejeita comprovacoes criativas, ajusta XP
- [ ] Pode transformar comprovacao aprovada em missao oficial recorrente
- [ ] Cadastra missoes do dia, metas semanais, tarefas
- [ ] Distribui materiais de campanha aos coordenadores de area
- [ ] Dashboard exclusivo com fila de pendencias

### 4.4 Ranking Completo
- [ ] Lista 1 a N com medalhas top 1/2/3
- [ ] Campeao (top 1) com badge "CAMPEAO" e nome grande no dashboard
- [ ] Cada card mostra: posicao, nome, area (GEO/HOR), XP, eleitores, leads/semana, nº grupos WA
- [ ] Niveis: Coord. Iniciante → Coord. Ativo → Coord. Senior → Coord. Master (SEM "lider")
- [ ] Coordenador em risco destacado em vermelho (inatividade, queda)

### 4.5 Perfil Detalhado do Coordenador (Modal — clicavel)
- [ ] Avatar + nome + area + funcao na campanha
- [ ] 6 stats: XP, Eleitores, Grupos WA, Leads/semana, Posts pro-candidato, Ataques respondidos
- [ ] Lista de eleitores cadastrados
- [ ] Lista de grupos WA que cuida
- [ ] Ultimo check-in (com alerta se inativo)
- [ ] Botoes: WhatsApp, Ir pra area no organograma

### 4.6 Gamificacao Automatica (Sistema da XP sozinho)
- [ ] Cadastrar eleitor = +10 XP
- [ ] Eleitor confirmado em grupo WA = +5 XP
- [ ] Post pro-candidato detectado pelo bot = +3 XP
- [ ] Check-in em campo = +2 XP
- [ ] Missao concluida = +XP da missao
- [ ] Streak diario = +bonus (3d, 7d, 15d)
- [ ] Responder demanda = +5 XP
- [ ] Participar de evento agendado = +10 XP
- [ ] Trofeus desbloqueaveis por conquistas
- [ ] Feed de ultimas jogadas (historico XP com origem: auto vs validacao)
- [ ] Tabela de pontuacao visivel

### 4.7 Comprovacoes Criativas (Fotos)
- [ ] Coordenador envia foto + descricao de iniciativa nao prevista
- [ ] Tipos: churrasco com apoiadores, bicicletada, adesivaco, passeata, cafe com referencias, etc
- [ ] 1+ fotos por comprovacao
- [ ] Coord. Geral valida (aprova/rejeita) com XP ajustavel
- [ ] Coord. Geral pode "gostar tanto" que transforma em **missao oficial recorrente**
- [ ] Historico de comprovacoes aprovadas

---

## 5. Aba Midia Kit (Materiais de Divulgacao)

### 5.1 Conceito
- [ ] Tudo que o coordenador precisa pra trabalhar digitalmente
- [ ] Coordenador entra, escolhe material, baixa arte, copia texto, posta/divulga nos grupos

### 5.2 Stats
- [ ] Total de materiais / novos esta semana / stories / textos WA

### 5.3 Filtros
- [ ] Todos / Instagram / WhatsApp / Stories / Cards / Videos / Textos

### 5.4 Tipos de Material
- [ ] **Instagram Post** (1080x1080) — arte + legenda pronta
- [ ] **Stories** (9:16) — frames sequenciais + legenda
- [ ] **Cards de dados** — infograficos com numeros da CLDF, pesquisas, etc
- [ ] **Videos** (reels/cortes) — vertical 30s-60s + legenda
- [ ] **Textos WhatsApp** — prontos pra colar (convite, apresentacao, pauta do dia)
- [ ] **Textos longos** — scripts de primeiro contato com grupo novo
- [ ] **Cards regionais** — adaptados por RA (pauta Sobradinho, pauta Samambaia, etc)
- [ ] **Respostas urgentes** — contra-narrativa ao adversario (Red Team)

### 5.5 Cada Material Tem
- [ ] Thumbnail visual por tipo (gradiente Instagram, verde WA, etc)
- [ ] Tipo/formato
- [ ] Titulo + tags tematicas (#transporte, #saude, etc)
- [ ] Preview do texto
- [ ] Deadline ("postar ate 19h45")
- [ ] Botoes: **Baixar**, **Copiar texto**, **Postar nos grupos WA**

### 5.6 Engajamento e Aprendizado
- [ ] **Contadores visiveis** por material: downloads, reposts, views
- [ ] Materiais mais baixados/repostados destacados como **"Em Alta" (trending)**
- [ ] **Helena monitora** quais materiais performam melhor (ex: "cards de transporte +47% melhor")
- [ ] Sistema aprende e prioriza temas de alto engajamento nas proximas artes
- [ ] Coordenadores veem a quantidade de downloads de cada material

---

## 6. Aba Grupos de WhatsApp

### 6.1 Numero Monitor (Helena Bot)
- [ ] Numero proprio da campanha adicionado a TODOS os grupos
- [ ] Status ao vivo (ao vivo, ultimo sync)
- [ ] Metricas: grupos monitorados (100% cobertura), posts captados hoje, posts pro-candidato (%), ataques detectados
- [ ] **Feed ao vivo** das ultimas capturas: timestamp + coordenador + grupo + snippet + sentimento (PRO/ATAQUE/NEUTRO)
- [ ] Botoes: relatorio completo, configurar bot

### 6.2 Regras de Compliance
- [ ] Todo eleitor em pelo menos 1 grupo
- [ ] Todo coordenador admin de pelo menos 1 grupo
- [ ] Dashboard de compliance: % eleitores em grupo, % coordenadores com grupo
- [ ] Alerta quando eleitores fora de grupo (distribuir por RA)
- [ ] Distribuicao automatica sugerida

### 6.3 Lista de Grupos
- [ ] Cada grupo: nome, tipo (geo/horizontal), admin (coordenador), badge (ATIVO/INATIVO/OFICIAL)
- [ ] Metricas: membros, mensagens/dia, crescimento semanal
- [ ] Grupo inativo (>72h sem msg) em vermelho com cobranca ao admin
- [ ] Botoes: Abrir, Postar, Relatorio, Cobrar, Reatribuir admin
- [ ] Mensagem broadcast programada para 1+ grupos

### 6.4 Implementacao Tecnica
- [ ] WhatsApp Business API (Meta Cloud API) ou whatsapp-web.js como fallback
- [ ] Classificacao automatica de sentimento (PRO/NEUTRO/ATAQUE)
- [ ] XP automatico pro coordenador que posta pro-candidato
- [ ] Alerta de ataque/fake news + sugestao de resposta Helena
- [ ] LGPD: aviso de monitoramento ao entrar no grupo

---

## 7. Funcionalidades Transversais

### 7.1 Inteligencia Helena (Cruzamento de Dados)
- [ ] Cruza Cidades Visitadas x Coordenadores x Grupos WA x Demandas x Pesquisas
- [ ] Gera insights acionaveis ("Gama subexplorado", "Creches janela aberta")
- [ ] Auto-busca de pesquisas eleitorais
- [ ] Monitora materiais de midia mais eficazes
- [ ] Gera roteiro de ligacao pra aniversariantes
- [ ] Detecta ataques e sugere resposta
- [ ] Aprende com dados e melhora recomendacoes

### 7.2 Cadastro de Eleitor (Lead)
- [ ] QR Code unico por coordenador → formulario publico
- [ ] Nome, telefone, RA, como conheceu, opt-in WhatsApp, data de aniversario
- [ ] Vinculo obrigatorio a 1 coordenador (default = quem cadastrou)
- [ ] Sugerir grupo WA da area na hora do cadastro
- [ ] Reatribuir eleitor pra outro coordenador
- [ ] Dashboard por coordenador (eleitores, cobertura de grupo)
- [ ] Export lista de telefones formatada
- [ ] Consentimento LGPD + aviso de monitoramento

### 7.3 Pesquisas Eleitorais
- [ ] Registro manual com data, instituto, %, amostra, margem
- [ ] Tipos: estimulada, espontanea, aprovacao pessoal
- [ ] Grafico comparativo visual
- [ ] Tabela historica
- [ ] Auto-busca automatica (Datafolha, Quaest, IPEC)
- [ ] Helena cruza com dados internos pra insight

### 7.4 Demandas da Comunidade
- [ ] Registrar com titulo, regiao, categoria, prioridade, descricao, solicitante
- [ ] Categorias: infra, saude, educacao, seguranca, transporte, social, meio ambiente
- [ ] Prioridades: alta, media, baixa com cores
- [ ] Marcar como resolvida, filtrar, estatisticas

### 7.5 Agenda
- [ ] Criar compromisso (data, hora, titulo, local, tipo, obs)
- [ ] Tipos: reuniao, visita, evento, debate, caminhada, live, outro
- [ ] Alertas calendario eleitoral TSE
- [ ] Busca, exclusao, estatisticas

### 7.6 Territorio (33 RAs)
- [ ] Mapa interativo do DF com 33 RAs
- [ ] Status de cobertura por cor (visitada/nao)
- [ ] Detalhes por RA: visitas, coordenadores, demandas, eleitores
- [ ] Registrar visita com data e observacoes
- [ ] Estatisticas de cobertura territorial

### 7.7 Materiais Fisicos de Campanha
- [ ] Cadastrar material (nome, fase, pedido, estoque, distribuido, fornecedor)
- [ ] Status automatico (OK, Atencao, Critico)
- [ ] Log de distribuicao por regiao

### 7.8 Financeiro
- [ ] Cadastro de doadores/investidores
- [ ] Meta de arrecadacao com barra de progresso
- [ ] Categorias de despesa
- [ ] Controle orcamento receitas vs despesas
- [ ] Alertas de estouro

### 7.9 Operacoes de Campo
- [ ] Controle de veiculos (placa, motorista, km)
- [ ] Vales combustivel
- [ ] Checklist de pre-campanha/campanha
- [ ] Bandeiracos com controle de conflito

### 7.10 Relatorios
- [ ] PDF resumo da campanha
- [ ] Relatorio por regiao
- [ ] Relatorio de gamificacao
- [ ] Export JSON backup

### 7.11 Compliance & Juridico
- [ ] Dados eleitorais TRE-DF por RA
- [ ] Calendario eleitoral TSE com alertas
- [ ] Timeline obrigacoes eleitorais
- [ ] LGPD em todos os formularios

---

## 8. Infraestrutura & UX

### 8.1 Backend
- [ ] Supabase (PostgreSQL, Auth, Storage, Realtime)
- [ ] PWA instalavel com offline (IndexedDB + sync)
- [ ] Deploy automatizado Vercel + GitHub
- [ ] Variaveis de ambiente para credenciais
- [ ] Row Level Security (RLS)

### 8.2 Autenticacao
- [ ] Login username/senha
- [ ] Sessao persistente
- [ ] 3 niveis: Admin (candidato), Coordenador Geral, Coordenador de area
- [ ] Coordenador ve so sua area e seus eleitores
- [ ] Redirect automatico quando sessao expira

### 8.3 Interface
- [ ] Mobile-first responsivo (celular de campo e prioridade)
- [ ] Dark theme profissional com identidade configuravel
- [ ] Bottom nav com 5 abas: Inteligencia, Organograma, Coordenadores, Midia, Grupos WA
- [ ] Animacoes (fadeIn, glow, confetti ao completar acoes)
- [ ] Organograma interativo
- [ ] Busca automatica no sistema

### 8.4 Multi-Tenant (Comercializacao futura)
- [ ] Cores, logo, nome do candidato configuraveis
- [ ] Regioes/cidades por candidato (nao apenas DF)
- [ ] Isolamento total de dados via RLS
- [ ] Onboarding wizard para novo candidato

---

## Resumo Numerico

| Categoria | Qtd |
|-----------|-----|
| Tela Inicial (Splash) | 12 |
| Dashboard/Inteligencia | 47 |
| Organograma | 14 |
| Coordenadores + Gamificacao | 38 |
| Midia Kit | 18 |
| Grupos WhatsApp | 22 |
| Helena (Inteligencia) | 7 |
| Eleitores/Leads | 12 |
| Pesquisas | 8 |
| Demandas | 6 |
| Agenda | 6 |
| Territorio | 6 |
| Materiais Fisicos | 4 |
| Financeiro | 5 |
| Operacoes Campo | 4 |
| Relatorios | 4 |
| Compliance | 4 |
| Infra + UX + Auth | 18 |
| Multi-Tenant | 4 |
| **TOTAL** | **~239** |
