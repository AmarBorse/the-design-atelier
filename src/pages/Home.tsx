import Container from '../components/Container';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { ArrowLink } from '../components/Button';
import HeroSlider from '../components/HeroSlider';
import ProjectCard from '../components/ProjectCard';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';
import { CLIENTS, STATS, STUDIO } from '../data/site';
import { FEATURED_ARCHITECTURE, FEATURED_INTERIORS } from '../data/projects';
import { WHY_CHOOSE_US } from '../data/services';
import { usePageMeta } from '../lib/seo';

export default function Home() {
  usePageMeta({
    title: 'The Design Atelier — Architecture & Interior Design Studio',
    description:
      'The Design Atelier is a premium architecture and interior design studio specializing in bespoke spaces, turnkey solutions, and timeless design.',
    path: '/',
  });

  return (
    <>
      <HeroSlider />

      {/* PDF page 2 — brand wordmark, mission and vision, over the line-art cityscape */}
      <Section tone="surface" contained={false} className="relative overflow-hidden">
        <img
          src="/assets/images/backgrounds/city-line-art.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-bottom"
        />
        <Container className="relative">
          <Reveal className="flex flex-col items-center text-center">
            <img
              src="/assets/images/logo/logo-wordmark.png"
              alt={`${STUDIO.name} wordmark`}
              loading="lazy"
              className="w-full max-w-xl"
            />
            <p className="mt-8 max-w-3xl font-body text-base leading-relaxed text-ink md:text-lg">
              The Design Atelier is an independent architecture and interior practice, led by Ar.
              Aditya Anil Mulay and built on nineteen years of professional discipline — including
              eight years delivering projects across Oman and the wider GCC. The practice runs
              across two verticals: government and institutional healthcare architecture, and
              premium turnkey interior design. We are empanelled with the National Health Mission
              (NHM), the Reserve Bank of India (RBI), and the Public Works Department (PWD). We are
              a small studio by choice, on the conviction that the architect who takes a client's
              first meeting should also be the architect on the final site visit.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-0">
            <Reveal className="px-0 text-center md:px-10">
              <h2 className="font-body text-2xl font-medium text-ink md:text-[1.7rem]">Our Mission</h2>
              <p className="mx-auto mt-6 max-w-sm font-body text-base leading-relaxed text-ink/85">
                To design and deliver buildings and interiors whose intent survives contact with
                the site — through disciplined documentation, honest communication, and a
                small-studio commitment to being personally answerable for every drawing that
                leaves us.
              </p>
            </Reveal>
            <Reveal delay={120} className="border-ink/80 px-0 text-center md:border-l md:px-10">
              <h2 className="font-body text-2xl font-medium text-ink md:text-[1.7rem]">Our Vision</h2>
              <p className="mx-auto mt-6 max-w-sm font-body text-base leading-relaxed text-ink/85">
                To be the practice that institutional bodies and the most exacting private clients
                across Maharashtra and the GCC turn to when a project cannot afford to go wrong.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* PDF page 3 — statistics band */}
      <section className="bg-gradient-to-r from-[#E9E3DC] via-[#EDE7E1] to-[#F2EDE8] py-14 md:py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 90}
                className={`px-4 text-center md:px-8 ${i > 0 ? 'md:border-l md:border-ink/25' : ''}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-5xl leading-none text-ink md:text-6xl">
                    {stat.value}
                  </span>
                  <span className="align-super font-body text-2xl text-ink md:text-3xl">+</span>
                  <p className="label-caps mt-3 text-ink">{stat.label}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* PDF page 4 — the vision behind the atelier */}
      <Section tone="canvas" className="relative overflow-hidden">
        <Reveal>
          <h2 className="font-body text-[1.75rem] font-normal text-ink md:text-[2.1rem]">
            The Vision Behind the Atelier
          </h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14">
          <Reveal>
            <img
              src="/assets/images/about/architect-portrait.jpg"
              alt="Ar. Aditya Anil Mulay, Founder and Principal Architect, at his desk"
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          </Reveal>

          <Reveal delay={120} className="relative">
            <p className="label-caps text-ink">Principal Design Architect &amp; Founder</p>
            <h3 className="mt-5 font-heading text-3xl text-ink md:text-[2.1rem]">
              Ar. Aditya Anil Mulay
            </h3>

            <p className="mt-7 max-w-xl font-body text-sm leading-relaxed text-muted">
              Ar. Aditya Anil Mulay is the founder and principal architect of The Design Atelier.
              With nineteen years of professional experience — including eight years delivering
              projects across Oman and the wider GCC — he brings the discipline of large-programme
              institutional work to a practice that has chosen to remain deliberately small.
            </p>
            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-muted">
              The practice runs across two verticals: government and institutional healthcare
              architecture, and premium turnkey interior design. Aditya personally leads every
              project from first brief to final site handover, on the conviction that architecture
              is judged not by what leaves the studio but by what stands on site.
            </p>

            <ul className="mt-8 max-w-xl border-t border-line font-body text-xs leading-relaxed text-muted">
              <li className="border-b border-line py-4">
                COA - Council of Architecture, India | Registered Architect
              </li>
              <li className="border-b border-line py-4">
                LEED AP BD+C | IGBC Accredited Professional
              </li>
              <li className="py-4">
                MBA - Environmental Management and Architectural Management
              </li>
            </ul>
          </Reveal>
        </div>

        <img
          src="/assets/images/about/line-art-building.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -bottom-6 right-0 hidden w-[38%] max-w-lg opacity-90 mix-blend-multiply lg:block"
        />
      </Section>

      {/* PDF pages 5 and 6 — selected work */}
      <Section tone="bone">
        <Reveal className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-10 hidden h-24 w-24 rotate-6 border border-gold/70 md:block"
            style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-heading text-[2rem] text-ink md:text-[2.6rem]">Selected Work</h2>
              <p className="mt-3 font-body text-lg text-muted">Featured Projects</p>
            </div>
            <ArrowLink to="/projects">All Projects</ArrowLink>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FEATURED_ARCHITECTURE.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FEATURED_INTERIORS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PDF page 7 — clients, as a continuously scrolling ribbon */}
      <Section tone="canvas" contained={false}>
        <Container>
          <Reveal>
            <h2 className="font-body text-xl font-normal uppercase tracking-[0.04em] text-ink md:text-2xl">
              Our Clients
            </h2>
            {/*
              Review §6.2: a client browsing on a phone does not reliably
              recognise government seals, so the empanelments are stated in
              words rather than left to the logos alone.
            */}
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-muted">
              Empanelled with the National Health Mission (NHM), the Reserve Bank of India (RBI),
              and the Public Works Department (PWD).
            </p>
          </Reveal>
        </Container>

        <Reveal className="group relative mt-12 overflow-hidden">
          {/* The list is rendered twice; the track shifts by exactly half its
              width, so the loop repeats without a visible seam. Hovering pauses. */}
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                aria-hidden={i >= CLIENTS.length}
                className="flex w-44 shrink-0 flex-col items-center px-4 text-center md:w-56 md:px-6"
              >
                <img
                  src={client.logo}
                  alt={i < CLIENTS.length ? `${client.name} logo` : ''}
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-auto max-w-[7rem] object-contain md:h-24"
                />
                <p className="mt-4 font-body text-sm leading-snug text-ink">{client.name}</p>
              </div>
            ))}
          </div>

          {/* Soft edges so logos enter and leave rather than clipping. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-canvas to-transparent md:w-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-canvas to-transparent md:w-24"
          />
        </Reveal>
      </Section>

      {/* PDF page 8 — about the studio */}
      <Section tone="canvas" className="!pt-0">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading
              title="About the Studio"
              subtitle="An Independent Practice, Empanelled Where It Counts"
            />
            <p className="mt-8 max-w-md font-body text-base leading-relaxed text-muted">
              The Design Atelier is an independent architecture and interior practice, founded and
              led by Ar. Aditya Anil Mulay. We operate on a hub-and-spoke model — a core studio in
              Nashik with an active project presence in Thane — and work across two clearly defined
              verticals: government and institutional healthcare architecture, and premium turnkey
              interior design.
            </p>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-muted">
              Nineteen years of practice, eight of them in Oman and the wider GCC, sit behind every
              drawing that leaves the studio. Empanelled with NHM, RBI, and PWD.
            </p>
            <ArrowLink to="/about" className="mt-9">
              Learn More
            </ArrowLink>
          </Reveal>

          <Reveal delay={120}>
            <img
              src="/assets/images/about/studio-signage.jpg"
              alt="Studio corridor with wayfinding signage and The Design Atelier glass sign"
              loading="lazy"
              decoding="async"
              className="aspect-[16/11] w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* PDF page 9 — why choose us */}
      <Section tone="bone">
        <Reveal>
          <SectionHeading
            title="Why Choose Us"
            subtitle="Two disciplines, one standard of delivery."
            intro="We keep the design language refined and the project journey practical, with decisions that are easy to understand and easier to build."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <img
              src="/assets/images/gallery/process-blueprint.jpg"
              alt="Floor plans, material samples and a tablet showing a rendered exterior"
              loading="lazy"
              decoding="async"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item, i) => (
              <Reveal
                key={item.number}
                delay={i * 90}
                className={`border-line p-7 ${i % 2 === 0 ? 'sm:border-r' : ''} ${
                  i < 2 ? 'border-b' : ''
                }`}
              >
                <p className="label-caps text-subtle">{item.number}</p>
                <h3 className="mt-4 font-heading text-xl text-ink md:text-[1.4rem]">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* PDF page 10 — closing call to action */}
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