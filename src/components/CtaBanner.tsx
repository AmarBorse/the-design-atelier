import Container from './Container';
import Button from './Button';

type Props = {
  subtitle: string;
  body: string;
  ctaLabel: string;
  ctaTo?: string;
  image: string;
  imageAlt: string;
};

/** Dark "Ready to begin?" band that closes every page. */
export default function CtaBanner({
  subtitle,
  body,
  ctaLabel,
  ctaTo = '/contact',
  image,
  imageAlt,
}: Props) {
  return (
    <section className="bg-night py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-heading text-[2rem] leading-tight text-bone md:text-[2.5rem]">
              Ready to begin?
            </h2>
            <p className="mt-4 font-body text-lg text-bone/85 md:text-xl">{subtitle}</p>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-bone/60">{body}</p>
            <Button to={ctaTo} variant="outlineLight" className="mt-9">
              {ctaLabel}
            </Button>
          </div>

          <div className="overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
