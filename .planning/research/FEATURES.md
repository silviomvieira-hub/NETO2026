# Feature Landscape

**Domain:** Political Campaign Management Platform
**Researched:** 2026-04-09
**Confidence:** MEDIUM

## Research Context

This research examined political campaign management platforms globally (NationBuilder, NGP VAN, Ecanvasser, Aristotle, Campaign Nucleus) and Brazilian-specific tools (LideraAI, ELEGIS, Confirma, Participa+) to understand the feature ecosystem. Research prioritized features relevant for field-intensive campaigns with distributed teams (coordinators and field workers/cabos eleitorais).

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Contact/Voter Database** | Central to all campaign operations - must track supporters, volunteers, donors | Medium | Standard CRM functionality: name, phone, email, address, tags/segments, interaction history |
| **Role-Based Access Control** | Different team members need different permissions (admin/coordinator/field worker) | Medium | Industry standard: admin (full access), coordinator (regional view), volunteer (limited to assigned tasks) |
| **Mobile-Responsive Interface** | Field workers operate primarily on smartphones | Low | Mobile-first expected - 66% of Brazilians access internet via mobile |
| **Event Calendar/Agenda** | Campaigns run on schedules - rallies, debates, meetings, canvassing events | Low | Basic scheduling with event types, dates, locations, attendees |
| **Team/Volunteer Management** | Must track who's on the team, their roles, regions assigned | Low | Basic directory with name, role, contact info, region |
| **Activity Dashboard** | Campaign staff need real-time overview of progress | Medium | Key metrics visible at glance: contacts made, events scheduled, volunteers active, days until election |
| **Contact Segmentation/Filtering** | Need to organize supporters by region, level of support, demographics | Low | Filter and segment contacts for targeted outreach |
| **Basic Reporting** | Campaigns need to show progress to candidates/coordinators | Medium | Export lists, generate summaries of activity, visualize progress |
| **Data Export** | Must be able to extract data for analysis or migration | Low | JSON, CSV, or Excel export of core data |
| **WhatsApp Integration** | In Brazil, 90% of internet users use WhatsApp - critical communication channel | Low | Minimum: wa.me links for direct messaging and group invites |
| **User Authentication** | Multi-user system requires secure login | Medium | Email/password auth at minimum, session management |
| **Field Worker Check-In** | Track that field workers are active and where they're working | Low | GPS-tagged activity logging, territory assignment |

## Differentiators

Features that set products apart. Not expected, but valued when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Gamification System (XP/Ranking/Missions)** | Transforms volunteer engagement from obligation to game - proven 30% increase in user engagement | High | STRONG DIFFERENTIATOR - rarely found in political platforms, borrowed from nonprofit volunteer management |
| **QR Code Lead Capture** | Field workers can instantly capture supporter info without typing - faster, more accurate | Low | QR shows form URL, supporter fills out, auto-saves to database with source tracking |
| **Photo Proof of Activity** | Replaces blind trust with visual verification - accountability for field activities | Medium | Upload photos/screenshots as evidence for missions completed, geo-tagged |
| **Offline-First PWA** | Field workers can operate without internet, sync when connected - critical for Brazil's connectivity issues | High | Service workers + IndexedDB for offline data storage, background sync when online |
| **Interactive Territory Maps** | Visualize coverage, leader distribution, demands by region - spatial intelligence | Medium | Leaflet.js with markers for leaders, color-coded RAs for visit tracking |
| **Multi-Tenant White Label** | Sell to other candidates with isolated data and branding - monetization model | High | Row-level security in database, configurable colors/logos/names per tenant |
| **Automated WhatsApp List Generation** | One-click export phone numbers for bulk messaging via WhatsApp Web | Low | Filter contacts, copy phone list formatted for WhatsApp |
| **Lead Source Tracking** | Know where supporters came from (event, QR code, referral) - optimize outreach | Low | Track origin of each contact, report which sources perform best |
| **Community Demand Tracking** | Residents can report issues, campaign tracks and resolves - builds grassroots credibility | Medium | Ticket system for community requests with category, priority, status, resolution |
| **Political Mapping (Allies/Adversaries)** | Track relationships with other politicians - strategic intelligence | Low | Directory of political figures with relationship status and notes |
| **Progressive Web App Installation** | Install like native app without app stores - instant updates, no review delays | Medium | PWA manifest + service worker enables "Add to Home Screen" |
| **Real-Time Activity Feed** | See team activity as it happens - motivates competition, visibility for admins | Medium | Live stream of actions: "João cadastrou apoiador", "Maria visitou Ceilândia" |
| **Streak System** | Reward consecutive days of activity - habit formation | Low | Track daily login/activity, display streak count, award bonuses |
| **Trophy/Achievement System** | Recognize milestone accomplishments - status and motivation | Medium | Unlock badges for achievements (100 contacts, all RAs visited, 30-day streak) |
| **PDF Report Generation** | Professional reports for candidate review or donor presentations | Medium | jsPDF to generate formatted summaries with charts and data |
| **Poll Tracking with Charts** | Monitor electoral research over time - trend visibility | Low | Store poll data with dates, visualize with Chart.js or similar |
| **Campaign Materials Inventory** | Track physical items (banners, flyers, t-shirts) - logistics management | Low | Item name, quantity, supplier, distribution log |
| **Push Notifications (PWA)** | Alert volunteers about new missions or events - engagement driver | Medium | Requires PWA + notification API, opt-in consent |
| **Election Countdown Timer** | Creates urgency, keeps deadline visible | Low | Simple date calculation, prominent display |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Native Mobile Apps (iOS/Android)** | High complexity, slow updates, app store approval delays, double development effort | Use PWA - installs from browser, instant updates, single codebase |
| **Direct WhatsApp Business API Integration** | Expensive (requires WhatsApp Business API subscription), complex setup, regulatory compliance | Use wa.me links - free, simple, works with regular WhatsApp |
| **Built-in Payment/Billing System** | Adds compliance complexity (PCI-DSS), financial regulations, customer support burden | Manual sales contracts, accept payment externally (bank transfer, PayPal) |
| **AI Chatbot / Virtual Assistant** | High development cost, maintenance burden, users expect ChatGPT-level quality | Focus on clear UI and help documentation instead |
| **Live Streaming Video** | Massive bandwidth costs, technical complexity, existing platforms work well | Link to Instagram Live, YouTube, Facebook Live |
| **Email Marketing Platform** | Deliverability challenges, spam regulations, existing tools are mature | Integrate with or link to Mailchimp, SendGrid, or similar |
| **Voter File Database (National Registry)** | Data acquisition is expensive or illegal, privacy regulations (LGPD), maintenance complexity | Let campaigns import their own supporter lists |
| **SMS Messaging** | Costs per message, regulatory restrictions in Brazil, WhatsApp dominates | Use WhatsApp instead |
| **Compliance Reporting (TSE/FEC)** | Every jurisdiction has different rules, legal liability, requires lawyer review | Out of scope - campaigns use accountants/lawyers for compliance |
| **Social Media Posting** | Platform APIs change frequently, multi-platform complexity, limited value | Provide content templates, let users post manually |
| **Voter Persuasion Scoring** | Requires sophisticated data science, expensive voter files, accuracy questioned | Let campaigns track contact interactions and make own judgments |
| **Integrated CRM for Donors** | Donor management is complex regulated domain, campaigns often use specialized tools | Track supporters as contacts, note donation interest, export for external tools |
| **Video Call / Virtual Events** | Zoom/Google Meet/Teams already solve this well, high infrastructure cost | Provide links to external video platforms in event management |
| **Blockchain / NFT Anything** | No proven use case, adds complexity, skepticism from users | Traditional database with audit logs is sufficient |
| **Advanced Voter Analytics / Predictive Modeling** | Requires data science team, expensive data sources, ongoing maintenance | Provide basic reporting and let campaigns do external analysis |

## Feature Dependencies

```
User Authentication → Role-Based Access Control
Role-Based Access Control → Multi-Tenant Isolation
Contact Database → Contact Segmentation
Contact Database → Lead Source Tracking
Contact Database → WhatsApp Integration
PWA Basics → Offline Mode
PWA Basics → Push Notifications
PWA Basics → Installable App
Photo Upload → Cloud Storage (Supabase Storage)
Gamification Points → Ranking System
Gamification Points → Activity Feed
Activity Logging → Photo Proof
Map Display → Territory Assignment
Event Calendar → RSVP Tracking
```

## Feature Complexity Breakdown

**Low Complexity (Quick Wins):**
- Election countdown, basic calendar, team directory, contact list, export data, WhatsApp links, streak counter, political mapping, material inventory, poll tracking, lead source tags

**Medium Complexity (Standard Features):**
- Database with filtering, dashboard with metrics, role-based access, reports, event RSVP, maps with markers, photo upload, push notifications, PDF generation, real-time feed

**High Complexity (Differentiators):**
- Full gamification system, offline-first PWA with sync, multi-tenant with data isolation

## MVP Recommendation

### Phase 1: Core Campaign Operations (MVP)
**Goal:** Replace the single-file HTML with a backend-powered, multi-user system

Prioritize:
1. **User Authentication** (Supabase Auth) - 3 roles: admin/coordinator/field worker
2. **Contact Database** with basic CRUD and filtering
3. **Mobile-Responsive Dashboard** with key metrics
4. **Event Calendar** with agenda view
5. **Team Management** with role assignment
6. **Data Migration** from existing localStorage to Supabase
7. **WhatsApp Integration** (wa.me links)
8. **Basic Territory/Region Assignment**

**Rationale:** Gets multiple users operating, establishes backend foundation, maintains existing workflows

### Phase 2: Field Operations
**Goal:** Empower field workers (cabos eleitorais) with mobile tools

Prioritize:
1. **QR Code Lead Capture** - field worker scans, supporter fills form
2. **PWA Installation** - Add to Home Screen
3. **Offline Mode** - work without internet, sync later
4. **Photo Upload** for activity proof
5. **GPS-Tagged Check-Ins**
6. **Territory Maps** with leader visualization

**Rationale:** Addresses field workers' primary pain points (connectivity, speed of lead capture, accountability)

### Phase 3: Engagement & Intelligence
**Goal:** Gamify participation and provide strategic insights

Prioritize:
1. **Gamification System** (XP, missions, ranking, streaks, trophies)
2. **Real-Time Activity Feed**
3. **Push Notifications**
4. **PDF Report Generation**
5. **Enhanced Maps** with demand visualization
6. **Analytics Dashboard** for coordinators

**Rationale:** Creates engagement loop, provides decision-making intelligence

### Phase 4: Multi-Tenant / Commercial
**Goal:** Package for sale to other candidates

Prioritize:
1. **Multi-Tenant Data Isolation** (Supabase RLS)
2. **White Label Customization** (colors, logos, names)
3. **Tenant Onboarding Flow**
4. **Regional Configuration** (custom RAs/cities per tenant)
5. **Admin Panel** for tenant management

**Rationale:** Enables business model, requires security hardening

### Defer to Post-Launch:
- Advanced analytics and predictive features
- Integration with external CRMs or donor platforms
- Email marketing beyond simple WhatsApp
- Compliance reporting automation

## Brazilian Campaign Context

### Critical for Brazil:
1. **WhatsApp dominance** - 90% of internet users, primary communication channel
2. **Mobile-first usage** - 66% access internet via mobile
3. **Connectivity challenges** - Offline mode essential for field work in peripheral areas
4. **Personal relationship culture** - Gamification and social features align with Brazilian engagement patterns
5. **Community demands tracking** - Aligns with "politics of proximity" common in local Brazilian campaigns

### Less Relevant for Brazil:
- Email marketing (WhatsApp preferred)
- SMS (expensive, unused)
- Compliance reporting (different system - TSE not FEC)
- National voter files (not publicly accessible like in US)

## Competitive Landscape Analysis

### International Platforms (NationBuilder, NGP VAN)
**Strengths:** Mature feature sets, voter file integration, compliance tools
**Weaknesses:** US-centric, expensive, not adapted to Brazilian campaign culture, no gamification, poor offline support

### Brazilian Platforms (ELEGIS, LideraAI, Participa+)
**Strengths:** Local context, Portuguese language, TSE compliance
**Weaknesses:** Limited information available, likely traditional CRM approach, no evidence of gamification or field worker focus

### Generic CRMs (Salesforce, HubSpot, Pipedrive)
**Strengths:** Powerful, flexible, well-supported
**Weaknesses:** Not campaign-specific, expensive, complex, no political context, require extensive customization

### CampanhaApp's Differentiators:
1. **Gamification** - unique in political space, proven engagement boost
2. **Field worker-first** - offline PWA, QR capture, photo proof
3. **Brazilian WhatsApp integration** - not just an afterthought
4. **Cost model** - one-time sale vs expensive subscriptions
5. **Rapid deployment** - no complex setup, works immediately

## Market Gaps Identified

1. **Gamification for political campaigns** - widely used in nonprofits, rare in politics
2. **True offline-first political apps** - most claim mobile but require connectivity
3. **Photo verification of field activities** - accountability gap in current tools
4. **QR-based lead capture** - faster than manual entry, underutilized
5. **Affordable solutions for local campaigns** - NationBuilder/NGP VAN price out small candidates
6. **WhatsApp-native integration** - most tools are email-focused

## Sources

### Global Political Campaign Software:
- [13 Political Campaign Software Solutions for 2026 | GoodParty.org](https://goodparty.org/blog/article/political-campaign-management-software)
- [Best Political Campaign Software 2026 | Capterra](https://www.capterra.com/political-campaign-software/)
- [9 Best Political Campaign Software for 2026 | Appvizer](https://www.appvizer.com/government/political-campaign)
- [NationBuilder vs NGP VAN comparison | CallHub](https://callhub.io/blog/political-campaign/nationbuilder-vs-ngp-van/)
- [Compare NationBuilder vs NGP VAN | Capterra](https://www.capterra.com/political-campaign-software/compare/130934-148396/NationBuilder-vs-NGP-VAN)

### Brazilian Political Tools:
- [8 ferramentas para gestão de campanha eleitoral | Opus Pesquisa](https://www.opuspesquisa.com/blog/eleitoral/ferramentas-campanha-eleitoral/)
- [Melhor Software para Campanha Eleitoral | LideraAI](https://lideraai.app/melhor-software-para-campanha-eleitoral)
- [Plataforma Confirma](https://www.confirma.site/)

### Field Canvassing Features:
- [Field Sales Software | Ecanvasser](https://www.ecanvasser.com/)
- [Door to Door Canvassing Apps | Qomon](https://qomon.com/case-study/door-to-door-app)
- [Top 10 Best Door To Door Canvassing Software | GitNux](https://gitnux.org/best/door-to-door-canvassing-software/)

### Gamification Research:
- [3 Ways to Increase Engagement with Gamification | VolunteerHub](https://volunteerhub.com/blog/3-ways-to-increase-engagement-with-gamification)
- [Gamification: Revolutionizing Volunteer Engagement | DonorNation](https://donornation.com/how-gamification-is-revolutionizing-volunteer-engagement-in-non-profits-and-pacs/)
- [Gameful civic engagement: A review of gamification | ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0740624X19302606)

### Multi-Tenant & White Label:
- [Build Custom Multi-Tenant White-Label Products | FabBuilder](https://fabbuilder.com/pages/easy-saas-based-multi-tenancy-white-label-products-micro-sites/)
- [The Ultimate Guide to Multi-tenant White-label eCommerce | Spree Commerce](https://spreecommerce.org/the-ultimate-guide-to-multi-tenant-white-label-ecommerce/)

### QR Code Lead Capture:
- [QR Codes for Election Campaigns | Uniqode](https://www.uniqode.com/blog/trending-use-cases/qr-codes-for-election-campaigns)
- [How To Win An Election With QR Codes | EZ Texting](https://www.eztexting.com/resources/sms-resources/how-to-win-an-election-with-QR-codes)
- [Election QR Code: 15 Ways to Improve Voter Engagement | QR Code Tiger](https://www.qrcode-tiger.com/election-qr-code)

### Offline PWA Capabilities:
- [How to make a PWA work offline | Progressier](https://progressier.com/pwa-capabilities/how-to-make-a-pwa-work-offline)
- [PWA Offline Capabilities | GoMage](https://www.gomage.com/blog/pwa-offline/)
- [Offline and background operation | MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)

### Campaign CRM:
- [The Ultimate Guide to CRMs for Political Campaigns | NGP VAN](https://www.ngpvan.com/blog/crm-for-political-campaigns/)
- [CRM for Political Campaigns | Qomon](https://qomon.com/case-study/political-crm)
- [8 Best CRMs for Political Campaigns | Pipedrive](https://www.pipedrive.com/en/blog/crm-for-political-campaigns)

### Campaign Mistakes to Avoid:
- [Campaign Website Mistakes That Cost You Votes | Online Candidate](https://www.onlinecandidate.com/articles/campaign-website-mistakes)
- [Errors in Political Campaigns | PolApp](https://polapp.co/blog/errors-in-political-campaigns/)
- [10 Political Campaign Mistakes | Numero.ai](https://www.numero.ai/blog/political-campaign-mistakes)

### Brazil Political Context:
- [WhatsApp and political instability in Brazil | Policy Review](https://policyreview.info/articles/analysis/whatsapp-and-political-instability-brazil-targeted-messages-and-political)
- [Election apps bring smartphone democracy to Brazil | Phys.org](https://phys.org/news/2014-09-election-apps-smartphone-democracy-brazil.html)
