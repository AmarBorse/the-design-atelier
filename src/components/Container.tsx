import type { ReactNode } from 'react';

type Props = { children: ReactNode; className?: string };

/** Page shell: max 1280px with the reference's generous side gutters. */
export default function Container({ children, className = '' }: Props) {
  return (
    <div className={`mx-auto w-full max-w-shell px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
