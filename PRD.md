# War Protest Map — PRD

> Short Title: Global tracker of anti-war and conflict-related protest movements
> Last Updated: 2026-04-14

---

## Overview

War Protest Map tracks protest movements around the world that are directly related to active armed conflicts. This includes anti-war demonstrations, solidarity marches, pro-peace rallies, and government-sanctioned counter-protests. Each protest event is recorded with its location, estimated attendance, organising groups, demands, and outcome. The site provides a map-style overview (via structured location data) and a searchable list view, helping researchers, journalists, and activists understand the scale and geography of civil opposition to war.

Content covers major ongoing protest movements including anti-Ukraine-war protests (globally, with focus on Russia, Germany, Hungary), pro-Palestine marches (US, UK, France, Australia), anti-Sudan-war demonstrations, and others.

**Live URL:** https://war-protest-map.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Activists / organisers | No single source tracking protest movements across conflicts | Unified database of protest events filterable by conflict and region |
| Journalists | Hard to verify protest scale and geographic spread quickly | Structured data with attendance estimates and source links |
| Researchers / academics | Protest data is scattered, inconsistent, hard to download | Clean JSON data model; consistent schema across all events |
| General public | Want to know where protests are happening and how large they are | Visual location-tagged event list with attendance and conflict context |
| Non-English readers | Most protest tracking is English-only | 8-language i18n via next-intl |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (protests.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Location display: Static coordinates in JSON; map rendering via Leaflet (dynamic import, client-only) or static SVG world map

---

## Pages & Routes

```
app/
├── [locale]/
│   ├── layout.tsx          # Locale provider, nav, footer, ad slots
│   ├── page.tsx            # Home: protest overview, recent events, region filter
│   └── [slug]/
│       └── page.tsx        # Individual protest event detail page
├── api/
│   └── protests/
│       └── route.ts        # GET /api/protests — filter by conflict, country, date
└── layout.tsx              # Root layout (fonts, AdSense script)
```

### Page Descriptions

**Home (`/[locale]/`)**
- Hero section: stat summary ("X protest events tracked across Y countries")
- World region selector: Africa, Europe, Americas, Middle East, Asia-Pacific
- Protest event feed: reverse-chronological cards
- Each card: city/country flag, conflict tag, date, attendance estimate badge, headline, "View details" link
- Conflict filter chips: All / Pro-Palestine / Anti-Ukraine-War / Anti-Sudan / Other
- Trend summary: "Most active region this month" + largest recent protest callout
- Adsterra ad unit in sidebar (desktop) / between cards (mobile)

**Protest Detail (`/[locale]/[slug]/`)**
- Full event details: location (city, country), date, start time (if known)
- Attendance estimate: low–high range with source
- Organising groups / coalition
- Demands / stated purpose
- Outcome (peaceful, dispersed, arrests, ongoing)
- Images (if available via CC-licensed sources)
- Source links (2+ per event)
- Related events: other protests in same city or same conflict
- In-content Adsterra ad unit

**API (`/api/protests`)**
- Returns protests.json array
- Filter params: `?conflict=`, `?country=`, `?region=`, `?limit=`, `?after=` (date)
- Used by SSG pages at build time

---

## Data Model (JSON schema)

File: `public/data/protests.json`

```json
[
  {
    "id": "string (slug-safe, e.g. 'london-pro-palestine-2026-04-05')",
    "slug": "string (matches id, URL-safe)",
    "conflict": "string (e.g. 'Gaza-Israel', 'Ukraine-Russia', 'Sudan')",
    "conflictSlug": "string (URL-safe)",
    "headline": "string (max 120 chars, e.g. 'Mass pro-Palestine march in London draws 100,000')",
    "date": "string (ISO 8601)",
    "city": "string",
    "country": "string (ISO 3166-1 country name)",
    "countryCode": "string (ISO 3166-1 alpha-2, e.g. 'GB')",
    "region": "europe | americas | middle-east | africa | asia-pacific",
    "coordinates": {
      "lat": "number",
      "lon": "number"
    },
    "attendanceLow": "number (minimum estimate)",
    "attendanceHigh": "number (maximum estimate)",
    "attendanceSource": "string (who estimated the attendance)",
    "organisers": ["string (group or coalition names)"],
    "demands": ["string (stated demands or slogans)"],
    "outcome": "peaceful | dispersed | arrests | ongoing | cancelled",
    "outcomeNotes": "string (optional, brief outcome description)",
    "imageUrl": "string (optional, CC-licensed image URL)",
    "imageAlt": "string",
    "imageCredit": "string",
    "sources": [
      {
        "label": "string",
        "url": "string"
      }
    ],
    "tags": ["string"]
  }
]
```

### Field Notes
- `attendanceLow` / `attendanceHigh`: use organisers' estimate vs. police estimate where both available
- `outcome`: `peaceful` = concluded without incident; `dispersed` = police/authorities ended it; `arrests` = participants detained; `ongoing` = recurring or multi-day
- `coordinates`: used for map display; city centre coordinates are acceptable
- `demands`: 1–5 items, each a short phrase (e.g. "Immediate ceasefire in Gaza")
- `slug` must be unique across all entries

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 init, Tailwind CSS, next-intl for 8 locales
- Empty `protests.json` (1 placeholder entry)
- Vercel project linked; first deploy succeeds
- Git push: `chore: init war-protest-map scaffold`

### M1 — Data Layer & API
- `protests.json` populated with 15+ real protest events across 3+ conflicts
- `/api/protests` route with conflict, country, region, date filters
- TypeScript types for Protest schema
- Git push: `feat: protests data layer and API route`

### M2 — Home Page
- Protest event cards with all key fields
- Conflict filter chips (client-side)
- Region selector
- Stat summary bar
- Responsive layout
- Git push: `feat: home page with protest feed and filters`

### M3 — Protest Detail Pages
- SSG: `generateStaticParams` from slug field
- Full detail page with all fields rendered
- Related events component (same conflict or country)
- Per-page metadata (og:title, og:description, og:image if available)
- Git push: `feat: protest detail pages SSG`

### M4 — i18n, Ads, Map Display
- All UI strings in next-intl message files
- Machine translations for ko/ja/zh/es/fr/de/pt
- Adsterra and AdSense units integrated
- Static SVG world map or Leaflet map (dynamic import) showing protest locations
- Git push: `feat: i18n, ad units, map display`

### M5 — SEO & Performance
- Sitemap covering all protest slugs × all locales
- Structured data (Event schema) on detail pages
- `robots.txt` allow all
- Lighthouse ≥ 90 performance and accessibility
- Git push: `feat: sitemap, structured data, SEO`

### M6 — Launch
- 30+ protest events across 5+ conflicts and 10+ countries
- All locales verified
- Google Search Console sitemap submitted
- Git push: `chore: launch — 30 protests, all locales verified`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Home page layout: stat bar, conflict filter chips, region selector, event feed
- Protest event card component (flag, conflict badge, attendance badge, outcome tag)
- Detail page layout: all fields, related events, image display
- Map display component (Leaflet dynamic import or SVG world map)
- Ad slot placement (sidebar, in-content)
- Mobile-first responsive design

**Key files:** `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/[slug]/page.tsx`, `components/ProtestCard.tsx`, `components/ProtestDetail.tsx`, `components/ProtestMap.tsx`

### Backend / Data Agent
**Responsibilities:**
- Maintain and validate `protests.json`
- Implement `/api/protests` with all filter params
- TypeScript types (`types/protest.ts`)
- `generateStaticParams` for protest detail SSG
- Data validation: unique slugs, valid ISO dates, valid region enum values, attendanceLow ≤ attendanceHigh

**Key files:** `app/api/protests/route.ts`, `public/data/protests.json`, `types/protest.ts`, `lib/getProtests.ts`

### SEO / Content Agent
**Responsibilities:**
- Research and write 30+ real protest events with accurate data and sources
- Keyword-targeted page titles ("anti war protest map", "pro palestine protest tracker")
- next-intl messages for 8 languages
- Event structured data (JSON-LD) on detail pages
- Sitemap generation

**Key files:** `public/data/protests.json`, `messages/`, `app/sitemap.ts`

### QA Agent
**Responsibilities:**
- Validate protests.json schema
- Test all API filter params
- Verify all 8 locale routes
- Check map component renders without errors
- Lighthouse audits
- Verify no broken source links

---

## SEO Strategy

### Primary Keywords

| Keyword | Monthly Volume (est.) | Intent | Target Page |
|---|---|---|---|
| anti war protest map | 4,500 | Informational | Home |
| pro palestine protest tracker | 8,200 | Informational | Home (filter: Gaza-Israel) |
| war protests 2026 | 6,100 | Informational | Home |
| pro palestine march [city] | 12,000+ | Informational | Detail pages (city-specific) |
| anti war protests europe | 3,300 | Informational | Home (region: Europe) |
| ukraine war protest | 5,700 | Informational | Home (filter: Ukraine-Russia) |
| protest against war news | 4,000 | Informational | Home |

### On-Page SEO
- Home `<title>`: `War Protest Map — Global Anti-War & Conflict Protest Tracker 2026`
- Detail `<title>`: `[Headline] | War Protest Map`
- Meta descriptions: include city, conflict, attendance estimate
- City + conflict as natural keyword combo on detail pages
- `hreflang` tags for all 8 locales on every page

### Structured Data
- `Event` schema on each protest detail page: `name`, `startDate`, `location` (with `addressCountry`), `organizer`, `description`
- `ItemList` schema on home page linking to all detail pages

### Content Strategy
- Add 3–5 new protest events per week
- Prioritise high-search-volume events: large London/DC/Sydney pro-Palestine marches, major European anti-war rallies
- City-specific detail pages naturally capture long-tail keywords
- Link from home filter chips to pre-filtered views (shareable URLs)

### Technical SEO
- Sitemap: all protest detail slugs × 8 locales + home × 8 locales
- Canonical per locale
- No JavaScript required for content visibility (SSG, no client-fetch required for initial render)

---

## Launch Checklist

- [ ] `protests.json` has 30+ entries across 5+ conflicts and 10+ countries
- [ ] All entries have: headline, date, coordinates, attendance estimates, 2+ sources, valid outcome
- [ ] Home page loads on all 8 locale routes
- [ ] Conflict filter chips filter correctly
- [ ] Region selector filters correctly
- [ ] `/api/protests` returns valid JSON; `?conflict=`, `?country=`, `?region=` filters work
- [ ] All protest detail pages SSG: slugs resolvable, no 404s
- [ ] Map display renders protest locations (client-side Leaflet or SVG)
- [ ] Adsterra and AdSense units present in production HTML
- [ ] `sitemap.xml` at `/sitemap.xml`; submitted to Search Console
- [ ] `robots.txt` present and permissive
- [ ] `hreflang` tags on all pages
- [ ] Event structured data validates in Google Rich Results Test
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90
- [ ] No broken source links
- [ ] Vercel Analytics enabled
- [ ] Live URL confirmed: war-protest-map.vercel.app
- [ ] Mobile layout tested at 375px
