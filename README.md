# Karachi Food Pages

Karachi Food Pages is a responsive showcase of polished website concepts for
food businesses. It is designed to help restaurants, cafes, chai hotels,
barbecue spots, and diners see how their menu, atmosphere, and contact details
could be presented online.

The project is a front-end portfolio/demo, not a live ordering platform. The
businesses and menus shown in the demos are fictional examples. There is no
backend, order processing, payment processing, booking system, or customer
account service.

## Demo pages

| Route | Concept |
| --- | --- |
| `/` | Karachi Food Pages landing page and concept carousel |
| `/demo/chai-hotel` | Baithak Chai House — chai hotel / dhaba |
| `/demo/cafe` | Little Fern Coffee Room — cafe |
| `/demo/restaurant` | Saffron & Slate — restaurant |
| `/demo/bbq` | Coal & Copper — barbecue |
| `/demo/diner` | Sunday Service Diner — diner |

The concepts are examples rather than real businesses. Names, sample menus,
prices, and brand treatments are illustrative and should be replaced with
verified business information before any real-world use.

## Features

- A landing page that introduces the service and showcases concepts in an
  arched, continuously looping carousel.
- Five distinct, responsive food-business concept pages with sample menus,
  category navigation, imagery, and contact sections.
- Mobile-friendly layouts, keyboard-accessible carousel controls, and
  expandable frequently asked questions.
- WhatsApp and email inquiry links for visitors. These open external
  communication services; messages are reviewed and sent by the visitor.
- Privacy-conscious messaging that reminds visitors not to send sensitive
  information.
- Locally served food and venue photography with source links and attribution.

## Technology

- React 19 and TypeScript
- Vite
- Wouter for client-side routing
- Tailwind CSS 4 and Radix UI components
- pnpm workspace for dependency and package management

The showcase application lives in
[`artifacts/karachi-food-pages`](./artifacts/karachi-food-pages). Workspace
configuration and shared supporting packages are kept at the repository root,
so install dependencies from the root rather than from the app subdirectory.

## Run locally

Requirements:

- Node.js 20 or later
- pnpm 10 or later

From the repository root:

```sh
pnpm install
pnpm --filter @workspace/karachi-food-pages dev
```

Vite prints the local URL after the development server starts.

## Deploy to Vercel

The repository includes a root-level `vercel.json` configured for this pnpm
workspace. Import the GitHub repository into Vercel and keep the **Root
Directory** set to the repository root (`.`), not
`artifacts/karachi-food-pages`. The workspace root is needed to install and
resolve shared `workspace:*` dependencies.

The Vercel configuration installs the frozen pnpm lockfile, builds only the
showcase app, publishes `artifacts/karachi-food-pages/dist/public`, and routes
app paths such as `/demo/chai-hotel` back to the SPA entry point. No Vercel
environment variables are required for the current prototype.

After importing, deploy from Vercel or push a commit to the connected Git
branch. Check that the homepage and a direct demo URL both load on the
deployment.

## Checks and production build

Run the app-specific TypeScript check and production build from the repository
root:

```sh
pnpm --filter @workspace/karachi-food-pages typecheck
pnpm --filter @workspace/karachi-food-pages build
```

The static production output is written to
`artifacts/karachi-food-pages/dist/public`. It can be served from a static host
with fallback/rewrite support for the client-side demo routes.

## Configuration

The current prototype does not require environment variables or API
credentials. Public contact details and contact-link builders are in
[`siteConfig.ts`](./artifacts/karachi-food-pages/src/data/siteConfig.ts).
Update those values before using the contact links for a different project.

## Image credits

Food and venue photographs are stored in the app's `public/images` directory
and served locally. Their source URLs, descriptions, and license notes are
listed in [`IMAGE-SOURCES.md`](./artifacts/karachi-food-pages/docs/IMAGE-SOURCES.md).

## Project structure

```text
artifacts/
  karachi-food-pages/   React/Vite showcase app
lib/                    Shared workspace packages
scripts/                Workspace utilities
pnpm-workspace.yaml     Workspace and dependency catalog configuration
pnpm-lock.yaml          Reproducible dependency lockfile
```

## Scope and limitations

- Demo menus, pricing, brand names, and business details are fictional sample
  content; confirm all facts before publishing a real business site.
- Inquiry actions use external WhatsApp or email services. They do not submit
  data to an application server.
- This project does not provide live menus, inventory, ordering, delivery,
  reservations, payment processing, authentication, or analytics.
