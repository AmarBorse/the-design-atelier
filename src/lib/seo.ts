import { useEffect } from 'react';

type Meta = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

const SITE_ORIGIN = 'https://thedesignatelier.co.in';

function setTag(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/** Per-route document title, description, canonical URL and Open Graph tags. */
export function usePageMeta({ title, description, path, image }: Meta) {
  useEffect(() => {
    document.title = title;
    setTag('meta[name="description"]', 'content', description);
    setTag('meta[property="og:title"]', 'content', title);
    setTag('meta[property="og:description"]', 'content', description);
    setTag('meta[name="twitter:title"]', 'content', title);
    setTag('meta[name="twitter:description"]', 'content', description);
    setTag('link[rel="canonical"]', 'href', `${SITE_ORIGIN}${path}`);
    if (image) {
      setTag('meta[property="og:image"]', 'content', image);
      setTag('meta[name="twitter:image"]', 'content', image);
    }
  }, [title, description, path, image]);
}
