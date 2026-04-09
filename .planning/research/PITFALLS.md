# Domain Pitfalls

**Domain:** Political Campaign Management Platform (Brazil)
**Researched:** 2026-04-09
**Confidence:** HIGH for technical pitfalls, MEDIUM for Brazilian legal/compliance

## Critical Pitfalls

Mistakes that cause rewrites, data loss, or legal consequences.

---

### Pitfall 1: Tenant Data Leakage via RLS Misconfiguration

**What goes wrong:**
Multi-tenant campaign data becomes visible across candidates. A coordenador from Candidate A sees leads, team members, or strategy from Candidate B. This destroys trust and may violate election law (information sharing between campaigns).

**Why it happens:**
- **RLS disabled by default** — Supabase tables ship with RLS OFF. If you forget to enable it on even one table, entire database is exposed.
- **RLS enabled but no policies** — You enable RLS thinking "I protected it" but with zero policies, default is deny-all. App appears broken (empty results, no errors).
- **Missing WHERE checks in policies** — Policy like `USING (true)` or missing `WITH CHECK` clause allows users to insert/update with ANY `campaign_id`, stealing ownership.
- **Connection pooling context leaks** — Without `DISCARD ALL` on connection return, previous tenant's `campaign_id` session variable bleeds into next request.
- **SQL Editor testing** — You test in Supabase SQL Editor, see expected results (because postgres superuser bypasses RLS), deploy to production, users see nothing or everything.

**Consequences:**
- Catastrophic privacy breach
- LGPD violations (personal voter data exposed)
- TSE compliance failure (potential campaign coordination evidence)
- Loss of all client trust, immediate cancellation
- Potential legal liability

**Prevention:**
1. **Enable RLS on ALL tables at creation** — Make it a checklist item, not optional
2. **Write policies WITH CHECK clause** — Every INSERT/UPDATE policy must specify `WITH CHECK (campaign_id = auth.jwt() ->> 'campaign_id')` to prevent ownership hijacking
3. **Index policy filter columns** — `CREATE INDEX idx_campaign_id ON table(campaign_id)` prevents sequential scans on every RLS check (50ms → 2ms on 10K rows)
4. **Test via client SDK, not SQL Editor** — SQL Editor runs as superuser and bypasses RLS entirely; always test via supabase-js client
5. **Configure session reset on pooling** — If using PgBouncer/connection pooling, set `server_reset_query = 'DISCARD ALL'` to wipe session state between connections
6. **Never use user_metadata in policies** — This claim is user-modifiable; use service_role or custom claims in JWT instead
7. **Audit with SELECT before launch** — Test cross-tenant queries manually: `SELECT * FROM leads WHERE campaign_id != 'your_test_campaign'` should return empty

**Detection:**
- User reports seeing "wrong data" or data from another campaign
- Sudden spike in queries returning more rows than expected
- RLS policy queries timing out (indicates missing index)
- Empty results on client but data exists in SQL Editor

**Which phase should address it:**
- **Phase 1 (Database Migration):** RLS policies must be written and tested BEFORE migrating production data
- **Phase 2 (Multi-tenant Architecture):** Hardening, audit tooling, and cross-tenant access tests

**Sources:**
- [Supabase Row Level Security Complete Guide 2026](https://vibeappscanner.com/supabase-row-level-security)
- [Securing Supabase: Preventing Data Leaks From Misconfigured RLS](https://earezki.com/ai-news/2026-04-07-supabase-rls-the-hidden-danger-and-how-to-find-it-before-hackers-do/)
- [Multi-Tenant Leakage: When Row-Level Security Fails in SaaS](https://medium.com/@instatunnel/multi-tenant-leakage-when-row-level-security-fails-in-saas-da25f40c788c)
- [Preventing Cross-Tenant Data Leakage in Multi-Tenant SaaS Systems](https://agnitestudio.com/blog/preventing-cross-tenant-leakage/)

---

### Pitfall 2: localStorage Migration Data Loss

**What goes wrong:**
During migration from localStorage to Supabase, campaign data (2,474 lines of accumulated activity, leads, team records, gamification history) is lost or corrupted. User starts fresh with empty database.

**Why it happens:**
- **No backup before migration** — Assuming export/import works perfectly, then discovering edge cases mid-migration
- **Schema mismatch** — localStorage stores flat JSON; Postgres expects normalized tables with foreign keys, causing import failures
- **Partial migration** — Network interruption, browser crash, or timeout during upload leaves database in half-migrated state
- **Character encoding issues** — Names with accents (José, Conceição) or special chars corrupt during JSON → SQL conversion
- **Browser cache cleared mid-migration** — User clears cache thinking "I'll sync from server" but server never received data
- **No rollback plan** — Migration fails halfway, no way to restore localStorage state

**Consequences:**
- Complete loss of campaign work to date
- Loss of user trust
- Emergency scramble to manually re-enter data
- Delayed launch while data is reconstructed

**Prevention:**
1. **Export localStorage before ANY migration attempt** — Force user to download JSON backup before migration starts
2. **Validate data pre-migration** — Check for required fields, character encoding, data types BEFORE uploading to Supabase
3. **Implement idempotent migration** — Use upsert logic with unique constraints so re-running migration doesn't duplicate data
4. **Batch migration with progress tracking** — Upload in chunks (100 records at a time), show progress bar, allow resume on failure
5. **Preserve localStorage until confirmed** — Don't clear localStorage until user explicitly confirms server data is correct
6. **Schema compatibility layer** — Map localStorage flat structure to normalized Postgres schema with transformation functions
7. **Test migration with production-like data** — Export real localStorage, test on staging Supabase instance, verify all data migrated

**Detection:**
- User reports "all my data is gone"
- Migration progress bar stuck at specific percentage
- SQL constraint violation errors during bulk insert
- Character encoding corruption (ã becomes Ã£)
- Duplicate key errors on re-run

**Which phase should address it:**
- **Phase 1 (Database Migration):** Migration script with validation, backup enforcement, rollback capability

**Sources:**
- [Top 10 Data Migration Risks and How to Avoid Them in 2026](https://kanerika.com/blogs/risks-in-data-migration/)
- [Data Migration Challenges: Common Issues and Fixes](https://www.rudderstack.com/blog/data-migration-challenges/)
- [Using localStorage in Modern Applications - A Comprehensive Guide](https://rxdb.info/articles/localstorage.html)

---

### Pitfall 3: LGPD Non-Compliance for Political Opinion Data

**What goes wrong:**
Campaign collects voter contact data (names, phone numbers, political opinions, addresses) without proper consent, data subject rights, or processing documentation. ANPD (Brazilian DPA) investigates, issues fines.

**Why it happens:**
- **Political opinion is sensitive data** — LGPD explicitly classifies political opinions as "dados sensíveis" requiring heightened protection
- **Implied consent is insufficient** — Verbal consent from door-to-door canvassing doesn't meet LGPD's written/explicit consent requirement
- **No data minimization** — Collecting more than necessary (full CPF instead of just phone, address when only need region)
- **No subject rights implementation** — LGPD guarantees rights to access, correction, deletion, portability; app has no mechanism for voters to exercise these
- **No legal basis documented** — Can't explain which LGPD legal basis applies (consent vs. legitimate interest vs. legal obligation)
- **Cross-campaign data sharing** — Multi-tenant architecture makes it tempting to "share leads" between campaigns from same party

**Consequences:**
- ANPD enforcement action with fines up to 2% of revenue (or R$50 million per violation)
- Campaign disqualification by TSE for irregular data practices
- Negative press ("Candidate X violated voter privacy")
- Injunction forcing immediate data deletion mid-campaign

**Prevention:**
1. **Implement explicit consent flow** — QR code form MUST include checkbox: "Autorizo o uso dos meus dados para contato pela campanha" with link to privacy policy
2. **Classify data fields by sensitivity** — Tag "political opinion" fields as sensitive, apply stricter access controls
3. **Data minimization by design** — Only collect phone + region for initial contact; full address only if voter explicitly provides
4. **Implement data subject rights** — Provide public form where voters can request access, correction, deletion of their data
5. **Documented legal basis** — For each data category, document: consent (leads), legitimate interest (team coordination), legal obligation (financial reporting to TSE)
6. **Retention limits** — Auto-delete voter data 180 days post-election unless explicit long-term consent obtained
7. **Tenant isolation for LGPD** — Each campaign is separate data controller; no sharing across campaigns without explicit consent
8. **Privacy policy in Portuguese** — Clear, accessible language explaining what data is collected, why, how long, who controls it

**Detection:**
- Voter complaint to ANPD
- TSE audit during campaign
- Data retention exceeding legal limits
- No documented consent for sensitive data processing
- Unable to fulfill data subject access request

**Which phase should address it:**
- **Phase 1 (Database Migration):** Data model with consent tracking, sensitivity flags
- **Phase 2 (QR Code / Lead Capture):** Explicit consent UI, privacy policy link
- **Phase 3 (Production Hardening):** Data subject rights endpoints, retention automation

**Sources:**
- [LGPD Compliance: Practical Guide & Checklist (Brazil)](https://secureprivacy.ai/blog/lgpd-compliance-requirements)
- [Brazil Data Privacy Laws: LGPD Compliance Guide (2026)](https://www.recordinglaw.com/world-laws/world-data-privacy-laws/brazil-data-privacy-laws/)
- [Brazil's Data Protection Authority Sets Enforcement Priorities for 2026–2027](https://cadeproject.org/updates/brazils-data-protection-authority-sets-enforcement-priorities-for-2026-2027/)
- [LGPD Compliance Checklist: The Ultimate Guide for 2026](https://captaincompliance.com/education/lgpd-compliance-checklist/)

---

### Pitfall 4: TSE AI Compliance Violations

**What goes wrong:**
Platform uses AI-generated content (images, text, audio) in campaign materials without proper disclosure. TSE audits campaign, finds undisclosed deepfakes or synthetic content, applies penalties.

**Why it happens:**
- **2026 TSE Resolution 23.748/2026 mandates AI disclosure** — Any electoral content created/altered by AI must explicitly state technology used
- **User-generated content risk** — Coordenadores or cabos eleitorais upload AI-generated campaign images without disclosure
- **72-hour blackout period** — AI content using candidate's voice/image prohibited 72h before election and 24h after voting
- **Platform liability** — TSE holds platforms responsible for failing to remove illegal synthetic content after notification
- **Deepfake weaponization** — Adversary creates fake video of candidate saying controversial things, uploads to platform, platform fails to detect/remove

**Consequences:**
- TSE fines and penalties against campaign
- Campaign disqualification
- Platform held liable for hosting non-compliant content
- Injunction forcing content removal during critical campaign period
- Reputational damage (association with disinformation)

**Prevention:**
1. **AI content detection on upload** — Scan uploaded images/audio for AI generation artifacts (not 100% reliable but shows good faith effort)
2. **Mandatory AI disclosure checkbox** — When uploading campaign materials, require user to certify "This was NOT created by AI" or "This was created by AI using [technology]"
3. **Blackout period enforcement** — Automatically block uploads of candidate voice/image content 72h before election to 24h after
4. **User reporting mechanism** — Allow users to flag suspected AI content for review
5. **Content moderation queue** — Admin/coordenador approval required before campaign materials go public
6. **Watermarking for AI content** — If platform generates content (e.g., auto-cropping photos), embed visible "Gerado por IA" watermark
7. **Terms of Service compliance clause** — Users agree to comply with TSE Resolution 23.748/2026, violations result in account suspension

**Detection:**
- User report of undisclosed AI content
- TSE audit or third-party monitoring
- Viral AI content without disclosure
- Content uploaded during blackout period

**Which phase should address it:**
- **Phase 2 (Photo Upload / Content Management):** AI disclosure UI, blackout period logic
- **Phase 3 (Production Hardening):** Detection tooling, moderation queue, reporting system

**Sources:**
- [TSE Aprova Regulamentação de IA nas Eleições 2026](https://www.tse.jus.br/comunicacao/noticias/2026/Marco/tse-aprova-calendario-eleitoral-e-regulamenta-uso-de-ia-nas-eleicoes-2026)
- [Inteligência Artificial nas Eleições? Veja o Que Ficou Decidido pelo TSE](https://www12.senado.leg.br/verifica/materias-especiais/2026/inteligencia-artificial-nas-eleicoes-veja-o-que-ficou-decidido-pelo-tse)
- [Inteligência Artificial Nas Eleições 2026: O Que A Resolução Do TSE Estabelece](https://www.barbieriadvogados.com/inteligencia-artificial-nas-eleicoes-2026/)

---

### Pitfall 5: PWA Offline Sync Conflict Hell

**What goes wrong:**
Cabo eleitoral A and Cabo B both edit same lead record offline. Both sync later. System either loses one edit, duplicates record, or corrupts data. Gamification scores desync. Trust in system collapses.

**Why it happens:**
- **Last-Write-Wins without timestamps** — System blindly accepts most recent write, silently overwriting earlier changes
- **No conflict detection** — Database accepts both writes, creating duplicate records with different IDs
- **Offline mutation queue without ordering** — Local changes sync in wrong order, violating dependencies (delete before create)
- **Version vector missing** — No way to detect that two edits branched from same base state
- **User unaware of conflict** — No UI notification that their offline change conflicted with server state

**Consequences:**
- Silent data loss (cabo A's field notes disappear)
- Duplicate leads (same voter registered twice, counting error)
- Gamification score disputes ("I earned 100 XP but only got 50!")
- User frustration and abandonment

**Prevention:**
1. **Timestamp-based conflict detection** — Every record has `updated_at` timestamp; detect conflicts when offline change has older `updated_at` than server
2. **Operational transformation for scores** — Instead of storing absolute scores, store operations: `+10 XP for lead capture`, sync operations not final values
3. **User-facing conflict resolution** — When conflict detected, show UI: "Server has newer data. Keep yours, keep server's, or merge?"
4. **Ordered mutation queue** — Tag offline changes with sequence numbers, sync in order, abort on dependency violation
5. **CRDT for gamification** — Use Conflict-free Replicated Data Types (grow-only counters) for XP/scores; merges are automatic and correct
6. **Optimistic UI with rollback** — Show local change immediately but mark as "pending sync"; if conflict, roll back UI and notify user
7. **Field-level merging** — For non-conflicting fields, auto-merge (A updates phone, B updates notes = merge both)

**Detection:**
- User reports "my changes disappeared"
- Duplicate records in database
- Gamification scores incorrect after sync
- Error logs showing unique constraint violations during sync

**Which phase should address it:**
- **Phase 2 (PWA Offline Capabilities):** Conflict detection, mutation queue, timestamp tracking
- **Phase 3 (Gamification):** Operational sync for scores, CRDT exploration

**Sources:**
- [Offline Sync & Conflict Resolution Patterns — Crash Course](https://www.sachith.co.uk/offline-sync-conflict-resolution-patterns-crash-course-practical-guide-apr-8-2026/)
- [Data Synchronization in PWAs: Offline-First Strategies](https://gtcsys.com/comprehensive-faqs-guide-data-synchronization-in-pwas-offline-first-strategies-and-conflict-resolution/)
- [Build Offline-First PWA with Next.js & IndexedDB](https://www.wellally.tech/blog/build-offline-first-pwa-nextjs-indexeddb)

---

## Moderate Pitfalls

Cause user frustration, performance degradation, or rework but not catastrophic.

---

### Pitfall 6: Supabase Free Tier Auto-Pause

**What goes wrong:**
Campaign goes live with free tier. After 7 days of low activity (early pre-campaign), project auto-pauses. Candidate tries to show app to potential donor, site is down. Emergency scramble to upgrade.

**Why it happens:**
- **Free tier pauses after 7 days without API requests** — Intended for hobby projects, not production apps
- **"Low activity" during pre-campaign** — If only admin logs in weekly, might not generate enough traffic
- **No monitoring/alerts** — User doesn't know project is about to pause
- **500 MB database limit** — Photo uploads, leads, activity logs quickly exceed

**Consequences:**
- Unexpected downtime during critical campaign moment
- Data intact but inaccessible until manual resume
- Loss of credibility with stakeholders
- Emergency upgrade under pressure

**Prevention:**
1. **Budget Pro tier from day 1** — $25/month is negligible vs. downtime risk; free tier is for prototyping only
2. **Monitor project usage** — Set alerts when approaching 7 days since last request, 500MB database, or bandwidth limits
3. **Synthetic ping** — If staying on free tier temporarily, run daily cron job to hit API (keeps project alive)
4. **Migration timeline** — Commit to Pro upgrade BEFORE launch, not after first outage

**Detection:**
- App returns 503 Service Unavailable
- Supabase dashboard shows "Project Paused"
- Email from Supabase warning of upcoming pause

**Which phase should address it:**
- **Phase 0 (Pre-Development):** Budget planning, tier decision
- **Phase 1 (Database Migration):** Monitoring setup, usage tracking

**Sources:**
- [Supabase Pricing in 2026: Free Tier Limits & Full Breakdown](https://uibakery.io/blog/supabase-pricing)
- [Supabase Pricing 2026: Every Tier Explained for Indie Hackers](https://www.wearefounders.uk/supabase-pricing-2026-every-tier-explained-for-indie-hackers/)
- [Is Supabase's Pricing Worth It? Total Cost & Competitors 2026](https://checkthat.ai/brands/supabase/pricing)

---

### Pitfall 7: Photo Upload Crushing Low-End Phones

**What goes wrong:**
Cabo eleitoral in field uploads 12 MP photo (5 MB) from budget Android. Upload times out on 3G. Retry fills phone storage. App crashes. User gives up.

**Why it happens:**
- **No client-side compression** — Uploading raw camera photos (5-10 MB each)
- **Supabase free tier has 50 MB upload limit** — Large photos rejected
- **Poor mobile network in RAs** — 3G or unstable 4G in field makes large uploads fail
- **Out of memory on low-end devices** — Loading 12 MP image into memory crashes app
- **No upload progress/retry** — User waits 2 minutes, times out, no way to resume

**Consequences:**
- Gamification activity verification fails (can't prove they did the work)
- User frustration and abandonment
- Campaign activity underreported
- Poor user experience damages adoption

**Prevention:**
1. **Client-side compression before upload** — Use browser-compress-image or similar to resize to 1024px max width, 80% quality JPEG
2. **Progressive image loading** — Use <img loading="lazy"> and IntersectionObserver to avoid memory spikes
3. **Chunked/resumable uploads** — Use TUS protocol for files >6 MB (Supabase supports this)
4. **Offline queue for uploads** — Queue photos locally, retry when network improves
5. **Upload progress indicator** — Show percentage, allow cancel/retry
6. **Image format optimization** — Convert HEIC/PNG to JPEG, strip EXIF metadata to reduce size
7. **Fallback to lower resolution** — If upload fails 3 times, offer to compress further

**Detection:**
- Upload timeout errors in logs
- Users report "can't upload photos"
- High bounce rate on photo upload screens
- Storage quota exceeded errors

**Which phase should address it:**
- **Phase 2 (Photo Upload):** Compression, resumable uploads, progress UI

**Sources:**
- [Client-side Image Compression with Supabase Storage](https://mikeesto.com/posts/supabaseimagecompression/)
- [Top Strategies for Optimizing Images for Mobile](https://www.browserstack.com/guide/strategies-for-optimizing-images-for-mobile)
- [Supabase Storage File Limits](https://supabase.com/docs/guides/storage/uploads/file-limits)
- [4 Best Ways Reduce Photo Size on Android Save Time and Space](https://www.shrink.media/blog/reduce-photo-size-on-android)

---

### Pitfall 8: Service Worker Cache Zombie State

**What goes wrong:**
You push critical bug fix to production. Users still see old broken version for days because service worker cached it. "Clear cache" doesn't help. Uninstall/reinstall required.

**Why it happens:**
- **Service worker updates only after 24 hours by default** — Browser doesn't check for updates on every page load
- **skipWaiting() not called** — New service worker waits for all tabs to close; if user keeps tab open, never updates
- **Cache-first strategy** — Service worker serves from cache, never hits network for updated HTML/JS
- **No cache versioning** — Old cache persists alongside new cache, app loads mix of old and new files

**Consequences:**
- Users stuck on buggy version while you think fix is deployed
- Support tickets spike for "already fixed" bugs
- Loss of trust in platform reliability
- Manual intervention required (instruct users to uninstall PWA)

**Prevention:**
1. **Call skipWaiting() on install** — Force immediate activation of new service worker
2. **Prompt user to refresh** — Detect new service worker available, show banner: "Update available. Refresh now?"
3. **Network-first for HTML** — Cache assets (CSS/JS/images) but always fetch HTML from network to get latest app shell
4. **Version your caches** — Use cache name like `campaign-app-v1.2.3`, delete old caches on activate
5. **Set cache-control: max-age=0 for service-worker.js** — Browser checks for service worker updates on every navigation
6. **Manual update button** — Provide "Check for updates" option in settings, calls `registration.update()`
7. **Test update flow before launch** — Deploy version 1, then version 2, verify users auto-update without manual intervention

**Detection:**
- Users report bugs that were already fixed
- Version mismatch errors (old client, new API)
- Service worker stuck in "waiting" state
- Users say "I cleared cache but still seeing old version"

**Which phase should address it:**
- **Phase 2 (PWA Implementation):** Update strategy, cache versioning, skipWaiting logic

**Sources:**
- [When 'Just Refresh' Doesn't Work: Taming PWA Cache Behavior](https://iinteractive.com/resources/blog/taming-pwa-cache-behavior)
- [Stuff I Wish I'd Known Sooner About Service Workers](https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9)
- [Production-Ready Smart Caching for PWA with Service Workers and IndexedDB](https://dev.to/pablo_74/production-ready-smart-caching-for-pwa-with-service-workers-and-indexeddb-43c5)

---

### Pitfall 9: Session Expiry Mid-Field Work

**What goes wrong:**
Cabo eleitoral spends 3 hours canvassing door-to-door offline. Opens app to sync, JWT expired (1 hour default). Forced to re-login. Offline data not synced. Work lost.

**Why it happens:**
- **Default JWT expiry is 1 hour** — Supabase access tokens expire quickly
- **Refresh token not used during offline** — App can't refresh token without network
- **No session extension on activity** — Even if user is actively using app offline, session times out
- **Sync fails with expired token** — Upload mutation requires valid JWT, rejected by API

**Consequences:**
- Data loss (offline work not synced)
- User frustration (re-login interrupts workflow)
- Gamification scores not updated
- User abandonment

**Prevention:**
1. **Extend JWT expiry to 8-24 hours** — Configure in Supabase Auth settings for field worker role
2. **Implement background token refresh** — While online, periodically call `refreshSession()` to keep token valid
3. **Graceful re-auth on sync** — If sync fails with 401, refresh token transparently, retry mutation
4. **Persist refresh token securely** — Store in httpOnly cookie or secure storage, use to get new access token
5. **Offline tolerance** — Queue mutations locally, sync when token is valid (not immediately on reconnect)
6. **Inactivity timeout instead of fixed expiry** — Set inactivity timeout to 24 hours so active users stay logged in
7. **Pre-flight token check** — Before starting offline work session, verify token has >2 hours remaining, prompt refresh if needed

**Detection:**
- Users report "logged out while working"
- Sync failures with 401 Unauthorized
- Spike in re-login events during field hours
- Offline queue not processing despite connectivity

**Which phase should address it:**
- **Phase 2 (Authentication / Offline Sync):** Token refresh logic, expiry configuration

**Sources:**
- [Supabase Auth Session Timeout Issues](https://drdroid.io/stack-diagnosis/supabase-auth-session-expired)
- [How to Handle JWT Expiration in Supabase](https://www.rapidevelopers.com/supabase-tutorial/how-to-handle-jwt-expiration-in-supabase)
- [User Sessions | Supabase Docs](https://supabase.com/docs/guides/auth/sessions)

---

### Pitfall 10: Leaderboard Query Performance Collapse at Scale

**What goes wrong:**
Gamification works great with 10 users. At 100 users, leaderboard takes 5 seconds to load. At 1,000 users (scaled campaign), timeout. App unusable.

**Why it happens:**
- **Real-time leaderboard recalculates on every page load** — Query aggregates all user scores from activity logs, no caching
- **N+1 queries** — Fetching rank requires counting all users with higher scores, separate query per user
- **Missing indexes** — Sorting by score without index = full table scan
- **RLS policy on every row** — With 100K activity records, RLS checks `user_id = auth.uid()` on each, no index
- **Realtime subscriptions at scale** — Every score update triggers recompute for all connected clients

**Consequences:**
- App becomes unusable during high-activity periods
- Database CPU spikes, affects all features
- Users see stale/incorrect rankings
- Gamification engagement drops (slow = not fun)

**Prevention:**
1. **Pre-compute leaderboard** — Materialized view or separate `leaderboard` table updated on score change, not on query
2. **Index score and timestamp columns** — `CREATE INDEX idx_scores ON users(xp DESC, updated_at DESC)`
3. **Paginate leaderboard** — Show top 10 + "around me" instead of full list
4. **Cache leaderboard** — Update every 5 minutes, serve from cache, not live query
5. **Partition by region** — Coordenador sees regional leaderboard (33 RAs), not global
6. **Operational log instead of aggregation** — Store XP deltas (`+10 XP for lead capture`), sum in background job
7. **Use database functions** — Move ranking logic to Postgres function with proper indexing, not application code

**Detection:**
- Leaderboard page slow to load
- Database CPU >80% during leaderboard queries
- Timeout errors on `/api/leaderboard`
- Users report "ranking doesn't update"

**Which phase should address it:**
- **Phase 3 (Gamification at Scale):** Pre-computation, caching, indexing strategy

**Sources:**
- [The Real-Time Leaderboard Problem: What High-Growth Platforms Get Wrong About Engagement at Scale](https://aijourn.com/the-real-time-leaderboard-problem-what-high-growth-platforms-get-wrong-about-engagement-at-scale/)
- [Supabase Database Design: Performance Tuning](https://eastondev.com/blog/en/posts/dev/supabase-database-design/)
- [Performance Tuning | Supabase Docs](https://supabase.com/docs/guides/platform/performance)

---

## Minor Pitfalls

Annoyances that reduce user experience but are easily fixed.

---

### Pitfall 11: QR Code Phishing Exploitation

**What goes wrong:**
Adversary creates fake QR code, posts on social media: "Scan to support Candidate X!" QR leads to phishing site that steals voter data or credentials.

**Why it happens:**
- **QR codes hide destination** — User can't preview URL before scanning
- **Low digital literacy** — Voters trust official-looking QR codes
- **No domain verification** — User lands on `netorcdrigues2026.com` (typosquatting) instead of official domain
- **Credential harvesting** — Fake site mimics login page, steals passwords

**Consequences:**
- Voter data stolen
- Campaign reputation damage (associated with scam)
- Loss of trust in official QR codes
- Potential LGPD violation if fake site claims to be official

**Prevention:**
1. **Display target URL before redirect** — QR code landing page shows: "You're being redirected to [domain]. Click to continue."
2. **Branded QR codes** — Include campaign logo/colors in QR code design so fakes are visually distinct
3. **Short link with verification** — Use branded short domain (neto2026.com.br/qr/X) instead of random hash
4. **Public QR code registry** — Official website lists all legitimate QR codes, voters can verify
5. **Education campaign** — Train cabos eleitorais: "Only scan QR codes from official campaign materials"
6. **No login via QR** — QR codes lead to public forms (lead capture), never to login pages
7. **Report fake QR codes** — Monitor social media for fake QRs, report to platform, post warnings

**Detection:**
- Users report "I scanned QR but it looks different"
- Phishing reports to campaign
- Fake QR codes found in social media
- Unusual traffic to misspelled domains

**Which phase should address it:**
- **Phase 2 (QR Code Implementation):** URL preview, branded short links, education materials

**Sources:**
- [QR Phishing Statistics: Quishing Trends (Updated February 2026)](https://keepnetlabs.com/blog/qr-code-phishing-trends-in-depth-analysis-of-rising-quishing-statistics)
- [FBI Warns North Korean Hackers Using Malicious QR Codes](https://thehackernews.com/2026/01/fbi-warns-north-korean-hackers-using.html)
- [Quishing: QR Code Phishing Attacks Explained & How to Stay Safe (2026)](https://qrtrac.com/guides/qr-code-phishing-quishing/)

---

### Pitfall 12: RA Boundary Mapping Errors

**What goes wrong:**
Campaign maps leads/activities to wrong Região Administrativa (RA). Coordenador for RA Ceilândia sees data from RA Taguatinga. Strategic planning broken.

**Why it happens:**
- **33 RAs is complex** — Distrito Federal has 33 administrative regions, boundaries not intuitive
- **User error in manual entry** — Cabo eleitoral selects wrong RA from dropdown
- **GPS coordinates don't align** — Lead captured via GPS but coordinate is on RA boundary, assigned to wrong region
- **RA name ambiguity** — "Brasília" is both the overall DF and RA I (Plano Piloto)
- **Boundary changes** — RAs occasionally split or merge, app uses outdated boundaries

**Consequences:**
- Incorrect regional performance metrics
- Coordenador planning decisions based on wrong data
- Gamification regional rankings incorrect
- Resource allocation errors (materials sent to wrong RA)

**Prevention:**
1. **Use official RA GeoJSON boundaries** — Import from authoritative source (GDF - Governo do Distrito Federal)
2. **GPS-based RA detection** — When lead is captured, auto-detect RA from GPS coordinates using point-in-polygon
3. **Confirmation step** — Show detected RA, allow user to override if wrong
4. **RA code + name** — Display "RA I - Brasília (Plano Piloto)" to avoid ambiguity
5. **Boundary visualization** — Show map overlay of RA boundaries on lead capture screen
6. **Validate on sync** — Server validates RA assignment matches GPS coordinates, flags mismatches
7. **Annual boundary update** — Check for official RA boundary updates from GDF before each election cycle

**Detection:**
- Coordenador reports "seeing data from wrong region"
- Lead GPS coordinates don't match assigned RA
- RA totals don't sum to expected values
- User-reported "wrong RA" flags

**Which phase should address it:**
- **Phase 2 (Maps / Regional Management):** GeoJSON boundaries, GPS-based detection

**Sources:**
- [Administrative Regions of the Federal District (Brazil) - Wikipedia](https://en.wikipedia.org/wiki/Administrative_regions_of_the_Federal_District_(Brazil))
- [DF: Regiões Administrativas de Brasília](https://forest-gis.com/produto/df-regioes-administrativas-do-distrito-federal-brasilia/)

---

### Pitfall 13: Prototype Code Carried to Production

**What goes wrong:**
Single-file HTML with inline CSS/JS scales poorly. Global variables collide. No error handling. Console full of warnings. Adding features becomes exponentially harder.

**Why it happens:**
- **"It works, ship it" mentality** — Pressure to launch fast skips refactoring
- **No build process** — Can't minify, tree-shake, or split code
- **Inline styles everywhere** — Can't theme for multi-tenant without find-replace nightmare
- **localStorage logic mixed with UI** — Tight coupling makes database migration painful
- **No error boundaries** — One uncaught exception crashes entire app

**Consequences:**
- Technical debt compounds with every feature
- Bug fixes break unrelated features
- New developers can't understand codebase
- Performance degrades (loading 2,474 lines of JS on every page)

**Prevention:**
1. **Refactor before adding features** — Extract modules: auth.js, database.js, ui.js, gamification.js
2. **Implement basic build step** — Use esbuild or Vite to bundle/minify, even without framework
3. **Separation of concerns** — Separate data layer (Supabase calls) from presentation (DOM manipulation)
4. **CSS extraction** — Move styles to external .css file(s), use CSS variables for theming
5. **Error handling pattern** — Wrap async functions in try/catch, show user-friendly errors
6. **Linting** — Add ESLint to catch common mistakes (undefined variables, unused code)
7. **Incremental migration** — Don't rewrite everything; refactor module-by-module as you add features

**Detection:**
- "Cannot read property of undefined" errors spike
- Adding new feature breaks existing feature
- Code review reveals global variable collisions
- Performance audit shows blocking JS execution

**Which phase should address it:**
- **Phase 1 (Architecture Cleanup):** Modularization, build process, separation of concerns

**Sources:**
- [Technical Debt is Not a Metaphor. It's Why Your Migration Failed.](https://dev.to/jmontagne/technical-debt-is-not-a-metaphor-its-why-your-migration-failed-21l7)
- [Hidden Technical Debt in MVPs: How Startups Can Avoid Costly Pitfalls](https://www.technosidd.com/2026/01/hidden-technical-debt-in-mvps-how-startups-can-avoid-costly-pitfalls.html)
- [QCon London 2026: All Tech Debt is Not Created Equal](https://www.infoq.com/news/2026/03/tech-debt-not-equal/)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| **Database Migration** | localStorage data loss, RLS misconfiguration, schema mismatch | Mandatory backup export, RLS policies with tests, schema validation pre-migration |
| **Authentication** | Session expiry during field work, JWT refresh failures | Extend expiry for field workers, implement background refresh, graceful re-auth |
| **Multi-Tenant** | Cross-tenant data leakage, cache poisoning, session contamination | RLS with indexes, connection pool reset, test cross-tenant queries |
| **PWA Offline** | Sync conflicts, service worker zombie state, upload failures | Conflict detection UI, cache versioning with skipWaiting, photo compression |
| **Photo Upload** | Low-end phone crashes, upload timeouts, storage quota exceeded | Client-side compression, resumable uploads, progress indicators |
| **QR Code** | Phishing exploitation, fake QR codes, credential harvesting | URL preview page, branded QR codes, no login via QR |
| **Gamification** | Leaderboard performance collapse, score desync, XP calculation bugs | Pre-computed rankings, operational log, partition by region |
| **Maps / Regional** | RA boundary mapping errors, GPS inaccuracy, outdated boundaries | Official GeoJSON, point-in-polygon detection, user confirmation |
| **LGPD Compliance** | Sensitive data without consent, no subject rights, retention violations | Explicit consent UI, data subject request form, auto-deletion post-election |
| **TSE Compliance** | Undisclosed AI content, blackout period violations, platform liability | AI disclosure checkbox, date-based upload blocking, content moderation |
| **Production Launch** | Free tier auto-pause, monitoring gaps, cache invalidation chaos | Pro tier budget, usage alerts, update strategy testing |

---

## Sources

### Political Campaign & Compliance
- [Errors in Political Campaigns: Key Mistakes and Their Consequences](https://polapp.co/blog/errors-in-political-campaigns/)
- [TSE Aprova Regulamentação de IA nas Eleições 2026](https://www.tse.jus.br/comunicacao/noticias/2026/Marco/tse-aprova-calendario-eleitoral-e-regulamenta-uso-de-ia-nas-eleicoes-2026)
- [LGPD Compliance: Practical Guide & Checklist (Brazil)](https://secureprivacy.ai/blog/lgpd-compliance-requirements)
- [Brazil's Data Protection Authority Sets Enforcement Priorities for 2026–2027](https://cadeproject.org/updates/brazils-data-protection-authority-sets-enforcement-priorities-for-2026-2027/)

### Multi-Tenant & Database Security
- [Multi-Tenant Leakage: When Row-Level Security Fails in SaaS](https://medium.com/@instatunnel/multi-tenant-leakage-when-row-level-security-fails-in-saas-da25f40c788c)
- [Supabase Row Level Security Complete Guide 2026](https://vibeappscanner.com/supabase-row-level-security)
- [Securing Supabase: Preventing Data Leaks From Misconfigured RLS](https://earezki.com/ai-news/2026-04-07-supabase-rls-the-hidden-danger-and-how-to-find-it-before-hackers-do/)
- [Preventing Cross-Tenant Data Leakage](https://agnitestudio.com/blog/preventing-cross-tenant-leakage/)

### PWA & Offline Sync
- [Offline Sync & Conflict Resolution Patterns — Crash Course](https://www.sachith.co.uk/offline-sync-conflict-resolution-patterns-crash-course-practical-guide-apr-8-2026/)
- [Data Synchronization in PWAs: Offline-First Strategies](https://gtcsys.com/comprehensive-faqs-guide-data-synchronization-in-pwas-offline-first-strategies-and-conflict-resolution/)
- [When 'Just Refresh' Doesn't Work: Taming PWA Cache Behavior](https://iinteractive.com/resources/blog/taming-pwa-cache-behavior)
- [Stuff I Wish I'd Known Sooner About Service Workers](https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9)

### Performance & Scaling
- [The Real-Time Leaderboard Problem: What High-Growth Platforms Get Wrong](https://aijourn.com/the-real-time-leaderboard-problem-what-high-growth-platforms-get-wrong-about-engagement-at-scale/)
- [Supabase Pricing: Real Costs at 10K-100K Users](https://designrevision.com/blog/supabase-pricing)
- [Performance Tuning | Supabase Docs](https://supabase.com/docs/guides/platform/performance)

### Mobile & Photo Upload
- [Client-side Image Compression with Supabase Storage](https://mikeesto.com/posts/supabaseimagecompression/)
- [Top Strategies for Optimizing Images for Mobile](https://www.browserstack.com/guide/strategies-for-optimizing-images-for-mobile)
- [Supabase Storage File Limits](https://supabase.com/docs/guides/storage/uploads/file-limits)

### Security
- [QR Phishing Statistics: Quishing Trends (Updated February 2026)](https://keepnetlabs.com/blog/qr-code-phishing-trends-in-depth-analysis-of-rising-quishing-statistics)
- [FBI Warns North Korean Hackers Using Malicious QR Codes](https://thehackernews.com/2026/01/fbi-warns-north-korean-hackers-using.html)

### Technical Debt & Migration
- [Technical Debt is Not a Metaphor. It's Why Your Migration Failed.](https://dev.to/jmontagne/technical-debt-is-not-a-metaphor-its-why-your-migration-failed-21l7)
- [Hidden Technical Debt in MVPs: How Startups Can Avoid Costly Pitfalls](https://www.technosidd.com/2026/01/hidden-technical-debt-in-mvps-how-startups-can-avoid-costly-pitfalls.html)
- [Top 10 Data Migration Risks and How to Avoid Them in 2026](https://kanerika.com/blogs/risks-in-data-migration/)
