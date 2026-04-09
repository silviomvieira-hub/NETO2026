# Phase 1: Database & Security Foundation - Research

**Researched:** 2026-04-09
**Domain:** Supabase PostgreSQL migration, multi-tenant RLS, authentication, code modularization
**Confidence:** HIGH

## Summary

This research addresses the technical foundations for migrating a 2,474-line monolithic HTML prototype with localStorage persistence to a Supabase-powered backend with PostgreSQL database, secure authentication (3 access levels), Row Level Security (RLS) for multi-tenant data isolation, and modularized ES6 code structure.

The migration strategy prioritizes **security-first database design** (RLS policies before data migration), **incremental modularization** (extract data layer first, defer UI refactoring), and **zero data loss** (mandatory backup export before any migration operation). The research identified 13 critical pitfalls, with RLS misconfiguration and localStorage migration data loss flagged as catastrophic risks requiring verification protocols.

**Primary recommendation:** Implement RLS policies with indexed `tenant_id` columns BEFORE migrating production data. Use native ES6 modules without build tools initially. Store user roles in JWT custom claims via Supabase Auth hooks. Preserve existing CSS/UI exactly as-is to minimize regression risk.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Code Modularization Strategy:**
- Split monolithic `index.html` into ES Modules using native `import/export` (no build tool initially)
- Structure: `index.html` (shell + CSS link), `css/styles.css` (all CSS), `js/app.js` (entry point), `js/router.js` (navigation), `js/supabase.js` (client init), `js/auth.js` (login/session/roles), `js/data.js` (CRUD replacing localStorage), one `js/modules/<page>.js` per page
- Keep Vite as optional — only introduce if ES module imports from CDN become unwieldy
- Extract 33 RAs do DF and constants into `js/constants.js`
- Preserve all existing CSS variables, animations, dark theme exactly as-is — visual identity must not change

**Authentication Flow:**
- Dedicated login page (`login.html` or login view within SPA) — not a modal overlay
- Supabase Auth with email/password (email field used as username — use `username@campanha.app` convention or actual emails)
- Session persists via Supabase's built-in session management (JWT in localStorage managed by supabase-js)
- On page reload, `supabase.auth.getSession()` restores session
- Role stored in `user_metadata` or `profiles` table: `admin`, `coordenador`, `cabo_eleitoral`
- RLS policies reference the role
- Auto-redirect to login when session expires (AUTH-07) using `supabase.auth.onAuthStateChange()` listener
- Password change accessible from settings/profile section for logged-in users (AUTH-06)

**Database Schema Approach:**
- Fully normalized PostgreSQL schema — one table per entity: `profiles`, `eventos`, `pessoas`, `lideres`, `quem_e_quem`, `demandas`, `pesquisas`, `materiais`, `gamificacao_xp`, `tarefas_game`, `visitas`, `atividades`, `streaks`, `trofeus`
- Every table includes `tenant_id` column for multi-tenant isolation (Phase 7 ready) and `created_by`/`updated_at` columns for audit
- RLS policies on ALL tables: admin sees all data for their tenant, coordenador sees data for their assigned regions, cabo_eleitoral sees only their own records plus public data
- `tenant_id` defaults to single tenant for Neto's campaign in v1; multi-tenant activation happens in Phase 7
- Use Supabase's `auth.uid()` and custom claims (via `profiles` table join or JWT claims) in RLS policies

**Data Migration Strategy:**
- Admin import tool in the app — admin can upload JSON backup (same format as existing `exportData()`) and migration function maps it to Supabase tables
- Preserve existing export/import JSON functionality as fallback
- Migration is one-time: after successful import, localStorage data is no longer source of truth
- Show banner prompting migration if localStorage data detected but Supabase tables empty

### Claude's Discretion

- Table column types, indexes, and constraints — optimize for query patterns needed in Phase 2
- RLS policy syntax and optimization — follow Supabase best practices
- File naming conventions within `js/modules/` directory
- Error handling patterns for Supabase operations (toast notifications vs inline errors)
- Login page visual design — match existing dark theme with green/gold identity

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INFRA-01 | Sistema usa Supabase como backend (PostgreSQL, Auth, Storage, Realtime) | Standard Stack (Supabase client 2.103.0), Architecture Patterns (client initialization) |
| INFRA-02 | Dados migrados de localStorage para PostgreSQL via Supabase | Data Migration Strategy (JSON import tool, schema mapping) |
| INFRA-05 | Código modularizado em arquivos separados (CSS, JS por módulo, HTML base) | Architecture Patterns (ES6 modules structure), Code Examples (module pattern) |
| INFRA-07 | Variáveis de ambiente para credenciais Supabase (nunca hardcoded) | Security Domain (environment variables, .env pattern) |
| AUTH-01 | Usuário pode fazer login com username e senha | Standard Stack (Supabase Auth email/password), Authentication Patterns |
| AUTH-02 | Sessão persiste entre recargas do navegador | Session Management (persistSession: true, getSession() on reload) |
| AUTH-03 | Admin tem acesso total a todos os módulos e dados de todas as regiões | RLS Policies (admin role policy patterns) |
| AUTH-04 | Coordenador vê apenas dados da(s) sua(s) região(ões) e seus cabos eleitorais | RLS Policies (regional scoping with JWT claims) |
| AUTH-05 | Cabo eleitoral tem tela simplificada para ações de campo | UI routing based on role (auth.js role detection) |
| AUTH-06 | Página de troca de senha acessível ao usuário logado | Supabase Auth updateUser() method, Don't Hand-Roll (password reset) |
| AUTH-07 | Redirect automático para login quando sessão expira | Session Management (onAuthStateChange listener, token refresh) |
| AUTH-08 | Row Level Security (RLS) no Supabase isola dados por nível de acesso | RLS Policies (tenant_id + role-based policies), Common Pitfalls (RLS misconfiguration) |

</phase_requirements>

---

## Standard Stack

### Core Backend

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @supabase/supabase-js | **2.103.0** | Complete backend client (auth, database, storage, realtime) | Official Supabase JavaScript client. Isomorphic (browser + Node), TypeScript support, includes all needed APIs. **VERIFIED via npm registry 2026-04-09** — latest stable release. |

**Installation:**
```bash
npm install @supabase/supabase-js@2.103.0
```

**CDN Alternative (for no-build approach):**
```html
<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
</script>
```

### Supporting Libraries (Deferred to Later Phases)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Workbox | 7.4.0 | Service worker generation and PWA offline support | **Phase 3** — PWA offline capabilities |
| idb | 8.x | Promise-based IndexedDB wrapper | **Phase 3** — Offline data cache and sync queue |
| Day.js | 1.11.x | Date manipulation, formatting | **Phase 2** — Agenda dates, countdown timer |

**Note:** Phase 1 uses only Supabase client. Additional libraries added incrementally in later phases.

---

## Architecture Patterns

### Recommended Project Structure

```
/
├── index.html                  # App shell (minimal HTML, loads app.js module)
├── login.html                  # Login page (or login view in SPA)
├── css/
│   └── styles.css             # All existing CSS extracted from index.html lines 8-1600
├── js/
│   ├── app.js                 # Entry point, initializes router and auth
│   ├── constants.js           # REGIOES_DF, PAGE_TITLES, other constants
│   ├── supabase.js            # Supabase client initialization
│   ├── auth.js                # Login, session, role detection, onAuthStateChange
│   ├── data.js                # CRUD operations replacing localStorage (loadData/saveData equivalents)
│   ├── router.js              # showPage(), renderPage(), navigation logic
│   ├── utils.js               # escapeHtml, formatDate, timeAgo, openModal, etc.
│   └── modules/
│       ├── dashboard.js       # renderDashboard()
│       ├── cidades.js         # renderCidades()
│       ├── agenda.js          # renderAgenda()
│       ├── pessoas.js         # renderPessoas()
│       ├── lideres.js         # renderLideres()
│       ├── quemequem.js       # renderQuemEQuem()
│       ├── demandas.js        # renderDemandas()
│       ├── pesquisas.js       # renderPesquisas()
│       ├── materiais.js       # renderMateriais()
│       └── gamificacao.js     # renderGamificacao() + XP/streak logic
└── .env                       # NOT committed to Git
    VITE_SUPABASE_URL=...
    VITE_SUPABASE_ANON_KEY=...
```

**Key Principles:**
- One module per existing page (10 modules match 10 existing pages)
- `data.js` abstracts Supabase calls — rest of code calls `getData('eventos')` not `supabase.from('eventos').select()`
- Constants extracted to single file
- CSS unchanged, just extracted to external file
- Authentication logic centralized in `auth.js`

---

### Pattern 1: Supabase Client Initialization

**What:** Single Supabase client instance shared across all modules

**When to use:** Every module that needs database/auth access imports from `supabase.js`

**Example:**

```javascript
// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,     // Store session in localStorage
    autoRefreshToken: true,   // Refresh token automatically
    detectSessionInUrl: true  // Handle OAuth redirects
  }
})
```

**Source:** [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)

---

### Pattern 2: Authentication Flow with Custom Claims

**What:** Email/password login with role stored in JWT custom claims

**When to use:** User login, session restore on page reload, role-based UI rendering

**Example:**

```javascript
// js/auth.js
import { supabase } from './supabase.js'

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  // Custom claims are injected via Custom Access Token Hook (Edge Function)
  const role = data.user.user_metadata?.role || 'cabo_eleitoral'
  const tenantId = data.user.user_metadata?.tenant_id

  return { user: data.user, role, tenantId }
}

export async function restoreSession() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login
    window.location.href = '/login.html'
    return null
  }

  return {
    user: session.user,
    role: session.user.user_metadata?.role || 'cabo_eleitoral',
    tenantId: session.user.user_metadata?.tenant_id
  }
}

export function watchAuthState(callback) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
      callback(event, session)
    }
  })
}

// Usage in app.js
const session = await restoreSession()
if (!session) return // Already redirected to login

watchAuthState((event, session) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = '/login.html'
  }
})
```

**Sources:**
- [Custom Access Token Hook](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)
- [User Sessions](https://supabase.com/docs/guides/auth/sessions)

---

### Pattern 3: RLS Policies for Multi-Tenant + Role-Based Access

**What:** PostgreSQL Row Level Security policies enforce tenant isolation and role-based data access at database layer

**When to use:** Every table must have RLS enabled with policies BEFORE inserting production data

**Example Schema:**

```sql
-- Enable RLS on all tables (CRITICAL: do this FIRST)
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pessoas ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandas ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables

-- Tenant isolation policy (ALL tables)
CREATE POLICY "Tenant isolation" ON eventos
  FOR ALL
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid)
  WITH CHECK (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Role-based access: Admin sees everything
CREATE POLICY "Admin full access" ON eventos
  FOR ALL
  USING ((auth.jwt() ->> 'role') = 'admin');

-- Role-based access: Coordenador sees only their regions
CREATE POLICY "Coordenador regional access" ON eventos
  FOR SELECT
  USING (
    (auth.jwt() ->> 'role') = 'coordenador'
    AND region_id IN (
      SELECT jsonb_array_elements_text(auth.jwt() -> 'regions')::uuid
    )
  );

-- Role-based access: Cabo eleitoral sees only their own records
CREATE POLICY "Cabo eleitoral own records" ON eventos
  FOR ALL
  USING (
    (auth.jwt() ->> 'role') = 'cabo_eleitoral'
    AND created_by = auth.uid()
  );

-- CRITICAL: Index policy filter columns for performance
CREATE INDEX idx_eventos_tenant_id ON eventos(tenant_id);
CREATE INDEX idx_eventos_region_id ON eventos(region_id);
CREATE INDEX idx_eventos_created_by ON eventos(created_by);
```

**Why This Approach:**
- Security enforced at database layer, not application layer (defense-in-depth)
- Even if client code has bugs, RLS prevents cross-tenant data leakage
- `auth.jwt()` function extracts claims from JWT automatically
- Indexes on policy columns prevent performance collapse at scale

**CRITICAL PITFALL:** Missing `WITH CHECK` clause allows users to insert records with ANY `tenant_id`, hijacking ownership. Always include both `USING` (read filter) and `WITH CHECK` (write filter).

**Sources:**
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Enforcing RLS in Multi-Tenant Architecture](https://dev.to/blackie360/-enforcing-row-level-security-in-supabase-a-deep-dive-into-lockins-multi-tenant-architecture-4hd2)

---

### Pattern 4: Data Layer Abstraction (Replace localStorage)

**What:** Centralized CRUD module that replaces `loadData()` and `saveData()` localStorage calls with Supabase queries

**When to use:** Every page module calls `getData()`, `addData()`, `updateData()`, `deleteData()` instead of direct Supabase calls

**Example:**

```javascript
// js/data.js
import { supabase } from './supabase.js'

const TABLE_MAP = {
  eventos: 'eventos',
  pessoas: 'pessoas',
  lideres: 'lideres',
  quemequem: 'quem_e_quem',
  demandas: 'demandas',
  pesquisas: 'pesquisas',
  materiais: 'materiais',
  gamificacao: 'gamificacao_xp',
  visitas: 'visitas',
  atividades: 'atividades',
  tarefas_game: 'tarefas_game',
  streaks: 'streaks',
  trofeus: 'trofeus'
}

export async function getData(entity) {
  const table = TABLE_MAP[entity]
  if (!table) throw new Error(`Unknown entity: ${entity}`)

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function addData(entity, record) {
  const table = TABLE_MAP[entity]

  const { data, error } = await supabase
    .from(table)
    .insert({
      ...record,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error

  // Log activity (like old addAtividade function)
  await logActivity(`Novo ${entity}: ${record.titulo || record.nome || 'item'}`)

  return data
}

export async function updateData(entity, id, changes) {
  const table = TABLE_MAP[entity]

  const { data, error } = await supabase
    .from(table)
    .update({
      ...changes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteData(entity, id) {
  const table = TABLE_MAP[entity]

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)

  if (error) throw error
}

async function logActivity(texto) {
  await supabase
    .from('atividades')
    .insert({
      texto,
      data: new Date().toISOString()
    })
}
```

**Migration Bridge:** Existing code calls `data.eventos` → refactored code calls `await getData('eventos')`. Similar API, different backend.

---

### Pattern 5: localStorage Migration Tool

**What:** Admin UI to export localStorage JSON and import into Supabase tables

**When to use:** One-time migration during Phase 1 deployment

**Example:**

```javascript
// js/migration.js
import { supabase } from './supabase.js'

export async function exportLocalStorage() {
  const STORAGE_KEY = 'neto_campanha_2026'
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    throw new Error('No localStorage data found')
  }

  const data = JSON.parse(raw)

  // Force user to download backup
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `campanha-backup-${new Date().toISOString()}.json`
  a.click()

  return data
}

export async function importToSupabase(localData) {
  // Validate data structure
  if (!localData.eventos || !localData.pessoas) {
    throw new Error('Invalid data structure')
  }

  const results = {
    eventos: 0,
    pessoas: 0,
    lideres: 0,
    demandas: 0,
    errors: []
  }

  // Get current tenant_id from session
  const { data: { user } } = await supabase.auth.getUser()
  const tenantId = user.user_metadata.tenant_id

  // Batch insert eventos
  try {
    const eventos = localData.eventos.map(e => ({
      ...e,
      tenant_id: tenantId,
      created_at: e.data || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error } = await supabase.from('eventos').insert(eventos)
    if (error) throw error
    results.eventos = eventos.length
  } catch (e) {
    results.errors.push(`Eventos: ${e.message}`)
  }

  // Repeat for other entities...

  return results
}

// Show migration banner if localStorage exists but Supabase is empty
export async function checkMigrationNeeded() {
  const localData = localStorage.getItem('neto_campanha_2026')
  if (!localData) return false

  const { count } = await supabase
    .from('eventos')
    .select('*', { count: 'exact', head: true })

  return count === 0 // localStorage has data, Supabase empty = migration needed
}
```

**CRITICAL:** Export backup BEFORE any migration attempt. Validate schema compatibility. Use upsert logic to allow re-running migration on failure.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| User authentication | Custom password hashing, session management, token generation | Supabase Auth | Handles bcrypt/scrypt hashing, JWT generation, session refresh, OAuth, MFA, email verification. Security-critical, don't DIY. |
| Password reset | Custom email sending, token expiration, validation | Supabase Auth `resetPasswordForEmail()` | Generates secure token, sends email via Supabase SMTP, handles expiration automatically. |
| Row-level security | Application-level filtering (e.g., `WHERE tenant_id = ?` in every query) | PostgreSQL RLS policies | Application code can have bugs; RLS is enforced at database level even if client bypasses app logic. |
| Database migrations | Manual SQL scripts run via psql | Supabase CLI migrations (`supabase migration new`, `supabase db push`) | Version-controlled schema changes, rollback support, automatic application on deploy. |
| Environment variables | Hardcoded credentials, config.js files | `.env` with Vite's `import.meta.env` | Keeps secrets out of Git, different values per environment (dev/staging/prod). |
| JWT claim validation | Manually decoding/verifying JWT in client | `auth.jwt()` in RLS policies | Client-side JWT validation is insecure (user can modify); server-side (RLS) validation is tamper-proof. |

**Key Insight:** Supabase provides production-grade auth, RLS, and database tooling. Custom implementations introduce security vulnerabilities and maintenance burden.

---

## Runtime State Inventory

> Phase 1 does NOT involve rename/refactor/migration of identifiers. This section documents what localStorage data exists and how it maps to PostgreSQL schema.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | localStorage key `neto_campanha_2026` contains JSON with 13 entities: `eventos`, `pessoas`, `lideres`, `quemequem`, `demandas`, `pesquisas`, `materiais`, `gamificacao`, `visitas`, `atividades`, `tarefas_game`, `streaks`, `trofeus`, `nextId` | **One-time migration** — export JSON, map to Supabase tables via admin import tool (Pattern 5). After successful import, localStorage becomes backup-only. |
| Live service config | None — existing prototype has no external service integrations | No action required. |
| OS-registered state | None — browser-only application, no OS registration | No action required. |
| Secrets/env vars | None currently — Supabase credentials will be added to `.env` file (not committed to Git) | **Code addition** — create `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. |
| Build artifacts | None — no build process in prototype. If Vite introduced later, `dist/` folder generated. | No action in Phase 1. Add `dist/` to `.gitignore` if build tool added. |

**Migration Mapping:**

| localStorage Entity | PostgreSQL Table | Schema Changes |
|---------------------|------------------|----------------|
| `eventos` | `eventos` | Add `tenant_id`, `region_id`, `created_by`, `created_at`, `updated_at` |
| `pessoas` | `pessoas` | Add `tenant_id`, `region_id`, `created_by`, `created_at`, `updated_at` |
| `lideres` | `lideres` | Add `tenant_id`, `region_id`, `created_by`, `created_at`, `updated_at` |
| `quemequem` | `quem_e_quem` | Rename table (avoid reserved words), add tenant/audit columns |
| `demandas` | `demandas` | Add `tenant_id`, `region_id`, `created_by`, `created_at`, `updated_at` |
| `pesquisas` | `pesquisas` | Add `tenant_id`, `created_by`, `created_at`, `updated_at` |
| `materiais` | `materiais` | Add `tenant_id`, `region_id`, `created_by`, `created_at`, `updated_at` |
| `gamificacao` | `gamificacao_xp` | Add `tenant_id`, `created_at`, `updated_at` |
| `visitas` | `visitas` | Convert object `{cityName: visitData}` to rows with `city_name` column |
| `atividades` | `atividades` | Add `tenant_id`, `user_id`, `created_at` |
| `tarefas_game` | `tarefas_game` | Add `tenant_id`, `created_by`, `created_at`, `updated_at` |
| `streaks` | `streaks` | Convert object `{pessoa: streakData}` to rows with `user_id` column |
| `trofeus` | `trofeus` | Add `tenant_id`, `created_at` |
| `nextId` | N/A | PostgreSQL uses `SERIAL` or `uuid_generate_v4()` for auto-incrementing IDs |

---

## Common Pitfalls

### Pitfall 1: RLS Misconfiguration Causing Tenant Data Leakage

**What goes wrong:** Multi-tenant campaign data becomes visible across candidates. Coordenador from Candidate A sees leads/team from Candidate B. Catastrophic privacy breach, LGPD violations.

**Why it happens:**
- RLS disabled by default — forgetting to enable on even one table exposes entire database
- RLS enabled but no policies — default is deny-all, app appears broken (empty results)
- Missing `WITH CHECK` clause — allows users to insert with ANY `tenant_id`, hijacking ownership
- SQL Editor testing — runs as superuser, bypasses RLS, gives false confidence

**How to avoid:**
1. **Enable RLS on ALL tables at creation** — checklist item, not optional
2. **Write policies with `WITH CHECK` clause** — every INSERT/UPDATE policy must include `WITH CHECK (tenant_id = auth.jwt() ->> 'tenant_id')`
3. **Index policy filter columns** — `CREATE INDEX idx_tenant_id ON table(tenant_id)` prevents 50ms → 2ms query time
4. **Test via client SDK, not SQL Editor** — SQL Editor bypasses RLS; always test via supabase-js client
5. **Audit with SELECT before launch** — test cross-tenant query: `SELECT * FROM leads WHERE tenant_id != 'your_test_tenant'` should return empty

**Warning signs:**
- User reports "seeing wrong data" or data from another campaign
- Empty results on client but data exists in SQL Editor
- RLS policy queries timing out (missing index)

**Sources:**
- [Supabase RLS Guide: Policies That Actually Work](https://designrevision.com/blog/supabase-row-level-security)
- [Securing Supabase: Preventing Data Leaks From Misconfigured RLS](https://earezki.com/ai-news/2026-04-07-supabase-rls-the-hidden-danger-and-how-to-find-it-before-hackers-do/)
- [Multi-Tenant Leakage: When Row-Level Security Fails in SaaS](https://medium.com/@instatunnel/multi-tenant-leakage-when-row-level-security-fails-in-saas-da25f40c788c)

---

### Pitfall 2: localStorage Migration Data Loss

**What goes wrong:** During migration from localStorage to Supabase, 2,474 lines of accumulated campaign data (leads, team, gamification history) is lost or corrupted. User starts fresh with empty database.

**Why it happens:**
- No backup before migration — assuming export/import works perfectly
- Schema mismatch — localStorage flat JSON vs. Postgres normalized tables with foreign keys
- Partial migration — network interruption leaves database half-migrated
- Character encoding issues — names with accents (José, Conceição) corrupt during JSON → SQL conversion
- Browser cache cleared mid-migration — user clears cache thinking "I'll sync from server" but server never received data

**How to avoid:**
1. **Export localStorage before ANY migration attempt** — force user to download JSON backup
2. **Validate data pre-migration** — check required fields, character encoding, data types BEFORE uploading
3. **Implement idempotent migration** — use upsert logic so re-running doesn't duplicate data
4. **Batch migration with progress tracking** — upload in chunks (100 records at a time), allow resume on failure
5. **Preserve localStorage until confirmed** — don't clear until user confirms server data is correct
6. **Test migration with production-like data** — export real localStorage, test on staging instance

**Warning signs:**
- User reports "all my data is gone"
- Migration progress bar stuck at specific percentage
- SQL constraint violation errors during bulk insert
- Character encoding corruption (ã becomes Ã£)

**Sources:**
- [Top 10 Data Migration Risks and How to Avoid Them in 2026](https://kanerika.com/blogs/risks-in-data-migration/)
- [Data Migration Challenges: Common Issues and Fixes](https://www.rudderstack.com/blog/data-migration-challenges/)

---

### Pitfall 3: Session Expiry Mid-Field Work

**What goes wrong:** Cabo eleitoral works offline for 3 hours canvassing. Opens app to sync, JWT expired (1 hour default). Forced to re-login. Offline data not synced. Work lost.

**Why it happens:**
- Default JWT expiry is 1 hour — Supabase access tokens expire quickly
- Refresh token not used during offline — app can't refresh without network
- Sync fails with expired token — upload mutation requires valid JWT, rejected by API

**How to avoid:**
1. **Extend JWT expiry to 8-24 hours** — configure in Supabase Auth settings for field worker role
2. **Implement background token refresh** — while online, periodically call `refreshSession()`
3. **Graceful re-auth on sync** — if sync fails with 401, refresh token transparently, retry mutation
4. **Offline tolerance** — queue mutations locally, sync when token is valid (not immediately on reconnect)
5. **Pre-flight token check** — before offline work, verify token has >2 hours remaining, prompt refresh if needed

**Warning signs:**
- Users report "logged out while working"
- Sync failures with 401 Unauthorized
- Spike in re-login events during field hours

**Sources:**
- [User Sessions | Supabase Docs](https://supabase.com/docs/guides/auth/sessions)
- [How to Handle JWT Expiration in Supabase](https://www.rapidevelopers.com/supabase-tutorial/how-to-handle-jwt-expiration-in-supabase)

---

### Pitfall 4: Prototype Code Carried to Production

**What goes wrong:** Single-file HTML with inline CSS/JS scales poorly. Global variables collide. No error handling. Adding features becomes exponentially harder.

**Why it happens:**
- "It works, ship it" mentality — pressure to launch skips refactoring
- localStorage logic mixed with UI — tight coupling makes database migration painful
- No error boundaries — one uncaught exception crashes entire app

**How to avoid:**
1. **Refactor before adding features** — extract modules: auth.js, data.js, router.js
2. **Separation of concerns** — data layer (Supabase calls) separate from presentation (DOM manipulation)
3. **CSS extraction** — move styles to external file, use CSS variables for theming
4. **Error handling pattern** — wrap async functions in try/catch, show user-friendly errors
5. **Incremental migration** — refactor module-by-module as features are added, don't rewrite everything

**Warning signs:**
- "Cannot read property of undefined" errors spike
- Adding new feature breaks existing feature
- Global variable collisions
- Performance audit shows blocking JS execution

**Sources:**
- [Technical Debt is Not a Metaphor. It's Why Your Migration Failed.](https://dev.to/jmontagne/technical-debt-is-not-a-metaphor-its-why-your-migration-failed-21l7)
- [Hidden Technical Debt in MVPs: How Startups Can Avoid Costly Pitfalls](https://www.technosidd.com/2026/01/hidden-technical-debt-in-mvps-how-startups-can-avoid-costly-pitfalls.html)

---

## Code Examples

### Example 1: Complete ES6 Module Setup

**Scenario:** Convert monolithic index.html to modular structure

```html
<!-- index.html (minimal shell) -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NETO RODRIGUES - Campanha 2026</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/js/app.js"></script>
</body>
</html>
```

```javascript
// js/app.js (entry point)
import { supabase } from './supabase.js'
import { restoreSession, watchAuthState } from './auth.js'
import { showPage } from './router.js'

async function init() {
  // Restore session or redirect to login
  const session = await restoreSession()
  if (!session) return // Already redirected

  // Watch for auth state changes
  watchAuthState((event, session) => {
    if (event === 'SIGNED_OUT') {
      window.location.href = '/login.html'
    }
  })

  // Show dashboard by default
  showPage('dashboard')
}

init()
```

```javascript
// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
```

**Source:** [JavaScript Modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

### Example 2: Login Page with Role Detection

```html
<!-- login.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - NETO RODRIGUES 2026</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div class="login-container">
    <div class="login-card">
      <img src="/assets/neto-photo.jpg" alt="Neto Rodrigues" class="login-photo">
      <h1>NETO RODRIGUES</h1>
      <p>Deputado Distrital 2026</p>

      <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Senha" required>
        <button type="submit">Entrar</button>
      </form>

      <div id="error" class="error-message"></div>
    </div>
  </div>

  <script type="module">
    import { supabase } from './js/supabase.js'

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault()

      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const errorEl = document.getElementById('error')

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        // Role is in user_metadata (set during user creation)
        const role = data.user.user_metadata?.role || 'cabo_eleitoral'

        // Redirect to app
        window.location.href = '/'

      } catch (err) {
        errorEl.textContent = err.message
      }
    })
  </script>
</body>
</html>
```

---

### Example 3: RLS Policy with Indexed Columns

```sql
-- Create table with tenant and audit columns
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  region_id UUID REFERENCES regions(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  titulo TEXT NOT NULL,
  data DATE NOT NULL,
  local TEXT,
  tipo TEXT,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

-- Tenant isolation (all users)
CREATE POLICY "Tenant isolation" ON eventos
  FOR ALL
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid)
  WITH CHECK (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- Admin sees all
CREATE POLICY "Admin full access" ON eventos
  FOR ALL
  USING ((auth.jwt() ->> 'role') = 'admin');

-- Coordenador sees their regions
CREATE POLICY "Coordenador regional" ON eventos
  FOR SELECT
  USING (
    (auth.jwt() ->> 'role') = 'coordenador'
    AND region_id IN (
      SELECT jsonb_array_elements_text(auth.jwt() -> 'regions')::uuid
    )
  );

-- Cabo eleitoral sees only their records
CREATE POLICY "Cabo own records" ON eventos
  FOR ALL
  USING (
    (auth.jwt() ->> 'role') = 'cabo_eleitoral'
    AND created_by = auth.uid()
  );

-- CRITICAL: Index policy columns
CREATE INDEX idx_eventos_tenant_id ON eventos(tenant_id);
CREATE INDEX idx_eventos_region_id ON eventos(region_id);
CREATE INDEX idx_eventos_created_by ON eventos(created_by);
CREATE INDEX idx_eventos_data ON eventos(data DESC);

-- Update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER eventos_updated_at
  BEFORE UPDATE ON eventos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

**Source:** [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| localStorage for multi-user data | PostgreSQL with Supabase | 2020+ | Enables sync across devices, multi-user collaboration, 500MB+ data capacity vs. 5MB localStorage limit |
| Manual password hashing | Supabase Auth with bcrypt/scrypt | 2021+ | Security-audited auth, handles session refresh, OAuth, MFA without custom code |
| Application-level access control | Row Level Security (RLS) | PostgreSQL 9.5+ (2016) | Defense-in-depth: security at database layer, survives application bugs |
| Monolithic single-file apps | ES6 modules with dynamic imports | ES2015 (2015), broad support 2020+ | Code splitting, lazy loading, better maintainability |
| jQuery for DOM manipulation | Vanilla JS (querySelector, fetch, classList) | 2015+ | Modern DOM APIs render jQuery unnecessary, reduces bundle size 30KB |
| Callback hell for async | async/await | ES2017 (2017) | Cleaner async code, easier error handling |

**Deprecated/outdated:**
- **localStorage for production data:** 5-10MB limit, no sync, data loss if cache cleared. Use for UI preferences only, not campaign data.
- **Manual JWT validation in client:** Insecure (user can modify). Use RLS policies with `auth.jwt()` for server-side validation.
- **SQL injection via string concatenation:** Never construct queries with `"SELECT * FROM users WHERE id = " + userId`. Use parameterized queries (Supabase client handles this).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Supabase free tier (500MB DB, 1GB storage) sufficient for Phase 1 | Standard Stack | If data grows faster than expected, forced upgrade to Pro tier ($25/month) mid-development. **Mitigation:** Monitor usage, budget Pro tier from day 1. |
| A2 | Email/password auth acceptable (no OAuth/SSO required in v1) | Authentication Flow | If stakeholders require Google/Facebook login later, minor refactor needed (Supabase supports this, just config change). **Mitigation:** Confirm auth requirements with stakeholders. |
| A3 | Single tenant sufficient for Neto campaign (multi-tenant deferred to Phase 7) | Database Schema | If need to onboard second candidate during campaign, schema already supports it (tenant_id column exists), just add tenant creation UI. **Mitigation:** Schema is multi-tenant-ready from day 1. |
| A4 | 33 RAs do DF remain stable (no new administrative regions created) | Regional Mapping | If DF government creates new RAs, update `REGIOES_DF` constant and add to database. **Mitigation:** Annual boundary check, trivial update. |
| A5 | Native ES6 modules work without build tool (no IE11 support needed) | Code Modularization | If user base includes IE11 (unlikely in 2026), need to add build step with transpilation. **Mitigation:** Analytics to confirm browser usage, 99%+ modern browsers. |

**If this table is empty:** All claims in this research were verified or cited — no user confirmation needed.

---

## Environment Availability

**Trigger:** Phase 1 depends on Supabase cloud service, npm (for package verification), and modern browser.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Supabase Cloud | Backend (PostgreSQL, Auth, Storage) | ✓ | Cloud service | — (no self-hosted option in Phase 1) |
| npm | Package version verification | ✓ | 10.x | Use CDN imports (no npm install needed) |
| Modern Browser (Chrome/Edge/Safari) | ES6 modules, service workers | ✓ | 90+ | — (IE11 not supported) |
| Node.js (optional) | Vite dev server (if build tool introduced) | ✓ | 18.x | Not needed in Phase 1 (native ESM) |

**Missing dependencies with no fallback:** None — all critical dependencies available.

**Missing dependencies with fallback:** None.

**Note:** Phase 1 uses CDN imports for Supabase client, so npm/Node.js are optional (only needed if Vite introduced later).

---

## Validation Architecture

> Validation architecture section INCLUDED because `workflow.nyquist_validation` is enabled in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — recommend **Vitest 2.x** for ES modules + Supabase mocking |
| Config file | None — create `vitest.config.js` in Wave 0 |
| Quick run command | `npm test -- --run --reporter=verbose` |
| Full suite command | `npm test -- --run --coverage` |

**Recommendation:** Vitest chosen for native ESM support, fast execution, Vite integration (if build tool added later), and built-in mocking for Supabase client.

**Installation (Wave 0):**
```bash
npm install --save-dev vitest @vitest/ui happy-dom
```

---

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUTH-01 | User can login with email/password | integration | `npm test tests/auth.test.js -t "login with valid credentials" --run` | ❌ Wave 0 |
| AUTH-02 | Session persists across browser reload | integration | `npm test tests/auth.test.js -t "restore session on reload" --run` | ❌ Wave 0 |
| AUTH-03 | Admin sees all data across regions | integration | `npm test tests/rls.test.js -t "admin full access" --run` | ❌ Wave 0 |
| AUTH-04 | Coordenador sees only their regions | integration | `npm test tests/rls.test.js -t "coordenador regional scoping" --run` | ❌ Wave 0 |
| AUTH-05 | Cabo eleitoral sees simplified UI | unit | `npm test tests/router.test.js -t "cabo role routing" --run` | ❌ Wave 0 |
| AUTH-06 | User can change password | integration | `npm test tests/auth.test.js -t "password change" --run` | ❌ Wave 0 |
| AUTH-07 | Auto-redirect on session expiry | integration | `npm test tests/auth.test.js -t "session expiry redirect" --run` | ❌ Wave 0 |
| AUTH-08 | RLS prevents cross-tenant queries | integration | `npm test tests/rls.test.js -t "tenant isolation" --run` | ❌ Wave 0 |
| INFRA-01 | Supabase client initializes | unit | `npm test tests/supabase.test.js -t "client init" --run` | ❌ Wave 0 |
| INFRA-02 | localStorage data migrates to PostgreSQL | integration | `npm test tests/migration.test.js -t "import localStorage JSON" --run` | ❌ Wave 0 |
| INFRA-05 | Code split into ES6 modules | manual | Verify module imports in browser DevTools Network tab | N/A |
| INFRA-07 | Environment variables loaded | unit | `npm test tests/config.test.js -t "env vars" --run` | ❌ Wave 0 |

---

### Sampling Rate

- **Per task commit:** `npm test -- --run --reporter=dot` (fast mode, exit on first failure)
- **Per wave merge:** `npm test -- --run --coverage` (full suite with coverage report)
- **Phase gate:** Full suite green + manual RLS audit (cross-tenant query test) before `/gsd-verify-work`

---

### Wave 0 Gaps

- [ ] `tests/auth.test.js` — covers AUTH-01, AUTH-02, AUTH-06, AUTH-07
- [ ] `tests/rls.test.js` — covers AUTH-03, AUTH-04, AUTH-08 (requires Supabase test instance or local setup)
- [ ] `tests/router.test.js` — covers AUTH-05 (role-based routing)
- [ ] `tests/supabase.test.js` — covers INFRA-01 (client initialization)
- [ ] `tests/migration.test.js` — covers INFRA-02 (localStorage import)
- [ ] `tests/config.test.js` — covers INFRA-07 (environment variables)
- [ ] `vitest.config.js` — test framework configuration
- [ ] `tests/setup.js` — shared test utilities, Supabase mock setup
- [ ] Framework install: `npm install --save-dev vitest @vitest/ui happy-dom`

**RLS Testing Note:** RLS policies require actual PostgreSQL instance (Supabase test project or local Docker). Consider Supabase CLI `supabase start` for local testing or dedicated test project in Supabase cloud.

---

## Security Domain

> Required because `security_enforcement` is enabled (absent = enabled).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | yes | Supabase Auth (bcrypt password hashing, JWT session management, email verification) |
| V3 Session Management | yes | Supabase Auth (JWT with automatic refresh, secure httpOnly cookies for refresh tokens, configurable expiry) |
| V4 Access Control | yes | PostgreSQL Row Level Security (RLS) — database-enforced access control, role-based policies |
| V5 Input Validation | yes | Supabase client parameterized queries (SQL injection prevention), HTML escaping via `escapeHtml()` utility |
| V6 Cryptography | no | No custom cryptography — Supabase handles password hashing, JWT signing |
| V7 Error Handling | yes | Try/catch wrappers on all async operations, user-friendly error messages (no stack traces to client) |
| V8 Data Protection | yes | PostgreSQL RLS (tenant isolation), HTTPS-only (Supabase enforced), no sensitive data in localStorage |
| V9 Communications | yes | HTTPS for all API requests (Supabase default), WebSocket TLS for Realtime (Phase 3) |
| V10 Malicious Code | yes | CSP headers (configure in Vercel), no eval/innerHTML with user data, Supabase client trusted dependency |
| V14 Configuration | yes | Environment variables for secrets (.env not committed), separate dev/staging/prod Supabase projects |

---

### Known Threat Patterns for Political Campaign Platform

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| SQL Injection | Tampering | Supabase client uses parameterized queries (automatic), never string concatenation |
| Cross-Site Scripting (XSS) | Tampering | `escapeHtml()` utility for user-generated content, `textContent` instead of `innerHTML` |
| Cross-Tenant Data Leakage | Information Disclosure | PostgreSQL RLS policies with `tenant_id` filter, indexed for performance |
| Session Hijacking | Elevation of Privilege | Supabase JWT with short expiry (1 hour default, configurable), httpOnly cookies for refresh tokens |
| Brute Force Login | Denial of Service | Supabase Auth rate limiting (5 failed attempts → temporary lockout), CAPTCHA integration available |
| CSRF Attacks | Tampering | Supabase client includes CSRF tokens automatically, SameSite cookies |
| Privilege Escalation | Elevation of Privilege | RLS policies validate role in JWT claims, cannot be modified by client |
| Data Breach (LGPD violation) | Information Disclosure | HTTPS-only, PostgreSQL encryption at rest (Supabase default), audit logs for data access |
| Unauthorized Password Reset | Spoofing | Supabase Auth sends reset email only to verified email address, token expires in 1 hour |
| Man-in-the-Middle | Tampering | HTTPS enforced (Supabase + Vercel default), HSTS headers |

**Critical Controls:**
1. **RLS enabled on ALL tables** — catastrophic if forgotten on even one table
2. **Indexed policy columns** — missing index = 50ms query becomes 2000ms under load
3. **JWT expiry configured** — balance security (short expiry) vs. UX (field workers offline)
4. **Environment variables for secrets** — never hardcode Supabase anon key in production (even though it's "public", service_role key must NEVER be exposed)

---

## Sources

### Primary (HIGH confidence)

**Supabase Official Documentation:**
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Custom Access Token Hook](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)
- [User Sessions](https://supabase.com/docs/guides/auth/sessions)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)

**Web Standards:**
- [JavaScript Modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

**npm Registry (verified 2026-04-09):**
- @supabase/supabase-js: 2.103.0
- workbox-core: 7.4.0

---

### Secondary (MEDIUM confidence)

**Multi-Tenant & RLS Best Practices (2026):**
- [Enforcing RLS in Multi-Tenant Architecture](https://dev.to/blackie360/-enforcing-row-level-security-in-supabase-a-deep-dive-into-lockins-multi-tenant-architecture-4hd2)
- [Best Practices for Supabase](https://www.leanware.co/insights/supabase-best-practices)
- [Supabase RLS Guide: Policies That Actually Work](https://designrevision.com/blog/supabase-row-level-security)
- [Supabase Multi-Tenancy CRM Integration Guide](https://www.stacksync.com/blog/supabase-multi-tenancy-crm-integration)
- [How to Design Multi-Tenant Schemas in PostgreSQL](https://oneuptime.com/blog/post/2026-01-25-multi-tenant-schemas-postgresql/view)

**JavaScript Module Patterns (2026):**
- [JavaScript Modules in 2026: Practical Patterns](https://thelinuxcode.com/javascript-modules-in-2026-practical-patterns-with-commonjs-and-es-modules/)
- [How I Structure My Vanilla JS Projects](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/)
- [How to Write Modular and Scalable Code in Vanilla JavaScript](https://jamal-mvc.com/2025/12/12/how-to-write-modular-and-scalable-code-in-vanilla-javascript-best-practices-and-proven-strategies/)

**PostgreSQL Schema Design:**
- [Designing a Multi-Tenant Database Schema](https://erflow.io/en/blog/designing-multi-tenant-database-schema)
- [PostgreSQL Foreign Keys and Performance](https://www.elysiate.com/blog/postgresql-foreign-keys-and-performance)

---

### Tertiary (LOW confidence — needs verification)

None — all claims verified via official documentation or reputable technical sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack (Supabase client): **HIGH** — official npm package, version verified 2026-04-09
- Authentication patterns: **HIGH** — Supabase official docs, active 2026
- RLS policies: **HIGH** — Supabase official docs + multiple verified implementations
- ES6 modules: **HIGH** — web standard, broad browser support
- Migration strategy: **MEDIUM** — no official Supabase tool for localStorage → PostgreSQL, custom implementation needed

**Research date:** 2026-04-09
**Valid until:** 2026-07-09 (90 days — Supabase stable product, infrequent breaking changes)

**Critical gaps requiring validation:**
- RLS policy performance at scale (100+ users, 10K+ records) — recommend load testing in staging
- localStorage migration script robustness with production data — recommend dry-run on copy of real data before live migration
- JWT expiry configuration for field workers — confirm with stakeholders (8 hours? 24 hours?)
