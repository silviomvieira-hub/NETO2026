# CampanhaApp - Plataforma de Gestao de Campanha Politica

## What This Is

Plataforma web (PWA) de gestao completa de campanhas politicas, nascida para a pre-campanha de Neto Rodrigues (Deputado Distrital 2026 - DF), mas arquitetada como produto comercializavel para qualquer candidato. O sistema gerencia equipe de campo, liderancas, demandas da comunidade, agenda, materiais, pesquisas eleitorais e possui um sistema de gamificacao com XP, missoes e trofeus para engajar a militancia. Inclui captacao de leads via QR Code, comprovacao de atividades por foto, e tres niveis de acesso (admin/candidato, coordenadores regionais, cabos eleitorais/apoiadores).

## Core Value

**Transformar a militancia em um jogo engajante que gera uma base de leads qualificada para o candidato** -- cada acao de campo (cadastrar apoiador, visitar cidade, distribuir material) vira pontos no ranking, e cada contato captado vira um lead para WhatsApp, eventos e divulgacao.

## Requirements

### Validated

- Modulo Dashboard com countdown para eleicao e visao geral -- existente
- Modulo Cidades Visitadas (33 RAs do DF) com registro de visitas -- existente
- Modulo Agenda de compromissos (reuniao, visita, evento, debate, caminhada, live) -- existente
- Modulo Pessoas da Campanha (cadastro de equipe com funcao e regiao) -- existente
- Modulo Cadastro de Lideres com alcance estimado -- existente
- Modulo Quem e Quem (mapeamento politico: aliados, neutros, adversarios) -- existente
- Modulo Demandas Abertas (comunidade, com categoria e prioridade) -- existente
- Modulo Pesquisas Eleitorais com grafico comparativo -- existente
- Modulo Materiais de campanha (estoque, distribuicao, fornecedor) -- existente
- Modulo Gamificacao completo (XP, ranking, missoes do dia, streaks, trofeus, 10 niveis) -- existente
- Export/Import de dados via JSON -- existente
- Design dark theme com identidade verde/dourado -- existente

### Active

- [ ] Backend com Supabase (auth, database, storage, real-time)
- [ ] Sistema de autenticacao com 3 niveis de acesso (admin, coordenador, cabo eleitoral)
- [ ] Banco de dados PostgreSQL (via Supabase) substituindo localStorage
- [ ] PWA instalavel no celular dos apoiadores
- [ ] QR Code para cabos eleitorais captarem leads em campo
- [ ] Base de leads centralizada (nome, telefone, regiao, origem)
- [ ] Upload de fotos/prints como comprovacao de atividades na gamificacao
- [ ] Mapas interativos das RAs com visualizacao de liderancas e demandas
- [ ] Geracao de relatorios/PDFs de progresso da campanha
- [ ] Integracao/links para WhatsApp (grupos, mensagens em massa)
- [ ] Coordenadores veem apenas dados da sua regiao e seus cabos eleitorais
- [ ] Cabos eleitorais com tela simplificada para acoes de campo
- [ ] Notificacoes push via PWA
- [ ] Sistema multi-tenant para vender para outros candidatos (personalizacao de cores, nome, foto)
- [ ] Responsividade completa mobile-first
- [ ] Modulo Captacao de Investimentos/Financiamento (controle de doadores, metas, recibos eleitorais)
- [ ] Controle de Veiculos da campanha (frota, quilometragem, vales combustivel)
- [ ] Calendario Eleitoral TSE com alertas automaticos de prazos legais
- [ ] War Room / Feed em tempo real de atividades da equipe em campo
- [ ] Checklist de pre-campanha e campanha (itens obrigatorios por fase eleitoral)
- [ ] Subcoordenacoes por segmento (juventude, mulheres, religioso, empresarial, etc)
- [ ] Dados eleitorais do DF (eleitorado por RA, dados TRE-DF)
- [ ] Modulo Orcamento da campanha (categorias, controle financeiro, limites legais)
- [ ] Distribuicao de materiais por regiao com log de entrega
- [ ] Modulo Patrimonio (inventario de ativos, condicao, valor)
- [ ] Bandeiracos/Eventos externos com controle de local e conflito de data
- [ ] Organograma interativo da campanha
- [ ] Metricas de redes sociais (WhatsApp, Instagram, TikTok -- acompanhamento manual)
- [ ] Formulario publico de cadastro de apoiador (acessivel via QR Code, sem login)
- [ ] Modulo Juridico/Prazos (timeline eleitoral, categorias, monitoramento)
- [ ] Agenda de salas do comite (reserva, conflito de horario)
- [ ] Tarefas de campo atribuidas por coordenador

### Out of Scope

- App nativo (Play Store / App Store) -- PWA atende, app nativo so se necessario depois
- Integracao direta com API do WhatsApp Business -- complexidade e custo, usar links wa.me
- Sistema de pagamento/cobranca integrado -- venda unica manual por enquanto
- IA/ChatBot integrado -- foco no operacional primeiro
- Transmissao de lives pelo sistema -- usar plataformas existentes (Instagram, YouTube)

## Context

### Situacao Atual

O sistema atual e um unico arquivo HTML de 2.474 linhas com CSS e JavaScript inline, rodando 100% no navegador com localStorage. Nao tem backend, autenticacao, nem sincronizacao entre dispositivos. Se o usuario limpar o cache do navegador, perde todos os dados. Apenas uma pessoa por vez consegue usar efetivamente.

### Contexto Politico

- **Candidato:** Neto Rodrigues
- **Cargo:** Deputado Distrital (CLDF - Camara Legislativa do DF)
- **Eleicao:** 04 de outubro de 2026
- **Territorio:** Distrito Federal - 33 Regioes Administrativas (RAs)
- **Fase atual:** Pre-campanha (articulacao, construcao de base, mapeamento)

### Estrutura da Equipe

1. **Admin/Candidato (Neto + assessoria):** Acesso total a tudo, relatorios gerais, visao consolidada
2. **Coordenadores regionais:** Cada um responsavel por uma ou mais RAs, ve seus cabos eleitorais e dados da regiao
3. **Cabos eleitorais/Apoiadores:** Tela mobile simplificada para registrar apoiadores (QR Code), subir comprovacoes de atividades, ver suas missoes e ranking

### Stack de Destino

- **Frontend:** HTML/CSS/JS (evolucao do atual) com design system consistente, PWA
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Mapas:** Leaflet.js ou similar (open-source, leve)
- **QR Code:** Biblioteca JS para gerar e ler QR codes
- **PDF:** jsPDF ou similar para geracao de relatorios
- **Hosting:** Vercel, Netlify ou Supabase Hosting

### Referencia: Sistema CONECTA (Celina Leao 2026)

O mesmo desenvolvedor criou o CONECTA para a campanha Celina Leao 2026, sistema mais maduro com:
- SPA principal com 16+ secoes (CONECTA.html, ~325KB)
- Modulo de Logistica separado com 16 sub-modulos
- Login por username via Supabase, 3 usuarios
- Sincronizacao multiusuario com Supabase
- Formulario publico de apoiador com LGPD
- QR Code para cartao de visita digital
- Organograma interativo da campanha
- Controle de veiculos e vales combustivel
- Calendario eleitoral TSE com alertas
- Dados eleitorais do DF (TRE-DF, 33 RAs, 2.8M eleitores)
- Agenda de salas do comite
- Orcamento por categoria
- War Room com feed em tempo real
- Checklist de 39 itens (pre-campanha + campanha)
- PWA basica, deploy em inteia.com.br/conecta2026
- Coordenadores regionais (6 regioes)
- Integracoes: Elexion, gamificacao de campo

O CampanhaApp do Neto deve incorporar as melhores funcionalidades do CONECTA, mas com arquitetura mais limpa (modular desde o inicio), visual mais profissional, e pronto para multi-tenant.

### Modelo de Negocio

- Venda unica por candidato/campanha
- Personalizacao de cores, logo, nome, RAs/cidades por contrato
- Dados isolados por candidato (multi-tenant)
- Suporte basico incluido

## Constraints

- **Urgencia:** Precisa ir ao ar o mais rapido possivel -- equipe do Neto precisa comecar a usar
- **Equipe inicial:** 1-5 usuarios simultaneos na v1
- **Conectividade:** Apoiadores em campo podem ter internet instavel -- PWA com cache offline
- **Custo:** Supabase free tier para comecar (500MB banco, 1GB storage, 50k auth users)
- **Navegadores:** Chrome e Safari mobile sao prioridade (uso em campo no celular)
- **Lei eleitoral:** Sistema nao pode coletar dados sensiveis sem consentimento (LGPD)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Supabase como backend | Auth, DB, storage e realtime prontos -- acelera entrega | -- Pending |
| PWA em vez de app nativo | Instala direto do browser, sem Play Store, atualiza instantaneo | -- Pending |
| HTML/CSS/JS puro (sem framework) | Evolui do codigo existente, sem overhead de build/tooling | -- Pending |
| QR Code para captacao de leads | Cabo eleitoral mostra QR, apoiador preenche form, ganha XP | -- Pending |
| Upload de fotos como comprovacao | Substitui confianca cega por evidencia visual | -- Pending |
| 3 niveis de acesso | Cada perfil ve so o que precisa, seguranca e usabilidade | -- Pending |
| Multi-tenant via Supabase RLS | Row Level Security isola dados entre candidatos nativamente | -- Pending |
| Venda unica (nao SaaS) | Simplicidade comercial, sem cobranca recorrente inicialmente | -- Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check -- still the right priority?
3. Audit Out of Scope -- reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-09 after initialization*
