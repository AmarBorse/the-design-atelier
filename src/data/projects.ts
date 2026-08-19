export type ProjectCategory =
  | 'architecture'
  | 'government'
  | 'interior'
  | 'turnkey'
  | 'planning';

export type Project = {
  slug: string;
  title: string;
  image: string;
  categories: ProjectCategory[];
};

export const PROJECT_FILTERS: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'government', label: 'Government' },
  { id: 'interior', label: 'Interior' },
  { id: 'turnkey', label: 'Turnkey' },
  { id: 'planning', label: 'Planning' },
];

/**
 * Titles and images below are the eight work categories shown on the home
 * page of the reference site (PDF pages 5 and 6).
 *
 * NOTE FOR THE CLIENT: the Projects page in the review PDF (page 18) is cut
 * off directly beneath the filter bar, so the real project cards — names,
 * locations, dates and per-project images — were never visible. Rather than
 * invent project entries, this grid reuses the eight real category tiles.
 * The `categories` tags are provisional so that every filter returns results.
 * Replace this array with the real project list when it is supplied.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'residential-architecture',
    title: 'Residential Architecture.',
    image: '/assets/images/projects/residential-architecture.jpg',
    categories: ['architecture'],
  },
  {
    slug: 'institutional-architecture',
    title: 'Institutional Architecture.',
    image: '/assets/images/projects/institutional-architecture.jpg',
    categories: ['architecture', 'government'],
  },
  {
    slug: 'healthcare-architecture',
    title: 'Healthcare Architecture.',
    image: '/assets/images/projects/healthcare-architecture.jpg',
    categories: ['architecture', 'government'],
  },
  {
    slug: 'public-architecture',
    title: 'Public Architecture.',
    image: '/assets/images/projects/public-architecture.jpg',
    categories: ['architecture', 'government', 'planning'],
  },
  {
    slug: 'residential-interior',
    title: 'Residential Interior.',
    image: '/assets/images/projects/residential-interior.jpg',
    categories: ['interior', 'turnkey'],
  },
  {
    slug: 'corporate-interior',
    title: 'Corporate Interior.',
    image: '/assets/images/projects/corporate-interior.jpg',
    categories: ['interior', 'turnkey'],
  },
  {
    slug: 'transportation-infrastructure',
    title: 'Transportation Infrastructure.',
    image: '/assets/images/projects/transportation-infrastructure.jpg',
    categories: ['planning', 'government'],
  },
  {
    slug: 'cafes-and-food-courts',
    title: 'Cafés and Food Courts',
    image: '/assets/images/projects/cafes-and-food-courts.jpg',
    categories: ['interior', 'turnkey'],
  },
];

/* ------------------------------------------------------------------ *
 * Project index — structure from Services_Page.pdf
 *
 * Each of the eight categories opens a dropdown listing its projects. A
 * project has a name, an optional location, and up to three panels; each
 * panel is one image with its own bullet notes, exactly as the PDF lays out.
 *
 * ADDING A PROJECT — this file only, no component changes:
 *
 *   1. Drop images in  public/assets/images/projects/
 *   2. Add an entry under the right category slug:
 *
 *        {
 *          title: 'Project Name',
 *          location: 'City',
 *          panels: [
 *            {
 *              image: '/assets/images/projects/my-project-1.jpg',
 *              alt: 'What the photo shows',
 *              points: ['First note.', 'Second note.'],
 *            },
 *          ],
 *        }
 *
 * `image: null` renders a placeholder tile, so a project can go in before its
 * photography is ready. A category with an empty array shows "coming soon"
 * and its dropdown stays closed.
 * ------------------------------------------------------------------ */

export type ProjectPanel = {
  /** Public path to the photo, or null while it is still being shot. */
  image: string | null;
  alt?: string;
  points: string[];
};

export type ProjectEntry = {
  title: string;
  location?: string;
  panels: ProjectPanel[];
};

/*
  NOTE ON THE TWO ENTRIES BELOW: both are transcribed verbatim from
  Services_Page.pdf, including the fact that the PDF repeats an identical set
  of bullets for project 2 and shows placeholder graphics rather than real
  photographs. They are here to demonstrate the structure — replace the copy
  and add real images when the project material is ready.
*/
const SIGMA_PANELS: ProjectPanel[] = [
  {
    image: null,
    points: [
      'An open show-kitchen counter where the cooking line itself becomes the display.',
      'A red back-lit fascia carries the brand while a ribbed teak counter front grounds it and keeps the base visually quiet.',
      'Loose tables and stools are kept light and movable so the queueing edge never blocks the dining floor.',
    ],
  },
  {
    image: null,
    points: [
      'Two brands share a single continuous counter, separated only by colour and signage rather than by built partitions.',
      'The dark recessive ceiling pushes all attention onto the illuminated fascia so the outlets read instantly from across the hall.',
      'A stainless service edge and high stools support quick grab-and-go ordering.',
    ],
  },
  {
    image: null,
    points: [
      'The general seating floor is treated as a calm neutral field against which the coloured counters register.',
      'Perimeter banquette pods, loose four-seaters at the centre and a curved rail edge let diners choose privacy or bustle.',
      'Large soft-glow pendants bring the tall volume down to a comfortable human scale.',
    ],
  },
];

/** Keyed by the project slugs above, so the dropdowns line up with the tiles. */
export const PROJECT_INDEX: Record<string, ProjectEntry[]> = {
  'residential-architecture': [
    { title: 'Sigma Restaurant', location: 'Benglore', panels: SIGMA_PANELS },
    {
      title: 'Central Administration Learning and Research Building',
      location: 'Oman',
      panels: SIGMA_PANELS,
    },
  ],
  'institutional-architecture': [],
  'healthcare-architecture': [],
  'public-architecture': [],
  'residential-interior': [],
  'corporate-interior': [],
  'transportation-infrastructure': [],
  'cafes-and-food-courts': [],
};

/** The four architecture tiles shown in "Selected Work" on the home page. */
export const FEATURED_ARCHITECTURE = PROJECTS.slice(0, 4);
/** The four interior tiles shown directly beneath "Selected Work". */
export const FEATURED_INTERIORS = PROJECTS.slice(4, 8);