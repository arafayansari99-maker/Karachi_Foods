# Product requirements document

**Status:** Lead-generation MVP assumption approved for implementation; working title, language, and final brand remain unapproved.  
**Working title:** Karachi Food Pages (not approved branding).  
**Version:** 1.0 draft. This brief records recommendations separately from decisions still needed.

## 1. Executive summary

Create a polished, mobile-first website that demonstrates five distinct sample website styles for Karachi food businesses. The home screen is a white canvas with a clear brand, short value proposition, a central, horizontally scrollable “round table” gallery, and a clear request CTA. Selecting a sector opens a complete example food-business page with menu items and practical business details.

The MVP is a **lead-generation portfolio** for a person or studio that builds websites for food businesses. It is not a live marketplace. All five businesses and their details are fictional examples. The site should make the design offer concrete and let an owner ask for a similar site through one real, owner-configured contact channel.

## 2. Product hypothesis and audience

**Hypothesis:** Karachi food-business owners who do not yet have a clear, mobile-friendly web presence are more likely to request a site when they can inspect a relevant sample designed for their type of business.

**Primary audience:** owners/managers of independent chai hotels/dhabas, cafes, restaurants, BBQ businesses, and diners in Karachi.

**Secondary audience:** customers browsing a sample page to understand how a menu, location, hours, and contact actions would appear. Sample pages are demonstrations, not live vendor listings.

**Customer problem:** a generic agency portfolio does not quickly show a food-business owner how their menu and essential information could look on a phone. The owner needs to judge fit quickly without mistaking the examples for real businesses.

**Product promise:** “See a food-business website concept shaped for your kind of place, then ask for a version for your business.” Final copy is subject to brand approval.

## 3. Goals and success signals

### MVP goals

1. Explain the website service in one screen without requiring a sign-in.
2. Let a visitor discover five food-sector examples and open each complete sample page.
3. Make each sector sample meaningfully distinct while keeping familiar food-page information easy to find.
4. Route interested owners to one owner-controlled contact destination, once configured.
5. Work well on small mobile screens, keyboard navigation, and reduced-motion settings.

### Success signals

- A first-time visitor can identify the offer and distinguish sample pages from real businesses within 10 seconds in a simple usability check.
- All five demo routes open directly and are navigable from the gallery.
- Gallery selection and demo-page CTA can be completed using touch and keyboard.
- After a real contact destination is configured, contact CTA clicks can be checked manually. No analytics SDK is required for MVP.

Do not set a conversion-rate target before baseline traffic and a functioning contact destination exist.

## 4. Assumptions and product decisions

| Topic | MVP assumption | Status / implication |
|---|---|---|
| Business model | Lead-generation portfolio for one service/provider | Approved for this MVP; do not expand into a directory or ordering product |
| “Hotel” | Local casual food place/dhaba usage, not lodging | Included as chai hotel/dhaba sample; confirm wording with target owners |
| Initial sectors | Chai hotel/dhaba, cafe, restaurant, BBQ, diner | Five samples; change only before content/design freeze |
| Language | English UI and sample copy; data structured for later translation | Confirm whether Urdu or Roman Urdu is needed for launch |
| Location | Karachi, Pakistan | Examples must be explicitly fictional; do not imply actual branches |
| Pricing | Illustrative menu values use Rs / PKR | Replace/label all demo prices; do not present them as market guidance |
| Contact | One real service-owner destination, preferably WhatsApp or a contact URL | Launch blocker until supplied and tested |
| Ordering | Demonstration only; no orders are submitted | No cart, order backend, reservations, or payment flow |
| Content management | Source-controlled static sample data | No owner dashboard/CMS in MVP |

## 5. MVP scope

### P0 — must ship

- A branded home page with logo/wordmark, a clear one-sentence description, and a primary “Explore examples” or “See designs” action.
- Central, horizontally scrollable showcase gallery with five sector cards. On desktop, cards may follow a curved/circular tabletop composition; it must remain a normal, understandable scroll region rather than a wheel-trapping 3D carousel.
- Visible selected-card state, sector title, one-sentence description, and an explicit action to open the example.
- Five complete sample page routes, one per sector, with unique art direction and a shared minimum information architecture:
  - business name clearly marked as a sample;
  - sector-specific hero and short introduction;
  - location area at neighborhood-level only, identified as illustrative;
  - opening-hours example clearly identified as sample;
  - menu categories and items with names, short descriptions, and example prices;
  - a food-appropriate local image or original illustration with descriptive alt text; record provenance for any non-original asset;
  - a route back to the gallery and a configurable showcase-owner CTA.
- A visible sample/demo disclaimer on every sector page.
- Responsive navigation, page title/description metadata, custom not-found state, and footer with contact/legal placeholders handled truthfully.
- A real contact link configuration point and safe fallback when it is not configured.

### P1 — include only if it does not delay the P0 release

- Menu category filters/anchor navigation on a demo page.
- Lightweight image gallery for one or more demo sectors using approved local assets.
- A short “How it works” section on the home page: choose a style → share your business details → discuss the build.
- A no-tracking contact-click counter only if a measurement need is confirmed and privacy approach is documented.

### Explicitly out of scope

Live vendor directory, search by area, vendor onboarding, login, owner editing portal, CMS, reviews, live inventory, order capture, payment processing, delivery integration, reservations, customer accounts, map search, real business scraping, analytics/ad pixels, multilingual/RTL in first release, and AI-generated business facts.

## 6. User journeys

### Owner journey

1. Arrive on the homepage from a shared link or search.
2. Understand that the site offers food-business website designs for Karachi businesses.
3. Swipe/scroll through the five sector concepts and choose the closest fit.
4. Inspect the sample hero, menu, practical information, and visual direction.
5. Select “Get a website like this” and reach the service owner's configured contact destination.

### Example-page visitor journey

1. Open a demo directly or through the home gallery.
2. See a persistent “sample concept” marker before mistaking details for an active place.
3. Scan menu categories and example prices; use page anchors/filter if implemented.
4. Return to the gallery or follow the clearly labeled service-owner CTA.

## 7. Functional requirements and acceptance criteria

| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-01 | Explain offer on home | Above the fold has brand, plain-language offer, and a discoverable route to the gallery; no scrolling is needed to know what the app is |
| FR-02 | Browse five sector examples | All five cards are reachable by touch/trackpad and keyboard; selected example is visually and programmatically identifiable |
| FR-03 | Open an example | Each card links to its own stable URL; refresh/direct entry works; browser back returns to the prior page |
| FR-04 | Distinguish the sectors | Each sample has its own name, palette/type treatment, hero, sector-appropriate menu groupings, and intro; generic template with only a changed title fails |
| FR-05 | Show food-page essentials | Every sample includes menu items/categories, practical detail blocks, sample notice, and a primary next action; details are not invented as real claims |
| FR-06 | Keep demo data honest | Sample banner is visible without scrolling; fictitious names and example locations/hours/prices are labeled; no fabricated working phone/map/order URL |
| FR-07 | Contact the service owner | If configured, service CTA opens the one approved destination; if not configured, it uses the documented truthful fallback and makes no dead/fake external request |
| FR-08 | Accessible interaction | Controls have labels and visible focus; gallery supports keyboard; reduced-motion setting disables nonessential movement; contrast is checked |
| FR-09 | Mobile usability | At 320 CSS px and above, no page-level horizontal overflow; gallery can be swiped and cards remain legible; menu rows do not require precision hover |
| FR-10 | Search/share basics | Each route has unique title/description and share metadata; pages work on direct URL load; no fake local business structured-data markup |

## 8. Content specification

Every menu item contains: name, short factual-sounding sample description, example price, optional dietary/allergen tags only when deliberately authored, and optional featured marker. Never infer halal, vegetarian, vegan, allergen-safe, or “best” claims from an image or category. Avoid health, certification, ranking, award, review, and delivery claims unless owner-approved and verified.

Sector menu grouping examples (content patterns, not a required fixed menu):

- **Chai hotel/dhaba:** chai, paratha/anda, snacks, add-ons; familiar late-evening visual direction, but no unverified opening-hours claim.
- **Cafe:** coffee/tea, breakfast/brunch, bakery, cold drinks.
- **Restaurant:** starters, mains, rice/bread, drinks; cuisine is a sample decision, not a claim about a real vendor.
- **BBQ:** grilled items, platters, sides, sauces; any spice/portion note is clearly illustrative.
- **Diner:** breakfast, burgers/sandwiches, sides, shakes/desserts.

Sample image/content files should include source/license notes. Prefer project-owned or properly licensed photography/illustration. Do not hotlink arbitrary images.

## 9. Non-functional requirements

- Mobile-first and usable on a typical mid-range phone; prioritize readable text, compressed images, and low-motion interactions.
- Target WCAG 2.2 AA for color contrast, keyboard access, focus visibility, semantic structure, and non-text alternatives.
- Initial page payload target: keep image/media weight lean; provide responsive modern formats and lazy-load offscreen content. Validate actual results rather than claiming a speed score in advance.
- No account data or customer personal data is collected in the P0 version.
- No secret, private contact credential, or API key is placed in client code. The showcase contact URL/number is public content and must be deliberately approved before release.
- Use original content and assets with documented usage rights. Keep copy editable without changing page layout.

## 10. Risks and mitigations

- **Visitor thinks examples are real:** persistent sample badge, fictional names, no real-looking contact details, and a clear disclaimer above the fold.
- **Product direction changes:** keep this release within the approved lead-generation showcase scope; a directory or marketplace requires a new product decision.
- **Contact CTA has nowhere to go:** treat destination configuration and a live click-through test as a release gate.
- **Menu prices become misleading:** label as examples on every page; replace before turning any sample into a real-business page.
- **Gallery is visually novel but hard to use:** preserve native scroll, buttons/links, keyboard support, reduced motion, and a linear mobile layout.
- **Images create licensing/performance issues:** use owned/licensed assets, optimize them, add alt text, and record provenance.
- **Local language mismatch:** test English vs Urdu/Roman Urdu comprehension with target owners before deciding on localization.

## 11. Launch checklist

- [x] Confirm product is lead generation, not consumer discovery or ordering.
- [ ] Approve brand name, logo, domain, and final CTA wording.
- [ ] Provide and test the service owner's contact destination.
- [ ] Approve five sectors and interpretation of “hotel.”
- [ ] Review all sample names, menu text, prices, hours, neighborhoods, and disclaimers.
- [ ] Check rights/provenance for all visual assets.
- [ ] Test direct URLs, mobile gallery, keyboard/reduced motion, metadata, and broken links.
- [ ] Confirm privacy/contact/legal copy appropriate to the final behavior.
- [ ] Publish only after the configured CTA has been tested from a real device.
