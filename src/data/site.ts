/**
 * Site-wide content taken verbatim from the review PDF screenshots.
 * Nothing here is invented copy.
 */

export type NavItem = { label: string; to: string };

export const NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Journals', to: '/journals' },
  { label: 'Contact', to: '/contact' },
];

/** Studio locations, in display order. */
export const OFFICES = [
  {
    city: 'Nashik',
    address:
      'No. 9, Vanraj Harshad Apartment, Opp. Modakeshwar Tennis Court, Modakeshwar Housing Society, Indira Nagar, Nashik 42009',
    /** Query string handed to the Google Maps embed. Narrow it if the pin lands wide. */
    mapQuery: 'Vanraj Harshad Apartment, Indira Nagar, Nashik',
  },
  {
    city: 'Thane',
    address:
      'Kalpataru Prime, 401, Ambica Nagar, Wagle Industrial Estate, Thane, Maharashtra – 400602',
    mapQuery: 'Kalpataru Prime, Wagle Industrial Estate, Thane, Maharashtra 400602',
  },
] as const;

export const STUDIO = {
  name: 'The Design Atelier',
  tagline: 'Resolving Design Dilemmas With Proven Excellence',
  footerBlurb:
    'Architecture and interior design that balances aesthetics, function, and long-term value.',
  email: 'info@thedesignatelier.co.in',
  phone: '+91 9225 5363 55',
  phoneHref: '+919225536355',
  /** Primary address. Both locations live in OFFICES above. */
  address: OFFICES[0].address,
  hours: [
    'Monday — Friday: 10:00 AM — 7:00 PM',
    'Saturday: By Appointment',
    'Sunday: Closed',
  ],
} as const;

export const STATS = [
  { value: '19', label: 'Years of Experience' },
  { value: '8', label: 'Years of International Experience' },
  { value: '80', label: 'Completed Projects' },
  { value: '15', label: 'Brand Collaborations' },
] as const;

export const CLIENTS = [
  { name: 'National Health Mission (NHM)', logo: '/assets/images/clients/nhm.png' },
  { name: 'PWD Public Works Department', logo: '/assets/images/clients/pwd.png' },
  { name: 'Malegaon Municipal Corporation', logo: '/assets/images/clients/malegaon-municipal.png' },
  { name: 'Infotech Corporation of Goa', logo: '/assets/images/clients/infotech-goa.png' },
  { name: 'MPSL Malegaon Power Supply Limited', logo: '/assets/images/clients/mpsl.png' },
  { name: 'Reserve Bank of India', logo: '/assets/images/clients/rbi.png' },
] as const;