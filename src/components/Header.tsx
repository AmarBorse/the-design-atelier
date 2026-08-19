import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import MobileMenu from './MobileMenu';
import { NAV, STUDIO } from '../data/site';

/**
 * Sticky white header with a hairline base border, logo left, wide-tracked
 * uppercase nav right. Active item picks up the champagne accent.
 *
 * CORRECTION #1 (review PDF, page 1) — APPLIED. The supplied gold mark
 * replaces the previous TA lettermark. To change it again, overwrite the file
 * at the path below; no code change is needed.
 */
const LOGO_SRC = '/assets/images/logo/logo-mark.png';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-sm">
      <a
        href="#main"
        className="label-caps sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
      >
        Skip to content
      </a>
      <Container>
        <div className="flex h-[70px] items-center justify-between md:h-[84px]">
          <Link to="/" aria-label={`${STUDIO.name} — home`} className="flex items-center">
            <img
              src={LOGO_SRC}
              alt={`${STUDIO.name} logo`}
              width={40}
              height={40}
              className="h-9 w-auto md:h-11"
            />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-11">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `label-caps transition-colors duration-300 ease-atelier hover:text-accent ${
                        isActive ? 'text-accent' : 'text-ink/70'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
          </button>
        </div>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
