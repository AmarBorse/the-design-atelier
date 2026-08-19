import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on route change so deep links open at the top. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}
