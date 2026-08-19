import { useCallback, useEffect, useMemo, useState } from 'react';
import Container from './Container';
import Button from './Button';

export type HeroSlide = { src: string; alt: string };

/**
 * Full-bleed home hero: ten photographs on a horizontally auto-scrolling
 * track, with the dash-style pagination from the reference.
 *
 * Slide one is the photograph from the review PDF; the remaining nine were
 * supplied by the client. To change the running order, reorder this array —
 * pagination, timing and preloading all follow it.
 */
const SLIDES: HeroSlide[] = [
  {
    src: '/assets/images/hero/hero-living-room.jpg',
    alt: 'Sunlit living room with an arched alcove, pampas grass and a linen sofa',
  },
  {
    src: '/assets/images/hero/villa-glass-pavilion.jpg',
    alt: 'Single-storey glass pavilion villa with a cantilevered roof beside a pool',
  },
  {
    src: '/assets/images/hero/bedroom-pendant-lights.jpg',
    alt: 'Bright bedroom with a tan leather bed, pendant lights and potted plants',
  },
  {
    src: '/assets/images/hero/kitchen-island.jpg',
    alt: 'Open-plan kitchen with a timber-topped island, bar stools and garden doors',
  },
  {
    src: '/assets/images/hero/villa-pool-terrace.jpg',
    alt: 'Poolside terrace framed by palms with loungers under a modern villa',
  },
  {
    src: '/assets/images/hero/living-room-gallery-wall.jpg',
    alt: 'Pale living room with a sectional sofa and a framed shelving gallery wall',
  },
  {
    src: '/assets/images/hero/kitchen-open-shelving.jpg',
    alt: 'Compact kitchen with lit oak open shelving and a white tiled splashback',
  },
  {
    src: '/assets/images/hero/villa-sunset-poolside.jpg',
    alt: 'Stone-clad villa and pool under a sunset sky with tropical planting',
  },
  {
    src: '/assets/images/hero/bedroom-garden-view.jpg',
    alt: 'Airy bedroom with a low timber bed, study desk and wide city-facing windows',
  },
  {
    src: '/assets/images/hero/interior-timber-lounge.jpg',
    alt: 'Timber-lined lounge with a raised seating platform and open staircase',
  },
];

/** Milliseconds each slide rests before scrolling to the next. */
const INTERVAL = 6000;
/** Duration of the slide movement itself. */
const SLIDE_MS = 900;

export default function HeroSlider() {
  const count = SLIDES.length;

  /**
   * `position` runs 0..count. The final value points at a clone of slide one
   * appended to the end of the track, so the last slide scrolls forwards into
   * the first instead of rewinding through all ten. Once that movement lands,
   * the transition is switched off and the track snaps back to 0 invisibly.
   */
  const [position, setPosition] = useState(0);
  const [gliding, setGliding] = useState(true);
  const active = position % count;

  const track = useMemo(() => [...SLIDES, SLIDES[0]], []);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => setPosition((p) => p + 1), INTERVAL);
    return () => window.clearInterval(id);
  }, [count]);

  // Silent rewind once the clone is on screen.
  useEffect(() => {
    if (position !== count) return;
    const id = window.setTimeout(() => {
      setGliding(false);
      setPosition(0);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [position, count]);

  // Re-arm the transition a frame after the snap, so the snap itself is instant.
  useEffect(() => {
    if (gliding) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setGliding(true))
    );
    return () => cancelAnimationFrame(id);
  }, [gliding]);

  const go = useCallback((next: number) => {
    setGliding(true);
    setPosition(next);
  }, []);

  /**
   * Only slides already reached — plus the one queued next — are given a real
   * `src`, so the page does not fetch ten full-bleed photographs on load. The
   * one-slide lookahead means the next image is decoded before it scrolls in.
   */
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1 % count]));
  useEffect(() => {
    setMounted((prev) => {
      if (prev.has(active) && prev.has((active + 1) % count)) return prev;
      const next = new Set(prev);
      next.add(active);
      next.add((active + 1) % count);
      return next;
    });
  }, [active, count]);

  return (
    <section
      aria-label="Featured work"
      aria-roledescription="carousel"
      className="relative h-[calc(100svh-70px)] min-h-[520px] w-full overflow-hidden md:h-[calc(100svh-84px)]"
    >
      <div
        className="absolute inset-0 flex will-change-transform"
        style={{
          transform: `translate3d(-${position * 100}%, 0, 0)`,
          transition: gliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
        }}
      >
        {track.map((slide, i) => {
          const slideIndex = i % count;
          return (
            <div key={`${slide.src}-${i}`} className="h-full w-full shrink-0">
              {mounted.has(slideIndex) && (
                <img
                  src={slide.src}
                  alt={i === active ? slide.alt : ''}
                  aria-hidden={i !== active}
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* CORRECTION #2: white gradient beneath the text layer, so the copy
          stays legible against the lighter areas of every hero photograph. */}
      <div aria-hidden="true" className="scrim-light absolute inset-0" />

      <Container className="relative flex h-full flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="animate-fadeUp font-display text-[1.8rem] font-normal uppercase leading-[1.14] tracking-[0.015em] text-ink sm:text-[2.5rem] lg:text-[3.05rem]">
            Designing Timeless Spaces With Purpose &amp; Precision
          </h1>
          <p
            style={{ animationDelay: '180ms' }}
            className="mt-6 max-w-lg animate-fadeUp font-body text-[0.8rem] leading-relaxed text-ink/75 md:text-[0.875rem]"
          >
            At The Design Atelier, we believe every space should feel effortless, timeless, and
            deeply connected to the people who experience it. Our work combines thoughtful
            planning, refined aesthetics, and practical functionality to create environments that
            age beautifully over time.
          </p>
          <div
            style={{ animationDelay: '320ms' }}
            className="mt-10 flex animate-fadeUp flex-col gap-4 sm:flex-row"
          >
            <Button to="/projects" variant="outline">
              Explore Projects
            </Button>
            <Button to="/contact" variant="solid">
              Schedule a Consultation
            </Button>
          </div>

          {count > 1 && (
            <div
              role="tablist"
              aria-label="Hero slides"
              className="mt-12 flex flex-wrap items-center gap-2"
            >
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to slide ${i + 1} of ${count}`}
                  onClick={() => go(i)}
                  className={`h-[3px] w-8 transition-colors duration-300 ${
                    i === active ? 'bg-ink' : 'bg-ink/25 hover:bg-ink/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}