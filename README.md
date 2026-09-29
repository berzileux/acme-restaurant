# Acme Grill: franchise site demo

Portfolio demo of a multi-location restaurant web ecosystem. Acme Grill is a fictional brand; all locations, addresses and phone numbers are made up.

## What it demonstrates

- **Shared brand content, local overrides.** `src/content/brand.ts` holds the brand menu and story once. Each location in `src/content/locations.ts` stores only its differences.
- **Governance in the types.** `LocationOverride` in `src/content/schema.ts` lets a franchisee change price, availability, one announcement and add local specials. It cannot rename or redescribe a brand item.
- **Resolution logic.** `src/content/resolve.ts` merges brand and location content. Local specials and repriced items are labeled on the page.
- **Visible model.** The "How it works" page shows each location's stored overrides and the resolved counts.
- **Frontend quality.** Semantic HTML, skip link, visible focus states, AA-contrast palette, responsive layout, reduced-motion support, per-page titles, meta and Open Graph tags.

## Content syndication

Brand promotions (`brand.promotions`) are written once and syndicated to locations by audience rule (`'all'` or a list of location slugs). A location can hide a promotion (`hiddenPromotions`) but cannot edit it. `promotionStatus()` and `resolvePromotions()` in `src/content/resolve.ts` compute what each location shows, and the "How it works" page renders a live status matrix.

## Measured quality (Lighthouse, mobile profile, local static build)

| Category | Score |
|---|---|
| Performance | 94 |
| Accessibility | 100 |
| Best practices | 96 |
| SEO | 100 |

Largest Contentful Paint 2.2 s, Total Blocking Time 100 ms, Cumulative Layout Shift 0. Re-run these against the deployed site before quoting them.

## Run

```
npm install
npm run dev      # local development
npm run build    # type-check and build to dist/
```

`dist/` is a static site and uses hash routing, so it deploys to any static host with no rewrite rules.

## Known limits (deliberate for a quick demo)

- Content lives in TypeScript files. A production version would load it from a headless CMS.
- Client-rendered React. Server-side rendering (for example Next.js) would improve link previews and SEO.
