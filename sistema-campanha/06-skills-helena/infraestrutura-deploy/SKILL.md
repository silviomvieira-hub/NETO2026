# Skill: Infraestrutura e Deploy - INTEIA

> **Proposito**: Guia completo de infraestrutura, deploy, monitoramento e operacoes para agentes IA.
> **Atualizado**: 2026-02-10
> **Autor**: Claude Opus 4.6 + Igor Morais

---

## ARQUITETURA DE PRODUCAO

```
[Usuarios] --> [Vercel CDN] --> [Frontend Next.js]
                                      |
                                      v
                              [api.inteia.com.br]
                                      |
                                      v
                          [Render - Backend FastAPI]
                            (Docker, Autoscaling 1-3)
                                      |
                                      v
                          [Render PostgreSQL 16]
                            (basic_256mb, Oregon)
```

### URLs de Producao

| Servico | URL | Tipo |
|---------|-----|------|
| Frontend | https://inteia.com.br | Vercel (Next.js 16) |
| Backend API | https://api.inteia.com.br | Render (FastAPI Docker) |
| Swagger Docs | https://api.inteia.com.br/docs | Auto-gerado |
| Health Check | https://api.inteia.com.br/health | Endpoint dedicado |

---

## RENDER - BACKEND

### Credenciais

| Item | Valor |
|------|-------|
| API Key | `$RENDER_API_KEY` |
| Team/Owner ID | `tea-d5jv911r0fns73ddalsg` |
| Service ID (Backend) | `srv-d5k501vpm1nc73fr4090` |
| DB ID (PostgreSQL) | `dpg-d5lb9p6mcj7s73b8i2j0-a` |
| Webhook ID | `whk-d65jmqogjchc73f2mn60` |
| Dashboard | https://dashboard.render.com |

### Servicos Render

| Nome | ID | Tipo | URL |
|------|----|------|-----|
| pesquisa-eleitoral-df-1 | srv-d5k501vpm1nc73fr4090 | web_service (Docker) | https://pesquisa-eleitoral-df-1.onrender.com |
| inteia-politica-2026 | srv-d5tb6hogjchc73f605c0 | static_site | https://inteia-politica-2026.onrender.com |
| inteia-analise-politica-2026 | srv-d5t926t6ubrc73edi6a0 | static_site | https://inteia-analise-politica-2026.onrender.com |
| analise-bardin-ui | srv-d5r0lrruibrs73cdrgf0 | static_site | https://analise-bardin-ui.onrender.com |
| inteia-relatorio-celina-leao | srv-d5qqirchg0os73ci7ru0 | static_site | https://inteia-relatorio-celina-leao.onrender.com |

### Configuracao Atual do Backend (Pro)

| Feature | Valor | Detalhes |
|---------|-------|----------|
| Plano | Standard | 1 CPU, 2 GB RAM |
| Plano Pro (workspace) | Professional | $19/mes |
| Autoscaling | 1-3 instancias | CPU > 70% ou RAM > 80% escala |
| Health Check | /health | Render pinga periodicamente |
| Auto-Deploy | On Commit | Branch main, root backend/ |
| PR Previews | Automatic | Cria instancia temporaria por PR |
| Edge Caching | Common static files | JS, CSS, imagens cacheados na edge |
| Notificacoes | All notifications | Email em sucesso e falha |
| Build Filters Included | backend/** | So deploya se backend mudar |
| Build Filters Ignored | frontend/**, agentes/**, scripts/**, docs/**, *.md, .claude/**, .memoria/**, .context/** | |
| Custom Domain | api.inteia.com.br | Verificado + SSL |
| Zero-downtime | Automatico | Planos pagos |
| DDoS Protection | Automatico | Incluido |
| SSH Access | srv-d5k501vpm1nc73fr4090@ssh.oregon.render.com | |
| Webhook | INTEIA Deploy Alerts | Envia eventos para API |

### Variaveis de Ambiente (Render)

| Key | Valor | Descricao |
|-----|-------|-----------|
| AMBIENTE | production | Flag de ambiente |
| IA_PROVIDER | anthropic_api | Usa API Anthropic |
| IA_ALLOW_API_FALLBACK | true | Fallback habilitado |
| FRONTEND_URL | https://inteia.com.br | CORS origin |
| BACKEND_URL | https://api.inteia.com.br | Self-reference |
| DATABASE_URL | postgresql+asyncpg://...@dpg-d5lb9p6mcj7s73b8i2j0-a/pesquisa_eleitoral_db | Conexao interna |
| SECRET_KEY | (hash seguro) | JWT signing |
| CLAUDE_API_KEY | sk-ant-api03-... | Anthropic API |
| GOOGLE_CLIENT_ID | 127874...gte2a.apps.googleusercontent.com | OAuth Google |
| GOOGLE_CLIENT_SECRET | GOCSPX-... | OAuth Google |
| GOOGLE_REDIRECT_URI | https://inteia.com.br/auth/google/callback | OAuth redirect |
| GOOGLE_EXPANDED_SCOPES | false | Login basico sem escopos sensiveis |
| ADMIN_USER_ID | user-5365375ded5e | Admin padrao |

### PostgreSQL

| Item | Valor |
|------|-------|
| Plano | basic_256mb (pago, sem expiracao) |
| Versao | PostgreSQL 16 |
| Disco | 1 GB |
| Regiao | Oregon |
| Host interno | dpg-d5lb9p6mcj7s73b8i2j0-a |
| Host externo | dpg-d5lb9p6mcj7s73b8i2j0-a.oregon-postgres.render.com |
| Database | pesquisa_eleitoral_db |
| User | pesquisa_eleitoral_db_user |
| Password | (secret manager / Render dashboard) |

---

## VERCEL - FRONTEND

### Credenciais

| Item | Valor |
|------|-------|
| Token | `$VERCEL_TOKEN` |
| Project ID | `prj_gl8ATaXX0NxNQzWAo4hcUVqPmq0R` |
| Team ID | `team_Af2JN68IUUA7lwsIGKuJiN66` |
| User | igormorais123 |
| Dashboard | https://vercel.com/igormorais123s-projects |

### Configuracao

| Feature | Valor |
|---------|-------|
| Framework | Next.js 16.1.6 |
| Dominio | inteia.com.br |
| Build Command | `npm run build` (prebuild sincroniza agentes/) |
| Output Directory | .next |
| Node.js Version | 20.x |

---

## COMANDOS DE DEPLOY

### Deploy Frontend (Vercel)

```bash
# Deploy producao
cd frontend && vercel --prod --token $VERCEL_TOKEN

# Deploy preview (para testar)
cd frontend && vercel --token $VERCEL_TOKEN

# Listar deploys recentes
vercel ls --token $VERCEL_TOKEN
```

### Deploy Backend (Render)

```bash
# Trigger deploy via API (sem push)
curl -X POST \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Accept: application/json" \
  "https://api.render.com/v1/services/srv-d5k501vpm1nc73fr4090/deploys"

# Verificar status do ultimo deploy
curl -s \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Accept: application/json" \
  "https://api.render.com/v1/services/srv-d5k501vpm1nc73fr4090/deploys?limit=1"

# Cancelar deploy travado
curl -X POST \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Accept: application/json" \
  "https://api.render.com/v1/services/srv-d5k501vpm1nc73fr4090/deploys/{DEPLOY_ID}/cancel"

# Deploy automatico: git push origin main (se mudou backend/)
```

### Deploy Ambos

```bash
# 1. Push aciona Render automaticamente (se backend/ mudou)
git push origin main

# 2. Deploy frontend manualmente
cd frontend && vercel --prod --token $VERCEL_TOKEN
```

---

## API RENDER - REFERENCIA RAPIDA

Todas as chamadas usam:
```
Authorization: Bearer $RENDER_API_KEY
Accept: application/json
Content-Type: application/json (para POST/PATCH/PUT)
Base URL: https://api.render.com/v1
```

### Servico

```bash
# Obter detalhes do servico
GET /services/srv-d5k501vpm1nc73fr4090

# Atualizar servico (PATCH - merge parcial)
PATCH /services/srv-d5k501vpm1nc73fr4090
Body: {"serviceDetails": {"healthCheckPath": "/health"}}

# Listar todos os servicos
GET /services?ownerId=tea-d5jv911r0fns73ddalsg&limit=20
```

### Deploys

```bash
# Listar deploys
GET /services/srv-d5k501vpm1nc73fr4090/deploys?limit=5

# Status de deploy especifico
GET /services/srv-d5k501vpm1nc73fr4090/deploys/{DEPLOY_ID}

# Trigger deploy manual
POST /services/srv-d5k501vpm1nc73fr4090/deploys

# Cancelar deploy
POST /services/srv-d5k501vpm1nc73fr4090/deploys/{DEPLOY_ID}/cancel
```

### Autoscaling

```bash
# Ver config atual
GET /services/srv-d5k501vpm1nc73fr4090/autoscaling

# Atualizar (PUT - substitui tudo)
PUT /services/srv-d5k501vpm1nc73fr4090/autoscaling
Body: {
  "enabled": true,
  "min": 1,
  "max": 3,
  "criteria": {
    "cpu": {"enabled": true, "percentage": 70},
    "memory": {"enabled": true, "percentage": 80}
  }
}
```

### Variaveis de Ambiente

```bash
# Listar todas
GET /services/srv-d5k501vpm1nc73fr4090/env-vars

# ATENCAO: PUT substitui TODAS as vars! Sempre enviar a lista completa
PUT /services/srv-d5k501vpm1nc73fr4090/env-vars
Body: [{"key": "VAR1", "value": "val1"}, {"key": "VAR2", "value": "val2"}]
```

### PostgreSQL

```bash
# Detalhes do banco
GET /postgres/dpg-d5lb9p6mcj7s73b8i2j0-a

# Atualizar plano
PATCH /postgres/dpg-d5lb9p6mcj7s73b8i2j0-a
Body: {"plan": "basic_256mb"}
```

### Eventos e Logs

```bash
# Eventos do servico (deploys, builds, falhas)
GET /services/srv-d5k501vpm1nc73fr4090/events?limit=20

# Webhook - ja configurado
GET /webhooks?ownerId=tea-d5jv911r0fns73ddalsg
```

---

## MONITORAMENTO

### Health Checks Manuais

```bash
# Backend
curl https://api.inteia.com.br/health
# Esperado: {"status":"healthy"}

# Frontend
curl -s -o /dev/null -w "%{http_code}" https://inteia.com.br
# Esperado: 200

# Swagger Docs
curl -s -o /dev/null -w "%{http_code}" https://api.inteia.com.br/docs
# Esperado: 200

# API de eleitores (precisa de auth)
curl -s -o /dev/null -w "%{http_code}" https://api.inteia.com.br/api/v1/eleitores
# Esperado: 401 (sem token) ou 200 (com token)
```

### Metricas (Dashboard)

- **Response Latency**: https://dashboard.render.com/web/srv-d5k501vpm1nc73fr4090/metrics
- **Logs**: https://dashboard.render.com/web/srv-d5k501vpm1nc73fr4090/logs
- **Events**: https://dashboard.render.com/web/srv-d5k501vpm1nc73fr4090/events

### SSH no Container

```bash
ssh srv-d5k501vpm1nc73fr4090@ssh.oregon.render.com
# Permite debug direto no container em execucao
```

---

## TROUBLESHOOTING

### Deploy falha com "update_failed"

1. **Verificar logs**: Dashboard > Logs ou Events
2. **Causa mais comum**: Container estoura RAM no startup
3. **Solucao**: Verificar requirements.txt por dependencias pesadas
4. **NUNCA incluir no requirements.txt**:
   - `openai-whisper` (puxa PyTorch ~1GB RAM)
   - `torch`, `tensorflow` (modelos ML pesados)
5. **Celery/Flower**: Manter em requirements-worker.txt separado
6. **Cancelar deploy travado**:
   ```bash
   curl -X POST -H "Authorization: Bearer $RENDER_API_KEY" \
     "https://api.render.com/v1/services/srv-d5k501vpm1nc73fr4090/deploys/{ID}/cancel"
   ```

### Backend retorna 502

1. Container crasheou ou esta reiniciando
2. Verificar se autoscaling esta ativo (min >= 1)
3. Verificar health check em /health
4. SSH no container para debug

### Banco de dados lento

1. Verificar plano (basic_256mb = 256MB RAM)
2. Verificar queries lentas via `EXPLAIN ANALYZE`
3. Considerar upgrade para basic_1gb ou standard_1gb

### CORS bloqueado

1. Verificar FRONTEND_URL no env vars do Render
2. Backend aceita origens em `app/main.py` (lista `origens_permitidas`)
3. Adicionar nova origem se necessario

### PUT env-vars apagou tudo

**CUIDADO**: `PUT /env-vars` SUBSTITUI todas as variaveis!
1. Sempre fazer GET primeiro para obter a lista completa
2. Adicionar/modificar na lista
3. Enviar a lista COMPLETA no PUT

---

## LIMITES DO PLANO

### Render Pro + Standard Instance

| Recurso | Limite |
|---------|--------|
| CPU | 1 vCPU |
| RAM | 2 GB |
| Bandwidth | 100 GB/mes |
| Build minutes | 500 min/mes |
| Autoscaling | 1-100 instancias |
| SSL | Automatico (Let's Encrypt) |
| Uptime SLA | 99.95% |

### PostgreSQL basic_256mb

| Recurso | Limite |
|---------|--------|
| RAM | 256 MB |
| Disco | 1 GB (expansivel) |
| Conexoes | 20 simultaneas |
| Backups | Diarios, 7 dias retencao |

### Vercel (Free/Hobby)

| Recurso | Limite |
|---------|--------|
| Bandwidth | 100 GB/mes |
| Builds | 6000 min/mes |
| Serverless exec | 100 GB-hrs/mes |
| Edge functions | 500K invocacoes/mes |

---

## CUSTOS ESTIMADOS (MENSAL)

| Item | Custo |
|------|-------|
| Render Pro (workspace) | $19 |
| Standard Instance (1 CPU, 2GB) | ~$25 |
| PostgreSQL basic_256mb | ~$7 |
| Autoscaling (instancias extras) | ~$25/instancia quando ativo |
| Vercel (Hobby) | $0 |
| **Total base** | **~$51/mes** |
| **Com pico de autoscaling** | **~$75-100/mes** |

---

## FLUXO DE DEPLOY RECOMENDADO

### Mudanca apenas no Frontend

```bash
# 1. Commitar e pushar (nao aciona Render por causa dos build filters)
git add frontend/ && git commit -m "feat(ui): ..." && git push

# 2. Deploy manual na Vercel
cd frontend && vercel --prod --token $VERCEL_TOKEN
```

### Mudanca apenas no Backend

```bash
# 1. Commitar e pushar (aciona Render automaticamente)
git add backend/ && git commit -m "feat(api): ..." && git push

# 2. Monitorar deploy
curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
  "https://api.render.com/v1/services/srv-d5k501vpm1nc73fr4090/deploys?limit=1"
```

### Mudanca Full Stack

```bash
# 1. Commitar e pushar (aciona Render automaticamente)
git add . && git commit -m "feat: ..." && git push

# 2. Deploy frontend manualmente (Vercel nao monitora este repo)
cd frontend && vercel --prod --token $VERCEL_TOKEN

# 3. Monitorar backend
curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
  "https://api.render.com/v1/services/srv-d5k501vpm1nc73fr4090/deploys?limit=1"
```

---

## NOTAS PARA AGENTES IA

1. **Sempre verificar health antes de qualquer operacao**: `curl https://api.inteia.com.br/health`
2. **Nunca modificar env vars com PUT sem GET primeiro** - PUT substitui TUDO
3. **Build filters**: Commits que so tocam frontend/agentes/docs NAO acionam deploy backend
4. **Autoscaling ativo**: Nao se preocupar com instancias - Render gerencia automaticamente
5. **Persistent Disk incompativel com autoscaling**: Usar PostgreSQL ou storage externo para persistir arquivos
6. **openai-whisper PROIBIDO no requirements.txt**: Puxa PyTorch (~1GB), estoura RAM
7. **Celery/Flower pertencem a requirements-worker.txt**: Nao incluir no requirements.txt principal
8. **SSH disponivel para debug**: `ssh srv-d5k501vpm1nc73fr4090@ssh.oregon.render.com`
9. **Webhook configurado**: Deploy events vao para https://api.inteia.com.br/api/v1/analytics/webhook-render
10. **Seed de banco roda em background**: `asyncio.create_task()` no lifespan para nao bloquear health check

