import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';
import { SERVICES, WORKFLOW } from '../data/services';
import { usePageMeta } from '../lib/seo';

export default function Services() {
  usePageMeta({
    title: 'Services — The Design Atelier',
    description:
      'Full-service architecture, interior, and turnkey solutions — from concept through construction, with thoughtful design and practical delivery.',
    path: '/services',
  });

  return (
    <>
      <PageHero
        title="Services"
        subtitle="Full-Service Architecture, Interior, and Turnkey Solutions"
        intro="We guide each project from concept through construction, combining thoughtful design, technical coordination, and practical delivery."
        image="/assets/images/hero/services-hero.jpg"
        imageAlt="Neutral living room with a linen sofa, pampas grass and a lounge chair"
      />

      {/* PDF page 19 — what we do */}
      <Section tone="bone">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading
              title="What We Do"
              subtitle="Design support from the first sketch to the finished space."
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="font-body text-base leading-relaxed text-muted">
              We bring architecture, interiors, documentation, approvals, and site coordination into
              one steady process, so every decision moves the project forward.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14">
          {SERVICES.map((service, i) => (
            <Reveal key={service} delay={i * 60}>
              <li className="group flex items-baseline gap-8 border-b border-line py-6 md:gap-16">
                <span className="label-caps w-8 shrink-0 text-subtle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-heading text-2xl text-ink transition-transform duration-500 ease-atelier group-hover:translate-x-2 md:text-[2.1rem]">
                  {service}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* PDF page 20 — workflow process */}
      <Section tone="canvas">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-heading text-[2rem] text-ink md:text-[2.4rem]">
              Workflow <span className="text-muted">Process</span>
            </h2>
            <p className="mt-3 max-w-xs font-body text-lg text-muted">
              Clear stages, steady decisions, better execution.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-body text-sm leading-relaxed text-muted">
              A disciplined process keeps the work calm, coordinated, and ready for real
              construction. Every phase is connected, documented, and reviewed so the finished space
              feels intentional from structure to detail.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW.map((step, i) => (
            <Reveal key={step.phase} delay={i * 80}>
              <article className="h-full border border-line bg-bone/60 p-7 transition-colors duration-500 hover:border-ink/25">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center border border-line font-body text-xs text-accent"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="label-caps mt-5 text-subtle">{step.phase}</p>
                <h3 className="mt-3 font-heading text-xl text-ink">{step.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        subtitle="Ready to move your project forward?"
        body="From early design to construction delivery, our team can help guide your next architecture or interior project with clarity and care."
        ctaLabel="Connect With Us"
        image="/assets/images/cta/armchairs-lounge.jpg"
        imageAlt="Two upholstered armchairs beside a round table under a branded wall"
      />
    </>
  );
}
