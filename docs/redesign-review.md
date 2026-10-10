# KOREMO redesign review — 2026-10-09

Base: `82536e9` from `main`. Review branch: `redesign/koremo-2026-10`.

## Scope

The existing React/Vinext application is retained. A shared floating header, native dialog menu, asymmetric typographic hero, CSS digital composition, alternating light/dark surfaces, portfolio treatment, numbered process rows and consistent internal-page styles replace the previous visual presentation. Green remains #C4F27B.

Reference inspected in the browser: NUGU homepage, services and sites portfolio. Observed rounded floating navigation, large typography, dark bordered cards and warm accent buttons. The implementation uses KOREMO assets, content and green palette; no reference code or assets were copied. Detailed reference motion and mobile behavior were not verified.

Motion uses CSS plus a small IntersectionObserver/Web Animations enhancement. Content is visible by default, including without JavaScript. Reduced-motion disables CSS and JS motion; active JS animations cancel when the preference changes. Native scrolling is retained. Touch devices do not depend on hover. The dialog supports Escape, focus containment and focus restoration.

## Preserved

Tariff data, calculator component/formulas/tests, contact form and API handler, actual case images, case text, existing paths, SEO metadata generation, robots/sitemap generation and hosting workflows are unchanged. No dependencies added.

The production REG.RU site still uses .html addresses (observed 2026-10-09). The current main branch already contains the directory-index migration. This redesign builds on that main branch and does not perform server migration or deployment. Existing redirect deployment must be completed and checked before a production release of this branch.

## Validation

- TypeScript: pass (`pnpm exec tsc --noEmit --incremental false`).
- ESLint: no errors; five pre-existing `next/no-img-element` warnings in the Mercedes components.
- Calculator: all 8 existing tests pass (`node --test tests/calc.test.mjs`).
- Production static build: pass, 18 prerendered pages.
- Existing archive preparation: pass, 18 directory-index pages.
- Parsed output: 555 internal page link references and 261 local asset references resolve; 18 sitemap URLs and all page canonicals use clean URLs.
- No changes to calculation, form, pricing, asset or deployment source files.

## Required browser release checks

Cloud Browser could inspect public reference and production pages but could not access the local preview (blocked terminal.local:5173; refused 127.0.0.1:5173). Managed preview requires an unavailable control-browser skill, so no alternate browser automation was installed. Responsive rules are implemented but browser QA at 360, 390, 768, 1024 and 1440 px is **not yet completed**.

Before merging/deployment: inspect all widths for overflow and contrast, exercise menu open/close/Escape/focus, FAQ, calculator empty/zero values, service preselection, form validation and manual Telegram fallback, reduced-motion, no-JS rendering, case images and console errors. Do not send a real contact message during QA.

No production deployment was performed. Main, DNS, TLS and server configuration remain untouched.
