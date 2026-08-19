import Container from '../components/Container';
import Button from '../components/Button';
import { usePageMeta } from '../lib/seo';

export default function NotFound() {
  usePageMeta({
    title: 'Page not found — The Design Atelier',
    description: 'The page you are looking for does not exist.',
    path: '/404',
  });

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-6xl text-ink">404</p>
      <h1 className="mt-6 font-heading text-3xl text-ink">This page could not be found</h1>
      <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-muted">
        The link may be out of date. Head back to the studio homepage to continue browsing our work.
      </p>
      <Button to="/" variant="outline" className="mt-9">
        Back to Home
      </Button>
    </Container>
  );
}
