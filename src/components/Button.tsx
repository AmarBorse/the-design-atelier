import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'outlineLight';

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  type?: 'button' | 'submit';
  className?: string;
  /** Only meaningful on the plain <button> form (no `to`/`href`). */
  disabled?: boolean;
};

const BASE =
  'label-caps inline-flex items-center justify-center px-8 py-4 transition-colors duration-300 ease-atelier';

const VARIANTS: Record<Variant, string> = {
  solid: 'bg-ink text-bone hover:bg-ink/85',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone',
  outlineLight:
    'border border-bone/45 text-bone hover:border-bone hover:bg-bone hover:text-ink',
};

/** Rectangular, wide-tracked button used for every call to action. */
export default function Button({
  children,
  to,
  href,
  variant = 'solid',
  type = 'button',
  className = '',
  disabled = false,
}: Props) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type={type} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

/** The "ALL PROJECTS →" / "LEARN MORE →" text link with a sliding arrow. */
export function ArrowLink({
  to,
  children,
  className = '',
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`label-caps group inline-flex items-center gap-3 text-ink transition-colors duration-300 hover:text-accent ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-atelier group-hover:translate-x-1.5"
      >
        →
      </span>
    </Link>
  );
}