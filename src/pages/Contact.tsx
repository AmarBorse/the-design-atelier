import { useState } from 'react';
import type { FormEvent } from 'react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { OFFICES, STUDIO } from '../data/site';
import { usePageMeta } from '../lib/seo';

export default function Contact() {
  usePageMeta({
    title: 'Contact — The Design Atelier',
    description:
      'Let’s talk about your next architecture or interior project. Reach out to discuss a new home, workplace, hospitality venue, or renovation.',
    path: '/contact',
  });

  const [sent, setSent] = useState(false);

  /**
   * No backend exists in this handover, so the form composes a mail draft to
   * the studio address. Swap this handler for a POST to your form endpoint
   * (Formspree, Resend, a serverless route) when one is available.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:${STUDIO.email}?subject=Project inquiry from ${name}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let’s Talk About Your Next Architecture or Interior Project"
        intro="Reach out to discuss a new home, workplace, hospitality venue, or renovation. We help create spaces that feel thoughtful, elegant, and easy to live in."
        image="/assets/images/hero/contact-hero.jpg"
        imageAlt="Warmly lit studio interior"
      />

      <Section tone="bone">
        <Reveal>
          <SectionHeading
            title="Contact Information"
            subtitle="Let’s Create Something Meaningful Together"
            intro="Reach out to discuss your next project, request a consultation, or learn how we can help you transform your space with thoughtful architecture and interiors."
          />
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-10">
                <div>
                  <label htmlFor="name" className="label-caps text-subtle">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-3 w-full border-b border-line bg-transparent pb-3 font-body text-base text-ink outline-none transition-colors duration-300 focus:border-ink"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label-caps text-subtle">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-3 w-full border-b border-line bg-transparent pb-3 font-body text-base text-ink outline-none transition-colors duration-300 focus:border-ink"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label-caps text-subtle">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-3 w-full resize-y border-b border-line bg-transparent pb-3 font-body text-base text-ink outline-none transition-colors duration-300 focus:border-ink"
                  />
                </div>
              </div>

              <Button type="submit" variant="outline" className="mt-10">
                Send Inquiry
              </Button>

              <p aria-live="polite" className="mt-4 font-body text-sm text-muted">
                {sent ? 'Opening your email client…' : ''}
              </p>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-heading text-2xl text-ink">Studio</h3>
            <address className="mt-5 not-italic">
              <div className="flex flex-col gap-5">
                {OFFICES.map((office) => (
                  <div key={office.city}>
                    <p className="label-caps text-subtle">{office.city}</p>
                    <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-muted">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-body text-sm">
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="text-ink transition-colors duration-300 hover:text-accent"
                >
                  {STUDIO.email}
                </a>
              </p>
              <p className="mt-2 font-body text-sm">
                <a
                  href={`tel:${STUDIO.phoneHref}`}
                  className="text-ink transition-colors duration-300 hover:text-accent"
                >
                  {STUDIO.phone}
                </a>
              </p>
            </address>

            <h3 className="mt-12 font-heading text-2xl text-ink">Working Hours</h3>
            <ul className="mt-5 flex flex-col gap-2 font-body text-sm text-muted">
              {STUDIO.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Both studios shown side by side, full width so each map has room. */}
        <Reveal className="mt-16">
          <h3 className="font-heading text-2xl text-ink">Visit Us</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {OFFICES.map((office) => (
              <div key={office.city}>
                <p className="label-caps text-subtle">{office.city}</p>
                <div className="mt-3 overflow-hidden border border-line">
                  <iframe
                    title={`Map showing The Design Atelier studio in ${office.city}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      office.mapQuery
                    )}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[320px] w-full border-0"
                  />
                </div>
                <div className="mt-3 bg-canvas p-5">
                  <p className="font-body text-sm font-medium text-ink">{office.city} Studio</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    {office.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBanner
        subtitle="Need an expert design team on your next project?"
        body="Book a conversation with us today and let’s explore what your space can become together."
        ctaLabel="Get in Touch"
        ctaTo="/contact"
        image="/assets/images/cta/reception-desk.jpg"
        imageAlt="The Design Atelier reception, with the gold logo lit above a stone welcome desk"
      />
    </>
  );
}