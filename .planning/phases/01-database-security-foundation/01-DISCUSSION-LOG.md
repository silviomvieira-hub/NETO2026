# Phase 1: Database & Security Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-09
**Phase:** 01-database-security-foundation
**Areas discussed:** Modularization strategy, Authentication flow, Database schema, Data migration
**Mode:** --auto (all choices auto-selected as recommended defaults)

---

## Modularization Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| ES Modules nativos | Split into native `import/export` modules, no build tool. Browser-supported, aligns with STACK.md. | ✓ |
| Vite bundler | Use Vite from the start for dev server + bundling. Better DX but adds build complexity. | |
| Script concatenation | Simple file splitting with manual `<script>` tag ordering. No module system. | |

**User's choice:** ES Modules nativos (auto-selected recommended)
**Notes:** STACK.md recommends "no build initially" with Vite as optional later. Native ESM is supported by all target browsers (Chrome 90+, Safari 14+). Keeps zero-dependency approach.

---

## Authentication Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Pagina dedicada de login | Separate login page/view, user sees login before any app content. Clean redirect flow. | ✓ |
| Modal overlay | Login modal on top of the existing app shell. Lighter but session redirect is awkward. | |
| Inline auth form | Auth form embedded in sidebar or header. Minimal disruption but limited space. | |

**User's choice:** Pagina dedicada de login (auto-selected recommended)
**Notes:** Dedicated login page provides clear separation between authenticated and unauthenticated states. Works naturally with AUTH-07 (auto-redirect when session expires). Supabase Auth with email/password chosen per STACK.md.

---

## Database Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Totalmente normalizado | One table per entity, foreign keys, proper relational design. Enables RLS per table. | ✓ |
| Semi-flat | One table per data array from localStorage JSON. Simpler but limited query power. | |
| Hybrid | Normalize core entities, keep JSONB for complex nested data (gamificacao, streaks). | |

**User's choice:** Totalmente normalizado (auto-selected recommended)
**Notes:** Full normalization enables proper RLS policies per table (critical for AUTH-03/04/05), supports complex queries needed in Phase 2 (dashboard stats, filters, joins), and follows PostgreSQL best practices. Multi-tenant `tenant_id` column on every table prepares for Phase 7.

---

## Data Migration

| Option | Description | Selected |
|--------|-------------|----------|
| Admin import tool | Upload existing JSON backup via admin UI, migration function maps to Supabase tables. | ✓ |
| Automatic on first login | Detect localStorage data on login, auto-migrate to Supabase. Transparent to user. | |
| Manual SQL scripts | Admin runs SQL migration scripts outside the app. Technical, not user-friendly. | |

**User's choice:** Admin import tool (auto-selected recommended)
**Notes:** Preserves the existing export/import pattern (exportData/handleImport functions at lines 2443-2465). Admin has control over when migration happens. One-time operation with clear feedback.

---

## Claude's Discretion

- Table column types, indexes, constraints
- RLS policy syntax and optimization
- File naming conventions within js/modules/
- Error handling patterns (toast vs inline)
- Login page visual design (matching dark theme)

## Deferred Ideas

None — discussion stayed within phase scope
