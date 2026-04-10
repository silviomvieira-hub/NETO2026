# ROADMAP: CampanhaApp

**Project:** CampanhaApp - Political Campaign Management Platform
**Milestone:** v1 - Neto Rodrigues Deputado Distrital 2026
**Created:** 2026-04-09
**Granularity:** Standard (5-8 phases, 3-5 plans each)

---

## Phases

- [ ] **Phase 1: Database & Security Foundation** - Migrate to Supabase with multi-tenant RLS and authentication
- [ ] **Phase 2: Core Campaign Management** - Enable admin to manage all campaign data modules
- [ ] **Phase 3: PWA & Offline Field Operations** - Make app installable and functional offline with photo uploads
- [ ] **Phase 4: Gamification & Lead Capture** - Engage field workers with XP system and QR-based lead capture
- [ ] **Phase 5: Financial & Field Operations** - Track budget, vehicles, and field activities
- [ ] **Phase 6: Compliance & Advanced Features** - Add reporting, legal compliance, and real-time features
- [ ] **Phase 7: Multi-Tenant Commercialization** - Enable white-label sales to other candidates

---

## Phase Details

### Phase 1: Database & Security Foundation
**Goal**: Migrate existing localStorage app to Supabase with secure authentication and multi-tenant database architecture

**Depends on**: Nothing (first phase)

**Requirements**: INFRA-01, INFRA-02, INFRA-05, INFRA-07, AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, AUTH-08

**Success Criteria** (what must be TRUE):
1. User can log in with username/password and session persists across browser reloads
2. Admin sees all campaign data across all regions, coordinators see only their regions, cabos eleitorais see simplified field interface
3. All existing localStorage data migrated to PostgreSQL with zero data loss
4. Cross-tenant query test returns empty results (RLS prevents data leakage)
5. Code is modularized into separate CSS and JS files instead of single 2,474-line HTML

**Plans:** 4 plans

Plans:
- [ ] 01-01-PLAN.md — Modularizar prototipo monolitico em ES6 modules
- [ ] 01-02-PLAN.md — Criar schema PostgreSQL, RLS policies e seed data
- [ ] 01-03-PLAN.md — Implementar autenticacao Supabase com 3 niveis de acesso
- [ ] 01-04-PLAN.md — Substituir localStorage por Supabase CRUD e ferramenta de migracao

---

### Phase 2: Core Campaign Management
**Goal**: All existing campaign management modules (dashboard, territories, agenda, people, leaders, demands, polls, materials) work with Supabase backend

**Depends on**: Phase 1 (requires database and auth)

**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, TERR-01, TERR-02, TERR-03, TERR-04, TERR-05, TERR-06, AGEN-01, AGEN-02, AGEN-03, AGEN-04, AGEN-05, PESS-01, PESS-02, PESS-03, PESS-04, PESS-05, PESS-06, LIDE-01, LIDE-02, LIDE-03, LIDE-04, LIDE-05, MAPA-01, MAPA-02, MAPA-03, MAPA-04, DEMA-01, DEMA-02, DEMA-03, DEMA-04, DEMA-05, DEMA-06, PESQ-01, PESQ-02, PESQ-03, PESQ-04, MATE-01, MATE-02, MATE-03, MATE-04

**Success Criteria** (what must be TRUE):
1. Dashboard displays countdown to election, statistics cards, upcoming events, and live activity feed from Supabase
2. Admin can view interactive map of DF's 33 RAs with visit status, leaders, and demands geolocalized
3. Admin can create/search/delete agenda events, manage team members with WhatsApp links, and track leaders by region
4. Admin can map political allies/adversaries, register community demands with priorities, and log poll results
5. Admin can manage campaign materials inventory with distribution tracking by region

**Plans**: TBD

**UI hint**: yes

---

### Phase 3: PWA & Offline Field Operations
**Goal**: App works as installable PWA with offline mode, allowing field workers to capture data without internet and sync later

**Depends on**: Phase 2 (requires core modules functional)

**Requirements**: INFRA-03, INFRA-04, INFRA-06, UXUI-01, UXUI-02, UXUI-03, UXUI-04

**Success Criteria** (what must be TRUE):
1. User can install app to phone home screen on Android and iOS via PWA manifest
2. Field worker can register activities, leaders, and demands while completely offline, data syncs automatically when reconnected
3. Uploaded photos are compressed client-side before upload and stored in Supabase Storage with RLS protection
4. App deployed automatically to Vercel on git push with environment variables managed securely
5. App interface is fully responsive and works smoothly on mobile devices in field conditions

**Plans**: TBD

**UI hint**: yes

---

### Phase 4: Gamification & Lead Capture
**Goal**: Field workers earn XP for activities, compete on leaderboards, and capture leads via QR codes

**Depends on**: Phase 3 (requires offline sync for gamification scores and photo uploads)

**Requirements**: GAME-01, GAME-02, GAME-03, GAME-04, GAME-05, GAME-06, GAME-07, GAME-08, GAME-09, GAME-10, LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-05, LEAD-06, LEAD-07

**Success Criteria** (what must be TRUE):
1. Field worker earns XP for actions (cadastrar apoiador, visitar cidade, distribuir material) with 10 progression levels visible
2. Ranking shows top contributors with medals and updates based on recent activity with streaks tracked
3. Coordinator can create daily missions with XP rewards, first to complete gets bonus, completion requires photo proof
4. System awards 12 unlockable trophies for specific achievements across campaign activities
5. Cabo eleitoral can generate personal QR code that links to public form where supporter self-registers and generates XP automatically with LGPD consent checkbox

**Plans**: TBD

**UI hint**: yes

---

### Phase 5: Financial & Field Operations
**Goal**: Track campaign budget, donations, vehicles, and field operations with compliance controls

**Depends on**: Phase 4 (core features stable)

**Requirements**: FINA-01, FINA-02, FINA-03, FINA-04, FINA-05, CAMP-01, CAMP-02, CAMP-03, CAMP-04, CAMP-05

**Success Criteria** (what must be TRUE):
1. Admin can register donors with amounts, track fundraising progress toward goal, and categorize expenses
2. System alerts when budget category exceeds limit and shows revenue vs expenses by category
3. Admin can track campaign vehicles (placa, motorista, quilometragem) and fuel vouchers with spending control
4. Coordinator can use checklist of required pre-campaign and campaign tasks by electoral phase
5. Admin can create subcoordenacoes by segment (juventude, mulheres, religioso, empresarial) and schedule bandeiracos with conflict detection

**Plans**: TBD

**UI hint**: yes

---

### Phase 6: Compliance & Advanced Features
**Goal**: Legal compliance (TSE, LGPD), professional reports, and real-time engagement features

**Depends on**: Phase 5 (all core data modules complete)

**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, RELA-01, RELA-02, RELA-03, RELA-04, AGEN-06, UXUI-05, UXUI-06, UXUI-07, UXUI-08

**Success Criteria** (what must be TRUE):
1. System displays DF electoral data by RA (TRE-DF source) and TSE calendar with automatic legal deadline alerts
2. Admin can access juridical timeline of electoral obligations and all forms require explicit LGPD consent
3. Admin can generate PDF reports (campaign summary, by region, gamification stats) and export JSON backups
4. War room feed displays real-time activities from field team (synchronized via Supabase Realtime)
5. Admin can view interactive campaign organization chart and manually track social media metrics (WhatsApp, Instagram, TikTok)

**Plans**: TBD

**UI hint**: yes

---

### Phase 7: Multi-Tenant Commercialization
**Goal**: Transform single-campaign app into white-label SaaS product sellable to other candidates

**Depends on**: Phase 6 (all features validated for single campaign)

**Requirements**: MULT-01, MULT-02, MULT-03, MULT-04

**Success Criteria** (what must be TRUE):
1. New candidate can be onboarded through wizard that configures colors, logo, candidate name, and regions
2. Each candidate instance has completely isolated data enforced by Supabase RLS (cross-tenant queries return nothing)
3. System supports custom regions/cities beyond DF's 33 RAs (configurable per tenant)
4. Onboarding process creates tenant with admin user and branded interface in under 10 minutes

**Plans**: TBD

**UI hint**: yes

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Database & Security Foundation | 0/4 | Planning complete | - |
| 2. Core Campaign Management | 0/0 | Not started | - |
| 3. PWA & Offline Field Operations | 0/0 | Not started | - |
| 4. Gamification & Lead Capture | 0/0 | Not started | - |
| 5. Financial & Field Operations | 0/0 | Not started | - |
| 6. Compliance & Advanced Features | 0/0 | Not started | - |
| 7. Multi-Tenant Commercialization | 0/0 | Not started | - |

---

## Evolution

This roadmap evolves through phase transitions and milestone completions.

**After each phase** (via `/gsd-transition`):
- Update progress table with completion date
- Log phase outcomes and key learnings
- Update dependencies if next phase requirements changed

**After each milestone** (via `/gsd-complete-milestone`):
- Review phase structure for v2
- Update success criteria based on validated learnings

---

*Roadmap created: 2026-04-09*
*Last updated: 2026-04-09*
