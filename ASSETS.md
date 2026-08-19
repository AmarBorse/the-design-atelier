# Assets, corrections and open gaps

## 1. The three corrections marked in the review PDF

| # | Correction (verbatim)                                                  | Page | Status |
|---|------------------------------------------------------------------------|------|--------|
| 1 | "Change this Logo / share Updated with you." + "PNG Image share with you." | 1 | **Done** — the supplied gold mark replaces the TA lettermark. Installed as `public/assets/images/logo/logo-mark.png` (alpha-trimmed to 640×632 from the 1541×1112 original, which already carried clean transparency). The old `logo-ta-mark.png` has been deleted. Brand gold sampled from the file as `#FCB61D` and applied to the `gold` token. `public/favicon.png` regenerated from the same artwork, replacing the placeholder SVG. |
| 2 | "Add white gradient to background below of text layer of all images."   | 1 | **Done** — implemented as the reusable `.scrim-light` and `.scrim-center` utilities in `src/styles/globals.css`, applied to the home hero and to all four page banners. Adjust the gradient stops in one place to retune every banner. |
| 3 | "Change Background image"                                              | 11 | **Blocked** — the replacement photograph was not supplied. Current file: `public/assets/images/hero/about-hero.jpg`. Marked with a comment in `src/pages/About.tsx`. |

## 2. Images extracted from the PDF (usable as-is)

These were embedded in the PDF at full resolution and are used unmodified,
cropped only with CSS `object-fit` / `object-position`:

- `projects/` — eight work photographs, 1334×2000 up to 4080×2296
- `clients/` — six client logos, recomposited with their alpha masks so they
  sit on any background: NHM, PWD, Malegaon Municipal, Infotech Goa, MPSL, RBI
- `about/studio-signage.jpg` (1672×941), `about/line-art-building.png`
  (transparent, 1536×990), `gallery/process-blueprint.jpg` (1024×1536)
- `cta/boardroom-logo-wall.jpg` (1672×941)
- `logo/logo-wordmark.png` — transparent wordmark with the gold D
- `logo/logo-mark.png` — the updated gold mark supplied separately (not from the PDF)

## 3. Banner photographs — overlay text removed by reconstruction

All five banner images existed only inside page screenshots, with the original
headline text burned into the pixels. That text has now been removed. Method,
per image:

| File | Method | Result |
|------|--------|--------|
| `hero/hero-living-room.jpg` | Masked inpaint for the type, plus a colour-matched transplant of the sofa band from the Services frame — the same photograph, offset by exactly 231px, so the area hidden by the buttons here is clean there | Clean |
| `hero/services-hero.jpg` | Reverse transplant from the repaired home frame; bottom page-background strip trimmed (now 1824×552) | Clean |
| `hero/about-hero.jpg` | Masked inpaint. The wall-mounted TA signage is part of the room and is correctly preserved | Clean |
| `hero/contact-hero.jpg` | Masked inpaint; the background was already out of focus so it reconstructed cleanly | Clean |
| `hero/projects-hero.jpg` | Masked inpaint plus frequency-separated glow removal | **Faint ghost remains** |

The projects banner is the one imperfect result. Its type sat over flat painted
facade panels, where any reconstruction leaves a trace, and the soft glow around
the original lettering is low-frequency so it cannot be isolated from the wall
itself. A faint outline of "OUR WORK" is visible if you look for it. In place it
is largely hidden behind the dark scrim and the live white heading, but this one
still genuinely wants the original photograph.

Nothing here is a substitute image: every pixel comes from the supplied PDF.

Lower-resolution crops that would also benefit from originals:

- `about/architect-portrait.jpg` (460×636, cropped from a screenshot)
- `about/team-*.jpg` (~197×180, cropped from the team cards)
- `cta/armchairs-lounge.jpg` (524×369)

## 4. Content the PDF never showed

1. **Project cards — the biggest gap.** PDF page 18 cuts off directly below the
   filter bar, so no project names, locations, dates, metadata, per-project
   images or detail pages were ever visible. Rather than invent a portfolio,
   `src/data/projects.ts` reuses the eight real category tiles from the home
   page and tags them provisionally so every filter returns results. Replace
   that array with the real project list. If projects have detail pages, add a
   `/projects/:slug` route — the data shape already carries a `slug`.
2. ~~**Hero carousel.**~~ **Resolved.** The reference shows ten pagination
   dashes; nine further photographs were supplied and the carousel now runs a
   full ten. See section 7.
3. **"We Work In"** (PDF page 15) is a heading with nothing beneath it — the
   screenshot ends there. The heading is reproduced so section order stays
   faithful; the list content is needed.
4. ~~**Mission/vision line-art cityscape**~~ **Resolved.** The client supplied
   the artwork, now at `backgrounds/city-line-art.png` and sitting behind the
   wordmark / mission / vision band on the home page. It arrived as a 5225x2941
   RGBA PNG whose strokes are pure black at roughly 14% alpha — which is what
   makes it read so faintly. Downscaled to 2400px and re-saved as grayscale +
   alpha (the colour channels carried no information), 720 KB down to 278 KB.
   It keeps its transparency, so it sits on the white band without a blend mode
   and works on any background if that section is ever retoned.

## 5. Responsive behaviour

**Every screenshot in the PDF is desktop.** There are no mobile or tablet
captures, and the live site is a client-rendered SPA whose DOM could not be
read, so the responsive rules here are reasoned from the desktop layouts and the
site's own visual language rather than copied from a reference:

- nav collapses to a full-screen bone overlay below `md`
- the four-up work grids step 4 → 2 → 1
- two-column text/image blocks stack, text first
- hero and banner heights switch to viewport-relative with a minimum
- type scales down roughly 30–40% at the smallest breakpoint

Please check these against the live site on a real phone and tablet.

## 6. Verification that could not be performed

The build environment used to produce this project had no network access, so
`npm install`, `vite build` and any render-and-compare pass were impossible.
What *was* verified: a syntax pass over all 25 source files (clean), and every
referenced asset path confirmed to exist on disk.

What still needs doing, per section 23 of the brief:

```bash
npm install && npm run build   # confirm a clean type-check and build
npm run dev                    # then compare against each PDF page
```

Check in this order: layout → images and crops → typography → spacing →
responsive → colour → interactions → animation.

## 7. Home hero carousel

Ten slides, matching the ten pagination dashes in the reference. Slide one is
the reconstructed photograph from the review PDF; slides two to ten were
supplied separately by the client.

Each was downscaled from 5760x3240 to 2000x1125 and saved as an optimised
progressive JPEG — roughly 2.2 MB for the nine combined, down from about 198 MB
of source PNG.

| # | File | Subject |
|---|------|---------|
| 1 | `hero-living-room.jpg` | Arched alcove, pampas, linen sofa (from the PDF) |
| 2 | `villa-glass-pavilion.jpg` | Glass pavilion villa and pool |
| 3 | `bedroom-pendant-lights.jpg` | Leather bed with pendant lighting |
| 4 | `kitchen-island.jpg` | Open-plan kitchen island with stools |
| 5 | `villa-pool-terrace.jpg` | Poolside terrace with palms |
| 6 | `living-room-gallery-wall.jpg` | Sectional sofa and shelving gallery wall |
| 7 | `kitchen-open-shelving.jpg` | Lit oak open shelving |
| 8 | `villa-sunset-poolside.jpg` | Stone-clad villa at sunset |
| 9 | `bedroom-garden-view.jpg` | Low timber bed with study desk |
| 10 | `interior-timber-lounge.jpg` | Timber-lined lounge with raised platform |

The carousel cross-fades every 6 seconds and the dashes jump to any slide.
Only slides already shown, plus the one queued next, are mounted in the DOM, so
the page does not fetch all ten photographs on load; the one-slide lookahead
keeps each incoming image decoded before its fade begins. Reordering the
`SLIDES` array in `src/components/HeroSlider.tsx` is all that is needed to
change the running order — pagination, timing and preloading follow it.

Note that these nine are client-supplied rather than extracted from the PDF, so
they are the one part of the image set not drawn from the original reference.
