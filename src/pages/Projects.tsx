import { useMemo, useState } from 'react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';
import { PROJECTS, PROJECT_INDEX } from '../data/projects';
import type { ProjectEntry } from '../data/projects';
import { usePageMeta } from '../lib/seo';

/**
 * Short tab labels.
 *
 * The eight full category names need about 20% more width than the 1280px
 * shell allows, even at small type — so the tab row gets trimmed names while
 * the full name stays on the button's `title` for hover and assistive tech.
 * The four architecture categories drop the repeated word; the interior ones
 * keep it, since "Residential" alone appears in both families.
 */
const TAB_LABELS: Record<string, string> = {
  'residential-architecture': 'Residential',
  'institutional-architecture': 'Institutional',
  'healthcare-architecture': 'Healthcare',
  'public-architecture': 'Public',
  'residential-interior': 'Residential Interior',
  'corporate-interior': 'Corporate Interior',
  'transportation-infrastructure': 'Transportation',
  'cafes-and-food-courts': 'Cafés & Food Courts',
};

/** Stand-in tile shown until a panel has a real photograph. */
function PanelPlaceholder() {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-line bg-canvas">
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-9 w-9 text-ink/20"
      >
        <path d="M6 10h36v28H6z" />
        <path d="m6 30 10-9 8 7 7-6 11 9" />
        <circle cx="17" cy="18" r="3" />
      </svg>
    </div>
  );
}

/** One numbered project: its name, then its panels of image + notes. */
function ProjectEntryBlock({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <article className={index > 0 ? 'border-t border-line pt-10' : ''}>
      <h4 className="flex flex-wrap items-baseline gap-x-3 font-body text-sm font-medium uppercase tracking-[0.08em] text-ink">
        <span className="text-subtle">{String(index + 1).padStart(2, '0')}</span>
        {entry.title}
        {entry.location && <span className="text-muted">— {entry.location}</span>}
      </h4>

      <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
        {entry.panels.map((panel, p) => (
          <div key={p}>
            {panel.image ? (
              <img
                src={panel.image}
                alt={panel.alt ?? ''}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <PanelPlaceholder />
            )}
            <ul className="mt-4 list-disc space-y-2 pl-4 font-body text-[0.82rem] leading-relaxed text-muted">
              {panel.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  usePageMeta({
    title: 'Our Work — The Design Atelier',
    description:
      'A portfolio of thoughtful architecture and interiors: architecture, government spaces, interiors, turnkey execution, and planning work.',
    path: '/projects',
  });

  /** Slug of the category tab currently showing in the project index. */
  const [activeSlug, setActiveSlug] = useState<string>(PROJECTS[0].slug);

  const activeEntries = useMemo(
    () => PROJECT_INDEX[activeSlug] ?? [],
    [activeSlug]
  );


  return (
    <>
      <PageHero
        title="Our Work"
        subtitle="A Portfolio of Thoughtful Architecture and Interiors"
        intro="From architecture and government spaces to interiors, turnkey execution, and planning work, our portfolio shows how we create environments that feel clear, purposeful, and refined."
        image="/assets/images/hero/projects-hero.jpg"
        imageAlt="Contemporary residential apartment building framed by palm trees"
      />

      <Section tone="bone">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading title="Our Work" subtitle="Projects" />
          </Reveal>
          <Reveal delay={120}>
            <p className="font-body text-base leading-relaxed text-muted">
              The Design Atelier creates architecture, interiors, turnkey spaces, government
              environments, and planning documentation designed to feel both purposeful and
              timeless.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Project index — category tabs (Services_Page.pdf) */}
      <Section tone="canvas">
        <Reveal>
          <SectionHeading
            title="Project Index"
            subtitle="Choose a category to see the projects within it."
          />
        </Reveal>

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Browse projects by category"
            /*
              Single row, always. The eight labels are too wide for 1280px at
              the normal label-caps tracking, so tracking and size are tightened
              here and the row scrolls horizontally rather than wrapping. The
              scrollbar itself is hidden — the cut-off label is the affordance.
            */
            className="flex flex-nowrap items-center gap-x-7 overflow-x-auto border-y border-line py-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((project) => {
              const active = activeSlug === project.slug;
              const count = (PROJECT_INDEX[project.slug] ?? []).length;

              return (
                <button
                  key={project.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="project-index-panel"
                  onClick={() => setActiveSlug(project.slug)}
                  title={project.title}
                  className={`label-caps shrink-0 whitespace-nowrap border-b-2 pb-1 tracking-[0.1em] transition-colors duration-300 ${
                    active
                      ? 'border-ink text-ink'
                      : 'border-transparent text-subtle hover:text-ink'
                  }`}
                >
                  {TAB_LABELS[project.slug] ?? project.title}
                  {/* Count sits inline so an empty category is obvious before it is opened. */}
                  {count > 0 && <span className="ml-1.5 text-accent">{count}</span>}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="project-index-panel" role="tabpanel" className="mt-12">
          {activeEntries.length > 0 ? (
            <div className="space-y-10">
              {activeEntries.map((entry, e) => (
                <Reveal key={entry.title} delay={e * 80}>
                  <ProjectEntryBlock entry={entry} index={e} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-muted">
              Projects in this category will be added soon.
            </p>
          )}
        </div>
      </Section>

      <CtaBanner
        subtitle="Ready to begin your next design project?"
        body="Let’s create a space that is both beautiful and built to last, with purpose-driven design and careful execution."
        ctaLabel="Schedule a Consultation"
        image="/assets/images/cta/boardroom-logo-wall.jpg"
        imageAlt="Boardroom with the illuminated The Design Atelier logo wall"
      />
    </>
  );
}