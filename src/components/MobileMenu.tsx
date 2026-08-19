import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV, STUDIO } from '../data/site';

type Props = { open: boolean; onClose: () => void };

/**
 * Full-screen overlay menu. The review PDF contains desktop captures only, so
 * the mobile pattern follows the site's own visual language (bone panel,
 * wide-tracked uppercase items, staggered entrance) rather than a guess at an
 * unseen design. Confirm against the live site on a phone before sign-off.
 */
export default function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      tabIndex={-1}
      aria-hidden={!open}
      className={`fixed inset-0 z-40 bg-bone transition-[opacity,visibility] duration-500 ease-atelier md:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div className="flex h-[70px] items-center justify-end px-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="relative h-10 w-10"
        >
          <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 rotate-45 bg-ink" />
          <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 -rotate-45 bg-ink" />
        </button>
      </div>

      <nav aria-label="Mobile" className="px-8 pt-6">
        <ul className="flex flex-col gap-7">
          {NAV.map((item, i) => (
            <li
              key={item.to}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              className={`transition-[opacity,transform] duration-500 ease-atelier ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `font-heading text-3xl transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute inset-x-8 bottom-10 border-t border-line pt-6">
        <a href={`mailto:${STUDIO.email}`} className="block font-body text-sm text-muted">
          {STUDIO.email}
        </a>
        <a href={`tel:${STUDIO.phoneHref}`} className="mt-2 block font-body text-sm text-muted">
          {STUDIO.phone}
        </a>
      </div>
    </div>
  );
}
