# Phase 1: Database & Security Foundation - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate the existing 2,474-line single-file localStorage prototype (`index.html`) to a Supabase-powered backend with PostgreSQL database, secure authentication (3 access levels), Row Level Security for multi-tenant data isolation, and modularized code structure. After this phase, the app has real persistence, multi-user auth, and clean code organization — but all existing UI modules still function identically.

</domain>

<decisions>
## Implementation Decisions

### Code Modularization Strategy
- **D-01:** Split monolithic `index.html` into ES Modules using native `import/export` (no build tool initially). Structure: `index.html` (shell + CSS link), `css/styles.css` (all CSS), `js/app.js` (entry point), `js/router.js` (navigation/showPage), `js/supabase.js` (client init), `js/auth.js` (login/session/roles), `js/data.js` (CRUD operations replacing localStorage), and one `js/modules/<page>.js` per page (dashboard, cidades, agenda, pessoas, lideres, quemequem, demandas, pesquisas, materiais, gamificacao).
- **D-02:** Keep Vite as optional — only introduce if ES module imports from CDN become unwieldy. For Phase 1, use native ESM with `<script type="module">`.
- **D-03:** Extract the 33 RAs do DF and other constants into `js/constants.js`.
- **D-04:** Preserve all existing CSS variables, animations, and dark theme exactly as-is during modularization — visual identity must not change.

### Authentication Flow
- **D-05:** Dedicated login page (`login.html` or login view within the SPA) — not a modal overlay. User sees login form before any app content.
- **D-06:** Supabase Auth with email/password (email field used as username — Supabase requires email format, so use `username@campanha.app` convention or actual emails).
- **D-07:** Session persists via Supabase's built-in session management (JWT in localStorage managed by supabase-js). On page reload, `supabase.auth.getSession()` restores the session.
- **D-08:** Role stored in `user_metadata` or a `profiles` table: `admin`, `coordenador`, `cabo_eleitoral`. RLS policies reference the role.
- **D-09:** Auto-redirect to login when session expires (AUTH-07). Use `supabase.auth.onAuthStateChange()` listener.
- **D-10:** Password change accessible from a settings/profile section for logged-in users (AUTH-06).

### Database Schema Approach
- **D-11:** Fully normalized PostgreSQL schema — one table per data entity: `profiles`, `eventos`, `pessoas`, `lideres`, `quem_e_quem`, `demandas`, `pesquisas`, `materiais`, `gamificacao_xp`, `tarefas_game`, `visitas`, `atividades`, `streaks`, `trofeus`.
- **D-12:** Every table includes `tenant_id` column for multi-tenant isolation (Phase 7 ready) and `created_by` / `updated_at` columns for audit.
- **D-13:** RLS policies on ALL tables: admin sees all data for their tenant, coordenador sees data for their assigned regions, cabo_eleitoral sees only their own records plus public data.
- **D-14:** `tenant_id` defaults to a single tenant for Neto's campaign in v1. Multi-tenant activation happens in Phase 7 but the schema supports it from day one.
- **D-15:** Use Supabase's `auth.uid()` and custom claims (via `profiles` table join or JWT claims) in RLS policies.

### Data Migration Strategy
- **D-16:** Admin import tool in the app — admin can upload the JSON backup (same format as existing `exportData()`) and a migration function maps it to Supabase tables.
- **D-17:** Preserve the existing export/import JSON functionality as a fallback, but primary data flow moves to Supabase CRUD.
- **D-18:** Migration is one-time: after successful import, localStorage data is no longer the source of truth. Show a banner prompting migration if localStorage data is detected but Supabase tables are empty.

### Claude's Discretion
- Table column types, indexes, and constraints — optimize for the query patterns needed in Phase 2
- RLS policy syntax and optimization — follow Supabase best practices
- File naming conventions within the `js/modules/` directory
- Error handling patterns for Supabase operations (toast notifications vs inline errors)
- Login page visual design — match existing dark theme with green/gold identity

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value, constraints, existing system description, CONECTA reference
- `.planning/REQUIREMENTS.md` — Full 92 requirements list, Phase 1 covers INFRA-01, INFRA-02, INFRA-05, INFRA-07, AUTH-01 through AUTH-08
- `.planning/ROADMAP.md` — Phase 1 success criteria and dependency chain
- `.planning/STATE.md` — Current progress state and key decisions log

### Research
- `.planning/research/STACK.md` — Technology choices: Supabase client, ESM modules, native routing, Proxy state management
- `.planning/research/ARCHITECTURE.md` — Offline-first PWA architecture, RLS multi-tenant, 5 components
- `.planning/research/PITFALLS.md` — 13 risks including RLS misconfiguration, LGPD, offline sync
- `.planning/research/SUMMARY.md` — Timeline, critical path, risk summary

### Existing Code
- `index.html` — The 2,474-line monolithic prototype to be modularized. Contains all CSS (lines 8-1600), HTML (lines 1000-1600), and JS (lines 1603-2474)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **CSS design system** (lines 8-1600): Complete dark theme with CSS variables (`--bg`, `--green`, `--gold`, etc.), animations (`fadeIn`, `pulse`, `glow`, `confetti`), responsive sidebar, header, cards, modals, forms, buttons. Extract as-is to `css/styles.css`.
- **33 RAs do DF array** (line 1644-1652): `REGIOES_DF` constant — extract to `js/constants.js`.
- **Page routing system** (lines 1682-1706): `showPage()`, `renderPage()`, `PAGE_TITLES` — extract to `js/router.js`.
- **Utility functions** (lines 1709-1719): `escapeHtml()`, `formatDate()`, `timeAgo()`, `openModal()`, `closeModal()` — extract to `js/utils.js`.
- **Gamification engine** (lines 1734-2440): XP levels, trophies, streaks, daily missions — extract to `js/modules/gamificacao.js`. Complex logic, handle with care during modularization.
- **Export/Import** (lines 2443-2465): JSON backup system — reuse as migration bridge.

### Established Patterns
- **SPA routing**: Hash-less, function-based (`showPage('dashboard')` toggles `.page.active` class). No browser History API used.
- **Data layer**: Single `data` object loaded from localStorage, mutated in place, saved after each operation via `saveData()`.
- **Rendering**: Each page has a `render<Page>()` function that rebuilds innerHTML. No virtual DOM, no diffing.
- **IDs**: Sequential integer IDs via `gerarId()` — will need mapping to Supabase UUIDs.
- **Modals**: Generic `openModal(id)` / `closeModal(id)` pattern used across all pages.

### Integration Points
- **Data layer replacement**: `loadData()` and `saveData()` are the two functions to replace with Supabase calls. Every `render*()` function reads from the global `data` object.
- **Navigation**: `showPage()` is the single entry point for all page transitions.
- **Activity feed**: `addAtividade()` logs actions — will become Supabase inserts in `atividades` table.

</code_context>

<specifics>
## Specific Ideas

- Login page should match the existing dark theme with the candidate's photo and green/gold branding (same as sidebar brand section)
- The `neto_campanha_2026` localStorage key and its JSON structure serve as the migration source format
- Supabase client loaded via CDN (`<script>` tag) initially, not npm — keeps no-build-tool approach
- All 10 existing pages (dashboard, cidades, agenda, pessoas, lideres, quemequem, demandas, pesquisas, materiais, gamificacao) must continue working identically after modularization — zero visual regression

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-database-security-foundation*
*Context gathered: 2026-04-09*
