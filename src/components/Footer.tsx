import { Link } from 'react-router-dom';
import Container from './Container';
import { NAV, OFFICES, STUDIO } from '../data/site';

export default function Footer() {
  return (
    <footer className="bg-bone">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3 md:gap-8 md:py-20">
          <div>
            <p className="font-heading text-lg text-ink">{STUDIO.name}</p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted">
              {STUDIO.footerBlurb}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="label-caps text-subtle">Navigation</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-ink transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-caps text-subtle">Connect</h2>
            <ul className="mt-5 flex flex-col gap-3 font-body text-sm text-ink">
              <li>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {STUDIO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${STUDIO.phoneHref}`}
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {STUDIO.phone}
                </a>
              </li>
              {OFFICES.map((office) => (
                <li key={office.city} className="max-w-sm pt-1 leading-relaxed">
                  {office.address}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line py-6">
          <p className="font-body text-xs text-subtle">
            © {new Date().getFullYear()} {STUDIO.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}