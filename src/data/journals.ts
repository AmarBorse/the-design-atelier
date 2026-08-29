export type JournalEntry = {
  title: string;
  /** e.g. 'March 2026'. Leave as an empty string until the entry is published. */
  date: string;
  excerpt: string;
  /** Public path to the PDF, or null while the entry is still being written. */
  file: string | null;
};

/**
 * The site's original Reading Room entries.
 *
 * Kept here specifically as the one-time seed source for Firestore — see
 * `seedFromStaticData` in `src/lib/content.ts`, which the Admin page's
 * "Import existing data" button calls once. After seeding, the live pages
 * read from Firestore, not from this array; editing this file has no effect
 * on the site once Supabase is connected.
 */
export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    title: 'Journal Entry One',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Two',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Three',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Four',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Five',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
  {
    title: 'Journal Entry Six',
    date: '',
    excerpt: 'Placeholder — replace with a short summary of what this piece covers.',
    file: null,
  },
];
