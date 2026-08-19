# The Design Atelier — Frontend Reimplementation

A React + Vite + TypeScript + Tailwind reimplementation of the reference site at
`https://pure-atelier-design.vercel.app/`, built from the 22-page review PDF.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build locally
```

Deploying to Vercel: framework preset **Vite**, build command `npm run build`,
output directory `dist`. `vercel.json` already rewrites all paths to
`index.html` so deep links such as `/projects` work on a hard refresh.

## Routes

| Route       | Page          | Source screenshots |
|-------------|---------------|--------------------|
| `/`         | Home          | PDF pages 1–10     |
| `/about`    | About Us      | PDF pages 11–17    |
| `/projects` | Our Work      | PDF page 18        |
| `/services` | Services      | PDF pages 19–20    |
| `/contact`  | Contact       | PDF pages 21–22    |
| `*`         | 404           | — (not in the PDF) |

## Design system

Colours were sampled directly from the screenshot pixels and live in two
places: `tailwind.config.js` (the source of truth) and CSS custom properties in
`src/styles/globals.css`.

| Token     | Value     | Used for                          |
|-----------|-----------|-----------------------------------|
| `canvas`  | `#F5F2EF` | primary section background        |
| `bone`    | `#FAF8F5` | alternating band, footer          |
| `surface` | `#FFFFFF` | header, mission/vision band       |
| `ink`     | `#1A1A1A` | headings, dark CTA band           |
| `muted`   | `#6E6B67` | body copy                         |
| `subtle`  | `#8A8580` | eyebrow labels, numerals          |
| `line`    | `#E4E0DB` | hairline rules and borders        |
| `accent`  | `#B39A6D` | active nav item, hover states     |
| `gold`    | `#F0B323` | logo gold, decorative triangle    |

### Typography — best-guess substitutions

The reference site rasterises its text into screenshots, so the original font
files could not be identified with certainty. These are close visual matches,
isolated in `tailwind.config.js` so a swap is a one-line change:

| Token          | Substitute        | Applied to                                    |
|----------------|-------------------|-----------------------------------------------|
| `font-display` | Playfair Display  | hero caps, page hero titles, stat numerals    |
| `font-heading` | Tenor Sans        | section headings ("About the Studio")         |
| `font-body`    | Jost              | body copy, nav, buttons, labels               |

The stat numerals (`19+ 8+ 80+ 15+`) are unmistakably a high-contrast didone,
which is why Playfair Display is a confident match there. The section headings
are an elegant contrast sans that has no exact free equivalent — replace
`Tenor Sans` if you know the original.

## Architecture

```
src/
  components/   Header, MobileMenu, Footer, HeroSlider, PageHero,
                ProjectCard, CtaBanner, Section, SectionHeading,
                Container, Button, Reveal, ScrollToTop
  pages/        Home, About, Projects, Services, Contact, NotFound
  data/         site.ts, projects.ts, services.ts   (all copy lives here)
  lib/seo.ts    per-route title, description, canonical, OG tags
  styles/       globals.css
```

All visible copy is transcribed verbatim from the screenshots — there is no
lorem ipsum and no invented marketing text. Content lives in `src/data/` so it
can be edited without touching components.

## Animation

No animation library. Scroll entrances use a single `IntersectionObserver` in
`Reveal.tsx`; the rest are CSS transitions and keyframes defined in
`tailwind.config.js`. Everything is disabled under
`prefers-reduced-motion: reduce`.

## Accessibility

Semantic landmarks, a skip link, one `h1` per route, labelled form controls,
`aria-selected` filter tabs, keyboard-dismissable mobile menu (Escape), visible
focus rings, and descriptive alt text on every content image. Decorative
imagery is `aria-hidden`.

## Known gaps

See `ASSETS.md` — please read it before sign-off.
