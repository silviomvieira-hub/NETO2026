# Architecture Patterns

**Domain:** Political Campaign Management Platform
**Researched:** 2026-04-09
**Confidence:** HIGH

## Executive Summary

This document defines the architecture for migrating a 2,474-line monolithic HTML file with inline CSS/JS and localStorage persistence into a production-grade, multi-tenant Progressive Web App (PWA) with Supabase backend. The architecture prioritizes **offline-first operation** for field workers with unstable connectivity, **row-level security (RLS)** for multi-tenant data isolation, and **incremental migration** to minimize risk and accelerate delivery.

The recommended architecture follows a **three-tier client-server pattern** with a clear separation of concerns:

1. **Client Layer** (PWA) — Offline-first JavaScript modules with IndexedDB cache and service worker
2. **API Layer** (Supabase) — Auto-generated REST/GraphQL APIs + Edge Functions for custom logic
3. **Data Layer** (PostgreSQL) — Multi-tenant schema with RLS policies enforcing access control

This approach leverages Supabase's built-in capabilities (Auth, Database, Storage, Realtime) to avoid building a traditional backend, enabling rapid delivery while maintaining production-grade security and scalability.

---

## Recommended Architecture

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (PWA)                        │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ UI Modules │  │ Service      │  │ IndexedDB (Offline Cache)│ │
│  │ (10 views) │◄─┤ Worker       │◄─┤ - Sync Queue             │ │
│  │            │  │ (Cache API)  │  │ - Local State            │ │
│  └─────┬──────┘  └──────┬───────┘  └────────┬─────────────────┘ │
│        │                │                   │                    │
│        └────────────────┴───────────────────┘                    │
│                         │                                        │
│                  ┌──────▼──────┐                                 │
│                  │ Supabase JS │                                 │
│                  │   Client    │                                 │
│                  └──────┬──────┘                                 │
└─────────────────────────┼────────────────────────────────────────┘
                          │ HTTPS + WebSocket
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                      SUPABASE LAYER                              │
│  ┌────────────┐  ┌──────────┐  ┌─────────┐  ┌────────────────┐  │
│  │   Auth     │  │ PostgREST│  │ Storage │  │   Realtime     │  │
│  │ (JWT+RLS)  │  │  (API)   │  │ (Files) │  │  (WebSocket)   │  │
│  └─────┬──────┘  └────┬─────┘  └────┬────┘  └────────┬───────┘  │
│        │              │             │                │           │
│        └──────────────┴─────────────┴────────────────┘           │
│                       │                                          │
│  ┌────────────────────▼──────────────────────────────────────┐   │
│  │            PostgreSQL (Multi-Tenant)                      │   │
│  │  - RLS Policies (tenant_id + role-based access)          │   │
│  │  - Database Functions (validation, triggers)             │   │
│  │  - Edge Functions (custom logic, webhooks)               │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### 1. Client Layer — PWA (Offline-First)

**Responsibility:** User interface, offline operation, optimistic updates, sync queue management

**Sub-components:**

| Component | Purpose | Technology | Communicates With |
|-----------|---------|------------|-------------------|
| **UI Modules** | 10 feature views (dashboard, cities, agenda, people, leaders, mapping, demands, polls, materials, gamification) | HTML/CSS/ES6 Modules | Service Worker, IndexedDB, Supabase Client |
| **Service Worker** | Asset caching, offline support, background sync | JavaScript Service Worker API | Cache API, Background Sync API, IndexedDB |
| **IndexedDB** | Offline data persistence, sync queue | idb library (Promise wrapper) | UI Modules, Service Worker, Supabase Client |
| **Supabase Client** | API communication, auth, realtime subscriptions | @supabase/supabase-js | Supabase API Layer |
| **Router** | SPA navigation, view switching | Vanilla JS (History API) | UI Modules |

**Key Patterns:**

- **Offline-First Data Flow:** UI → IndexedDB (optimistic write) → Sync Queue (if offline) → Background Sync → Supabase API → IndexedDB reconciliation
- **Cache Strategy:** Cache-first for static assets (HTML, CSS, JS, images), Network-first with cache fallback for API requests, Network-only for mutations (POST/PUT/DELETE)
- **Module Organization:** ES6 modules with dynamic imports for code splitting, each feature module exports init(), render(), and destroy() functions

**Build Order:** Phase 1 (foundational)

**Sources:**
- [Building an Offline-First PWA Notes App](https://oluwadaprof.medium.com/building-an-offline-first-pwa-notes-app-with-next-js-indexeddb-and-supabase-f861aa3a06f9)
- [PWA, Indexed DB, and a Reliable Queue](https://medium.com/@11.sahil.kmr/offline-first-by-design-pwa-indexed-db-and-a-reliable-queue-775605b3d76c)
- [Offline-First PWAs: Service Worker Caching Strategies](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies)

---

### 2. API Layer — Supabase Services

**Responsibility:** Authentication, auto-generated REST/GraphQL APIs, file storage, realtime subscriptions, custom server-side logic

**Sub-components:**

| Component | Purpose | When to Use | Communicates With |
|-----------|---------|-------------|-------------------|
| **Supabase Auth** | JWT-based authentication, session management, custom claims (roles) | User login, registration, role assignment | PostgreSQL (auth schema), Edge Functions (hooks) |
| **PostgREST** | Auto-generated REST API from PostgreSQL schema | All CRUD operations | PostgreSQL (RLS enforcement) |
| **Supabase Storage** | Object storage with RLS, image transformations | Photo uploads, campaign materials, profile images | PostgreSQL (storage schema), CDN |
| **Supabase Realtime** | WebSocket-based pub/sub, database change streaming, presence | Live updates (rankings, new leads), online status | PostgreSQL (logical replication), Phoenix Channels |
| **Edge Functions** | Serverless TypeScript functions (Deno runtime) | Custom business logic, third-party integrations, webhooks | PostgreSQL, external APIs |

**Key Patterns:**

- **Authentication Flow:** User login → Supabase Auth → JWT with custom claims (tenant_id, role) → Client stores JWT → All API requests include JWT → RLS policies enforce access
- **RLS-First Authorization:** All access control at database layer via RLS policies, no application-level filtering
- **Postgres-First Logic:** Core business logic in database functions (triggers, constraints), Edge Functions only for external integrations or trusted server-side operations
- **Image Upload:** Client → Supabase Storage (bucket with RLS) → Auto-resize on-the-fly via query parameters → Serve via Smart CDN

**Build Order:** Phase 1 (Auth, Database), Phase 2 (Storage, Realtime), Phase 3 (Edge Functions for advanced features)

**Sources:**
- [Supabase MVP Architecture in 2026](https://www.valtorian.com/blog/supabase-mvp-architecture)
- [Modern Web Architecture Without a Backend](https://zenstack.dev/blog/supabase)
- [Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Realtime Architecture](https://supabase.com/docs/guides/realtime/architecture)

---

### 3. Data Layer — PostgreSQL (Multi-Tenant)

**Responsibility:** Data persistence, multi-tenant isolation, access control enforcement, business logic

**Schema Design:**

```sql
-- Multi-tenant isolation column on every table
tenant_id UUID REFERENCES tenants(id)

-- Three-tier access control
CREATE TYPE user_role AS ENUM ('admin', 'coordinator', 'field_worker');

-- Core tables (simplified)
tenants (id, name, config, created_at)
user_roles (user_id, tenant_id, role, region_id)
cities (id, tenant_id, name, visited_count)
agenda (id, tenant_id, event_type, date, location)
people (id, tenant_id, name, role, region_id)
leaders (id, tenant_id, name, reach_estimate, region_id)
political_mapping (id, tenant_id, name, stance, influence)
demands (id, tenant_id, title, category, priority, region_id)
polls (id, tenant_id, date, results)
materials (id, tenant_id, type, stock, region_id)
gamification (id, tenant_id, user_id, xp, level, missions, trophies)
leads (id, tenant_id, name, phone, region_id, source, captured_by)
```

**Key Patterns:**

- **Multi-Tenancy via RLS:** Every table includes `tenant_id`, RLS policies automatically filter by `auth.jwt() ->> 'tenant_id'`, WITH CHECK prevents cross-tenant writes
- **Regional Scoping:** Coordinators see only rows where `region_id IN (SELECT region_id FROM user_roles WHERE user_id = auth.uid())`, field workers see only their own data
- **Role-Based Permissions:** Custom authorize() function checks JWT claims against role_permissions table, policies call authorize('permission_name')
- **Indexed Tenant Columns:** CREATE INDEX idx_tenant_id ON every_table(tenant_id) for performance
- **Database Functions:** Use for validation (e.g., check XP calculation), triggers (e.g., update ranking on XP change), computed columns (e.g., campaign days remaining)

**Build Order:** Phase 1 (schema + basic RLS), Phase 2 (regional scoping), Phase 3 (advanced triggers/functions)

**Sources:**
- [Multi-Tenant Applications with RLS on Supabase](https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/)
- [Supabase Multi-Tenancy CRM Integration Guide](https://www.stacksync.com/blog/supabase-multi-tenancy-crm-integration)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

---

## Data Flow Patterns

### Pattern 1: User Authentication & Authorization

**Flow:**

1. User enters email/password → Client calls `supabase.auth.signInWithPassword()`
2. Supabase Auth validates credentials → Queries `user_roles` table
3. Custom Access Token Hook (Edge Function) injects claims into JWT:
   ```json
   {
     "sub": "user-uuid",
     "tenant_id": "campaign-uuid",
     "role": "coordinator",
     "regions": ["region-1", "region-2"]
   }
   ```
4. Client stores JWT in memory (not localStorage for security)
5. All subsequent API requests include JWT in Authorization header
6. PostgreSQL RLS policies evaluate JWT claims to filter queries automatically

**Implementation Example:**

```sql
-- RLS Policy: Users see only their tenant's data
CREATE POLICY "Tenant isolation" ON leads
  FOR ALL
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);

-- RLS Policy: Coordinators see only their regions
CREATE POLICY "Regional scoping" ON leads
  FOR SELECT
  USING (
    (auth.jwt() ->> 'role') = 'admin'
    OR region_id IN (
      SELECT jsonb_array_elements_text(
        auth.jwt() -> 'regions'
      )::uuid
    )
  );
```

**Why This Approach:**

- Defense-in-depth: Security at database layer, not just application layer
- No SQL injection risk: RLS policies are PostgreSQL native
- Automatic enforcement: Developers can't accidentally bypass access control
- Multi-tenant isolation: Tenant A can never see Tenant B's data, even with API bugs

**Build Order:** Phase 1 (critical for multi-tenant security)

**Sources:**
- [Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Custom Access Token Hook](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)

---

### Pattern 2: Offline-First CRUD Operations

**Flow (Create/Update with Unstable Network):**

1. User fills form (e.g., captures lead via QR code) → Click submit
2. Client immediately writes to IndexedDB with status: 'pending_sync'
3. Client shows success UI (optimistic update)
4. Service Worker adds operation to sync queue
5. Background Sync API attempts network request:
   - **Online:** POST to Supabase → Success → Update IndexedDB status: 'synced'
   - **Offline:** Retry with exponential backoff → Eventual success
6. If conflict detected (server version newer), show conflict resolution UI

**IndexedDB Schema:**

```javascript
// idb wrapper for IndexedDB
const db = await openDB('campaign-db', 1, {
  upgrade(db) {
    // Main data stores (mirror server schema)
    db.createObjectStore('leads', { keyPath: 'id' });
    db.createObjectStore('cities', { keyPath: 'id' });

    // Sync queue for offline operations
    const syncQueue = db.createObjectStore('sync_queue', {
      keyPath: 'queueId',
      autoIncrement: true
    });
    syncQueue.createIndex('status', 'status'); // 'pending', 'syncing', 'synced', 'error'
  }
});
```

**Service Worker Sync Logic:**

```javascript
// Register background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-operations') {
    event.waitUntil(syncOfflineOperations());
  }
});

async function syncOfflineOperations() {
  const db = await openDB('campaign-db', 1);
  const pending = await db.getAllFromIndex('sync_queue', 'status', 'pending');

  for (const op of pending) {
    try {
      // Send to Supabase
      const response = await fetch(op.url, op.options);
      if (response.ok) {
        await db.put('sync_queue', { ...op, status: 'synced' });
        // Update main data store with server response
        const data = await response.json();
        await db.put(op.storeName, data);
      }
    } catch (error) {
      // Mark for retry
      await db.put('sync_queue', {
        ...op,
        status: 'error',
        retryCount: (op.retryCount || 0) + 1
      });
    }
  }
}
```

**Why This Approach:**

- User never blocked by network: Form submission always succeeds immediately
- Guaranteed eventual delivery: Background Sync retries until success (even if user closes tab)
- Data integrity: IndexedDB persists across browser restarts
- Conflict detection: Server timestamp comparison prevents data loss

**Build Order:** Phase 2 (after basic online functionality works)

**Sources:**
- [Building an Offline-First PWA Notes App](https://oluwadaprof.medium.com/building-an-offline-first-pwa-notes-app-with-next-js-indexeddb-and-supabase-f861aa3a06f9)
- [How to Implement Background Sync in React PWAs](https://oneuptime.com/blog/post/2026-01-15-background-sync-react-pwa/view)

---

### Pattern 3: Realtime Updates (Rankings, New Leads)

**Flow:**

1. Client subscribes to relevant channels on load:
   ```javascript
   const channel = supabase
     .channel('leads-realtime')
     .on('postgres_changes',
       { event: 'INSERT', schema: 'public', table: 'leads' },
       (payload) => {
         // Update UI with new lead
         addLeadToUI(payload.new);
       }
     )
     .subscribe();
   ```

2. When any client creates a lead → PostgreSQL INSERT triggers WAL (Write-Ahead Log)
3. Supabase Realtime reads WAL via logical replication → Filters by RLS policies
4. Only authorized subscribers receive the change (automatic tenant + region filtering)
5. Client updates UI without manual polling

**When to Use Realtime:**

- **YES:** Rankings/leaderboards (gamification), new lead notifications, live event updates
- **NO:** Bulk operations, data exports, historical queries (use REST API instead)

**Alternative: Polling for MVP:**

For most MVPs, polling every 30-60 seconds with good UX (loading indicators) is simpler than realtime and sufficient for low-traffic scenarios. Realtime subscriptions add complexity (connection management, reconnection logic, memory leaks if not cleaned up).

**Recommended Approach:** Start with polling in Phase 1, add Realtime in Phase 3 for high-value features only (e.g., live rankings during campaign events).

**Build Order:** Phase 3 (nice-to-have, not critical path)

**Sources:**
- [Realtime Architecture](https://supabase.com/docs/guides/realtime/architecture)
- [Subscribing to Database Changes](https://supabase.com/docs/guides/realtime/subscribing-to-database-changes)
- [Supabase MVP Architecture in 2026](https://www.valtorian.com/blog/supabase-mvp-architecture)

---

### Pattern 4: File Upload (Photo Verification)

**Flow (Field Worker Uploads Photo of Activity):**

1. User takes photo → Client resizes/compresses before upload (reduce bandwidth)
2. Client calls Supabase Storage:
   ```javascript
   const { data, error } = await supabase.storage
     .from('activity-photos') // bucket name
     .upload(`${tenantId}/${userId}/${timestamp}.jpg`, photoBlob, {
       cacheControl: '3600',
       upsert: false
     });
   ```
3. Storage enforces RLS policy (user can only upload to their tenant folder)
4. Client stores file path in database:
   ```javascript
   await supabase.from('activities').insert({
     user_id: userId,
     photo_url: data.path,
     activity_type: 'material_distribution',
     timestamp: new Date()
   });
   ```
5. Display image with on-the-fly transformations:
   ```javascript
   const url = supabase.storage
     .from('activity-photos')
     .getPublicUrl(data.path, {
       transform: {
         width: 400,
         height: 300,
         resize: 'cover',
         quality: 80
       }
     });
   ```

**Storage Bucket Structure:**

```
activity-photos/
  {tenant_id}/
    {user_id}/
      {timestamp}.jpg

campaign-materials/
  {tenant_id}/
    logos/
    banners/
    flyers/
```

**RLS Policy Example:**

```sql
-- Users can only upload to their tenant's folder
CREATE POLICY "Upload to own tenant" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'activity-photos'
    AND (storage.foldername(name))[1] = (auth.jwt() ->> 'tenant_id')
  );

-- Users can view files from their tenant
CREATE POLICY "View own tenant files" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'activity-photos'
    AND (storage.foldername(name))[1] = (auth.jwt() ->> 'tenant_id')
  );
```

**Optimization:**

- Client-side compression before upload (reduce from 5MB to 500KB typical)
- Image transformations on-the-fly (no pre-processing needed)
- CDN caching for fast delivery
- Limit: 25MB max per file (Supabase transformation limit)

**Build Order:** Phase 2 (photo verification is core requirement)

**Sources:**
- [Storage Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations)
- [Client-side image compression with Supabase Storage](https://mikeesto.com/posts/supabaseimagecompression/)

---

### Pattern 5: QR Code Lead Capture

**Flow:**

1. Coordinator generates unique QR code for field worker:
   ```javascript
   import QRCode from 'qrcode'; // or similar library

   const qrData = {
     worker_id: userId,
     tenant_id: tenantId,
     campaign_name: 'Neto 2026'
   };

   const qrCodeUrl = await QRCode.toDataURL(
     `${APP_URL}/capture/${btoa(JSON.stringify(qrData))}`
   );
   ```

2. Field worker shows QR code to potential supporter
3. Supporter scans QR code with phone camera → Opens browser to capture form
4. Form pre-fills worker_id and tenant_id (hidden fields from URL)
5. Supporter fills name, phone, region → Submits
6. Server creates lead record + awards XP to field worker:
   ```javascript
   // Edge Function or Database Trigger
   async function handleLeadCapture(lead) {
     // Insert lead
     const { data: newLead } = await supabase
       .from('leads')
       .insert(lead);

     // Award XP to worker (database function)
     await supabase.rpc('award_xp', {
       user_id: lead.captured_by,
       xp_amount: 50,
       activity_type: 'lead_capture'
     });
   }
   ```

7. Worker's phone receives realtime notification: "New lead captured! +50 XP"

**Offline Consideration:**

If supporter is offline when submitting:
- Form data saved to supporter's browser IndexedDB
- Service Worker syncs when connection returns
- Field worker sees lead appear later (eventual consistency)

**Security:**

- URL includes HMAC signature to prevent tampering:
  ```javascript
  const signature = crypto.createHmac('sha256', SECRET_KEY)
    .update(JSON.stringify(qrData))
    .digest('hex');

  const url = `${APP_URL}/capture/${encodedData}?sig=${signature}`;
  ```

**Build Order:** Phase 2 (high-value feature for field operations)

**Sources:**
- [Lightweight progressive web app for scanning QR codes offline](https://github.com/Minishlink/pwa-qr-code-scanner)
- [Create QR code scanner using React PWA](https://paulho1973.medium.com/create-qr-code-scanner-using-react-pwa-97b0b9bc1a73)

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Building a Custom Backend Layer

**What:** Creating Express/Fastify/NestJS server between client and Supabase

**Why bad:**
- Supabase already provides auto-generated REST/GraphQL APIs
- Adds latency (extra network hop)
- Duplicates RLS logic in application code (less secure)
- Increases deployment complexity (now need to host backend separately)

**Instead:**
- Use PostgREST directly for CRUD operations
- Use Edge Functions only for truly custom logic (webhooks, third-party integrations)
- Keep business logic in database functions (closer to data)

**Exception:** If you need complex multi-step transactions or integration with legacy systems, a thin backend layer may be justified. But for 90% of CRUD operations, direct Supabase API is faster and more secure.

---

### Anti-Pattern 2: localStorage for Multi-User Data

**What:** Continuing to use localStorage as primary data store

**Why bad:**
- No synchronization between devices
- No multi-user support (only one person can use effectively)
- Data loss if user clears browser cache
- 5-10MB storage limit (insufficient for campaign data)

**Instead:**
- PostgreSQL as source of truth (via Supabase)
- IndexedDB for offline cache only (disposable, can be rebuilt from server)
- Service Worker sync queue for offline operations

**Note:** localStorage is acceptable for non-critical UI state (theme preference, sidebar collapsed state), but never for campaign data.

---

### Anti-Pattern 3: Client-Side Access Control

**What:** Hiding UI elements based on user role without server-side enforcement

**Why bad:**
- Users can bypass by editing JWT in browser DevTools
- API still returns unauthorized data (security vulnerability)
- Easy to forget to check permissions in every component

**Instead:**
- **Always** enforce access control at database layer via RLS policies
- UI hiding is UX convenience, not security
- Test with tools like Postman to verify unauthorized requests are rejected

**Example of proper layering:**
```javascript
// Client (UX only, not security)
if (user.role === 'coordinator') {
  showCoordinatorDashboard();
}

// Server (actual security via RLS)
CREATE POLICY "Coordinators see only their region"
  ON people
  FOR SELECT
  USING (
    region_id IN (
      SELECT region_id FROM user_roles
      WHERE user_id = auth.uid()
    )
  );
```

---

### Anti-Pattern 4: Overusing Realtime Subscriptions

**What:** Subscribing to database changes for every table "just in case"

**Why bad:**
- WebSocket connections consume memory (one per subscription)
- Increased load on Supabase Realtime cluster (costs scale with connections)
- Complex reconnection logic needed for reliability
- Most UIs don't need sub-second updates

**Instead:**
- Use polling (every 30-60s) for most features in MVP
- Add Realtime only where it provides clear UX value:
  - Live rankings/leaderboards
  - Real-time notifications (new lead captured)
  - Collaborative editing (if multiple users edit same record)
- Unsubscribe on component unmount to prevent memory leaks

**Decision criteria:** Would users notice if data updated 30 seconds later? If no, use polling.

---

### Anti-Pattern 5: Storing Secrets in Client Code

**What:** Including Supabase anon key, API keys for third-party services in frontend JavaScript

**Why bad:**
- Supabase anon key is public (intended to be exposed), but RLS must be configured correctly
- Third-party API keys (Twilio, SendGrid, etc.) are secret and must never be in client code
- Users can read all client-side code via browser DevTools

**Instead:**
- Supabase anon key in client: OK (RLS protects data)
- Third-party API keys: Always in Edge Functions (server-side)
- Sensitive operations (charge credit card, send SMS): Edge Functions only

**Example:**
```javascript
// BAD: Client-side (secret exposed)
await fetch('https://api.twilio.com/send', {
  headers: { 'Authorization': `Bearer ${TWILIO_SECRET_KEY}` }
});

// GOOD: Edge Function (secret protected)
await supabase.functions.invoke('send-sms', {
  body: { to: phone, message: text }
});
```

---

## Scalability Considerations

### At 1-10 Users (Phase 1: MVP for Neto Campaign)

**Approach:** Simplicity over optimization

| Concern | Approach |
|---------|----------|
| Database | Supabase free tier (500MB, enough for 10K+ leads) |
| API requests | PostgREST handles 1000s of req/sec (no bottleneck) |
| File storage | 1GB free tier (500-1000 photos typical for pre-campaign) |
| Realtime | Not needed yet, use polling every 60s |
| Auth | Built-in Supabase Auth (50K users free tier, way more than needed) |

**Bottleneck:** Likely none. Focus on feature delivery, not optimization.

---

### At 100 Users (Phase 2: Multi-Coordinator Rollout)

**Approach:** Monitor, add indexes, optimize queries

| Concern | Approach |
|---------|----------|
| Database | Add indexes on tenant_id, region_id, user_id (already planned) |
| API requests | Still no issue (PostgREST scales linearly) |
| File storage | Upgrade to Pro plan if photos exceed 1GB (~$25/month for 100GB) |
| Realtime | Consider for leaderboards only (100 concurrent users is easy) |
| Query performance | Use `EXPLAIN ANALYZE` to identify slow queries, add indexes |

**Likely bottleneck:** Query performance if RLS policies are complex. Solution: Add composite indexes on (tenant_id, region_id).

---

### At 1,000+ Users (Phase 3: Multi-Tenant SaaS)

**Approach:** Connection pooling, CDN, caching

| Concern | Approach |
|---------|----------|
| Database connections | Enable Supavisor (connection pooler, included in Pro plan) |
| API requests | Add caching layer (Supabase Edge Functions + Deno KV) |
| File storage | Serve via CDN (automatic with Supabase Storage) |
| Realtime | Use Presence for online status, Broadcast for chat (not DB changes) |
| Multi-tenancy | Consider dedicated schemas per tenant if data grows large (>100GB) |

**Likely bottleneck:** Database connection limits (max 60 on free tier, 200+ on Pro). Solution: Connection pooling via Supavisor.

**Alternative architecture:** If data grows massive (100K+ users per tenant), consider separate PostgreSQL databases per tenant instead of RLS-based multi-tenancy. This is a major refactor, so avoid premature optimization.

---

### Performance Optimization Checklist

**Phase 1 (do now):**
- [ ] Index tenant_id on all tables
- [ ] Index foreign keys (user_id, region_id, campaign_id)
- [ ] Compress images client-side before upload (5MB → 500KB)
- [ ] Enable gzip compression on static assets (automatic with Vercel/Netlify)

**Phase 2 (monitor and add if needed):**
- [ ] Composite indexes for complex queries (tenant_id, region_id, created_at)
- [ ] Materialized views for expensive reports (refresh nightly)
- [ ] Edge Functions with Deno KV for caching leaderboards
- [ ] Service Worker caching for static assets (HTML, CSS, JS)

**Phase 3 (scale-up):**
- [ ] Connection pooling via Supavisor
- [ ] Read replicas for analytics queries (Pro plan feature)
- [ ] Partitioning large tables by tenant_id (if single tenant exceeds 1M rows)
- [ ] Rate limiting on public endpoints (Edge Functions middleware)

**Sources:**
- [Storage Optimizations](https://supabase.com/docs/guides/storage/production/scaling)
- [Supabase Best Practices](https://www.leanware.co/insights/supabase-best-practices)

---

## Recommended Build Order

This section maps architectural components to development phases, prioritizing foundational layers before dependent features.

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Replace localStorage with Supabase, establish multi-tenant architecture, enable basic auth

**Components to Build:**

1. **PostgreSQL Schema**
   - Create tenants, user_roles, core tables (leads, cities, people, etc.)
   - Add tenant_id to every table
   - Set up basic RLS policies (tenant isolation only, defer regional scoping)

2. **Supabase Auth Integration**
   - Implement login/logout UI
   - Custom Access Token Hook for JWT claims (tenant_id, role)
   - Test RLS enforcement with different users

3. **Client Refactor (Minimal)**
   - Replace localStorage.setItem/getItem with Supabase client calls
   - Keep existing HTML/CSS/JS structure (no module splitting yet)
   - Online-only mode (defer offline support)

4. **Data Migration Script**
   - Export existing localStorage data to JSON
   - Import into PostgreSQL via Supabase API
   - Validate data integrity

**Success Criteria:**
- [ ] User can log in and see only their tenant's data
- [ ] No localStorage usage except UI preferences
- [ ] RLS policies tested (user A cannot see user B's data)

**Dependencies:** None (foundational)

---

### Phase 2: Offline Support + Storage (Weeks 3-4)

**Goal:** Enable offline-first operation for field workers, add photo uploads

**Components to Build:**

1. **Service Worker + IndexedDB**
   - Cache-first strategy for static assets
   - IndexedDB schema mirroring PostgreSQL tables
   - Sync queue for offline mutations
   - Background Sync API integration

2. **Supabase Storage Integration**
   - Create buckets (activity-photos, campaign-materials)
   - RLS policies for file access
   - Client-side image compression
   - Photo upload UI

3. **QR Code Lead Capture**
   - QR code generation (coordinator view)
   - Lead capture form (public, no auth required)
   - HMAC signature validation
   - XP award on lead capture (database function)

**Success Criteria:**
- [ ] Field worker can capture leads offline, syncs when online
- [ ] Photo uploads work with automatic resizing
- [ ] QR code flow tested end-to-end

**Dependencies:** Phase 1 (auth, database schema)

---

### Phase 3: Regional Scoping + Realtime (Weeks 5-6)

**Goal:** Implement three-tier access control, add live features

**Components to Build:**

1. **Regional Scoping RLS Policies**
   - Update RLS policies to check regions claim
   - Coordinator UI filters by assigned regions
   - Admin sees all regions

2. **Realtime Subscriptions (Selective)**
   - Leaderboard live updates (postgres_changes on gamification table)
   - New lead notifications (Broadcast channel)
   - Online status indicators (Presence channel)

3. **Edge Functions**
   - Custom business logic (e.g., nightly ranking recalculation)
   - Third-party integrations (e.g., send SMS via Twilio)
   - Webhooks (e.g., payment confirmation for multi-tenant sales)

**Success Criteria:**
- [ ] Coordinators see only their regions
- [ ] Leaderboard updates in real-time
- [ ] Edge Functions deployed and working

**Dependencies:** Phase 2 (sync queue must work before adding realtime complexity)

---

### Phase 4: Module Refactor + PWA Polish (Weeks 7-8)

**Goal:** Improve code maintainability, finalize PWA installation

**Components to Build:**

1. **ES6 Module Organization**
   - Split monolithic HTML into modules (one per feature)
   - Dynamic imports for code splitting
   - Shared utilities module (date formatting, API helpers)

2. **PWA Manifest + Install Prompt**
   - manifest.json with app metadata
   - Install prompt UI
   - Offline fallback page

3. **Advanced Service Worker Features**
   - Periodic background sync (update data every hour when app closed)
   - Push notifications (new lead captured, mission reminder)

**Success Criteria:**
- [ ] App installable on mobile home screen
- [ ] Code split into manageable modules
- [ ] Push notifications working

**Dependencies:** Phase 3 (functionality complete, now polish UX)

---

### Phase 5: Multi-Tenant SaaS (Weeks 9-10+)

**Goal:** Enable selling to other candidates, tenant management

**Components to Build:**

1. **Tenant Management UI**
   - Admin creates new tenant (campaign)
   - Customize colors, logo, candidate name
   - Configure regions/cities per tenant

2. **Tenant Signup Flow**
   - Public signup form (candidate provides info)
   - Automated tenant provisioning (Edge Function)
   - Onboarding checklist

3. **Billing Integration (Optional)**
   - Stripe checkout for one-time payment
   - License key generation
   - Expiration enforcement (RLS policy checks license)

**Success Criteria:**
- [ ] New tenant can sign up and get isolated instance
- [ ] No data leakage between tenants
- [ ] Billing flow tested (if implemented)

**Dependencies:** Phase 4 (system must be stable and performant first)

---

## Technology Decisions Summary

This table consolidates all architectural technology choices.

| Layer | Component | Technology | Why | Alternative Considered |
|-------|-----------|------------|-----|------------------------|
| **Client** | UI Framework | Vanilla HTML/CSS/JS | Evolves existing code, no build complexity | React (rejected: overhead, rewrite) |
| | Module System | ES6 Modules | Native browser support, dynamic imports | Webpack (rejected: build step) |
| | State Management | IndexedDB + idb wrapper | Offline persistence, structured queries | localStorage (rejected: 5MB limit) |
| | Service Worker | Vanilla Service Worker API | PWA standard, full control | Workbox (considered for Phase 4) |
| | Routing | History API | Lightweight SPA routing | No router (rejected: URL navigation UX) |
| | QR Code | qrcode.js library | Lightweight, widely used | browser-image-compression for scanning |
| **API** | Backend | Supabase | Auth, DB, Storage, Realtime in one | Firebase (rejected: vendor lock-in), Custom Express (rejected: complexity) |
| | API Protocol | PostgREST (auto-generated) | No code needed, auto-updates with schema | GraphQL (rejected: learning curve) |
| | Authentication | Supabase Auth + JWT | Built-in, RLS-aware | Auth0 (rejected: cost), Custom (rejected: security risk) |
| | File Storage | Supabase Storage | RLS integration, image transforms | Cloudinary (rejected: cost), S3 (rejected: complexity) |
| | Realtime | Supabase Realtime (Elixir/Phoenix) | Built-in, RLS-enforced | Pusher (rejected: cost), Socket.io (rejected: need custom server) |
| | Serverless Functions | Supabase Edge Functions (Deno) | Integrated, TypeScript support | AWS Lambda (rejected: complexity), Netlify Functions (considered) |
| **Data** | Database | PostgreSQL (via Supabase) | Relational, RLS, triggers, full-featured | MongoDB (rejected: multi-tenant complexity), MySQL (rejected: RLS not native) |
| | Multi-Tenancy | Row Level Security (RLS) | Database-enforced, automatic filtering | Separate schemas (rejected: complexity), Separate databases (rejected: cost) |
| | Access Control | RLS + Custom JWT Claims | Defense-in-depth, no application logic | Application-level checks (rejected: security risk) |
| | Caching | IndexedDB (client), Smart CDN (files) | Offline-first, automatic edge caching | Redis (rejected: overkill for MVP) |
| **Deployment** | Frontend Hosting | Vercel or Netlify | Free tier, automatic HTTPS, global CDN | Supabase Hosting (considered), GitHub Pages (rejected: no SPA routing) |
| | Database Hosting | Supabase Cloud | Managed, free tier sufficient | Self-hosted Postgres (rejected: ops burden) |
| | CI/CD | GitHub Actions | Free for public repos, integrates with Vercel | None (rejected: manual deploys risky) |

**Key Principles:**

1. **Leverage Supabase built-ins** instead of custom solutions (auth, storage, realtime)
2. **Postgres-first logic** (database functions, triggers, RLS) over application code
3. **Offline-first client** (IndexedDB, service worker) for unreliable field connectivity
4. **Security at database layer** (RLS) not application layer (client-side checks)
5. **Incremental migration** (evolve existing HTML, don't rewrite from scratch)

---

## Open Questions & Research Flags

These topics require deeper investigation in later phases:

### Phase 2 Research Needed

**Question:** How to handle sync conflicts when multiple users edit the same record offline?

**Why important:** Two coordinators editing the same demand offline could overwrite each other

**Approach options:**
1. Last-write-wins (simple, may lose data)
2. Conflict resolution UI (complex, better UX)
3. Operational Transform (complex, automatic merge)

**Recommendation:** Start with last-write-wins + timestamp warnings, add conflict UI in Phase 3 if users report issues

---

### Phase 3 Research Needed

**Question:** What's the optimal Realtime subscription pattern for 100+ concurrent users watching leaderboards?

**Why important:** Each subscription consumes memory, could hit Supabase limits

**Approach options:**
1. One subscription per user (simple, may not scale)
2. Server-side aggregation + Broadcast channel (scales better)
3. Polling + caching (simplest, good enough for most cases)

**Recommendation:** Test with simulated load in Phase 3, start with polling

---

### Phase 5 Research Needed

**Question:** Should multi-tenant architecture use RLS (shared tables) or separate schemas/databases per tenant?

**Why important:** Affects scalability, security, and operational complexity

**Decision factors:**
- RLS: Simpler, cheaper, but performance degrades with large datasets (millions of rows)
- Separate schemas: Better isolation, easier backups per tenant, more complex migrations
- Separate databases: Maximum isolation, expensive, hard to manage at scale

**Recommendation:** Use RLS for MVP, consider separate schemas if single tenant exceeds 1M rows

---

### General Research Needed

**Question:** What's the best strategy for migrating the existing 2,474-line HTML file to modules without breaking functionality?

**Approach options:**
1. Big-bang rewrite (risky, all-or-nothing)
2. Incremental extraction (extract one module per week, test continuously)
3. Dual-mode support (keep old code, gradually replace components)

**Recommendation:** Incremental extraction (Phase 1 keeps monolithic structure, Phase 4 refactors to modules)

---

## Sources

### High-Confidence Sources (Official Documentation)

- [Custom Claims & Role-based Access Control (RBAC)](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Realtime Architecture](https://supabase.com/docs/guides/realtime/architecture)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Storage Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations)
- [Custom Access Token Hook](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)
- [MDN: Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN: Service Workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers)

### Medium-Confidence Sources (Technical Blogs, Recent 2026)

- [Building an Offline-First PWA Notes App with Next.js, IndexedDB, and Supabase](https://oluwadaprof.medium.com/building-an-offline-first-pwa-notes-app-with-next-js-indexeddb-and-supabase-f861aa3a06f9)
- [Supabase MVP Architecture in 2026: Practical Patterns](https://www.valtorian.com/blog/supabase-mvp-architecture)
- [Multi-Tenant Applications with RLS on Supabase](https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/)
- [Modern Web Architecture Without a Backend — Using Supabase](https://zenstack.dev/blog/supabase)
- [Offline-First PWAs: Service Worker Caching Strategies](https://www.magicbell.com/blog/offline-first-pwas-service-worker-caching-strategies)
- [PWA, Indexed DB, and a Reliable Queue — Offline-First by Design](https://medium.com/@11.sahil.kmr/offline-first-by-design-pwa-indexed-db-and-a-reliable-queue-775605b3d76c)
- [Supabase Best Practices](https://www.leanware.co/insights/supabase-best-practices)
- [Supabase Multi-Tenancy CRM Integration Guide](https://www.stacksync.com/blog/supabase-multi-tenancy-crm-integration)

### Implementation References (GitHub, Open Source)

- [pwa-qr-code-scanner](https://github.com/Minishlink/pwa-qr-code-scanner)
- [supabase-custom-claims](https://github.com/supabase-community/supabase-custom-claims)
- [js13kGames PWA Structure](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/App_structure)

---

## Conclusion

This architecture enables a **rapid, secure, and scalable** migration from a monolithic HTML file to a production PWA with minimal rewrites. By leveraging Supabase's built-in capabilities (Auth, RLS, Storage, Realtime) and following **offline-first, Postgres-first, security-first** principles, the system can launch in Phase 1 with basic multi-tenant functionality and incrementally add advanced features (offline sync, realtime, multi-tenant SaaS) in later phases.

**Critical Success Factors:**

1. **RLS policies configured correctly** — Security depends entirely on database-layer enforcement
2. **Offline sync tested thoroughly** — Field workers rely on unstable networks
3. **Incremental migration** — Don't rewrite everything at once, evolve existing code
4. **Monitor performance early** — Add indexes proactively, don't wait for slowdowns

**Next Steps:**

1. Review with development team to validate technical feasibility
2. Use this document to inform roadmap phase structure (see SUMMARY.md)
3. Begin Phase 1 implementation (schema design, auth integration, localStorage replacement)
