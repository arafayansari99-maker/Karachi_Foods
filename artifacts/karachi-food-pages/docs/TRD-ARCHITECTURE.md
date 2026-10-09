# Technical requirements, system architecture, and system design

**Status:** implementation baseline for the static showcase. The Replit web artifact uses the workspace's React + Vite scaffold; preserve it rather than introducing a second framework.

## 1. Technical decision

- **Framework:** React + Vite + TypeScript, with Wouter for the five explicit routes.
- **Rendering:** a client-rendered app shell with source-controlled local demo data. The app has no server API for P0.
- **Styling:** CSS Modules or organized plain CSS with CSS custom properties. Use the project's existing styling system if already established; do not add a component framework solely for five pages.
- **Content:** typed, source-controlled local data. Keep copy and menu items out of page markup.
- **Deployment:** prefer a Replit Static Deployment after verifying that nested demo routes work on direct entry and refresh. Use a server deployment only if an approved future feature requires server behavior.
- **Backend/database:** none for P0. Do not introduce a database, login, or API just to render five fictional examples.
- **External services:** none required. The single service-owner contact destination is a deliberate public link configured before launch; it is not an API credential.

The initial framework recommendation was adapted to the available Replit artifact scaffold. Do not replace React/Vite to match another framework recommendation. Route-specific title and description tags update in the browser; if search/social previews require guaranteed route-specific HTML before JavaScript runs, add an approved prerendering step before launch rather than claiming the SPA already provides it.

## 2. System context and data flow

```text
Visitor browser
  └─ Vite-built React app from Replit static hosting/CDN
       ├─ Home route: white portfolio canvas + sector gallery
       ├─ Demo routes: sector pages rendered from typed local data
       └─ Approved service-owner contact link (only when configured)

Build pipeline
  └─ typecheck → production Vite build
       └─ publish generated static assets
```

**Trust boundary:** no visitor-submitted data or business-owner account data exists in P0. Do not add a remote script, tracker, content source, form endpoint, or secret-bearing client configuration without approval.

## 3. Routes and metadata

| Route | Content | Rendering |
|---|---|---|
| `/` | Service value proposition and five-sector gallery | Client-rendered |
| `/demo/chai-hotel` | Fictional chai hotel/dhaba sample | Client-rendered |
| `/demo/cafe` | Fictional cafe sample | Client-rendered |
| `/demo/restaurant` | Fictional restaurant sample | Client-rendered |
| `/demo/bbq` | Fictional BBQ sample | Client-rendered |
| `/demo/diner` | Fictional diner sample | Client-rendered |
| Unknown route | Human-readable not-found page with link home | Client-rendered |

Each route must have unique title and description. Add Open Graph/Twitter share metadata where supported. Do not add `Restaurant`/`LocalBusiness` structured data for the fictitious examples. For the service website itself, only add business schema after real service-provider details are approved.

## 4. Logical component design

```text
src/
  App.tsx                    shared shell, route definitions, page rendering
  data/demos.ts              typed sector definitions and illustrative menus
  data/siteConfig.ts         one optional, validated owner contact URL
  index.css                  shared tokens and sector-specific visual themes
public/                      app icon and crawl metadata
```

Keep typed demo content separate from page markup. Share the food-page structure while allowing each sector theme and content to remain distinct. Avoid adding separate data stores, backend routes, or duplicated page implementations.

## 5. Domain data contract

Conceptual TypeScript types (adapt names, preserve behavior):

```ts
type SectorSlug = "chai-hotel" | "cafe" | "restaurant" | "bbq" | "diner";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  pricePkr: number;            // illustrative sample amount, not a verified live price
  featured?: boolean;
  dietaryTags?: string[];      // only when explicitly authored and verified for that sample
};

type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

type FoodDemo = {
  slug: SectorSlug;
  sectorLabel: string;
  businessName: string;        // visibly fictitious/sample
  tagline: string;
  introduction: string;
  themeKey: SectorSlug;
  artDescription: string;       // concise alt text for the original local sector illustration
  heroImage?: { src: string; alt: string; sourceNote: string };
  exampleArea: string;         // display as illustrative area only, never exact fake address
  exampleHours?: string;
  serviceModes?: Array<"dine-in" | "takeaway" | "delivery">; // include only when intended for demo
  menu: MenuCategory[];
};
```

Additional fields require a clear P0 use. Do not store a sample phone number or fake map/order URL. The owner contact destination belongs in a single, explicit public configuration value and remains unset until approved. Render all user-visible data as escaped text; do not use raw HTML for descriptions.

**Validation at build time:** all five expected slugs exist exactly once; each has at least two menu categories and at least three items total; required strings and illustration descriptions are non-empty; example prices are finite non-negative numbers; any local image paths resolve and have descriptive alt text/source notes; no fake external URLs are present.

## 6. Interaction design

- Home gallery state is client-side and ephemeral; no persistence or server state.
- Cards are normal links to stable routes. Previous/next controls may scroll the native region but must not replace links.
- Demo menu category controls can use anchors or local filter state; the entire menu remains accessible without JavaScript if practical.
- “Get a website like this” points to one approved service-owner contact URL. If absent, use an internal contact explanation/anchor and do not show a nonfunctional external icon or fabricated number.
- Navigation and sample pages remain useful if motion or JavaScript-enhanced gallery behavior is unavailable.

## 7. Contact configuration

Use one configuration location, for example a `siteConfig` object with an optional approved public contact URL. Validate it as an HTTPS URL or an intentionally approved `https://wa.me/...` destination; never concatenate untrusted text into a URL. Treat the destination as public website content, not a secret. Before launch:

1. Owner supplies the correct destination through the normal project-editing flow.
2. Agent checks that it is syntactically valid and points to the intended owner-controlled destination.
3. Test from a phone and desktop; ensure links have descriptive labels and external links use safe `rel` attributes where needed.
4. If missing, keep the fallback state honest and report that contact routing is a launch blocker.

No lead form or lead storage is part of the MVP. If requested later, define consent copy, data fields, retention/access policy, abuse protection, and a backend before implementation.

## 8. SEO, performance, accessibility, and security

- Verify each demo route works on direct entry/refresh in the chosen deployment. Current route-specific metadata is set client-side; pre-render known routes if guaranteed HTML metadata becomes a launch requirement.
- Use one descriptive H1 per page, meaningful title/description, canonical/share metadata only when canonical domain is known, and descriptive link text.
- Use responsive local images, correct intrinsic dimensions/aspect ratios, modern compressed formats where available, and lazy-load below-the-fold images. Do not hotlink random assets.
- Target WCAG 2.2 AA; manual keyboard, screen-reader spot check, zoom, reduced-motion, and contrast checks are required before release.
- Keep dependencies minimal and reviewed. No `dangerouslySetInnerHTML`, arbitrary third-party scripts, trackers, or inline secrets.
- Set secure external-link attributes and rely on platform HTTPS. If CSP/security headers are configured, avoid weakening them to accommodate an unapproved dependency.
- If a contact form, analytics, maps, ordering, payments, or real listings are proposed, stop and update product/data/security requirements first.

## 9. Verification plan and release gates

Run checks available in the project; report command and result truthfully.

### Automated minimum

- TypeScript/typecheck and lint.
- Production build/static export.
- Unit test data validation for exactly five unique sector slugs and required menu fields.
- Component tests for gallery labels/links/selection and sample badge.
- End-to-end smoke for home → each demo route → back/home, direct demo URL, unknown slug, contact fallback/configured URL.

### Manual minimum

- 320px, 375px, tablet, desktop widths; verify no page-level horizontal overflow.
- Touch/trackpad gallery interaction, previous/next boundaries, visible next-card affordance.
- Keyboard-only browse and open, visible focus, screen-reader label/selection announcement.
- `prefers-reduced-motion` on; confirm no autoplay or required animation.
- Browser zoom to 200%; menu and controls remain usable.
- Verify sample label and fictional-data disclosure on every demo route.
- Click all CTAs and outbound links; confirm no fabricated address, phone, booking, order, or map target.
- Inspect final asset rights/alt text and page metadata.

### Release blockers

- Unknown lead destination.
- Any sample could reasonably be mistaken for a real vendor or actual price/contact.
- One or more routes fail direct load/refresh.
- Gallery cannot be operated without a pointer or motion.
- Contact CTA is dead, misleading, or not owner-approved.

## 10. Future changes requiring a new design/technical decision

A verified-owner directory, search/map, editable profiles, real ordering, booking, payment, vendor accounts, multilingual/RTL content, analytics, or lead forms each changes data, privacy, operational, and possibly hosting needs. Do not implement by assumption; revise PRD and TRD first.
