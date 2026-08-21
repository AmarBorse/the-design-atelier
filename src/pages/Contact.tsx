import { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { OFFICES, STUDIO } from '../data/site';
import { usePageMeta } from '../lib/seo';

/**
 * EmailJS configuration for the inquiry form.
 *
 * ACTIVATING THIS FORM — one-time dashboard setup, no further code changes:
 *   1. Create a free account at https://www.emailjs.com
 *   2. Add an Email Service (connect the Gmail/Outlook inbox that should
 *      receive inquiries) → copy its Service ID
 *   3. Create an Email Template with {{name}}, {{email}}, {{message}}
 *      placeholders → copy its Template ID
 *   4. Account → General → copy the Public Key
 *   5. Paste all three below in place of the REPLACE_WITH_… placeholders
 *
 * Full walkthrough with screenshots: see the chat message this shipped
 * with, or https://www.emailjs.com/docs/tutorial/creating-email-template/
 *
 * Until all three are filled in, submissions fail gracefully — the person
 * sees the error state below and the "email us directly" link, never a
 * silent failure or a broken redirect.
 *
 * Free tier is 200 emails/month, no card required. Unlike a relay service
 * (Formspree, Web3Forms), EmailJS sends from the studio's own connected
 * inbox, so replies land in the same thread as the inquiry.
 */
const EMAILJS_SERVICE_ID = 'service_48ibpup';
const EMAILJS_TEMPLATE_ID = 'template_du78htk';
const EMAILJS_PUBLIC_KEY = 'a0tz37CA99IlAPpbc';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  usePageMeta({
    title: 'Contact — The Design Atelier',
    description:
      'Let’s talk about your next architecture or interior project. Reach out to discuss a new home, workplace, hospitality venue, or renovation.',
    path: '/contact',
  });

  const [status, setStatus] = useState<SubmitState>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Bots fill every field, including the one real visitors never see.
    // Drop the submission without sending — no error, no email, and the
    // person sees the normal success state so a bot gets no signal that
    // it was caught.
    if (new FormData(form).get('website')) {
      setStatus('sent');
      form.reset();
      return;
    }

    setStatus('sending');

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      if (result.status === 200) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      // Network failure, or the EmailJS IDs above still hold placeholders.
      setStatus('error');
    }
  }

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let’s Talk About Your Next Architecture or Interior Project"
        intro="Reach out to discuss a new home, workplace, hospitality venue, or renovation. We help create spaces that feel thoughtful, elegant, and easy to live in."
        image="/assets/images/hero/contact-hero.jpg"
        imageAlt="Wooden blocks with phone, envelope, @, and mobile icons, with a hand holding a phone in the background"
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
              {/*
                Honeypot: a field real visitors never see or fill. EmailJS
                has no built-in spam field like Formspree's `_gotcha`, so this
                is checked manually in handleSubmit — if it arrives non-empty,
                the submission is silently dropped rather than emailed.
              */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

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

              <Button
                type="submit"
                variant="outline"
                className="mt-10 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
              </Button>

              <p aria-live="polite" className="mt-4 font-body text-sm text-muted">
                {status === 'sent' &&
                  "Thank you — your inquiry has been sent. We'll be in touch shortly."}
                {status === 'error' && (
                  <>
                    Something went wrong sending that. Please try again, or email us directly at{' '}
                    <a
                      href={`mailto:${STUDIO.email}`}
                      className="text-ink underline underline-offset-2 hover:text-accent"
                    >
                      {STUDIO.email}
                    </a>
                    .
                  </>
                )}
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