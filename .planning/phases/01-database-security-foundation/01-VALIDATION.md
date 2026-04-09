---
phase: 1
slug: database-security-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-09
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (browser-compatible, ESM-native) |
| **Config file** | vitest.config.js (Wave 0 installs) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --coverage` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --coverage`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFRA-05 | — | N/A | unit | `npx vitest run tests/modules.test.js` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | INFRA-01 | T-01-01 | RLS policies active on all tables | integration | `npx vitest run tests/schema.test.js` | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | AUTH-01 | T-01-02 | Auth rejects invalid credentials | integration | `npx vitest run tests/auth.test.js` | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 2 | AUTH-03 | T-01-03 | Admin sees all tenant data | integration | `npx vitest run tests/rls.test.js` | ❌ W0 | ⬜ pending |
| 01-03-03 | 03 | 2 | AUTH-04 | T-01-04 | Coordinator sees only assigned regions | integration | `npx vitest run tests/rls.test.js` | ❌ W0 | ⬜ pending |
| 01-03-04 | 03 | 2 | AUTH-08 | T-01-05 | Cross-tenant query returns empty | integration | `npx vitest run tests/rls.test.js` | ❌ W0 | ⬜ pending |
| 01-04-01 | 04 | 3 | INFRA-02 | — | N/A | integration | `npx vitest run tests/migration.test.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/modules.test.js` — stubs for INFRA-05 (module structure validation)
- [ ] `tests/schema.test.js` — stubs for INFRA-01 (Supabase schema validation)
- [ ] `tests/auth.test.js` — stubs for AUTH-01, AUTH-02, AUTH-06, AUTH-07
- [ ] `tests/rls.test.js` — stubs for AUTH-03, AUTH-04, AUTH-05, AUTH-08
- [ ] `tests/migration.test.js` — stubs for INFRA-02 (localStorage migration)
- [ ] `vitest.config.js` — Vitest configuration for ESM project
- [ ] `package.json` — devDependencies: vitest

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Login page visual matches dark theme | AUTH-01 | Visual regression | Open login.html, verify green/gold branding, dark background |
| Session persists across browser reload | AUTH-02 | Requires real browser | Login, reload page, verify still authenticated |
| Mobile responsive layout preserved | INFRA-05 | Visual regression | Open on mobile viewport, verify sidebar collapses |
| Environment variables not in source | INFRA-07 | Security audit | `grep -r "supabase" js/ --include="*.js"` — no hardcoded keys |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
