# Research Summary: CampanhaApp - Political Campaign Management Platform

**Project:** CampanhaApp for Neto Rodrigues - Deputado Distrital 2026
**Research Date:** 2026-04-09
**Overall Confidence:** HIGH

---

## Executive Summary

CampanhaApp is a Progressive Web App (PWA) for political campaign management in Brazil, evolved from a 2,474-line single-file HTML/CSS/JS prototype with localStorage persistence. This research synthesizes findings across technology stack, feature landscape, architecture patterns, and domain-specific pitfalls to inform roadmap development.

**The recommended approach** is an **offline-first, multi-tenant PWA** leveraging Supabase (PostgreSQL + Auth + Storage + Realtime) as the complete backend, avoiding custom server development. The architecture prioritizes **row-level security (RLS) for multi-tenant isolation**, **IndexedDB + Service Worker for offline field operations**, and **incremental migration** to minimize risk. The differentiator is **gamification for field workers** (XP, missions, rankings) combined with **offline QR-based lead capture** — features rare in political campaign tools but proven in nonprofit volunteer management.

**Key risks** center on RLS misconfiguration (tenant data leakage), offline sync conflicts, LGPD compliance for political opinion data, and TSE AI content disclosure requirements. These are manageable with proper RLS testing, conflict resolution UI, explicit consent flows, and AI disclosure checkboxes. The stack is mature (Supabase, Leaflet, Chart.js, native PWA APIs), well-documented, and proven at scale.

**Deployment timeline:** With existing prototype code and Supabase's built-in capabilities, a 4-phase rollout is feasible: Phase 1 (database migration + auth, 2 weeks), Phase 2 (offline PWA + photo upload, 2 weeks), Phase 3 (gamification + realtime, 2 weeks), Phase 4+ (multi-tenant SaaS, ongoing). This positions the MVP for Neto's 2026 campaign within 4-6 weeks, with commercial multi-tenant capabilities following.

---

## Key Findings

### From STACK.md (Technology)

**Core Backend: Supabase**
- **@supabase/supabase-js** provides Auth (JWT + RLS), PostgreSQL database, file storage, and realtime subscriptions out-of-the-box
- Free tier (500MB DB, 1GB storage, 50K auth users) sufficient for single campaign; Pro tier ($25/month) required for production multi-tenant
- RLS (Row Level Security) natively handles multi-tenant data isolation without middleware
- No custom backend needed — PostgREST auto-generates REST API from database schema

**Client Stack: Vanilla JavaScript + Modern Browser APIs**
- **No framework** (React/Vue/Angular) to preserve existing code and minimize learning curve
- **Native Service Worker API** for PWA offline support (defer Workbox to Phase 2+ if needed)
- **IndexedDB + idb wrapper** for offline data persistence and sync queue
- **Proxy API** for reactive state management (no Redux/MobX)
- **History API** for SPA routing (hash-based initially, path-based later)
- **Vite** as optional build tool (start with no build, add when complexity grows)

**Key Libraries:**
- **Leaflet.js 1.9.4** — Interactive maps for DF's 33 RAs (lightweight, mobile-friendly, no API keys)
- **Chart.js 4.5.1** — Poll results, campaign progress graphs (most popular, actively maintained)
- **qrcode 1.5.4** — QR code generation for lead capture (3.4M weekly npm downloads)
- **pdfmake** or **html2pdf.js** — PDF report generation (start with html2pdf for simplicity, migrate to pdfmake for advanced templates)
- **Day.js 1.11.x** — Date manipulation (2KB vs. Moment.js 67KB)
- **DOMPurify 3.x** — Sanitize user-generated HTML (XSS prevention)

**Hosting:**
- **Vercel** for frontend (zero-config, global CDN, preview deployments)
- **Supabase Cloud** for backend (managed database, free tier for development)
- Deploy via GitHub integration (git push → auto-deploy)

**What NOT to Use:**
- jQuery (legacy), Moment.js (deprecated), Lodash (native equivalents), Axios (native fetch), Socket.io (Supabase Realtime replaces), Firebase (avoid vendor lock-in), Express/Fastify (no custom backend needed), Tailwind CSS (keep existing styles)

**Confidence:** HIGH — All core dependencies are industry-standard, actively maintained, and well-documented. Medium confidence items (QR, PDF) have proven fallbacks.

---

### From FEATURES.md (Product)

**Table Stakes (Must-Have):**
1. Contact/voter database with CRM functionality
2. Role-based access control (admin/coordinator/field_worker)
3. Mobile-responsive interface (66% of Brazilians use mobile-first)
4. Event calendar/agenda
5. Team/volunteer management
6. Activity dashboard with key metrics
7. Contact segmentation/filtering
8. Basic reporting and data export
9. **WhatsApp integration** (90% of Brazilian internet users) — minimum: wa.me links for direct messaging
10. User authentication (email/password)
11. Field worker check-in (GPS-tagged activity logging)

**Differentiators (Competitive Advantage):**
1. **Gamification system** (XP/missions/ranking/streaks/trophies) — **STRONG DIFFERENTIATOR**, rare in political platforms, proven 30% engagement increase in nonprofits
2. **QR code lead capture** — Field workers show QR, supporters scan and self-register (faster, more accurate than manual entry)
3. **Photo proof of activity** — Upload geo-tagged photos as verification (accountability for field work)
4. **Offline-first PWA** — Service workers + IndexedDB for unstable 3G/4G in field
5. **Interactive territory maps** — Leaflet with markers for leaders, color-coded RAs for coverage visualization
6. **Multi-tenant white label** — Sell to other candidates with isolated data and custom branding
7. **Lead source tracking** — Track origin (QR code, event, referral) to optimize outreach
8. **Community demand tracking** — Residents report issues, campaign tracks resolution (grassroots credibility)
9. **Real-time activity feed** — See team actions as they happen ("João cadastrou apoiador")
10. **PDF report generation** — Professional summaries for candidate review

**Anti-Features (Explicitly NOT Building):**
- Native mobile apps (use PWA instead)
- Direct WhatsApp Business API integration (use wa.me links instead)
- Built-in payment/billing system (manual contracts, external payment)
- AI chatbot (focus on clear UI)
- Live streaming video (link to Instagram Live/YouTube)
- Email marketing platform (integrate with Mailchimp/SendGrid)
- Voter file database (campaigns import their own lists)
- SMS messaging (WhatsApp dominates in Brazil)
- TSE/FEC compliance reporting (campaigns use lawyers/accountants)
- Social media posting (provide templates, let users post manually)
- Blockchain/NFT anything (no proven use case)

**Brazilian Campaign Context:**
- **WhatsApp dominance** (90% of internet users) — primary communication channel
- **Mobile-first usage** (66% access internet via mobile)
- **Connectivity challenges** — Offline mode essential for field work in peripheral areas
- **Personal relationship culture** — Gamification aligns with Brazilian engagement patterns
- **Community demands tracking** — Aligns with "politics of proximity" in local campaigns

**Confidence:** MEDIUM — Global platforms well-researched (NationBuilder, NGP VAN), Brazilian tools less documented (ELEGIS, LideraAI). Gamification gap confirmed by nonprofit research showing 30% engagement boost.

---

### From ARCHITECTURE.md (Technical Design)

**Three-Tier Architecture:**

1. **Client Layer (PWA)** — Offline-first JavaScript modules with IndexedDB cache and service worker
2. **API Layer (Supabase)** — Auto-generated REST/GraphQL APIs + Edge Functions for custom logic
3. **Data Layer (PostgreSQL)** — Multi-tenant schema with RLS policies enforcing access control

**Key Data Flow Patterns:**

**Authentication & Authorization:**
1. User login → Supabase Auth validates → Custom Access Token Hook injects tenant_id/role into JWT
2. Client stores JWT in memory (not localStorage)
3. All API requests include JWT → RLS policies automatically filter queries
4. Defense-in-depth: Security at database layer, not application layer

**Offline-First CRUD:**
1. User submits form → Client writes to IndexedDB with status 'pending_sync'
2. Client shows success UI (optimistic update)
3. Service Worker queues operation → Background Sync API retries until success
4. Conflict detection via timestamps → Show resolution UI if server version newer

**Realtime Updates (Selective Use):**
- **YES:** Rankings/leaderboards, new lead notifications, live event updates
- **NO:** Bulk operations, historical queries (use polling instead)
- **Recommendation:** Start with polling (30-60s) in Phase 1, add Realtime in Phase 3 for high-value features only

**Anti-Patterns to Avoid:**
1. **Building custom backend** — Use PostgREST directly, Edge Functions only for truly custom logic
2. **localStorage for multi-user data** — PostgreSQL as source of truth, IndexedDB for offline cache only
3. **Client-side access control** — Always enforce at database layer via RLS, UI hiding is UX not security
4. **Overusing Realtime subscriptions** — Polling is sufficient for most features
5. **Storing secrets in client code** — Third-party API keys always in Edge Functions

**Scalability Considerations:**

**At 1-10 users (Phase 1):** Simplicity over optimization, free tier sufficient
**At 100 users (Phase 2):** Add indexes, optimize queries, consider Pro plan for storage
**At 1,000+ users (Phase 3):** Connection pooling (Supavisor), CDN caching, materialized views for leaderboards

**Confidence:** HIGH — Architecture leverages Supabase built-in capabilities to avoid custom backend complexity. Offline-first patterns well-documented. RLS proven for multi-tenancy.

---

### From PITFALLS.md (Domain-Specific Risks)

**Critical Pitfalls (Catastrophic if not addressed):**

**1. Tenant Data Leakage via RLS Misconfiguration**
- **Risk:** Campaign A sees data from Campaign B (privacy breach, LGPD violation, TSE compliance failure)
- **Prevention:** Enable RLS on ALL tables, write policies with WITH CHECK clause, index policy columns, test via client SDK not SQL Editor, audit cross-tenant queries before launch
- **Phase:** Phase 1 (database migration) — RLS policies must be tested BEFORE migrating production data

**2. localStorage Migration Data Loss**
- **Risk:** Campaign data (2,474 lines of work) lost or corrupted during migration to Supabase
- **Prevention:** Export localStorage backup before migration, validate data pre-migration, idempotent migration with upsert, batch migration with progress tracking, preserve localStorage until confirmed
- **Phase:** Phase 1 (database migration) — Migration script with validation, backup enforcement, rollback capability

**3. LGPD Non-Compliance for Political Opinion Data**
- **Risk:** ANPD fines (2% of revenue or R$50 million), campaign disqualification, negative press
- **Prevention:** Explicit consent flow on QR forms, classify data fields by sensitivity, implement data subject rights (access/correction/deletion), documented legal basis, retention limits (180 days post-election), privacy policy in Portuguese
- **Phase:** Phase 1 (data model), Phase 2 (consent UI), Phase 3 (data subject rights endpoints)

**4. TSE AI Compliance Violations**
- **Risk:** TSE Resolution 23.748/2026 mandates AI disclosure for electoral content; undisclosed deepfakes = penalties, campaign disqualification
- **Prevention:** AI content detection on upload, mandatory disclosure checkbox, blackout period enforcement (72h before election), user reporting mechanism, content moderation queue
- **Phase:** Phase 2 (photo upload), Phase 3 (moderation system)

**5. PWA Offline Sync Conflict Hell**
- **Risk:** Two field workers edit same lead offline → data loss, duplicate records, gamification score disputes
- **Prevention:** Timestamp-based conflict detection, operational transformation for scores (store operations not final values), user-facing conflict resolution UI, ordered mutation queue, CRDT for gamification
- **Phase:** Phase 2 (offline sync) — Conflict detection, mutation queue, timestamp tracking

**Moderate Pitfalls (Frustration, performance degradation):**

**6. Supabase Free Tier Auto-Pause**
- **Risk:** Project pauses after 7 days of low activity, app down during critical campaign moment
- **Prevention:** Budget Pro tier ($25/month) from day 1, monitor usage, synthetic ping if staying on free tier
- **Phase:** Phase 0 (budget planning), Phase 1 (monitoring setup)

**7. Photo Upload Crushing Low-End Phones**
- **Risk:** 12 MP photos (5 MB) timeout on 3G, fill phone storage, crash app
- **Prevention:** Client-side compression before upload (resize to 1024px, 80% JPEG quality), chunked/resumable uploads, upload progress indicator, offline queue for uploads
- **Phase:** Phase 2 (photo upload) — Compression, resumable uploads, progress UI

**8. Service Worker Cache Zombie State**
- **Risk:** Users stuck on old broken version for days after bug fix deployed because service worker cached it
- **Prevention:** Call skipWaiting() on install, prompt user to refresh when update available, network-first for HTML, version cache names, test update flow before launch
- **Phase:** Phase 2 (PWA implementation) — Update strategy, cache versioning, skipWaiting logic

**9. Session Expiry Mid-Field Work**
- **Risk:** Cabo eleitoral works offline for 3 hours, JWT expires (1 hour default), forced re-login, offline data not synced
- **Prevention:** Extend JWT expiry to 8-24 hours for field workers, background token refresh while online, graceful re-auth on sync failure
- **Phase:** Phase 2 (authentication/offline sync) — Token refresh logic, expiry configuration

**10. Leaderboard Query Performance Collapse at Scale**
- **Risk:** Gamification works with 10 users, times out at 1,000 users (app unusable)
- **Prevention:** Pre-compute leaderboard (materialized view or separate table), index score columns, paginate leaderboard, cache leaderboard (update every 5 minutes), partition by region
- **Phase:** Phase 3 (gamification at scale) — Pre-computation, caching, indexing strategy

**Confidence:** HIGH for technical pitfalls (well-documented in Supabase/PWA communities), MEDIUM for Brazilian legal/compliance (TSE/LGPD requirements clear but enforcement patterns evolving).

---

## Implications for Roadmap

Based on combined research, the roadmap should follow a **risk-weighted, dependency-driven phase structure** prioritizing security and data integrity (RLS, LGPD) before feature expansion.

### Recommended Phase Structure (6 Phases)

**Phase 1: Secure Foundation (2 weeks) — CRITICAL PATH**

**Rationale:** Establish multi-tenant security and migrate existing data without loss before adding features. RLS misconfiguration and data loss are catastrophic, non-recoverable risks.

**Deliverables:**
- PostgreSQL schema with tenant_id on every table
- RLS policies with WITH CHECK clauses (tenant isolation + basic role permissions)
- Indexes on tenant_id, region_id, user_id
- Supabase Auth integration (email/password, JWT with custom claims)
- Data migration script (localStorage → Supabase) with validation, backup enforcement, rollback
- Client refactor: replace localStorage.getItem/setItem with Supabase client calls (keep existing UI structure)
- LGPD data model (consent tracking, sensitivity flags)

**Features from FEATURES.md:**
- User authentication (email/password)
- Contact database with basic CRUD
- Role-based access control (admin/coordinator/field_worker)
- Team management
- WhatsApp integration (wa.me links)

**Pitfalls Addressed:**
- #1 Tenant data leakage (RLS policies with tests)
- #2 localStorage migration data loss (backup, validation, rollback)
- #3 LGPD compliance (data model for consent tracking)
- #13 Prototype code to production (initial modularization)

**Research Flags:** None — foundational patterns well-documented in Supabase official docs.

**Success Criteria:**
- User can log in and see only their tenant's data
- Cross-tenant query test returns empty results
- localStorage migration completes with zero data loss
- RLS performance <100ms per query (indexed columns)

---

**Phase 2: Field Operations (2 weeks) — HIGH VALUE**

**Rationale:** Field workers (cabos eleitorais) are primary users. Offline mode, QR capture, and photo verification directly address their pain points (connectivity, speed, accountability). These are the differentiators vs. competitors.

**Deliverables:**
- Service Worker + Cache API (cache-first for assets, network-first for API)
- IndexedDB schema mirroring PostgreSQL
- Sync queue with Background Sync API
- Conflict detection via timestamps (show resolution UI)
- QR code generation (coordinator view) + lead capture form (public, no auth)
- HMAC signature validation for QR URLs
- Supabase Storage integration (activity-photos bucket with RLS)
- Client-side image compression before upload
- Photo upload UI with progress indicator
- GPS-tagged check-ins
- Territory maps with Leaflet (RA boundaries, leader markers)
- LGPD consent flow on QR form (checkbox + privacy policy link)
- TSE AI disclosure checkbox on photo upload

**Features from FEATURES.md:**
- QR code lead capture
- PWA installation (Add to Home Screen)
- Offline mode with sync
- Photo upload
- GPS-tagged check-ins
- Territory maps with leader visualization
- Lead source tracking

**Pitfalls Addressed:**
- #3 LGPD compliance (explicit consent UI)
- #4 TSE AI compliance (disclosure checkbox)
- #5 PWA offline sync conflicts (timestamp detection, resolution UI)
- #7 Photo upload crushing low-end phones (compression, resumable uploads)
- #8 Service worker cache zombie (skipWaiting, update strategy)
- #9 Session expiry mid-field work (extend JWT, background refresh)
- #11 QR code phishing (URL preview, branded QR)
- #12 RA boundary mapping errors (GeoJSON, GPS detection)

**Research Flags:**
- **Phase 2 Research:** How to handle sync conflicts when multiple users edit same record offline? (Start with last-write-wins + timestamp warnings, add conflict UI if users report issues)

**Success Criteria:**
- Field worker can capture leads offline, syncs when online
- Photo uploads work with automatic compression (5MB → 500KB)
- QR code flow tested end-to-end (coordinator generates, supporter scans, lead created, XP awarded)
- PWA installs on Android/iOS home screen
- Offline queue processes pending operations on reconnect

---

**Phase 3: Engagement & Intelligence (2 weeks) — COMPETITIVE ADVANTAGE**

**Rationale:** Gamification is the strongest differentiator. Proven 30% engagement boost in nonprofits, rare in political platforms. This phase transforms volunteer participation from obligation to game.

**Deliverables:**
- Gamification database schema (xp, level, missions, trophies, streaks)
- XP award system (database function triggered on activity completion)
- Mission system (daily/weekly tasks with XP rewards)
- Leaderboard with pre-computed rankings (materialized view updated on score change)
- Streak tracking (consecutive days of activity)
- Trophy/achievement system (unlock badges for milestones)
- Real-time activity feed (Supabase Realtime subscriptions to activity table)
- Push notifications (PWA Notification API for new missions, ranking updates)
- PDF report generation (html2pdf.js for dashboard snapshots)
- Enhanced maps (demand visualization, color-coded coverage)
- Analytics dashboard for coordinators (charts via Chart.js)
- Regional scoping RLS policies (coordinators see only assigned regions)

**Features from FEATURES.md:**
- Gamification system (XP, missions, ranking, streaks, trophies)
- Real-time activity feed
- Push notifications
- PDF report generation
- Enhanced maps with demand visualization
- Analytics dashboard for coordinators

**Pitfalls Addressed:**
- #10 Leaderboard performance collapse (pre-computation, caching, indexing)

**Research Flags:**
- **Phase 3 Research:** What's the optimal Realtime subscription pattern for 100+ concurrent users watching leaderboards? (Test with simulated load, start with polling, migrate to Realtime if needed)

**Success Criteria:**
- Gamification scores update correctly after offline sync
- Leaderboard loads in <1 second with 100 users
- Real-time activity feed shows new actions within 5 seconds
- Push notifications delivered on mission completion
- PDF reports generated with charts and data

---

**Phase 4: Multi-Tenant SaaS Hardening (2 weeks) — COMMERCIAL READINESS**

**Rationale:** Enables business model (sell to other candidates). Requires security hardening, LGPD/TSE compliance, and tenant isolation validation.

**Deliverables:**
- Tenant management UI (admin creates new campaigns)
- White label customization (colors, logos, candidate name per tenant)
- Regional configuration (custom RAs/cities per tenant)
- Tenant signup flow (public form, automated provisioning via Edge Function)
- Data subject rights endpoints (LGPD access/correction/deletion requests)
- Retention automation (auto-delete voter data 180 days post-election)
- AI content moderation queue (admin approval before materials go public)
- Blackout period enforcement (block candidate voice/image uploads 72h before election)
- User reporting mechanism (flag suspected AI content)
- Cross-tenant access audit tooling
- Connection pool session reset (prevent tenant context leaks)
- Pro tier upgrade (budget $25/month, monitoring alerts)

**Features from FEATURES.md:**
- Multi-tenant data isolation (Supabase RLS)
- White label customization
- Tenant onboarding flow
- Regional configuration per tenant
- Admin panel for tenant management

**Pitfalls Addressed:**
- #1 Tenant data leakage (cross-tenant audit, connection pool reset)
- #3 LGPD compliance (data subject rights, retention automation)
- #4 TSE AI compliance (moderation queue, blackout enforcement)
- #6 Supabase free tier auto-pause (Pro tier upgrade)

**Research Flags:**
- **Phase 5 Research:** Should multi-tenant architecture use RLS (shared tables) or separate schemas per tenant? (Use RLS for MVP, consider separate schemas if single tenant exceeds 1M rows)

**Success Criteria:**
- New tenant can sign up and get isolated instance
- Cross-tenant query audit shows zero leakage
- Data subject access request fulfilled within 24 hours
- AI content blocked during blackout period
- Pro tier monitoring alerts configured

---

**Phase 5: Production Polish (1 week) — LAUNCH READINESS**

**Rationale:** Final UX polish, performance optimization, monitoring, and deployment automation before public launch.

**Deliverables:**
- ES6 module organization (split monolithic HTML into feature modules)
- Dynamic imports for code splitting
- Vite integration for production builds (minification, tree-shaking)
- PWA manifest polish (icons, splash screens, theme colors)
- Install prompt UI with dismissal tracking
- Offline fallback page with branding
- Periodic background sync (update data every hour when app closed)
- Performance monitoring (Sentry or similar for error tracking)
- Usage analytics (privacy-respecting, LGPD-compliant)
- Deployment pipeline (GitHub Actions → Vercel, Supabase migrations)
- Staging environment for pre-launch testing
- User documentation (in Portuguese)

**Features from FEATURES.md:**
- Progressive Web App installation
- Offline fallback page
- Performance monitoring

**Pitfalls Addressed:**
- #8 Service worker cache zombie (update flow tested, skipWaiting validated)
- #13 Prototype code to production (module refactor complete)

**Research Flags:** None — standard deployment practices.

**Success Criteria:**
- App loads in <2 seconds on 3G
- Error tracking captures and reports bugs
- Deployment pipeline runs end-to-end (commit → staging → production)
- User documentation covers all core workflows

---

**Phase 6: Post-Launch Iteration (Ongoing)**

**Rationale:** Respond to user feedback, add deferred features, optimize based on real usage data.

**Deferred Features:**
- Advanced analytics and predictive modeling
- Integration with external CRMs (Salesforce, HubSpot)
- Email marketing integration (Mailchimp, SendGrid)
- Live event RSVP tracking
- Poll tracking with trend visualization
- Campaign materials inventory management
- Political mapping (allies/adversaries directory)
- Community demand resolution workflow

**Research Flags:**
- Monitor leaderboard performance at scale (migrate to CRDT if needed)
- Evaluate need for separate schemas if RLS performance degrades
- Explore Workbox for advanced service worker features (background sync patterns)

---

### Phase Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Field Operations) — requires Phase 1 auth & database
    ↓
Phase 3 (Engagement) — requires Phase 2 offline sync for gamification
    ↓
Phase 4 (Multi-Tenant) — requires Phase 1-3 features stable
    ↓
Phase 5 (Production Polish) — requires Phase 4 security hardened
    ↓
Phase 6 (Post-Launch) — ongoing
```

**Critical Path:** Phase 1 → Phase 2 → Phase 5 (Minimum for Neto 2026 campaign launch)

**Commercial Path:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 (Multi-tenant SaaS ready)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack** | HIGH | Supabase, Leaflet, Chart.js are mature, actively maintained, well-documented. Medium confidence on QR/PDF library versions (verify latest during Phase 1). |
| **Features** | MEDIUM | Global platforms (NationBuilder, NGP VAN) well-researched. Brazilian tools less documented. Gamification gap confirmed by nonprofit research (30% engagement boost). |
| **Architecture** | HIGH | Offline-first PWA patterns proven in production apps. Supabase RLS multi-tenancy documented with examples. RLS performance depends on proper indexing. |
| **Pitfalls** | HIGH (technical), MEDIUM (legal) | Technical pitfalls (RLS, offline sync, PWA caching) well-documented in Supabase/PWA communities. LGPD/TSE requirements clear but enforcement patterns evolving. |

**Overall Confidence: HIGH**

The recommended stack (Supabase + vanilla JS + PWA) is proven at scale. The architecture leverages built-in capabilities to minimize custom development. The risks are known and manageable with proper testing (RLS policies, offline sync conflicts). The Brazilian legal context (LGPD, TSE AI disclosure) requires explicit design choices but is well-defined.

**Gaps to Address:**

1. **QR Code Scanning (Reading):** Recommended `qrcode` library for generation, but scanning needs separate library or native `BarcodeDetector` API. Research browser support for BarcodeDetector in Safari (iOS field workers). **Workaround:** Start with generate-only QR codes in Phase 2, add scanning in Phase 6 if needed.

2. **Supabase Storage Image Resizing:** Available on Pro plan ($25/month). If staying on free tier, client-side resize strategy needed. **Decision:** Budget Pro tier from Phase 1 to avoid this complexity.

3. **Multi-Tenant JWT Claims:** How to inject `tenant_id` into Supabase JWT for RLS? **Solution:** Use Custom Access Token Hook (Edge Function) documented in Supabase Auth hooks.

4. **Offline Queue Reliability:** Service Worker can cache reads, but what about offline writes (create leader while offline)? **Solution:** Background Sync API + IndexedDB queue pattern, documented in PWA offline-first guides.

5. **PDF Bundle Size:** pdfmake is ~150KB gzipped. **Decision:** Start with html2pdf.js in Phase 3 (lighter), migrate to pdfmake in Phase 6 if custom templates needed.

6. **Gamification Real-time Updates:** How to show live leaderboard updates across users without crushing performance? **Solution:** Pre-computed leaderboard (materialized view) + polling in Phase 3, migrate to Realtime subscriptions in Phase 6 if demand warrants.

---

## Research Flags for Phase Planning

**Phases That Need Deeper Research:**

- **Phase 2 (Offline Sync):** Conflict resolution UI patterns, operational transformation for gamification scores
- **Phase 3 (Gamification):** Realtime subscription patterns at scale (100+ concurrent users), CRDT exploration for scores
- **Phase 5 (Multi-Tenant Scale):** RLS performance vs. separate schemas decision criteria (when to migrate)

**Phases With Well-Documented Patterns (Skip Research):**

- **Phase 1 (Database Migration):** Supabase RLS official docs, localStorage migration standard patterns
- **Phase 2 (PWA Basics):** Service Worker API, Cache API, IndexedDB all W3C standards with extensive MDN docs
- **Phase 3 (Charts/PDF):** Chart.js and html2pdf.js have comprehensive documentation and examples
- **Phase 4 (Auth/Security):** Supabase Auth hooks, RLS policies, LGPD compliance checklists all documented

---

## Sources Summary

**High-Confidence Sources (Official Documentation):**
- Supabase official docs (Auth, RLS, Storage, Realtime, Edge Functions)
- MDN Web Docs (Service Workers, PWA, IndexedDB, History API)
- W3C standards (PWA manifest, Cache API, Background Sync)
- TSE official site (AI disclosure requirements, election calendar)
- ANPD official site (LGPD compliance requirements)

**Medium-Confidence Sources (Technical Blogs, Recent 2026):**
- Valtorian.com (Supabase MVP architecture patterns)
- AntStack (multi-tenant RLS implementations)
- ZenStack (modern web architecture without backend)
- Medium articles (offline-first PWA patterns, state management)

**Implementation References (GitHub, Open Source):**
- Supabase community examples (custom claims, RLS policies)
- PWA QR code scanner (Minishlink/pwa-qr-code-scanner)
- MDN js13kGames PWA tutorial (app structure patterns)

**Brazilian Legal/Political Context:**
- LGPD compliance guides (SecurePrivacy, Captain Compliance)
- TSE Resolution 23.748/2026 analysis (Barbieri Advogados)
- Brazilian political campaign software reviews (Opus Pesquisa, LideraAI)

**Competitive Analysis:**
- NationBuilder, NGP VAN (US platforms)
- ELEGIS, LideraAI, Participa+ (Brazilian platforms)
- Gamification research (VolunteerHub, DonorNation)

---

## Ready for Roadmap Definition

This synthesis provides sufficient detail for the roadmapper agent to structure a 6-phase development plan with:

1. **Clear phase objectives** (security first, then field operations, then engagement)
2. **Feature-to-phase mapping** (from FEATURES.md)
3. **Architecture component sequencing** (from ARCHITECTURE.md)
4. **Risk mitigation prioritization** (from PITFALLS.md)
5. **Technology validation criteria** (from STACK.md)

**Key Recommendations for Roadmapper:**

- **Do not defer RLS policies** — Must be in Phase 1 before any multi-user features
- **Do not defer offline sync** — Core value proposition for field workers, must be in Phase 2
- **Do not defer LGPD consent** — Legal requirement, must be in Phase 2 (QR form launch)
- **Do defer Realtime subscriptions** — Polling is sufficient for MVP, add in Phase 3 only for leaderboards
- **Do defer multi-tenant SaaS** — Neto 2026 campaign can launch on Phase 1-2-5 path, commercial features are Phase 4

**Timeline Estimate:**
- **Minimum Viable Campaign (Neto 2026):** Phase 1 (2w) + Phase 2 (2w) + Phase 5 (1w) = **5 weeks**
- **Commercial Multi-Tenant SaaS:** Phase 1 (2w) + Phase 2 (2w) + Phase 3 (2w) + Phase 4 (2w) + Phase 5 (1w) = **9 weeks**

**Budget Planning:**
- Supabase Pro tier: $25/month (required from Phase 1)
- Vercel Pro tier: $20/month (optional, free tier likely sufficient for MVP)
- Domain registration: ~$15/year (neto2026.com.br)
- Total recurring: **$25-45/month** for production deployment

---

**END OF SUMMARY**
