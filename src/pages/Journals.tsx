import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { usePageMeta } from '../lib/seo';

/* ------------------------------------------------------------------ *
 * Journal entries
 *
 * HOW TO ADD A PDF (no other file needs touching):
 *
 *   1. Put the PDF in  public/assets/journals/
 *      e.g.  public/assets/journals/healthcare-planning.pdf
 *
 *   2. In the entry below, set:
 *        file:  '/assets/journals/healthcare-planning.pdf'
 *      and replace title, date, and excerpt with the real text.
 *
 * While `file` is null the card renders in a locked state — greyed, with
 * "Coming Soon" instead of a button — so a half-finished entry can never ship
 * as a dead link. The moment a path is filled in, that card turns live on its
 * own. Delete any entries you do not need; the grid reflows.
 * ------------------------------------------------------------------ */

type JournalEntry = {
  title: string;
  /** e.g. 'March 2026'. Leave as an empty string until the entry is published. */
  date: string;
  excerpt: string;
  /** Public path to the PDF, or null while the entry is still being written. */
  file: string | null;
};

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    title: 'Journal Entry One',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Two',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Three',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Four',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Five',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Six',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
];

/** Sheet-of-paper mark standing in for a cover image until one is supplied. */
function DocumentMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14 text-ink/25 transition-colors duration-500 group-hover:text-accent"
    >
      <path d="M34 12h36l20 20v76H34z" />
      <path d="M70 12v20h20" />
      <path d="M46 56h32M46 70h32M46 84h20" />
    </svg>
  );
}

export default function Journals() {
  usePageMeta({
    title: 'Journals — The Design Atelier',
    description:
      'Notes, reflections, and project thinking from the studio at The Design Atelier.',
    path: '/journals',
  });

  return (
    <>
      <PageHero
        title="Journals"
        subtitle="Notes and Reflections from the Studio"
        image="/assets/images/hero/services-hero.jpg"
        imageAlt="Neutral living room with a linen sofa, pampas grass and a lounge chair"
      />

      <Section tone="bone" className="relative overflow-hidden">
        <Reveal>
          <SectionHeading
            title="Reading Room"
            subtitle="Writing from the practice, free to read and share."
            intro="Each entry opens as a PDF you can read in the browser or download."
          />
        </Reveal>

        <div className="relative mt-14">
          {/* Glass needs something behind it to refract. These washes sit under
              the grid and are what the blur picks up — on a flat bone
              background the cards would read as plain translucent panels. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          />

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {JOURNAL_ENTRIES.map((entry, i) => {
              const isLive = Boolean(entry.file);

              return (
                <Reveal key={entry.title} delay={i * 80}>
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/70 bg-white/45 p-8 shadow-[0_8px_30px_rgba(26,26,26,0.06)] backdrop-blur-md transition-all duration-500 ease-atelier ${
                      isLive
                        ? 'hover:-translate-y-1 hover:border-white hover:bg-white/65 hover:shadow-[0_18px_45px_rgba(26,26,26,0.10)]'
                        : 'opacity-70'
                    }`}
                  >
                    {/* Sheen along the top edge, the giveaway detail on frosted glass. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <DocumentMark />
                      <span className="label-caps text-subtle">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {entry.date && (
                      <p className="label-caps mt-7 text-subtle">{entry.date}</p>
                    )}

                    <h3 className={`font-heading ${entry.date ? 'mt-3' : 'mt-7'} text-xl leading-snug text-ink md:text-[1.4rem]`}>
                      {entry.title}
                    </h3>

                    <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                      {entry.excerpt}
                    </p>

                    {/* Pushed to the bottom so every card's action lines up. */}
                    <div className="mt-8 pt-2 md:mt-auto">
                      {isLive ? (
                        <a
                          href={entry.file as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-caps inline-flex items-center gap-3 text-ink transition-colors duration-300 hover:text-accent"
                        >
                          Read More
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-300 ease-atelier group-hover:translate-x-1.5"
                          >
                            →
                          </span>
                          <span className="sr-only">
                            {`— opens "${entry.title}" as a PDF in a new tab`}
                          </span>
                        </a>
                      ) : (
                        <span className="label-caps text-subtle">Coming Soon</span>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <CtaBanner
        subtitle="Ready to move your project forward?"
        body="From early design to construction delivery, our team can help guide your next architecture or interior project with clarity and care."
        ctaLabel="Connect With Us"
        image="/assets/images/cta/signage-wall.jpg"
        imageAlt="The Design Atelier signage on a lit reception wall beside a wayfinding panel"
      />
    </>
  );
}