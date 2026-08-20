import type { ReactNode } from 'react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';
import { PHILOSOPHY, TEAM } from '../data/services';
import { usePageMeta } from '../lib/seo';

/**
 * The eight areas shown as glass cards in the Services section.
 *
 * Kept local to this page on purpose. The same eight titles also appear in
 * `src/data/projects.ts`, but that array is provisional and is meant to be
 * replaced by the real project list — this section should not break when it is.
 */
const SERVICE_AREAS = [
  'Residential Architecture.',
  'Institutional Architecture.',
  'Healthcare Architecture.',
  'Public Architecture.',
  'Residential Interior.',
  'Corporate Interior.',
  'Transportation Infrastructure.',
  'Cafés and Food Courts.',
] as const;

/**
 * "Our Workflow" — copy taken verbatim from The-Design-Atelier-How-We-Work.docx.
 *
 * That document's own layout note asks for the six phases grouped into three
 * macro-stages rather than a flat 2x3 grid of equal-weight cards, with the
 * numerals carrying the visual rhythm and the icons dropped. Hence this shape.
 *
 * Note this is richer copy than the six-phase WORKFLOW array in
 * `src/data/services.ts`, which the Services page still renders. If it should
 * replace that too, the array there needs updating — a separate file.
 */
const WORKFLOW_STAGES = [
  {
    stage: 'Understanding',
    phases: [
      {
        number: '01',
        title: 'The Brief',
        body: 'Before a single line is drawn, we sit down to understand what you are actually trying to achieve. Programme, budget, timeline, statutory context, and the constraints that rarely appear on a wish list. A brief, agreed in writing, becomes the reference every later decision is measured against.',
      },
      {
        number: '02',
        title: 'Concept Design',
        body: 'We propose two or three directions, each with a clear rationale — spatial logic, form, character, and how each responds to the brief. You choose the direction; we develop it. Nothing moves forward until the concept and the brief are aligned in writing.',
      },
    ],
  },
  {
    stage: 'Resolution',
    phases: [
      {
        number: '03',
        title: 'Design Development',
        body: 'The chosen concept is resolved into a buildable design — materials, dimensions, services coordination, finishes. Structural, MEP, and specialist consultants are brought in at this stage rather than later, so what reaches documentation is already coordinated.',
      },
      {
        number: '04',
        title: 'Documentation',
        body: 'Construction drawings, specifications, schedules, and tender documents. Every sheet is reviewed against a fixed studio checklist before it leaves us. Good documentation shows up on site months later as work that goes smoothly; careless documentation shows up as variations.',
      },
    ],
  },
  {
    stage: 'Delivery',
    phases: [
      {
        number: '05',
        title: 'Approvals & Coordination',
        body: 'Statutory submissions, municipal approvals, and the review sequences public projects require under NHM, PWD, and RBI protocols. On the private side, coordination with appointed consultants, PMCs, and contractors — always in writing, always with a paper trail.',
      },
      {
        number: '06',
        title: 'Construction & Handover',
        body: 'Scheduled site visits, quality reviews at defined stages, RFI resolution, and closeout documentation. We stay engaged until the project is genuinely finished — not just occupied.',
      },
    ],
  },
] as const;

/* ------------------------------------------------------------------ *
 * Sketch backdrops
 *
 * Faint architectural line work sitting behind every section. Both images
 * are already in the project, so nothing new needs installing.
 *
 * Legibility is the whole risk here: turn these up and body copy starts to
 * fight the drawing behind it. Every opacity is passed explicitly at the call
 * site so it can be retuned per section, and the two defaults below are the
 * ceiling I would go to.
 * ------------------------------------------------------------------ */

const SKETCH_CITY = '/assets/images/backgrounds/city-line-art.png';
const SKETCH_BUILDING = '/assets/images/about/line-art-building.png';

/** Positioned line-art drawing. `className` carries placement and size. */
function Sketch({
  src,
  className,
  opacity,
  flip = false,
}: {
  src: string;
  className: string;
  opacity: number;
  flip?: boolean;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{ opacity, transform: flip ? 'scaleX(-1)' : undefined }}
      className={`pointer-events-none absolute select-none mix-blend-multiply ${className}`}
    />
  );
}

/** Drafting-paper grid, faded out at the edges so it never ends on a hard line. */
function BlueprintGrid({ className = '' }: { className?: string }) {
  const fade =
    'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 80%)';
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(26,26,26,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.055) 1px, transparent 1px)',
        backgroundSize: '58px 58px',
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
}

/** Compass arcs and dimension marks — the margin notes of a drawing set. */
function DraftingMarks({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`pointer-events-none absolute text-ink/[0.13] ${className}`}
    >
      <circle cx="120" cy="120" r="94" />
      <circle cx="120" cy="120" r="66" strokeDasharray="4 6" />
      <path d="M120 6v228M6 120h228" strokeDasharray="3 7" />
      <path d="M120 120 214 68" />
      <path d="M26 214h58m-58 0v-10m0 10v10M84 214v-10m0 10v10" />
      <path d="M156 26a94 94 0 0 1 58 42" />
    </svg>
  );
}

/**
 * Stacked display heading used by the two narrative sections, e.g.
 * THE LEGACY / WE / CARRY.
 */
function StackedHeading({ lines }: { lines: string[] }) {
  return (
    <h2 className="font-display text-[1.9rem] uppercase leading-[1.45] tracking-[0.11em] text-ink md:text-[2.3rem]">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

/**
 * Narrative column, divided from the heading by a hairline rule.
 *
 * Set as running prose rather than a bulleted list — these are continuous
 * arguments, not parallel items, and bullets were chopping them into fragments
 * that read as notes. The opening paragraph is set a touch larger to act as a
 * lead-in, and the left indent that the bullets needed is gone.
 */
function NarrativeList({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 border-ink/70 font-body text-[0.95rem] leading-[1.85] text-ink [&>p:first-child]:text-[1.03rem] [&>p:first-child]:leading-[1.75] md:border-l md:pl-12">
      {children}
    </div>
  );
}

export default function About() {
  usePageMeta({
    title: 'About Us — The Design Atelier',
    description:
      'An independent architecture practice with 19+ years of experience across government and institutional healthcare architecture and premium turnkey interior design.',
    path: '/about',
  });

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Resolving Design Dilemmas With Proven Excellence"
        image="/assets/images/hero/about-hero.jpg"
        imageAlt="The Design Atelier reception with the illuminated logo wall"
        scrim="strong"
      />

      {/* The legacy we carry */}
      <Section tone="canvas" className="relative overflow-hidden">
        <BlueprintGrid className="inset-0" />
        <Sketch
          src={SKETCH_BUILDING}
          opacity={0.16}
          className="-bottom-10 right-0 w-[46%] max-w-2xl"
        />
        <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] md:gap-6">
          <Reveal>
            <StackedHeading lines={['The Legacy', 'We', 'Carry']} />
          </Reveal>

          <Reveal delay={120}>
            <NarrativeList>
              <p>
                Decades ago, on a factory floor in Amalner, Maharashtra, my grandfather{' '}
                <strong className="font-medium">Bhaskar Savlaram Mulay</strong> erected the first
                boiler for Dalda — the vegetable oil enterprise that would, under Azim Premji, grow
                into what the world today knows as Wipro.
              </p>
              <p>
                He was not an architect. He was a builder of the practical infrastructure that made
                industry possible in a young republic — a man measured by whether the thing he built
                worked, held, and lasted.
              </p>
              <p>
                In the years that followed, the opportunities that come to a man with proven hands
                came to him too. He chose his work with care. Growth for its own sake held no
                particular appeal; the work itself did.
              </p>
              <p>
                His career does not survive as a monument. It survives as a habit — the discipline
                of building things that hold up under load, on time, without shortcuts, and the
                quieter discipline of choosing which things are worth building at all.
              </p>
              <p>
                That habit is the inheritance{' '}
                <strong className="font-medium">The Design Atelier</strong> is built on.
              </p>
            </NarrativeList>
          </Reveal>
        </div>
      </Section>

      {/* The practice today — centred, on the tan band from the brief */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DDCFC2] to-[#E6DCD2] py-16 md:py-20">
        <Sketch
          src={SKETCH_CITY}
          opacity={0.5}
          className="inset-x-0 bottom-0 w-full object-cover object-bottom"
        />
        <DraftingMarks className="-left-16 top-6 h-56 w-56 md:h-64 md:w-64" />
        <div className="relative mx-auto w-full max-w-shell px-6 sm:px-10 lg:px-16">
          <Reveal className="text-center">
            <h2 className="font-display text-[1.9rem] tracking-[0.06em] text-ink md:text-[2.5rem]">
              The Practice Today
            </h2>

            <div className="mx-auto mt-8 max-w-4xl space-y-5 font-body text-[0.95rem] leading-relaxed text-ink">
              <p>
                Founded and led by Ar. Aditya Anil Mulay, The Design Atelier is an independent
                architecture practice with 19+ years of experience, including 8+ years delivering
                projects in Oman and the wider GCC.
              </p>
              <p>
                We work across two clearly defined verticals: government and institutional
                healthcare architecture, and premium turnkey interior design. Our credentials
                include LEED AP BD+C and IGBC AP accreditation, and we are empanelled with the
                National Health Mission (NHM), the Reserve Bank of India (RBI), and Public Works
                Department (PWD).
              </p>
              <p>
                We operate on a hub-and-spoke model — a core studio in Nashik supported by an active
                project presence in Thane — giving our clients across Maharashtra the responsiveness
                of a local practice with the depth of an established one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <Section tone="canvas" className="relative overflow-hidden">
        <BlueprintGrid className="inset-0" />
        <Sketch
          src={SKETCH_BUILDING}
          opacity={0.14}
          flip
          className="-bottom-12 left-0 w-[40%] max-w-xl"
        />
        <DraftingMarks className="-right-20 top-4 h-64 w-64" />
        <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] md:gap-6">
          <Reveal>
            <StackedHeading lines={['How', 'We', 'Work ?']} />
          </Reveal>

          <Reveal delay={120}>
            <NarrativeList>
              <p>
                We are a small studio by choice. It means the architect who takes your first meeting
                is the architect on your final site visit. It means every drawing set has been read,
                not just signed. Design, for us, begins with the problem, not the picture — every
                brief carries dilemmas of programme, budget, site, and stakeholder, and our job is
                to resolve them.
              </p>
              <p>
                Where AI helps us work faster or think wider, we adopt it deliberately; where
                judgement matters, that stays human. Nothing leaves the studio that we would not
                stand behind ourselves.
              </p>
              <p>
                That is the meaning of our line: Resolving Design Dilemmas With Proven Excellence.
              </p>
              <p>
                Generations after a boiler was fired in Amalner, we are still in the business of
                building things that hold.
              </p>
            </NarrativeList>
          </Reveal>
        </div>
      </Section>

      {/* PDF pages 13–15 — philosophy and services */}
      <Section tone="bone" className="relative overflow-hidden">
        <BlueprintGrid className="inset-0" />
        <Sketch
          src={SKETCH_CITY}
          opacity={0.42}
          className="inset-x-0 bottom-0 w-full object-cover object-bottom"
        />
        <Reveal className="relative">
          <SectionHeading
            title="Our Philosophy"
            subtitle="Four disciplines the practice does not compromise on."
            intro="We are a small studio by choice. It means the architect who takes your first meeting is the architect on your final site visit — and it means everything that follows can be held to a single standard."
          />
        </Reveal>

        {/* Four pillars, each opening with a hairline rule above its label. */}
        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PHILOSOPHY.map((pillar, i) => (
            <Reveal key={pillar.label} delay={i * 90}>
              <div className="h-full border-t border-line pt-6">
                {/*
                  The labels are two or three words now, so some wrap to a
                  second line. min-h reserves both lines in every card, which
                  keeps the four body paragraphs starting on the same baseline.
                */}
                <h3 className="label-caps min-h-[2.4em] leading-[1.2em] text-subtle">
                  {pillar.label}
                </h3>
                <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-muted">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-16">
          <h3 className="font-heading text-[1.7rem] text-ink md:text-[2rem]">Services</h3>
        </Reveal>

        <div className="relative mt-10">
          {/* Glass needs something behind it to refract. These two soft washes
              sit under the grid and are what the blur picks up. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-8 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
          />

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_AREAS.map((area, i) => (
              <Reveal key={area} delay={i * 70}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-white/70 bg-white/45 p-7 shadow-[0_8px_30px_rgba(26,26,26,0.06)] backdrop-blur-md transition-all duration-500 ease-atelier hover:-translate-y-1 hover:border-white hover:bg-white/65 hover:shadow-[0_18px_45px_rgba(26,26,26,0.10)]">
                  {/* Sheen along the top edge, the giveaway detail on frosted glass. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  />
                  <span className="label-caps text-subtle">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-5 font-heading text-xl leading-snug text-ink md:text-[1.4rem]">
                    {area}
                  </h4>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/*
          PDF page 15 ends on the heading "We Work In" with no content beneath
          it — the screenshot is cut off. The heading is reproduced here so the
          section order stays faithful; the list needs to be supplied.
        */}
        <Reveal className="relative mt-16">
          <h3 className="font-heading text-[1.7rem] text-ink md:text-[2rem]"></h3>
        </Reveal>
      </Section>

      {/* Our Workflow — copy from The-Design-Atelier-How-We-Work.docx */}
      <Section tone="surface" className="relative overflow-hidden">
        <BlueprintGrid className="inset-0" />
        <Sketch
          src={SKETCH_BUILDING}
          opacity={0.1}
          flip
          className="-bottom-8 left-0 w-[30%] max-w-sm"
        />
        <DraftingMarks className="-right-16 top-10 h-56 w-56" />

        <Reveal className="relative">
          <SectionHeading
            title="Our Workflow"
            subtitle="Six stages. One discipline. From first brief to final handover."
            intro="Every project we take on — a critical care unit, a district training centre, a corporate fit-out, a considered residence — passes through the same six stages. The process does not vary with the client or the scale. Its job is to remove uncertainty at every step: decisions made once, documented properly, and carried through to site without drift. What follows is not a template. It is how we actually work."
          />
        </Reveal>

        <div className="relative mt-16 flex flex-col gap-14 md:gap-16">
          {WORKFLOW_STAGES.map((group, g) => (
            <div key={group.stage}>
              {/* Macro-stage divider: label sitting on a hairline that runs the full width. */}
              <Reveal delay={g * 60}>
                <div className="flex items-center gap-6">
                  <h3 className="label-caps shrink-0 text-accent">{group.stage}</h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>
              </Reveal>

              <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
                {group.phases.map((phase, i) => (
                  <Reveal key={phase.number} delay={g * 60 + i * 90}>
                    <article className="flex gap-6 md:gap-8">
                      {/* The numeral carries the rhythm, so it is set large and thin. */}
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-display text-[2.75rem] font-normal leading-none text-ink/25 md:text-[3.5rem]"
                      >
                        {phase.number}
                      </span>
                      <div>
                        <h4 className="font-heading text-xl leading-snug text-ink md:text-[1.5rem]">
                          {phase.title}
                        </h4>
                        <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-muted">
                          {phase.body}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="relative mt-16">
          <p className="border-t border-line pt-8 font-body text-[0.95rem] italic leading-relaxed text-muted">
            The process is the same for every project. The judgement inside it is what changes.
          </p>
        </Reveal>
      </Section>

      {/* PDF page 16 — team */}
      <Section tone="canvas" className="relative overflow-hidden">
        <BlueprintGrid className="inset-0" />
        <Sketch
          src={SKETCH_BUILDING}
          opacity={0.12}
          className="-top-8 right-0 w-[34%] max-w-md"
        />
        <Reveal className="relative">
          <SectionHeading title="Meet the Team" subtitle="A Small Team with Clear Design Focus" />
        </Reveal>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 110}>
              <article className="h-full rounded-lg bg-bone p-8 text-center shadow-[0_1px_2px_rgba(26,26,26,0.05)] transition-shadow duration-500 hover:shadow-[0_10px_30px_rgba(26,26,26,0.08)]">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                />
                <h3 className="mt-7 font-heading text-xl text-ink md:text-[1.45rem]">
                  {member.name}
                </h3>
                <p className="mt-2 font-body text-sm font-medium text-ink">{member.role}</p>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted">{member.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PDF page 17 */}
      <CtaBanner
        subtitle="Want to design a space that feels both beautiful and practical?"
        body="We work with thoughtful clients to create architecture and interiors that are grounded in context, function, and long-term value."
        ctaLabel="Schedule a Consultation"
        image="/assets/images/cta/brand-collateral.jpg"
        imageAlt="The Design Atelier brand collateral — brochure, business card, envelope and notebook with the gold logo"
      />
    </>
  );
}