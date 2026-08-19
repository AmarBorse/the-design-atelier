import type { ReactNode } from 'react';
import Container from './Container';

type Props = {
  children: ReactNode;
  /** Background tone. Matches the alternating bands in the reference. */
  tone?: 'canvas' | 'bone' | 'surface' | 'night';
  className?: string;
  contained?: boolean;
  id?: string;
};

const TONES: Record<NonNullable<Props['tone']>, string> = {
  canvas: 'bg-canvas text-ink',
  bone: 'bg-bone text-ink',
  surface: 'bg-surface text-ink',
  night: 'bg-night text-bone',
};

export default function Section({
  children,
  tone = 'canvas',
  className = '',
  contained = true,
  id,
}: Props) {
  return (
    <section id={id} className={`${TONES[tone]} py-16 md:py-24 lg:py-28 ${className}`}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
