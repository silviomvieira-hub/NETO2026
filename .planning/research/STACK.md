# Technology Stack

**Project:** CampanhaApp - Political Campaign Management Platform
**Researched:** 2026-04-09
**Confidence:** HIGH

## Executive Summary

This stack recommendation is optimized for evolving an existing 2,474-line single-file HTML/CSS/JS application into a production-ready PWA with Supabase backend, while maintaining the vanilla JavaScript approach (no framework) to preserve existing code and team familiarity.

**Core Philosophy:** Leverage modern browser APIs and lightweight libraries, minimize build complexity, maximize deployment speed.

## Recommended Stack

### Core Backend: Supabase

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @supabase/supabase-js | 2.102.1 | Complete backend client (auth, database, storage, realtime) | Official Supabase JavaScript client. Isomorphic (browser + Node), TypeScript support, includes all needed APIs. Active development (updated 17 hours ago as of search). **MEDIUM confidence on exact version** - verify latest via `npm view @supabase/supabase-js version` |

**Installation:**
```bash
npm install @supabase/supabase-js
```

**Rationale:** Supabase provides auth, PostgreSQL database, file storage, and realtime subscriptions out of the box. RLS (Row Level Security) handles multi-tenant isolation natively without complex middleware. Free tier supports 500MB database, 1GB storage, 50K auth users - sufficient for initial deployment and Neto's campaign.

**Configuration:** Store `SUPABASE_URL` and `SUPABASE_ANON_KEY` in environment variables. Use `anon` key for client-side (safe to expose), `service_role` key only server-side for admin operations.

**Confidence:** HIGH - Official documentation, active development, proven multi-tenant architecture via RLS.

---

### PWA & Service Worker

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Workbox | 7.4.0 | Service worker generation and management | Industry standard from Google Chrome team. Handles caching strategies, offline fallbacks, precaching. Proven reliability for PWA offline functionality. |

**Key Workbox Modules:**
- `workbox-core` 7.4.0 - Core service worker logic
- `workbox-strategies` 7.4.0 - Caching strategies (CacheFirst, NetworkFirst, StaleWhileRevalidate)
- `workbox-precaching` 7.4.0 - Precache critical assets on install
- `workbox-routing` 7.4.0 - Route requests to appropriate strategies

**Alternative Approach:** Native Service Worker API (no library)

For this brownfield project with urgency constraints, **recommend starting with native Service Worker** to minimize tooling complexity, then migrate to Workbox if advanced caching strategies are needed.

**Native Service Worker Template:**
```javascript
// sw.js - place at root
const CACHE_NAME = 'campanha-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

**PWA Manifest:** Create `manifest.json` manually (no library needed):
```json
{
  "name": "CampanhaApp - Neto Rodrigues 2026",
  "short_name": "CampanhaApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#22c55e",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Confidence:** HIGH - PWA manifest is W3C standard, Service Worker API is native to all modern browsers.

---

### Interactive Maps

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Leaflet.js | 1.9.4 (stable) | Interactive maps of DF's 33 RAs | Lightweight (42KB), mobile-friendly, extensive plugin ecosystem. Open-source, no API keys/vendor lock-in. Industry standard for non-WebGL mapping. |

**Installation:**
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

**Alternative:** MapLibre GL JS (WebGL-based, vector tiles, 3D terrain support) - **NOT recommended** for this project. Leaflet's simpler API and lighter footprint better match project constraints.

**Note:** Leaflet 2.0 is in alpha (released Aug 2025) with modern ESM modules and dropped IE support. **Recommend staying on 1.9.4** for production stability unless ESM modules are critical.

**Confidence:** HIGH - Leaflet 1.9.4 is latest stable, widely adopted, official documentation current.

---

### QR Code Generation & Scanning

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| qrcode (npm) | 1.5.4 | QR code generation for lead capture | Most popular JS QR library (3.4M weekly downloads). Works in browser and Node. Supports Canvas, SVG, Data URL output. No dependencies. |

**Installation:**
```bash
npm install qrcode
```

**Browser Usage:**
```javascript
import QRCode from 'qrcode';

// Generate QR code as Data URL
const qrDataURL = await QRCode.toDataURL('https://campanha.app/lead/coord-123');

// Or render to canvas element
QRCode.toCanvas(document.getElementById('canvas'), 'https://campanha.app/lead/coord-123');
```

**For QR Code Scanning (reading):** Use native browser API `BarcodeDetector` (supported in Chrome/Edge) or fallback to `html5-qrcode` library (cross-browser).

**Alternative Libraries Considered:**
- `qrious` (12KB, canvas-only) - Too limited, no SVG support
- `qr-code-styling` (logo support, gradients) - Overkill for this use case
- `qrcode.js` (davidshimjs) - Older, less maintained

**Confidence:** MEDIUM - Library version is 2 years old but stable. Verify with `npm view qrcode version` for any security patches.

---

### PDF Report Generation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| pdfmake | 0.2.x (check latest) | Campaign progress reports | Declarative API (JSON-based layout), supports tables, images, headers/footers. Better for structured data reports than jsPDF. |

**Installation:**
```bash
npm install pdfmake
```

**Why NOT jsPDF:** While jsPDF is lighter (~150KB vs pdfmake's larger bundle), pdfmake's declarative approach is better suited for complex, data-driven reports (campaign statistics, regional performance, leader lists). jsPDF requires imperative positioning code.

**Alternative for Simple PDFs:** `html2pdf.js` - Converts existing HTML to PDF using html2canvas + jsPDF. Good for "print to PDF" functionality of existing dashboard views.

**Recommended Approach:**
1. **Phase 1:** Use `html2pdf.js` to generate PDFs from existing dashboard HTML (fastest implementation)
2. **Phase 2:** Migrate to `pdfmake` when custom report templates are needed

```bash
npm install html2pdf.js
```

**Confidence:** MEDIUM - pdfmake is well-established but bundle size impact needs verification. html2pdf.js is proven for HTML-to-PDF conversion.

---

### Charts & Visualization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Chart.js | 4.5.1 | Poll results, campaign progress graphs | Most popular JS charting library. Responsive, canvas-based, 8 chart types built-in. Actively maintained (v4 released 2023). Excellent mobile support. |

**Installation:**
```bash
npm install chart.js
```

**Browser CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
```

**Why Chart.js over alternatives:**
- **vs Apache ECharts:** Chart.js is lighter, simpler API, better for basic charts
- **vs D3.js:** Chart.js is higher-level (less code for standard charts), D3 is overkill for this use case
- **vs Plotly.js:** Chart.js has smaller bundle size, better mobile performance
- **vs Chartist:** Chartist is lightweight (10KB) but limited features and declining maintenance

**Use Cases in This Project:**
- Poll comparison charts (line/bar)
- Campaign progress over time (line)
- Regional activity distribution (bar/doughnut)
- XP leaderboard visualization (horizontal bar)

**Confidence:** HIGH - Chart.js 4.5.1 is latest stable, official npm package, active community.

---

### Image Upload & Screenshot

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Supabase Storage | (included in supabase-js) | Photo upload for activity proofs | Built into Supabase, handles uploads, generates signed URLs, supports image transformations (resize on-demand). Pro plan includes automatic resizing. |
| html2canvas | 1.4.1 (verify latest) | Optional: Screenshot dashboard for reports | Industry standard for client-side screenshots. Converts DOM to canvas, preserves styles. Useful for "snapshot" features. |

**Supabase Storage Limits (Free Tier):**
- 1GB total storage
- 25MB max file size
- 50MB total bandwidth

**Image Resizing:** Available on Pro plan ($25/mo). Resize on-demand via URL parameters:
```javascript
const { data } = supabase.storage
  .from('activity-photos')
  .getPublicUrl('photo.jpg', {
    transform: {
      width: 800,
      height: 600,
      resize: 'cover',
      quality: 80
    }
  });
```

**Alternative:** Client-side resize before upload using `canvas` API to stay on free tier.

**html2canvas Note:** Optional dependency. Only add if screenshot functionality is required. Can be deferred to Phase 2+.

**Confidence:** HIGH for Supabase Storage (official docs), MEDIUM for html2canvas version (verify latest).

---

### Routing (SPA Navigation)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Native History API | (browser built-in) | Multi-page navigation within single HTML file | No library needed. Use `history.pushState()` for navigation, `popstate` event listener for back/forward. Modern browsers fully support. |

**Implementation Pattern:**
```javascript
// app-router.js
class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.href);
      }
    });
  }

  navigate(url) {
    history.pushState(null, null, url);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/404'];
    route();
  }
}

// Usage
const router = new Router({
  '/': renderDashboard,
  '/agenda': renderAgenda,
  '/cidades': renderCidades,
  '/404': render404
});
```

**Why NOT use a routing library:**
- `page.js`, `navigo`, `router5` add minimal value for this use case
- Native API is sufficient for hash-based (`#/page`) or path-based routing
- One less dependency, faster load time
- Existing codebase likely uses manual DOM manipulation already

**Hash-based vs Path-based Routing:**
- **Hash-based** (`#/dashboard`): Works without server config, simpler deployment
- **Path-based** (`/dashboard`): Requires server redirect rules (all paths → index.html)

**Recommendation:** Use hash-based routing initially (no server config), migrate to path-based if SEO becomes important (unlikely for auth-gated campaign tool).

**Confidence:** HIGH - History API is W3C standard, supported in all modern browsers.

---

### State Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Native Proxy API | (browser built-in) | Reactive state management | Modern JavaScript (ES6+) Proxy enables reactive patterns without libraries. Observable state changes trigger UI updates automatically. |
| localStorage API | (browser built-in) | Offline persistence, session continuity | Built-in browser API. Store user preferences, draft data, offline queue. Synchronous, simple API. |

**Reactive State Pattern (2026 Best Practice):**
```javascript
// state.js
function createStore(initialState) {
  const listeners = new Set();

  const state = new Proxy(initialState, {
    set(target, property, value) {
      target[property] = value;
      listeners.forEach(listener => listener(state));
      return true;
    }
  });

  return {
    state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

// Usage
const appStore = createStore({
  user: null,
  currentRA: null,
  missions: []
});

appStore.subscribe(state => {
  // Auto-update UI when state changes
  renderDashboard(state);
});

appStore.state.user = await supabase.auth.getUser();
```

**localStorage Persistence:**
```javascript
// Persist specific state to localStorage
appStore.subscribe(state => {
  localStorage.setItem('app-state', JSON.stringify({
    currentRA: state.currentRA,
    filters: state.filters
  }));
});

// Restore on load
const savedState = JSON.parse(localStorage.getItem('app-state') || '{}');
```

**Why NOT use a state management library:**
- No Redux (overkill, steep learning curve, requires middleware for async)
- No MobX (framework-like, not idiomatic vanilla JS)
- No Zustand (good for React, not needed for vanilla JS)

**Confidence:** HIGH - Proxy API is ES6 standard (2015), supported in all modern browsers. localStorage is Web Storage API standard.

---

### Build Tools & Module Bundling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vite | 6.x (check latest) | Development server, production bundling (optional) | Fastest dev experience. Native ESM in dev, Rollup for production. Zero config for vanilla JS. esbuild-powered. |

**Alternative 1: No Build Tool (simplest)**

For this brownfield project, **start with NO build tool**:
1. Use native ES modules (`<script type="module">`)
2. Import npm packages via CDN (Skypack, esm.sh, jsDelivr)
3. Deploy static files directly

**Example:**
```html
<!-- index.html -->
<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm';

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
```

**When to Add Vite:**
- When CDN imports become unwieldy (too many dependencies)
- When you need TypeScript
- When you want optimized production builds (minification, tree-shaking)

**Vite Setup (if needed):**
```bash
npm create vite@latest . -- --template vanilla
npm install
npm run dev  # Dev server at localhost:5173
npm run build  # Production build to /dist
```

**Why Vite over Webpack:**
- 10-100x faster dev server startup
- Instant hot module replacement (HMR)
- Zero config for vanilla JS
- Built-in production optimization

**Why Vite over esbuild directly:**
- esbuild is a bundler/transpiler, not a dev server
- Vite uses esbuild under the hood but adds dev server, HMR, plugin ecosystem
- Vite is better DX for web apps; esbuild is better for libraries/CLIs

**Recommendation:** Start without build tools, add Vite in Phase 2 if complexity grows.

**Confidence:** HIGH - Vite is industry standard (2026), official vanilla JS template available.

---

### Hosting & Deployment

| Platform | Purpose | Why |
|----------|---------|-----|
| Vercel | Static site hosting, frontend deployment | Zero-config deployment from GitHub. Global CDN, automatic HTTPS, preview deployments. Free tier: unlimited bandwidth for personal projects. Deploy with `vercel` CLI or GitHub integration. |

**Alternative Hosting Options:**
- **Netlify:** Similar to Vercel, slightly better for static sites, built-in form handling
- **Supabase Hosting:** Not available yet (as of 2026 search results)
- **Cloudflare Pages:** Free unlimited bandwidth, fast global CDN, good for static sites
- **GitHub Pages:** Free but limited (no server-side redirects for SPA routing)

**Recommended: Vercel + Supabase**
- Vercel hosts frontend (HTML/CSS/JS)
- Supabase hosts backend (database, auth, storage, realtime)
- Store Supabase credentials in Vercel environment variables
- Deploy via GitHub: `git push` → auto-deploy to production

**Setup:**
```bash
npm install -g vercel
vercel login
vercel  # Follow prompts, link to GitHub repo
```

**Environment Variables (Vercel Dashboard):**
- `VITE_SUPABASE_URL` → Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` → Your Supabase anon key

**Confidence:** HIGH - Vercel is industry standard for frontend deployment, seamless Supabase integration documented.

---

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Day.js | 1.11.x | Date manipulation, formatting | Lightweight (2KB) alternative to Moment.js. Use for agenda dates, countdown timer, campaign timeline. |
| DOMPurify | 3.x | Sanitize user-generated HTML | Prevent XSS attacks when rendering user content (demands, leader names). Use when innerHTML is unavoidable. |
| Sortable.js | 1.15.x | Drag-and-drop reordering | If priority ordering UI is needed for demands/missions. Optional, can defer. |

**Day.js Installation:**
```bash
npm install dayjs
```

**Day.js Usage:**
```javascript
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const electionDate = dayjs('2026-10-04');
const countdown = electionDate.diff(dayjs(), 'day'); // Days until election
const formattedDate = dayjs().format('DD/MM/YYYY HH:mm');
```

**DOMPurify (if needed):**
```bash
npm install dompurify
```

**Use Case:** Sanitize markdown or rich text from leaders/demands:
```javascript
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userContent);
```

**Confidence:** HIGH for Day.js (active maintenance), HIGH for DOMPurify (security-critical library, OWASP recommended).

---

## What NOT to Use (Anti-Stack)

| Technology | Why Avoid |
|------------|-----------|
| React / Vue / Angular | Project constraint: evolve existing vanilla JS code. Frameworks require complete rewrite, add build complexity, steeper learning curve for team. |
| jQuery | Legacy library (2006). Modern DOM APIs (`querySelector`, `fetch`, `classList`) are now native. Adds 30KB for no benefit. |
| Moment.js | Deprecated, large bundle (67KB). Use Day.js (2KB) or native Intl.DateTimeFormat. |
| Lodash | Useful but adds 24KB. Most utilities now have native equivalents (array methods, Object.entries). Only add if specific functions are critical. |
| Axios | Adds 13KB on top of native `fetch` API. Not needed unless interceptors/retries are required. Use fetch + custom retry wrapper if needed. |
| Socket.io | Supabase Realtime already provides WebSocket subscriptions. Redundant. |
| Firebase | Overlaps 100% with Supabase. Avoid vendor lock-in by standardizing on Supabase. |
| MongoDB/Prisma/TypeORM | Supabase uses PostgreSQL. Adding another database layer is unnecessary complexity. |
| Express/Fastify/Hono | No custom backend needed. Supabase Edge Functions (Deno) handle serverless logic if needed. |
| Tailwind CSS | Project already has custom CSS (2474 lines). Adding Tailwind requires class refactor. Keep existing styles. |

---

## Installation Checklist

**Minimum Viable Stack (Phase 1: Supabase Migration):**
```bash
npm init -y
npm install @supabase/supabase-js
npm install qrcode
npm install dayjs
```

**Add When Needed (Phase 2+):**
```bash
npm install chart.js        # When poll charts are implemented
npm install leaflet          # When interactive maps are added
npm install pdfmake          # When PDF reports are required
npm install html2canvas      # If screenshot functionality is needed
npm install dompurify        # If user-generated HTML is rendered
```

**Development (optional):**
```bash
npm install -D vite          # If build tooling is added
npm install -D @types/node   # For TypeScript types (if using TS)
```

---

## Dependency Tree & Bundle Size Impact

**Estimated Total Bundle Size (all dependencies):**
- `@supabase/supabase-js`: ~50KB gzipped
- `qrcode`: ~12KB gzipped
- `dayjs`: ~2KB gzipped
- `chart.js`: ~60KB gzipped
- `leaflet`: ~42KB gzipped
- `pdfmake`: ~150KB gzipped (largest)

**Total:** ~316KB gzipped (all features enabled)

**Progressive Loading Strategy:**
```javascript
// Load heavy libraries only when needed
async function loadPDFGenerator() {
  const pdfMake = await import('pdfmake/build/pdfmake');
  return pdfMake;
}

async function loadCharts() {
  const Chart = await import('chart.js');
  return Chart;
}
```

---

## Browser Support Matrix

**Target Browsers (Based on Project Constraints):**
- Chrome/Edge 90+ (primary - field teams on Android)
- Safari 14+ (iOS users)
- Firefox 88+ (secondary)

**Features Requiring Modern Browsers:**
- Service Worker API (PWA offline support)
- ES6 Modules (native `import/export`)
- Proxy API (reactive state)
- History API (SPA routing)
- LocalStorage API (offline persistence)

**Polyfills:** None needed if supporting Chrome 90+. All APIs are native.

**Progressive Enhancement:**
- If Service Worker unsupported, app works online-only
- If localStorage unsupported, session-only state (rare)

---

## Security Considerations

**Supabase Row Level Security (RLS):**
- Enable RLS on ALL tables
- Default policy: `user_id = auth.uid()` for user-owned data
- Multi-tenant policy: `tenant_id = auth.jwt() -> 'tenant_id'` (store in JWT claims)
- Index columns used in RLS policies (performance)

**Example RLS Policy (leaders table):**
```sql
-- Only coordinators/admins can view leaders in their tenant
CREATE POLICY "Tenant isolation" ON leaders
  FOR SELECT
  USING (tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id'));
```

**Environment Variables:**
- NEVER commit `.env` files to Git
- Store secrets in Vercel environment variables
- Use `VITE_` prefix for client-side vars (Vite exposes them)
- Rotate keys if exposed

**Content Security Policy (CSP):**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://cdn.jsdelivr.net;
               style-src 'self' 'unsafe-inline';
               connect-src 'self' https://*.supabase.co;">
```

**XSS Prevention:**
- Use `textContent` instead of `innerHTML` when possible
- Sanitize with DOMPurify if HTML rendering is required
- Escape user input in SQL queries (Supabase client handles this)

---

## Migration Strategy (Existing Code → New Stack)

**Phase 1: Backend Migration (localStorage → Supabase)**
1. Install `@supabase/supabase-js`
2. Create Supabase project, get credentials
3. Refactor data layer: `localStorage.getItem()` → `supabase.from('table').select()`
4. Test data CRUD operations
5. Keep localStorage as fallback (offline queue)

**Phase 2: PWA Conversion**
1. Add `manifest.json`
2. Implement basic Service Worker (cache static assets)
3. Test offline functionality
4. Add "Install App" prompt

**Phase 3: Feature Additions**
1. QR code generation for lead capture
2. Photo upload via Supabase Storage
3. Interactive maps with Leaflet
4. PDF reports with pdfmake
5. Charts with Chart.js

**Phase 4: Optimization**
1. Add Vite for production builds
2. Code splitting (dynamic imports)
3. Image optimization
4. Performance monitoring

---

## Confidence Assessment

| Component | Confidence | Notes |
|-----------|------------|-------|
| Supabase Client | HIGH | Official package, active development, proven multi-tenant |
| PWA/Service Worker | HIGH | Web standards, native APIs, extensive documentation |
| Leaflet | HIGH | Stable 1.9.4 release, industry standard |
| QR Code | MEDIUM | Library is 2 years old but stable. Verify latest version. |
| PDF Generation | MEDIUM | pdfmake vs html2pdf decision needs validation in Phase 1. Bundle size impact TBD. |
| Chart.js | HIGH | Latest stable, active maintenance, proven library |
| Routing | HIGH | Native History API, web standard |
| State Management | HIGH | Native Proxy API, modern pattern (2026) |
| Build Tools | HIGH | Vite is industry standard, but recommend no build initially |
| Hosting | HIGH | Vercel + Supabase integration well-documented |

**Overall Stack Confidence: HIGH**

All core dependencies (Supabase, PWA, Leaflet, Chart.js) are industry-standard, actively maintained, and well-documented. Medium-confidence items (QR, PDF) are low-risk: fallbacks exist if issues arise.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Backend | Supabase | Firebase | Firebase pricing less predictable, Supabase has native PostgreSQL (more powerful queries), better RLS for multi-tenant |
| Backend | Supabase | PocketBase | Younger ecosystem (2022), Go-based (less JS ecosystem fit), Supabase has managed hosting |
| Maps | Leaflet | MapLibre GL JS | MapLibre requires WebGL, larger bundle, steeper learning curve. Leaflet is simpler for 2D RA boundaries. |
| Maps | Leaflet | Google Maps API | Vendor lock-in, API key costs at scale, Leaflet is open-source |
| PDF | pdfmake | jsPDF | jsPDF imperative API harder for complex reports. pdfmake's declarative JSON better for data-driven docs. |
| PDF | pdfmake/html2pdf | Puppeteer | Puppeteer is server-side only (headless Chrome), requires backend. Client-side libs fit architecture better. |
| Charts | Chart.js | D3.js | D3 is low-level, requires more code for basic charts. Chart.js is higher-level, better for standard visualizations. |
| Charts | Chart.js | Apache ECharts | ECharts is heavier, overkill for this project's chart complexity |
| QR Code | qrcode | qr-code-styling | qr-code-styling adds logo/styling features not needed. qrcode is simpler. |
| Build Tool | None/Vite | Webpack | Webpack slower (10-100x), more config needed. Vite is 2026 standard. |
| Hosting | Vercel | Netlify | Both excellent. Vercel chosen for Next.js-like DX, preview deployments, better Supabase docs integration. |
| Hosting | Vercel | Cloudflare Pages | Cloudflare good but Vercel has better GitHub integration, simpler workflow. |

---

## Version Verification Commands

Before finalizing installation, verify latest versions:

```bash
# Supabase client
npm view @supabase/supabase-js version

# Workbox (if using)
npm view workbox version

# QR code library
npm view qrcode version

# Leaflet
npm view leaflet version

# Chart.js
npm view chart.js version

# pdfmake
npm view pdfmake version

# html2canvas (optional)
npm view html2canvas version

# Day.js
npm view dayjs version

# Vite (if using)
npm view vite version
```

Run these commands during Phase 1 kickoff to ensure versions in this document are current.

---

## Open Questions & Research Gaps

1. **QR Code Scanning (Reading):** Recommended `qrcode` for generation, but scanning needs separate library or native `BarcodeDetector` API. Research required: Browser support for BarcodeDetector in Safari (iOS field workers).

2. **Supabase Storage Image Resizing:** Available on Pro plan ($25/mo). If staying on free tier, client-side resize strategy needed. Research: Canvas API for resize before upload, quality/performance tradeoffs.

3. **Multi-Tenant JWT Claims:** How to inject `tenant_id` into Supabase JWT for RLS? Research: Supabase auth hooks, custom claims, or separate `profiles` table join.

4. **Offline Queue:** Service Worker can cache reads, but what about offline writes (create leader while offline)? Research: Background Sync API, IndexedDB queue pattern.

5. **PDF Bundle Size:** pdfmake is ~150KB. Acceptable? Or should html2pdf.js (HTML→PDF) be primary approach? Validate in Phase 1 with actual report complexity.

6. **Gamification Real-time Updates:** How to show live leaderboard updates across users? Supabase Realtime subscriptions to `points` table? Research: Performance with 50+ concurrent users.

---

## Sources

### Supabase
- [Supabase JavaScript Client - npm](https://www.npmjs.com/package/@supabase/supabase-js)
- [Supabase JavaScript API Reference](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Multi-Tenant Applications with RLS on Supabase](https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/)
- [Supabase Storage Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations)

### PWA & Service Workers
- [Workbox | Chrome for Developers](https://developer.chrome.com/docs/workbox)
- [Building a PWA with Vanilla JavaScript | Progressier](https://progressier.com/quickstart/building-a-pwa-with-vanilla-javascript)
- [How to Build a PWA in Vanilla JavaScript | DigitalOcean](https://www.digitalocean.com/community/tutorials/js-vanilla-pwa)
- [PWA app work offline with Workbox](https://rahultomar092.medium.com/how-to-make-pwa-app-work-offline-6c9bac20692e)

### Maps
- [Leaflet.js - Official Site](https://leafletjs.com/)
- [Leaflet Releases](https://github.com/leaflet/leaflet/releases)
- [MapLibre GL JS vs. Leaflet](https://blog.jawg.io/maplibre-gl-vs-leaflet-choosing-the-right-tool-for-your-interactive-map/)
- [JavaScript Map Libraries Comparison | Colorlib](https://colorlib.com/wp/javascript-libraries-for-creating-dynamic-maps/)

### QR Codes
- [qrcode - npm](https://www.npmjs.com/package/qrcode)
- [10 Best QR Code Generators (2026)](https://www.jqueryscript.net/blog/best-custom-qr-code-generator.html)
- [QR Code Generator (Nayuki) - GitHub](https://github.com/nayuki/QR-Code-generator)

### PDF Generation
- [Top JavaScript PDF Libraries (2026) | Nutrient](https://www.nutrient.io/blog/top-js-pdf-libraries/)
- [Comparing Open Source PDF Libraries (2025) | Joyfill](https://medium.com/joyfill/comparing-open-source-pdf-libraries-2025-edition-7e7d3b89e7b1)
- [jsPDF vs pdfmake Comparison](https://codingkampany.substack.com/p/jspdf-vs-pdfmake-which-pdf-library)
- [PDF Bundle Size Comparison - DEV](https://dev.to/handdot/generate-a-pdf-in-js-summary-and-comparison-of-libraries-3k0p)

### Charts
- [Chart.js - npm](https://www.npmjs.com/package/chart.js)
- [JavaScript Chart Libraries (2026) | Luzmo](https://www.luzmo.com/blog/javascript-chart-libraries)
- [Best Chart.js Alternatives (2026)](https://www.g2.com/products/chart-js/competitors/alternatives)

### State Management
- [State Management in Vanilla JS: 2026 Trends | Medium](https://medium.com/@chirag.dave/state-management-in-vanilla-js-2026-trends-f9baed7599de)
- [Modern State Management in Vanilla JavaScript (2026) | Medium](https://medium.com/@orami98/modern-state-management-in-vanilla-javascript-2026-patterns-and-beyond-ce00425f7ac5)
- [Build State Management System with Vanilla JS | CSS-Tricks](https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/)

### Routing
- [Build SPA Router in Vanilla JS](https://jsdev.space/spa-vanilla-js/)
- [Building Modern SPAs with Vanilla JS | DEV](https://dev.to/moseeh_52/building-modern-spas-with-vanilla-javascript-a-beginners-guide-9a3)
- [Async Page Transitions in Vanilla JS (Feb 2026) | Codrops](https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/)

### Build Tools
- [Webpack vs Vite vs esbuild (2026) | DEV](https://dev.to/_d7eb1c1703182e3ce1782/webpack-vs-vite-vs-esbuild-the-2026-build-tool-comparison-3gj8)
- [Vite vs Webpack (2026) | The Software Scout](https://thesoftwarescout.com/vite-vs-webpack-2026-which-javascript-build-tool-should-you-choose/)
- [Esbuild vs Vite Comparison | Better Stack](https://betterstack.com/community/guides/scaling-nodejs/esbuild-vs-vite/)

### Hosting
- [Supabase vs Vercel (2026) Comparison](https://www.buildmvpfast.com/compare/supabase-vs-vercel)
- [Vercel vs Supabase Features & Differences | UI Bakery](https://uibakery.io/blog/vercel-vs-supabase)
- [Why I Choose Supabase, Vercel, GitHub | DEV](https://dev.to/allanninal/why-i-choose-supabase-vercel-and-github-for-most-of-my-personal-projects-o8h)

### Image Handling
- [html2canvas - Screenshots with JavaScript](https://html2canvas.hertzen.com/)
- [html2canvas GitHub](https://github.com/niklasvh/html2canvas)
- [Take Screenshot with Html2Canvas](https://makitweb.com/take-screenshot-of-webpage-with-html2canvas/)

---

**END OF STACK.md**
