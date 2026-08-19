import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  intro?: ReactNode;
  className?: string;
  invert?: boolean;
  as?: 'h1' | 'h2';
};

/**
 * The recurring heading stack used across the reference:
 * large light display heading, grey subtitle, then a narrow intro paragraph.
 */
export default function SectionHeading({
  title,
  subtitle,
  intro,
  className = '',
  invert = false,
  as: Tag = 'h2',
}: Props) {
  return (
    <div className={className}>
      <Tag
        className={`font-heading text-[2rem] font-normal leading-[1.15] tracking-[0.01em] md:text-[2.6rem] ${
          invert ? 'text-bone' : 'text-ink'
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={`mt-3 font-body text-lg font-normal md:text-xl ${
            invert ? 'text-bone/75' : 'text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
      {intro && (
        <div
          className={`mt-6 max-w-2xl font-body text-[0.95rem] leading-relaxed ${
            invert ? 'text-bone/70' : 'text-muted'
          }`}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
