# DEMO INTELIGÊNCIA — Plano Relâmpago
**Contexto:** reunião com candidato HOJE
**Objetivo:** mostrar algo FUNCIONAL, não slides
**Criado:** 2026-04-08

---

## 1. O que a demo precisa provar em 3 minutos

1. **"Eu não preciso perguntar nada — a tela já traz o que importa."**
2. **"Tem notícia de hoje, ação pra hoje, alerta de hoje."**
3. **"Eu abro do celular no carro e resolvo."**
4. **"Tem coisa aqui que nem eu sabia."** (Camada Invisível)

Se essas 4 frases saírem da boca do candidato, a demo venceu.

---

## 2. Escopo da demo (o que TEM)

### 2.1 Página única `demo-inteligencia.html`
- Standalone (abre com duplo clique, zero servidor)
- Visual do design system existente (dark + verde #00e676 + dourado #ffd600 + Poppins)
- Mobile-first (apresentar no celular do candidato)
- Dados 100% mockados mas **plausíveis e específicos para DF**

### 2.2 Seções (na ordem de cima pra baixo)

1. **Header "Central de Inteligência"**
   - Badge "● ao vivo" com pulso verde
   - "Atualizado há 12 min · Próximo briefing às 17:00"

2. **Briefing do dia** (card dourado destacado)
   - Título: "Briefing das 14:30 — Quarta, 08 de abril"
   - Resumo em 1 frase: o tema do dia

3. **⚡ 3 Ações de Hoje** (cards priorizados)
   - Card ALTA: Ligar para adversário-aliado sobre PL
   - Card MÉDIA: Post sobre transporte Samambaia (draft pronto, expandível)
   - Card BAIXA: Agradecer top do ranking
   - Cada card com botões: Executar / Feito / Ignorar

4. **⚠️ 2 Alertas**
   - CRÍTICO: adversário lançou programa de saúde
   - OPERACIONAL: queda de 18% em Ceilândia

5. **📰 6 Notícias relevantes** (feed)
   - Fonte real (Metrópoles, Correio, G1 DF, Agência Brasília)
   - Timestamp relativo ("há 2h")
   - Badge de impacto (ALTO/MÉDIO)
   - Tag de eixo (#educacao #transporte…)
   - Frase curta "💡 Helena:" com sugestão de uso
   - Botões Ler / Usar no post / Arquivar

6. **🔮 O Que Helena Viu Que Ninguém Vê** (card premium, gradiente)
   - Texto de 100 palavras sobre creches triplicando em renda média-baixa
   - "Janela de 3 semanas"
   - "Consultores consultados: Lakoff, Penn, Shapiro"
   - "Confiança: 0.78"
   - Botão "Gerar plano de ação completo"

7. **📊 Pulso da Campanha** (4 cards numéricos)
   - Apoiadores +142 (+8%) ✅
   - Atividades campo +389 ✅
   - Ceilândia -18% ⚠️
   - Taguatinga +34% ✅

### 2.3 Interatividade mínima (só o que "prova")
- Botões ✅ Feito marcam card com risco e moviment cinza
- Botão ✕ Ignorar some o card com slide
- "Ver draft" expande texto completo do post
- "Gerar plano" abre modal com 5 passos mockados
- Pulso "ao vivo" no badge (animação CSS)
- Toast "Ação registrada" ao clicar

### 2.4 O que NÃO tem (não precisa)
- Backend
- Auth
- Dados reais vindos de API
- Sync multi-usuário
- Persistência (reload volta ao estado inicial)
- Acessibilidade A11Y completa
- Modo claro
- Responsividade desktop rebuscada

---

## 3. Dados mockados — conteúdo que vai aparecer

### Briefing
> "Dia de ocupar o vazio em transporte de Samambaia e responder ao lançamento do adversário em saúde. Janela curta."

### Ação 1 (ALTA)
- **Título:** Ligar para Dep. Marcelo Piuí (União) até 18h
- **Por quê:** votou contra pacote do governo ontem na CLDF; janela de aliança aberta; Helena recomenda tom conciliador
- **Ação:** [📱 WhatsApp] [✓ Feito] [✕ Ignorar]

### Ação 2 (MÉDIA) — com draft
- **Título:** Publicar post sobre transporte em Samambaia até 20h
- **Por quê:** 4 demandas repetidas nas últimas 48h; matéria do Metrópoles hoje 11h; nenhum adversário tocou no tema
- **Draft expandível** (~110 palavras):
  > "Samambaia não pode continuar esperando. Desde 2018 prometem o metrô e a população segue dependendo de ônibus lotados, linhas que somem, paradas sem cobertura. Hoje o Metrópoles mostrou mais um capítulo dessa novela que cansa. Na CLDF vou cobrar cronograma, fiscalização e prestação de contas sobre cada real já gastado. Samambaia trabalha, produz, sustenta o DF — e merece respeito no básico: sair de casa e voltar com dignidade. Quem está comigo nessa? 💚 #Samambaia #TransportePúblico #NetoCompromisso"
- **Botões:** [📋 Ver draft] [📤 Publicar] [✎ Editar]

### Ação 3 (BAIXA)
- **Título:** Agradecer João Silva (Sobradinho)
- **Por quê:** cadastrou 23 apoiadores essa semana; top 1 do ranking
- **Mensagem pronta expandível**
- **Botão:** [📱 Enviar WhatsApp]

### Alerta crítico
- **Adversário X lançou programa "DF Saudável"** (07/04 16h)
- Cobre 3 eixos que eram seus
- Risco: erosão de base na classe média
- [Ver análise Helena]

### Alerta operacional
- **Ceilândia: -18% atividade em 7 dias**
- Coordenador: Paulo R.
- Últimas 72h: sem check-in
- [Abrir WhatsApp Paulo]

### 6 Notícias mockadas (realistas DF)
1. **[ALTO] Metrópoles — há 2h** — CLDF aprova PL que cria turno único nas escolas em RAs periféricas — #educacao #cldf — 💡 usar no post de hoje
2. **[ALTO] Correio Braziliense — há 4h** — Metrô de Samambaia sem data: usuários protestam na Rodoviária — #transporte #samambaia — 💡 conecta com Ação 2
3. **[MÉDIO] G1 DF — há 6h** — GDF anuncia reforma de UBS em Ceilândia — #saude #ceilandia — 💡 mencionar em visita
4. **[MÉDIO] Agência Brasília — há 8h** — TRE-DF publica calendário eleitoral 2026 — #juridico — 💡 checar prazos com Dr. Roberto
5. **[ALTO] Metrópoles — ontem** — Pesquisa aponta segurança como 1ª preocupação dos brasilienses — #seguranca — 💡 repensar pauta da semana
6. **[MÉDIO] Correio — ontem** — Ibaneis sanciona lei de incentivo a cooperativas — #economia — 💡 oportunidade de agenda com coop de Taguatinga

### Camada Invisível
> "Nos últimos 15 dias, demandas por creches triplicaram nas RAs de renda média-baixa — Samambaia, Recanto das Emas e Riacho Fundo II lideram. Nenhum dos 24 adversários na CLDF mencionou o tema. Cruzando com dados da CODEPLAN (mães 25-40 trabalhando fora com vaga na creche: -32% vs 2022), vejo uma janela de 3 semanas antes do tema virar pauta coletiva. Custo de ocupação: baixo (1 post + 2 visitas). Retorno esperado: alto, especialmente no segmento mais influente do voto útil feminino urbano."
- Consultores consultados: Lakoff, Penn, Shapiro
- Confiança: 0.78
- [🎯 Gerar plano de ação completo]

### Pulso da Campanha (7 dias)
- Apoiadores novos: +142 (+8% vs meta) ✅
- Atividades de campo: +389 ✅
- Ceilândia: -18% ⚠️
- Taguatinga: +34% ✅

---

## 4. Roteiro de apresentação ao candidato (3 minutos)

**Minuto 1 — Contexto**
> "Neto, o sistema de gestão você já viu — agenda, equipe, apoiadores, tudo ali. Mas a gente quer te mostrar uma outra parte: a aba de **Inteligência**. A ideia é simples: você não precisa perguntar nada. Você abre, e ela já te entrega o que importa do dia."

**Minuto 2 — Demo mão na massa**
- Abre no celular dele
- "Olha aqui: 14:30 de uma quarta-feira. O sistema varreu 6 jornais e dezenas de fontes oficiais. Já te mostra 3 coisas pra fazer **hoje**."
- Clica na ação 2, mostra o draft pronto do post sobre Samambaia
- "Se você gostar, é um botão. Se não gostar, você edita ou descarta."
- Rola até a Camada Invisível
- "Esse é o diferencial. Aqui ela mostra uma coisa que nem a gente sabia: creches triplicando em Samambaia e Recanto. Nenhum adversário viu. Janela de 3 semanas."

**Minuto 3 — Fechamento**
> "Tudo isso roda sozinho, 24 horas por dia, em background. Você só abre o celular. É como ter um estrategista de campanha lendo jornal pra você enquanto você aperta mão. Essa parte do sistema a gente já começa a construir a partir da próxima semana. O que acha?"

---

## 5. Checklist para a reunião

- [ ] `demo-inteligencia.html` aberto no celular/iPad antes da reunião
- [ ] Celular em modo não perturbe
- [ ] Brilho no máximo
- [ ] Zoom 100%
- [ ] Ter backup em notebook caso o celular trave
- [ ] Decorar roteiro de 3 minutos
- [ ] Preparar resposta pras 3 perguntas mais prováveis:
  1. "Quanto custa?" → "Custo operacional baixo, cobrado no tier premium, detalhes no próximo encontro."
  2. "É real ou inventou isso?" → "Os dados desta tela são simulação, mas as fontes, a estrutura e a tecnologia são reais. Em 2 semanas roda com dados ao vivo."
  3. "Quem mais tem isso?" → "Ninguém. Nenhum sistema de gestão de campanha no Brasil tem esta camada estratégica."

---

## 6. Pós-demo

Se candidato aprovar → executar Fases 1-5 do `INTELIGENCIA_ATIVA.md`.
Se candidato hesitar → iterar no que ele pediu antes de qualquer código de produção.

---

*Plano executado em tempo real. Helena Strategos + Claude Code.*
