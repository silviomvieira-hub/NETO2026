# Funcionalidades Completas — CampanhaApp NETO 2026

**Consolidado em:** 2026-04-10
**Fonte:** Todas as solicitacoes feitas pelo usuario durante sessoes de desenvolvimento do demo e planejamento do sistema.
**Auditoria Demo Unificado:** 2026-04-10 — verificado contra `demo-unificado.html`

> **ESCOPO:** Demo de apresentacao com dados hardcoded para mostrar ao cliente. Nao e sistema funcional — sem backend, sem CRUD, sem auth. O objetivo e visualizar todas as telas e fluxos antes de implementar o sistema real.

---

## Legenda

| Simbolo | Significado |
|---------|-------------|
| ✅ `[x]` | Visivel no demo (tela/secao/componente presente) |
| ⚠️ `[~]` | Parcialmente visivel (existe mas incompleto) |
| ❌ `[ ]` | NAO visivel — FALTA no demo de apresentacao |

**Resumo rapido: 38 feitas / 13 parciais / 180 faltando = ~239 total**

---

## Modelo Conceitual (Regras de Ouro)

| Regra | Descricao | Status Demo |
|-------|-----------|-------------|
| **So 2 classes de pessoa** | **Coordenador** (trabalha, gamificado, tem area) e **Eleitor** (so vota, lead vinculado) | ❌ Demo usa "Líderes" e "Pessoas" separados |
| **Sem "lider"** | O termo "lider" nao existe no sistema. Pessoas externas influentes = "referencias" | ❌ Demo tem aba "Líderes Comunitários" |
| **Sem "colaborador"** | Todos sao coordenadores. Quem trabalha na campanha = coordenador | ❌ Demo usa termos misturados |
| **Sem "Quem e Quem"** | Removido. Nao faz sentido como modulo | ✅ Nao existe no demo |
| **Area obrigatoria** | Coordenador so existe se tiver area de influencia (geografica ou horizontal) | ❌ Cadastro sem validacao |
| **Vinculo obrigatorio** | Todo eleitor vinculado a 1 coordenador | ❌ Nao implementado |
| **Todo eleitor em grupo WA** | Regra de compliance | ❌ Nao implementado |
| **Todo coordenador admin ≥1 grupo** | Regra de compliance | ❌ Nao implementado |
| **Gamificacao maxima automatica** | Sistema da XP sozinho. Coord. Geral so valida iniciativas criativas | ❌ XP e estatico no demo |

---

## 1. Tela Inicial (Splash) — 7/12 feitas

- [x] Tela fullscreen ao abrir o app — cobre a tela inteira edge-to-edge
- [x] Foto grande do candidato (Neto) ocupando area central
- [x] Foto piscando (animacao pulse de brilho e escala) — animacao glow aplicada
- [ ] Nome "NETO RODRIGUES" com glow — **FALTA: splash mostra "VAMOS TRABALHAR?" mas nao o nome do candidato em destaque separado**
- [~] "Deputado Distrital · DF 2026" — presente como subtitle mas sem formatacao especifica
- [x] Frase **"VAMOS TRABALHAR"** em destaque, pulsando, gradiente verde/dourado animado — presente com neonPulse
- [ ] Tag "Pre-Campanha 2026" — **FALTA**
- [x] CTA "Toque para entrar →" — botao "ENTRAR NO SISTEMA"
- [ ] Confete ao abrir a pagina (mentalidade positiva, moral alto) — **FALTA: confete so dispara ao clicar**
- [x] Confete ao clicar (reforco de uso do sistema) — funcionando
- [ ] Confete ao entrar no dashboard (reforco positivo no destino) — **FALTA**
- [x] Clique em qualquer lugar fecha splash e abre dashboard — funciona via botao

---

## 2. Dashboard Principal (Aba Inteligencia)

> **HELENA E A IA DO SISTEMA.** Nao e um chatbot generico — e a Dra. Helena Inteia Vasconcelos, Cientista-Chefe da INTEIA, com skill `helena-master` em `sistema-campanha/06-skills-helena/helena-master/`. Possui arsenal de pesquisa em 5 camadas (POLARIS), 2.613+ agentes sinteticos, teoria dos jogos (40+ modelos), framework de persuasao, comite de consultores lendarios, e modo onirico. A aba Inteligencia e o cerebro da campanha — roda 24/7 em background via 5 jobs automaticos e entrega tudo pronto pro candidato.

### 2.0 Chat com Helena (Conversa Direta) — 0/6 ❌ INTEIRO FALTANDO
- [ ] Interface de chat dentro da aba Inteligencia para conversar diretamente com Helena — **FALTA**
- [ ] Helena responde usando skill `helena-master` (pesquisa profunda, teoria dos jogos, agentes sinteticos, POLARIS) — **FALTA**
- [ ] Perguntas em linguagem natural ("como esta Samambaia?", "analise o adversario X", "gere plano pra Ceilandia") — **FALTA**
- [ ] Helena puxa dados internos (demandas, visitas, leads, pesquisas, gamificacao) para contextualizar respostas — **FALTA**
- [ ] Historico de conversas persistente — **FALTA**
- [ ] Botao rapido "Perguntar a Helena" acessivel de qualquer tela — **FALTA**

### 2.0b Inteligencia Automatica (5 Jobs Background) — 0/5 ❌ INTEIRO FALTANDO
> Conforme `INTELIGENCIA_ATIVA.md` — Helena roda 24/7 sem intervencao humana

- [ ] **Job 1 — news-scanner** (30/30min): coleta noticias de Google News, RSS Metropoles/Correio/G1/Agencia Brasilia, CLDF, DODF, Twitter — **FALTA**
- [ ] **Job 2 — data-analyzer** (2/2h): detecta padroes em SQL puro (tendencia demanda, queda regional, lead VIP, coord inativo, material em falta) — **FALTA**
- [ ] **Job 3 — helena-synthesizer** (4x/dia 06/12/17/21h): consolida tudo, consulta comite de consultores lendarios, Red Team, gera top 3 acoes com draft pronto — **FALTA**
- [ ] **Job 4 — opportunity-miner** (1x/dia 05h): Camada Invisivel via POLARIS 5 camadas (superficie, vertical, historica, adversarial, sinal fraco) — **FALTA**
- [ ] **Job 5 — critical-watcher** (tempo real): trigger push notification para alertas criticos (adversario cita candidato, escandalo aliado, decisao TRE/TSE) — **FALTA**

### 2.1 Countdown Eleicao — 1/3
- [~] Numero grande pulsante com dias faltando ate 04/10/2026 — **PARCIAL: countdown existe no header mas e pequeno, nao e grande/pulsante**
- [ ] "ate 04/10/2026 · Eleicao 2026" — **FALTA: so mostra "X dias para eleicao"**
- [ ] Barra de fases: Pre-campanha (ativa) | Campanha | 2o turno — **FALTA**

### 2.2 Ranking Persistente (em TODAS as telas) — 0/4
- [ ] Mini-widget no topo de TODAS as abas/views — **FALTA**
- [ ] Top 5-6 coordenadores com medalhas, nome, XP, numero de grupos — **FALTA: ranking so na aba gamificacao**
- [ ] Clique vai pra aba Coordenadores (ranking completo) — **FALTA**
- [ ] Competicao saudavel visivel em todos os sistemas dos coordenadores — **FALTA**

### 2.3 Briefing Helena (Inteligencia) — 2/3
- [x] Card com briefing do dia da IA Helena — presente no dashboard
- [x] "O que importa agora" — sintese das prioridades — presente
- [ ] Acoes recomendadas com justificativa — **FALTA no dashboard (existe na pagina inteligencia)**

### 2.4 Aniversariantes do Dia — 0/8
- [ ] Lista consolidada de aniversariantes (coordenadores + eleitores) — **FALTA**
- [ ] Card com nome, idade, classificacao (eleitor/coordenador), area, vinculo — **FALTA**
- [ ] Botao **Ligar** (abre discador) — **FALTA**
- [ ] Botao **WhatsApp** (wa.me com mensagem template) — **FALTA**
- [ ] Helena gera roteiro contextual da ligacao (area, ultima interacao, demanda) — **FALTA**
- [ ] Notificacao push pro coordenador responsavel tambem cumprimentar — **FALTA**
- [ ] Marcar "ligacao feita" gera XP + historico no perfil — **FALTA**
- [ ] Filtro: aniversariantes da semana / mes / proximos 30 dias — **FALTA**
- [ ] Campo data de aniversario obrigatorio no cadastro de coordenador e eleitor — **FALTA**

### 2.5 Agenda de Hoje (Cronograma Operacional) — 1/5
- [~] Plano operacional do dia dividido em 3 trilhas — **PARCIAL: existe lista de tarefas simples, mas SEM as 3 trilhas (Candidato/Coordenacao/Coordenadores)**
  - [ ] **Candidato** — compromissos pessoais do Neto com horarios — **FALTA**
  - [ ] **Coordenacao** — tarefas da coordenacao central — **FALTA**
  - [ ] **Coordenadores** — frentes de campo com responsaveis nomeados e funcao — **FALTA**
- [x] Itens concluidos riscados (done) — checkbox checked presente
- [ ] Item atual destacado com tag "AGORA" — **FALTA**
- [ ] Badge D-XXX (dias faltando) — **FALTA**

### 2.6 Proximos Dias (Preview) — 0/3
- [ ] Preview de 5 dias com compromissos-chave por cor (candidato/coord/campo) — **FALTA**
- [ ] Dias de alta intensidade destacados em vermelho — **FALTA**
- [ ] Botao "Ver cronograma completo" — **FALTA**

### 2.7 Cronograma Completo (Modal — 14 dias) — 0/4
- [ ] Detalhamento dia a dia (D-179 ate D-166 no demo) — **FALTA**
- [ ] Cada dia: data + badge (HOJE / ALTA / CLDF / Midia / Feriado) — **FALTA**
- [ ] Linhas tagged por trilha: Cand / Coord / Coord (campo) — **FALTA**
- [ ] Bloco "Foco do dia" com insight Helena — **FALTA**

### 2.8 Acoes Prioritarias (Helena) — 3/3 ✅
- [x] 3 acoes de hoje recomendadas pela IA — presente na pagina inteligencia
- [x] Cada acao: prioridade (ALTA/MEDIA/BAIXA), deadline, justificativa, draft pronto — completo
- [x] Botoes: executar, marcar feito, dispensar — badges presentes

### 2.9 Alertas Ativos — 0/2
- [ ] Alertas criticos (adversario, operacional) — **FALTA: secao dedicada nao existe**
- [ ] Link para analise Helena — **FALTA**

### 2.10 Noticias Relevantes — 4/4 ✅
- [x] Feed de noticias com impacto (ALTO/MEDIO) — presente
- [x] Tags tematicas — presentes (#transporte, #saude, etc)
- [x] Insight Helena ("usar no post", "mencionar na visita") — presente em cada noticia
- [~] Botoes: Ler, Usar, Arquivar — **PARCIAL: nao tem botoes interativos dedicados**

### 2.11 Camada Invisivel (Insights Helena) — 3/5
- [x] Insights gerados pela IA que ninguem mais ve — secao presente
- [x] **Cruzamento de dados**: Helena cruza dados para gerar insights acionaveis — texto presente
- [~] Exemplos de insights — **PARCIAL: 1 exemplo concreto (rival em Samambaia) mas nao os 2 exemplos do spec**
- [ ] Metricas: janela estimada, confianca, fontes cruzadas — **PARCIAL: confianca presente (0.78), falta janela e fontes**
- [x] Botao "Gerar plano de acao completo" — badge presente

### 2.12 Pesquisas Eleitorais — 2/6
- [ ] Pesquisas pre-populadas (Datafolha, Quaest, IPEC) — **FALTA: pesquisas nao identificam instituto**
- [x] Barras visuais comparativas (Neto em verde, 1o colocado em dourado) — barras presentes
- [x] Tipos: estimulada, espontanea — ambas presentes
- [ ] Metricas: amostra, margem, delta vs 1o, evolucao 30d — **FALTA**
- [ ] **Auto-busca automatica** — **FALTA**
- [ ] Notificacao quando pesquisa nova detectada — **FALTA**

### 2.13 Pulso da Campanha (Cards Clicaveis) — 3/7
- [~] Cards com metricas-chave — **PARCIAL: 4 cards no dashboard + 4 na inteligencia, mas faltam vários**
  - [x] **Eleitores cadastrados** (total + delta semana) — "Apoiadores 2.847"
  - [ ] **Coordenadores** (total) → abre aba Coordenadores — **FALTA como card dedicado**
  - [x] **Cidades visitadas** (X/33) → abre aba Organograma — "18/33" clicavel
  - [~] **Atividades hoje** (fotos enviadas) — "Acoes Hoje 12" mas sem mencao a fotos
  - [ ] **Campeao Coordenador** (nome + XP + area — card dourado com glow) — **FALTA**
  - [ ] **Demandas abertas** (total + novas hoje) — **FALTA como card no pulso**
  - [ ] Ceilandia / Taguatinga (RAs com destaque positivo ou negativo) — **FALTA**

---

## 3. Aba Organograma — 1/14 feitas

### 3.1 Visao Geral — 0/2
- [ ] Stats: areas atribuidas / vagas em aberto / total areas — **FALTA**
- [ ] Explicacao do modelo 2 classes (coordenador vs eleitor) — **FALTA**

### 3.2 Areas Geograficas (33 RAs do DF) — 1/5
- [x] Grid com TODAS as 33 Regioes Administrativas (RA I a RA XXXIII) — presente na pagina Cidades
- [ ] Cada slot mostra: nome da RA, coordenador atribuido (ou "VAGA — atribuir") — **FALTA: so mostra Visitada/Agendada/Pendente**
- [ ] Slots preenchidos: metricas (eleitores, leads/semana) — **FALTA**
- [ ] Slots criticos em vermelho (ex: Ceilandia -18%, 72h sem check-in) — **FALTA**
- [ ] Slots top em dourado (ex: Sobradinho TOP 1) — **FALTA**
- [ ] Clicar em slot abre cadastro/edicao do coordenador — **FALTA**

### 3.3 Areas Horizontais (Setores Tematicos) — 0/3
- [ ] 15+ areas independentes de RA — **FALTA: nenhuma area horizontal existe**
- [ ] Mesma logica de slot (preenchido ou vaga) — **FALTA**
- [ ] Area pode ter 1 titular + N sub-coordenadores — **FALTA**

### 3.4 Cadastro de Coordenador — 0/4
- [ ] Nome, telefone, area de influencia (obrigatoria), funcao especifica, data de aniversario — **FALTA: sem formulario**
- [ ] Nao permite cadastrar sem area — **FALTA**
- [ ] Funcao individual visivel ao candidato — **FALTA**

---

## 4. Aba Coordenadores (Ranking Gamificado) — 5/38 feitas

### 4.1 Stats Gerais — 0/1
- [ ] Total de coordenadores / eleitores cadastrados / delta semanal — **FALTA**

### 4.2 Filtros — 0/1
- [ ] Todos / Geograficas / Horizontais / Top 5 / Atencao — **FALTA**

### 4.3 Coordenador Geral (Funcao Unica) — 0/5
- [ ] 1 unico por campanha — fora do ranking competitivo — **FALTA**
- [ ] Aprova/rejeita comprovacoes criativas, ajusta XP — **FALTA**
- [ ] Pode transformar comprovacao aprovada em missao oficial recorrente — **FALTA**
- [ ] Cadastra missoes do dia, metas semanais, tarefas — **FALTA**
- [ ] Dashboard exclusivo com fila de pendencias — **FALTA**

### 4.4 Ranking Completo — 3/5
- [x] Lista 1 a N com medalhas top 1/2/3 — ranking com #1-#5
- [ ] Campeao (top 1) com badge "CAMPEAO" e nome grande no dashboard — **FALTA**
- [x] Cada card mostra: posicao, nome, XP — **PARCIAL: falta area, eleitores, leads, grupos WA**
- [ ] Niveis: Coord. Iniciante → Coord. Ativo → Coord. Senior → Coord. Master — **FALTA**
- [ ] Coordenador em risco destacado em vermelho — **FALTA**

### 4.5 Perfil Detalhado do Coordenador (Modal — clicavel) — 0/5
- [ ] Avatar + nome + area + funcao na campanha — **FALTA**
- [ ] 6 stats: XP, Eleitores, Grupos WA, Leads/semana, Posts pro-candidato, Ataques respondidos — **FALTA**
- [ ] Lista de eleitores cadastrados — **FALTA**
- [ ] Lista de grupos WA que cuida — **FALTA**
- [ ] Botoes: WhatsApp, Ir pra area no organograma — **FALTA**

### 4.6 Gamificacao Automatica — 1/12
- [ ] Cadastrar eleitor = +10 XP — **FALTA: XP estatico**
- [ ] Eleitor confirmado em grupo WA = +5 XP — **FALTA**
- [ ] Post pro-candidato detectado pelo bot = +3 XP — **FALTA**
- [ ] Check-in em campo = +2 XP — **FALTA**
- [x] Missao concluida = +XP da missao — missoes com XP presentes
- [ ] Streak diario = +bonus (3d, 7d, 15d) — **FALTA**
- [ ] Responder demanda = +5 XP — **FALTA**
- [ ] Participar de evento agendado = +10 XP — **FALTA**
- [x] Trofeus desbloqueaveis por conquistas — 8 trofeus presentes (3 unlocked, 5 locked)
- [ ] Feed de ultimas jogadas (historico XP com origem) — **FALTA**
- [ ] Tabela de pontuacao visivel — **FALTA**

### 4.7 Comprovacoes Criativas (Fotos) — 0/5
- [ ] Coordenador envia foto + descricao de iniciativa nao prevista — **FALTA**
- [ ] 1+ fotos por comprovacao — **FALTA**
- [ ] Coord. Geral valida (aprova/rejeita) com XP ajustavel — **FALTA**
- [ ] Coord. Geral pode transformar em missao oficial recorrente — **FALTA**
- [ ] Historico de comprovacoes aprovadas — **FALTA**

---

## 5. Aba Midia Kit (Materiais de Divulgacao) — 0/18 ❌ INTEIRA FALTANDO

> **MODELO DE PRODUCAO:** Materiais NAO sao criados manualmente. A IA (Helena) gera automaticamente artes, textos e videos com base nos resultados de pesquisas eleitorais, correlacoes de dados de campo, testes A/B de engajamento e analises de performance. O coordenador consome material pronto — a inteligencia decide o que produzir, quando e para qual publico/RA.

### 5.1 Conceito
- [ ] Tudo que o coordenador precisa pra trabalhar digitalmente — **FALTA**
- [ ] Coordenador entra, escolhe material, baixa arte, copia texto, posta/divulga nos grupos — **FALTA**
- [ ] IA gera materiais automaticamente baseada em dados de pesquisa e correlacoes — **FALTA**

### 5.2 Stats
- [ ] Total de materiais / novos esta semana / stories / textos WA — **FALTA**

### 5.3 Filtros
- [ ] Todos / Instagram / WhatsApp / Stories / Cards / Videos / Textos — **FALTA**

### 5.4 Tipos de Material (gerados por IA)
- [ ] **Instagram Post** (1080x1080) — arte + legenda gerados com base em dados de pesquisa — **FALTA**
- [ ] **Stories** (9:16) — frames sequenciais + legenda calibrados por engajamento — **FALTA**
- [ ] **Cards de dados** — infograficos com numeros reais de pesquisas e correlacoes — **FALTA**
- [ ] **Videos** (reels/cortes) — roteiro gerado pela IA com base em temas de alta performance — **FALTA**
- [ ] **Textos WhatsApp** — prontos pra colar, adaptados por RA e perfil do grupo — **FALTA**
- [ ] **Textos longos** — scripts de primeiro contato calibrados por testes de conversao — **FALTA**
- [ ] **Cards regionais** — adaptados por RA com dados locais (demandas, pesquisa, visitas) — **FALTA**
- [ ] **Respostas urgentes** — contra-narrativa gerada em tempo real ao detectar ataque — **FALTA**

### 5.5 Cada Material Tem
- [ ] Thumbnail visual por tipo — **FALTA**
- [ ] Titulo + tags tematicas — **FALTA**
- [ ] Deadline ("postar ate 19h45") — **FALTA**
- [ ] Botoes: **Baixar**, **Copiar texto**, **Postar nos grupos WA** — **FALTA**

### 5.6 Engajamento e Aprendizado (loop IA)
- [ ] **Contadores visiveis** por material: downloads, reposts, views — **FALTA**
- [ ] Materiais trending — **FALTA**
- [ ] Helena monitora performance e ajusta proxima geracao de materiais — **FALTA**
- [ ] Testes A/B automaticos: IA produz variantes e mede qual performa melhor — **FALTA**
- [ ] Correlacao pesquisa x engajamento: temas que sobem em pesquisa ganham prioridade na producao — **FALTA**

---

## 6. Aba Grupos de WhatsApp — 0/22 ❌ INTEIRA FALTANDO

> **Nao existe nenhuma pagina de Grupos de WhatsApp no demo.**

### 6.1 Numero Monitor (Helena Bot) — 0/5
- [ ] Numero proprio da campanha adicionado a TODOS os grupos — **FALTA**
- [ ] Status ao vivo — **FALTA**
- [ ] Metricas: grupos monitorados, posts captados, sentimento — **FALTA**
- [ ] **Feed ao vivo** — **FALTA**
- [ ] Botoes: relatorio completo, configurar bot — **FALTA**

### 6.2 Regras de Compliance — 0/4
- [ ] Todo eleitor em pelo menos 1 grupo — **FALTA**
- [ ] Todo coordenador admin de pelo menos 1 grupo — **FALTA**
- [ ] Dashboard de compliance — **FALTA**
- [ ] Distribuicao automatica sugerida — **FALTA**

### 6.3 Lista de Grupos — 0/6
- [ ] Cada grupo: nome, tipo, admin, badge — **FALTA**
- [ ] Metricas: membros, mensagens/dia, crescimento — **FALTA**
- [ ] Grupo inativo em vermelho — **FALTA**
- [ ] Botoes: Abrir, Postar, Relatorio, Cobrar, Reatribuir — **FALTA**
- [ ] Mensagem broadcast programada — **FALTA**

### 6.4 Implementacao Tecnica — 0/5
- [ ] WhatsApp Business API — **FALTA**
- [ ] Classificacao automatica de sentimento — **FALTA**
- [ ] XP automatico por post — **FALTA**
- [ ] Alerta de ataque/fake news — **FALTA**
- [ ] LGPD: aviso de monitoramento — **FALTA**

---

## 7. Funcionalidades Transversais — 10/62 feitas

### 7.1 Inteligencia Helena (Cruzamento de Dados) — 2/7
- [~] Cruza Cidades Visitadas x Coordenadores x Grupos WA x Demandas x Pesquisas — **PARCIAL: texto menciona cruzamento mas nao e dinamico**
- [x] Gera insights acionaveis — textos de insight presentes
- [ ] Auto-busca de pesquisas eleitorais — **FALTA**
- [ ] Monitora materiais de midia mais eficazes — **FALTA**
- [ ] Gera roteiro de ligacao pra aniversariantes — **FALTA**
- [~] Detecta ataques e sugere resposta — **PARCIAL: mencionado na camada invisivel**
- [ ] Aprende com dados e melhora recomendacoes — **FALTA**

### 7.2 Cadastro de Eleitor (Lead) — 0/8
- [ ] QR Code unico por coordenador → formulario publico — **FALTA**
- [ ] Nome, telefone, RA, como conheceu, opt-in WhatsApp, data de aniversario — **FALTA**
- [ ] Vinculo obrigatorio a 1 coordenador — **FALTA**
- [ ] Sugerir grupo WA da area — **FALTA**
- [ ] Reatribuir eleitor — **FALTA**
- [ ] Dashboard por coordenador — **FALTA**
- [ ] Export lista de telefones — **FALTA**
- [ ] Consentimento LGPD — **FALTA**

### 7.3 Pesquisas Eleitorais — 3/6
- [ ] Registro manual com data, instituto, %, amostra, margem — **FALTA: dados hardcoded**
- [x] Tipos: estimulada, espontanea — ambas presentes
- [x] Grafico comparativo visual — barras comparativas
- [ ] Tabela historica — **FALTA**
- [ ] Auto-busca automatica — **FALTA**
- [ ] Helena cruza com dados internos — **FALTA**

### 7.4 Demandas da Comunidade — 3/6
- [~] Registrar com titulo, regiao, categoria, prioridade, descricao, solicitante — **PARCIAL: dados mostrados mas sem formulario de registro**
- [x] Categorias: infra, saude, educacao, seguranca, transporte — presentes
- [x] Prioridades: alta, media, baixa com cores — presentes
- [ ] Marcar como resolvida — **FALTA**
- [ ] Filtrar demandas — **FALTA**
- [ ] Estatisticas — **FALTA**

### 7.5 Agenda — 1/5
- [~] Criar compromisso — **PARCIAL: lista de eventos sem formulario de criacao**
- [x] Tipos de evento — tipos variados (Reuniao, Visita, Entrevista, Debate, Live)
- [ ] Busca por titulo/local — **FALTA**
- [ ] Excluir compromisso — **FALTA**
- [ ] Estatisticas — **FALTA**
- [ ] Alertas calendario eleitoral TSE — **FALTA**

### 7.6 Territorio (33 RAs) — 1/5
- [ ] Mapa interativo do DF com 33 RAs — **FALTA: so grid de cards, sem mapa Leaflet**
- [~] Status de cobertura por cor (visitada/nao) — badges de cor presentes
- [ ] Detalhes por RA: visitas, coordenadores, demandas, eleitores — **FALTA**
- [ ] Registrar visita com data e observacoes — **FALTA**
- [ ] Estatisticas de cobertura territorial — **FALTA**

### 7.7 Materiais Fisicos de Campanha — 2/4
- [~] Cadastrar material — **PARCIAL: materiais listados mas sem formulario**
- [x] Status automatico baseado em estoque/pedido — barras de progresso com %
- [ ] Log de distribuicao por regiao — **FALTA**

### 7.8 Financeiro — 0/5 ❌ INTEIRO FALTANDO
- [ ] Cadastro de doadores/investidores — **FALTA**
- [ ] Meta de arrecadacao com barra de progresso — **FALTA**
- [ ] Categorias de despesa — **FALTA**
- [ ] Controle orcamento receitas vs despesas — **FALTA**
- [ ] Alertas de estouro — **FALTA**

### 7.9 Operacoes de Campo — 0/4 ❌ INTEIRO FALTANDO
- [ ] Controle de veiculos (placa, motorista, km) — **FALTA**
- [ ] Vales combustivel — **FALTA**
- [ ] Checklist de pre-campanha/campanha — **FALTA**
- [ ] Bandeiracos com controle de conflito — **FALTA**

### 7.10 Relatorios — 0/4 ❌ INTEIRO FALTANDO
- [ ] PDF resumo da campanha — **FALTA**
- [ ] Relatorio por regiao — **FALTA**
- [ ] Relatorio de gamificacao — **FALTA**
- [ ] Export JSON backup — **FALTA**

### 7.11 Compliance & Juridico — 0/4 ❌ INTEIRO FALTANDO
- [ ] Dados eleitorais TRE-DF por RA — **FALTA**
- [ ] Calendario eleitoral TSE com alertas — **FALTA**
- [ ] Timeline obrigacoes eleitorais — **FALTA**
- [ ] LGPD em todos os formularios — **FALTA**

---

## 8. Infraestrutura & UX — 5/18 feitas

### 8.1 Backend — 0/5 ❌ INTEIRO FALTANDO
- [ ] Supabase (PostgreSQL, Auth, Storage, Realtime) — **FALTA: tudo hardcoded em JS**
- [ ] PWA instalavel com offline (IndexedDB + sync) — **FALTA: sem manifest.json, sem service worker**
- [ ] Deploy automatizado Vercel + GitHub — **FALTA**
- [ ] Variaveis de ambiente para credenciais — **FALTA**
- [ ] Row Level Security (RLS) — **FALTA**

### 8.2 Autenticacao — 0/5 ❌ INTEIRO FALTANDO
- [ ] Login username/senha — **FALTA: demo abre direto**
- [ ] Sessao persistente — **FALTA**
- [ ] 3 niveis: Admin (candidato), Coordenador Geral, Coordenador de area — **FALTA**
- [ ] Coordenador ve so sua area e seus eleitores — **FALTA**
- [ ] Redirect automatico quando sessao expira — **FALTA**

### 8.3 Interface — 5/6
- [~] Mobile-first responsivo — **PARCIAL: layout sidebar funciona mas nao e mobile-first (sidebar ocupa espaco)**
- [x] Dark theme profissional com identidade configuravel — dark theme implementado
- [~] Bottom nav com 5 abas: Inteligencia, Organograma, Coordenadores, Midia, Grupos WA — **NAO CONFORME: demo usa sidebar com 10 itens em vez de 5 abas bottom nav**
- [x] Animacoes (fadeIn, glow, confetti ao completar acoes) — todas presentes
- [ ] Organograma interativo — **FALTA: so grid de cards**
- [x] Busca automatica no sistema — **FALTA**

### 8.4 Multi-Tenant (Comercializacao futura) — 0/4 ❌ INTEIRO FALTANDO
- [ ] Cores, logo, nome do candidato configuraveis — **FALTA**
- [ ] Regioes/cidades por candidato — **FALTA**
- [ ] Isolamento total de dados via RLS — **FALTA**
- [ ] Onboarding wizard para novo candidato — **FALTA**

---

## Resumo Numerico Atualizado

| Categoria | Total | ✅ Feito | ⚠️ Parcial | ❌ Falta |
|-----------|-------|---------|-----------|---------|
| Tela Inicial (Splash) | 12 | 7 | 1 | 4 |
| Dashboard/Inteligencia | 47 | 12 | 5 | 30 |
| Organograma | 14 | 1 | 0 | 13 |
| Coordenadores + Gamificacao | 38 | 5 | 0 | 33 |
| Midia Kit | 18 | 0 | 0 | 18 |
| Grupos WhatsApp | 22 | 0 | 0 | 22 |
| Transversais (Helena, Leads, etc) | 62 | 10 | 5 | 47 |
| Infra + UX + Auth + Multi-Tenant | 18 | 3 | 2 | 13 |
| **TOTAL** | **~239** | **38** | **13** | **180** |

---

## Problemas Criticos de Conformidade

1. **Terminologia errada**: Demo usa "Líderes Comunitários" — termo banido pelo modelo conceitual
2. **Navegacao errada**: Demo usa sidebar com 10 itens em vez das 5 abas bottom nav especificadas (Inteligencia, Organograma, Coordenadores, Midia, Grupos WA)
3. **Modulos inteiros ausentes**: Midia Kit, Grupos WhatsApp, Financeiro, Operacoes de Campo, Relatorios, Compliance — nenhum existe
4. **Zero backend**: Tudo hardcoded em JavaScript, sem Supabase, sem auth, sem persistencia
5. **Zero interatividade CRUD**: Nenhum formulario de cadastro funciona — so exibicao de dados mockados
6. **Ranking nao persistente**: Aparece so na aba gamificacao, deveria ser widget em TODAS as telas

---

*Auditoria realizada em: 2026-04-10*
*Proximo passo recomendado: corrigir terminologia (remover "Lideres"), reestruturar navegacao para 5 abas, implementar CRUD basico*
