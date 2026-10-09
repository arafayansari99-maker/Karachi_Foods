# Owner decisions and launch inputs

The packet uses explicit defaults so an agent can implement the agreed MVP without filling gaps with invented features. Resolve the **blocking** decisions before public release; the remaining choices can be validated during design/content review.

| Priority | Decision/input | Recommended default | Why it matters |
|---|---|---|---|
| Approved for MVP | Is this a showcase for a web-design service, a discovery directory, or software sold to restaurants? | Showcase that generates inquiries for one website-building service | Directory and SaaS models require different data, user flows, privacy, and architecture |
| Blocking | Final brand name, logo/wordmark, domain | Keep “Karachi Food Pages” as an internal placeholder until approved | Prevents shipping an unapproved identity or placeholder domain |
| Blocking | Primary service-owner contact URL/WhatsApp destination and who owns it | One owner-controlled destination; enable only after a real-device test | A demo CTA with no destination cannot generate an inquiry |
| Blocking | What exactly is being offered to owners, and what should the CTA promise? | Request a consultation / similar website; do not promise price, timeline, or features | Prevents unsupported sales claims |
| Before content freeze | Are the five sectors correct, and does “hotel” mean a chai hotel/dhaba rather than lodging? | Keep chai hotel/dhaba, cafe, restaurant, BBQ, diner | Determines routes, content, and the center carousel |
| Before content freeze | UI language for launch: English, Urdu, Roman Urdu, or more than one? | English first, with strings isolated for future translation | Translation changes layout and may require RTL support |
| Before content freeze | Cuisine and neighborhood examples to use | Fictional, generic Karachi area references only; no exact fake addresses | Local relevance without presenting made-up venues as real |
| Before public release | Sample names, menus, prices, opening hours, imagery | Owner review; mark every value as illustrative; provide asset rights notes | Avoids misleading visitors and unauthorized use |
| Before public release | Legal/privacy/footer copy appropriate to the final contact flow | No collection in MVP; add accurate notices if collection is later approved | Contact forms and analytics create data/privacy obligations |
| Optional after first validation | Which sectors get the most owner interest? | Track manually during early conversations; add analytics only if a real decision needs it | Avoids adding tracking before there is a measurement question |

## Safe defaults an agent may use without stopping

- Static, source-controlled fictional sample data and no database.
- A responsive, accessible horizontal gallery with the visual framing described in `DESIGN.md`.
- Five approved slugs and sector templates.
- A truthful internal contact fallback while the real destination remains unset.

The lead-generation showcase model is approved for this MVP. These defaults do not authorize an agent to fabricate business details or change that model without owner approval.
