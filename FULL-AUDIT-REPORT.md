# MeasureSpark SEO + GEO Audit

Analyzed and implemented: 2026-09-11

## Executive summary

- Post-implementation health estimate: **84/100**, up from the cached 79/100 assessment dated 2026-08-24.
- Business type: free browser-based screen measurement and home-project calculators, initially aimed at English-speaking US users.
- The site has 21 canonical sitemap URLs. The homepage, representative tools, robots.txt, sitemap.xml, and llms.txt were fetched live before implementation.
- No critical crawl, canonical, security-header, or rendering blocker was found.
- The strongest ranking gap was content parity: six tools had no original guide, while current competing calculator pages commonly expose the formula, worked examples, practical purchase assumptions, and review/source signals.

This score is a directional implementation score, not a Google score. No current Search Console query export or paid keyword-volume dataset was available, so this report does not invent rankings, traffic, search volume, or keyword difficulty.

## Evidence reviewed

- Cached audit: `.seo-cache/audit-scores.json`, analyzed 2026-08-24; score 79/100.
- Cached Google snapshot: `.seo-cache/google.json`, with coverage data last updated 2026-08-21. It recorded 10 indexed URLs, 11 recently discovered-not-indexed URLs, three expected redirects, and a successful 21-URL sitemap.
- Live HTTP checks on 2026-09-11: homepage returned 200 and a Vercel cache hit; robots allowed crawling; sitemap listed 21 canonical URLs; llms.txt described formulas, review policy, limitations, and contact details.
- Live search-result review for `online ruler actual size inches cm`, `concrete calculator cubic yards slab`, `paint calculator room walls ceilings`, and `flooring calculator boxes waste cost`.

## Findings

### Technical SEO

Status: strong.

- Canonical host redirects from `www` to the apex domain.
- Pages are statically generated, with self-referential canonicals and deterministic tool routes.
- Robots and sitemap are reachable and consistent with the canonical host.
- Security headers include CSP, HSTS, nosniff, frame protection, referrer policy, and restricted permissions.
- Titles and descriptions are page-specific and generated from the tool source of truth.
- The three category pages had visual breadcrumbs but no matching `BreadcrumbList` entity. This was corrected, and each `CollectionPage` now references its breadcrumb graph node.

### Content and search intent

Status before implementation: uneven.

Nine tools already contained a quick answer, worked example, explicit assumptions, practical explanations, a review date, and an external source. Six did not:

- Screen Size Calculator
- Wallpaper Calculator
- Decking Calculator
- Fence Calculator
- Rectangle Area Calculator
- Rectangular Volume Calculator

All six now use the same evidence-led content pattern. The copy distinguishes geometric results from product purchasing, installation, safety, structural design, and local-rule decisions. No author, credential, review, price, search-volume, or performance claim was invented.

### SERP and competitor observations

The observed result set rewards pages that complete the user's job rather than merely expose a formula:

- Online-ruler results emphasize calibration, multiple units, persistent settings, and clear accuracy limitations.
- Flooring results expose whole-box rounding, editable waste, box coverage, cost, examples, and source/review notes.
- Paint results increasingly include openings, ceiling, coats, coverage, and cost.
- Concrete results commonly bridge cubic yards to ordering allowances or bag quantities.

MeasureSpark already competes functionally on paint, flooring, and tile. The implemented content closes the most obvious thin-page gap without adding unsupported features. Future tool upgrades should be driven by Search Console impressions and CTR, not by cloning every competitor input.

### Category architecture

The category pages previously repeated a generic planning paragraph. Each hub now explains which calculator fits which job and links contextually to three priority tools:

- Screen hub: direct screen measurement vs PPI, screen dimensions, and pixel conversion.
- Home-project hub: material-specific purchase units and editable allowances.
- Conversion hub: the distinction between length, area, volume, and density-dependent pixel conversion.

This improves topical context, internal discovery, and passage-level usefulness without creating more URLs.

### Schema

Status: good.

- Homepage graph: Organization, WebSite, WebPage, and ItemList.
- Tool graph: WebApplication, WebPage, BreadcrumbList, WebSite, and Organization with stable IDs.
- Category graph: CollectionPage, ItemList, WebSite, Organization, and now BreadcrumbList.
- FAQ schema was intentionally not added. Google generally limits FAQ rich results to authoritative government and health sites; the visible questions remain useful without making a rich-result claim.

### GEO / AI search readiness

Status: good foundation.

- `llms.txt` provides purpose, methodology, limitations, all tool links, sitemap, and contact details.
- Tool pages now provide concise answer passages, equations in plain language, worked examples, assumptions, limitations, source links, and explicit review dates.
- Stable entity IDs connect applications to the publisher and website.
- The primary remaining GEO weakness is off-site evidence: MeasureSpark is a young brand with limited independent citations and mentions. On-page markup cannot substitute for real third-party references.

### Performance

- Live homepage response was a Vercel cache hit and all content routes are statically generated.
- Production build generated all 28 routes successfully.
- One existing lint warning remains for the small fixed-size SVG logo using `<img>` in the header. It is not a deployment blocker and was not changed without evidence of an LCP problem.
- A fresh PageSpeed Insights lab run could not be obtained because the public API quota was exhausted. No new CWV number is claimed. Field INP/LCP/CLS should be taken from Search Console or CrUX when sufficient traffic exists.

## Validation

- `pnpm validate`: passed; zero errors, one existing image lint warning.
- `pnpm test`: 17/17 tests passed across three test files.
- `pnpm build`: passed; all pages generated successfully.
- `git diff --check`: passed.

## Remaining opportunities

1. Export fresh Search Console page/query data and compare indexed coverage now that the previous 7–14 day waiting window has passed.
2. Prioritize pages already receiving impressions, then test title/description changes against CTR rather than guessing keyword volume.
3. Consider richer product inputs only where impressions prove demand: wallpaper roll dimensions/pattern repeat, concrete bags, decking stock lengths, or fence gates/corners.
4. Build legitimate mentions and links from DIY, education, maker, display, or home-improvement resources. Do not manufacture reviews, authors, credentials, or citations.
5. Monitor real-user Core Web Vitals; optimize the logo or client calculator JavaScript only if field data identifies a measurable issue.
