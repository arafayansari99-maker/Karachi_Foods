# Agent build contract

Use this contract for every coding task on this MVP. Its purpose is to keep Copilot, Claude, and other agents inside the agreed product rather than expanding it into an unrelated platform.

## Read first; follow this order

1. `BUILD-RULES.md` is the implementation boundary.
2. `docs/PRD.md` is the feature and acceptance source of truth.
3. `docs/DESIGN.md` is the visual and interaction source of truth.
4. `docs/TRD-ARCHITECTURE.md` is the technical source of truth.
5. `.agents/skills/` supplies narrow procedures; skills must not override product scope.

If the repository contains existing code, inspect it before changing anything and preserve its conventions where they do not conflict with these requirements. Do not replace a working stack just because another stack is more familiar.

## Fixed product boundary

Build a mobile-first, public, static showcase for a Karachi food-web design service. The home page has a white canvas, the approved brand identity, a concise explanation, and a prominent, accessible, horizontally scrollable circular/curved gallery of five sector-specific example pages: chai hotel/dhaba, cafe, restaurant, BBQ, and diner. Each example has its own visual identity and complete sample food-page content.

The assumed business model is **showcase → request a similar website**. Do not turn this into a directory, marketplace, food delivery app, order manager, restaurant CMS, reservation system, or general-purpose website builder.

## Default implementation decisions

- Use the stack and route plan in `docs/TRD-ARCHITECTURE.md` unless an existing project already establishes a compatible stack.
- Keep demo content in typed local data; no database or backend is needed for the stated MVP.
- Make the five sector examples distinct in art direction, but share semantic structure and reusable components.
- Use sample/fictitious businesses and visibly label demo content. Never imply that a sample restaurant, address, phone number, opening time, price, review, certification, or service is real.
- Use Pakistani currency formatting (`Rs` / `PKR`) for illustrative sample prices. Mark prices as examples and do not claim they are current market prices.
- A food-order, call, booking, or map action must not point at a fabricated business contact. Only enable the showcase owner's “request this style” contact CTA after a real destination is provided. Otherwise show an internal, truthful fallback.
- Keep the homepage white and restrained. Sector pages may use their own food-appropriate colors and typography.
- Respect the accessibility and responsive requirements in `docs/DESIGN.md` and the test gates in `docs/TRD-ARCHITECTURE.md`.

## Explicit non-goals — do not implement unless the owner changes this brief

- User accounts, restaurant-owner dashboards, CMS, or admin CRUD.
- Online ordering, delivery dispatch, payments, carts, booking, or reservations.
- Real business listings, scraping, user reviews, or claims of vendor partnerships.
- A searchable map or directory of Karachi businesses.
- AI generation of menus, prices, reviews, business profiles, or images.
- Analytics SDKs, tracking pixels, newsletter collection, or a lead database.
- Urdu/Roman Urdu translation, multi-language switcher, or right-to-left layout in the first release. Keep copy externalized so this can be added later.
- SEO programmatic page generation beyond the five approved sample routes.
- New categories, integrations, backend, database, or UI framework without a stated user requirement and a documented approval.

## Change-control rule

When a requested change conflicts with a fixed boundary or adds a non-goal, do not silently implement it. State the conflict, its cost, and the smallest safe alternative; ask for a product decision only when the choice materially changes scope. Do not block unrelated in-scope work.

## Definition of done for a code change

- The change maps to a PRD requirement or an explicitly approved addition.
- It preserves all five approved sector routes and the home-to-demo-to-contact journey.
- Copy and data do not introduce unverified real-world claims.
- Keyboard, touch, reduced-motion, responsive, and empty-contact states remain usable.
- Relevant tests/build checks pass; report exactly what ran and any checks not run.
- No dependency, backend, secret, tracking, or unrelated visual redesign is added without need.
- Update the relevant documentation when an approved product or technical decision changes.
