# Design brief and design structure

**Design intent:** one calm, white portfolio canvas that makes the five food-specific directions feel like tangible “tables” to browse. The homepage should feel like a design studio presenting options, not like a restaurant directory. Every sample page should feel credible and complete while staying visibly fictional.

## 1. Visual principles

- **Home is the neutral gallery:** white or warm-white background, generous whitespace, charcoal text, one restrained brand accent, clear logo/wordmark, and minimal decoration.
- **Food pages carry the personality:** each demo can use its own palette, type scale, image treatment, and menu-card style. Keep information hierarchy and accessibility consistent.
- **Content before effects:** menu names, descriptions, prices, hours, and location must scan clearly on a phone. Motion and depth are supporting details, never required to understand selection.
- **Demo honesty is part of the design:** keep a high-contrast “Sample concept · not a live business” label at the top of each sample page.
- **Use visuals intentionally:** one meaningful hero image/illustration per concept is better than a wall of generic stock photography. Record source/license and provide useful alt text.

## 2. Homepage information architecture

### Desktop structure

```text
┌─────────────────────────────────────────────────────────────────┐
│ Logo / working brand                               How it works  │
├─────────────────────────────────────────────────────────────────┤
│  Food businesses deserve a website that fits their place.        │
│  Short explanation for Karachi owners.   [Explore the examples] │
│                                                                 │
│                     CHOOSE YOUR TABLE                            │
│              previous  [curved scrollable gallery] next          │
│              selected sector title + short description          │
│                       [Open this sample]                         │
│  How it works                         What a real site can include│
│  Scope, quote & timing                 [Talk through your project]│
│  Honest showcase note                  WhatsApp enquiry CTA      │
├─────────────────────────────────────────────────────────────────┤
│ Footer + persistent WhatsApp FAQ assistant                      │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile structure

```text
Logo + compact menu
Headline + one-sentence offer + CTA
“Choose your food style”
Swipeable, snap-aligned cards (one prominent card; next card peeks in)
Selected sector label + “View sample” button
Short how-it-works / service CTA
Floating WhatsApp FAQ assistant
Footer
```

At mobile widths, do not force a literal 3D round table. The concept may be represented by a smooth, horizontally swipeable row with curved visual framing. The user must see a hint that more cards exist.

The landing hero uses an editorial poster-like composition: a restrained brand header, a centered seal and large serif headline, with original floating illustrations of familiar Pakistani foods such as chai, samosa, seekh kebab, paratha, and jalebi. Keep the illustrations decorative and secondary to the message; reduce their number and scale on narrow screens so they never obscure the headline.

## 3. The central “round table” gallery

Treat “round table” as a visual metaphor for a curated selection, implemented as an accessible horizontal carousel/scroll area. Avoid a spinning roulette, autoplay, drag-only interaction, scroll hijacking, or endless looping.

- Five cards: Chai hotel / dhaba, Cafe, Restaurant, BBQ, Diner.
- Each card: one sector title, distinct preview art, short descriptor, and an explicit “View sample” link/button.
- On desktop, cards may be placed along a shallow arc around a subtle central surface. Center/selected card is largest and clearest; side cards are smaller only within readable bounds.
- On mobile, cards become mostly linear horizontal slides with CSS scroll snapping. Show part of the next card and an accessible position label such as “2 of 5.”
- Provide previous/next buttons with descriptive accessible names and disabled states at the ends. Also permit normal touch/trackpad horizontal scroll. Do not hijack vertical wheel scrolling.
- Keyboard: tab to the gallery controls and cards; arrow-key navigation is optional only if it does not conflict with native scrolling. Keep all cards in the normal focus order.
- Reduced motion: no automatic movement; use instant/short transitions only. Never auto-advance.
- Selecting a card updates the selected styling and short detail text. Opening a sample remains a normal link with a stable route.
- Cards use illustrative food photography from their sample pages; explain that concepts and businesses are fictional and preserve photo attribution on the sample pages.
- Use `scroll-snap-type` or equivalent native behavior. Avoid requiring an animation library for this interaction.

## 3a. Service offer and contact

- Describe the deliverables without promising unconfirmed prices, delivery dates, or third-party integrations.
- The MVP offer is one custom, mobile-friendly page with menu, about, hours, location and contact links; basic structuring of supplied content; licensed imagery if needed; and a revision allowance recorded in the written scope. Domain, hosting, ongoing maintenance, and live booking/ordering integrations are scoped and quoted separately.
- Explain the process: discuss the business and goals, agree content/scope/quote/schedule, then design, build, and review.
- The published WhatsApp response expectation is within 30 minutes.
- Keep fictional sample calls to action clearly labeled as inquiries to the studio, never as live reservations or orders for the depicted businesses.
- Keep a persistent WhatsApp contact control on every route. Its on-page FAQ may answer only approved, predefined questions; custom enquiries should open a prefilled WhatsApp message for the visitor to review and send.
- Do not invent testimonials or client results. Distinguish fictional concept examples from delivered client projects.
- Identify the MVP as created by DotnDev Solutions; state that the concepts are not client work and no client results or testimonials are claimed.
- Disclose that custom message text is not posted to a site backend by the MVP; a click opens WhatsApp for visitor review and sending, after which WhatsApp/Meta privacy terms apply.

## 4. Sample food-page structure

```text
Sample banner / back to examples
Sector-specific header (logo/name) + nav anchors
Hero: sector identity, short intro, one primary action
Service facts: example location, example hours, service modes (only if defined)
Featured items (optional)
Menu navigation / categories / menu-item rows
About / what makes this sample direction distinct
Gallery or atmosphere image (optional)
Location/contact block (sample data + honest demo behavior)
Service-owner CTA: “Get a website like this”
Footer + sample disclaimer
```

For narrow screens, menus stack vertically. Use sticky category navigation only if it remains usable with browser zoom and does not obscure headings. A persistent order button is not a requirement; do not imply orders can be placed.

## 5. Sector-specific art direction

These are creative starting points, not factual claims about all Karachi businesses. Make each direction distinct without relying on stereotypes.

| Sector | Suggested visual cue | Sample content grouping |
|---|---|---|
| Chai hotel / dhaba | Warm cream, tea/charcoal accent, strong compact type, simple illustrated cup/texture | Chai, paratha & eggs, snacks, add-ons |
| Cafe | Light neutral base, fresh green or muted pastel accent, airy photography | Coffee & tea, breakfast, bakery, cold drinks |
| Restaurant | More structured, confident type, cuisine-neutral initial design pending owner choice | Starters, mains, rice/bread, drinks |
| BBQ | Deep charcoal with ember/rust accent and strong food photography | BBQ plates, platters, sides, sauces |
| Diner | Friendly bold accent, clear blocks, playful details used sparingly | Breakfast, burgers/sandwiches, sides, shakes/desserts |

All colors must meet contrast requirements; no sector palette is more important than legibility.

## 6. Component and content hierarchy

- Global: `SiteHeader`, `SiteFooter`, `PrimaryButton`, `SampleBadge`, `PageContainer`.
- Home: `HeroIntro`, `FoodShowcaseCarousel`, `SectorCard`, `SectorSummary`, `HowItWorks` (optional), `ServiceContactCTA`.
- Food sample: `DemoPageHeader`, `FoodHero`, `BusinessFacts`, `MenuCategoryNav`, `MenuSection`, `MenuItem`, `ImageGallery` (optional), `SampleDisclaimer`, `ServiceContactCTA`.
- Keep menu content data-driven. Components receive typed content; avoid five separately hard-coded page implementations that drift structurally.
- Variants may change theme and optional content blocks, not the meaning or accessibility of shared controls.

## 7. Type, spacing, imagery, and motion tokens

Use a small token set rather than one-off pixel values. Exact values can be tuned during implementation, while these relationships should remain:

- Type: one expressive display style for the home/hero; highly legible sans-serif for body, prices, and controls. Use local/system or licensed fonts with fallbacks.
- Scale: 4/8px spacing rhythm; content width and card size responsive via CSS clamp/grid; generous breathing room on the white homepage.
- Radius: consistent card/control radii; food pages may introduce one sector-specific treatment, but avoid ornamental excess.
- Color: shared neutral ink/surface/border/focus tokens plus per-sector accent and surface tokens.
- Motion: short state feedback only, no auto-rotation, no parallax dependency, and honor `prefers-reduced-motion`.
- Images: optimized responsive formats, fixed aspect-ratio containers to avoid layout shift, meaningful alt text; decorative art uses empty alt text.

## 8. Responsive and accessibility rules

- Design and test at 320, 375, 768, 1024, and 1440 CSS pixels; no page-level horizontal overflow.
- Keep body/menu text comfortably readable; support browser zoom to 200% without obscured controls.
- Use semantic headings in order, landmarks, visible focus, accessible labels, sufficient contrast, and descriptive link text.
- Carousel controls must be real buttons/links with accessible names. Announce selected position without excessive live-region chatter.
- Do not communicate selection only by color, position, or motion.
- Make target sizes comfortable for touch; do not rely on hover.
- Check images with screen reader context; avoid menu details encoded only in imagery.

## 9. Copy and visual content rules

- Never use real restaurant names, addresses, phone numbers, customer reviews, awards, certificates, or partner logos without authorization.
- Mark all fictitious menu prices, hours, and neighborhoods as examples. If the demo contains an area name, label it “example area in Karachi,” not a real branch address.
- Don't invent allergens, dietary status, halal claims, “best in Karachi,” delivery coverage, or live availability.
- Provide alt text for informative images; do not repeat the same generic alt text on every card.
- Keep the main site’s contact action separate from the fictitious sample business. It contacts the service provider only after a real destination is configured.
