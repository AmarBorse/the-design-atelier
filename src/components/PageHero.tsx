import Container from './Container';

type Props = {
  title: string;
  subtitle: string;
  /** Optional supporting line. Omitted on pages whose banner is title + subtitle only. */
  intro?: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  /**
   * 'strong' lays a heavier, more even darkening over the photograph. Use it
   * when the image itself contains lettering — a signage wall or logo — that
   * would otherwise compete with the title. The photo stays sharp.
   */
  scrim?: 'default' | 'strong';
};

/**
 * Shared banner for About / Projects / Services / Contact: centred display
 * caps over a darkened photograph.
 */
export default function PageHero({
  title,
  subtitle,
  intro,
  image,
  imageAlt,
  objectPosition = 'center',
  scrim = 'default',
}: Props) {
  const isStrong = scrim === 'strong';
  return (
    <section className="relative h-[46vh] min-h-[340px] w-full overflow-hidden md:h-[54vh]">
      <img
        src={image}
        alt={imageAlt}
        decoding="async"
        style={{ objectPosition }}
        className="absolute inset-0 h-full w-full animate-kenBurns object-cover"
      />
      {/* CORRECTION #2: gradient beneath the text layer for contrast. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${
          isStrong ? 'scrim-center-strong' : 'scrim-center'
        }`}
      />

      <Container className="relative flex h-full flex-col items-center justify-center text-center">
        <h1 className="animate-fadeUp font-display text-[2.2rem] font-normal uppercase tracking-[0.06em] text-white sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>
        <p
          style={{ animationDelay: '150ms' }}
          className="label-caps mt-4 animate-fadeUp text-[0.8rem] tracking-[0.12em] text-white/90 md:text-sm"
        >
          {subtitle}
        </p>
        {intro && (
          <p
            style={{ animationDelay: '280ms' }}
            className="mt-6 max-w-2xl animate-fadeUp font-body text-sm leading-relaxed text-white/85"
          >
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}