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
    // Swapped for the real Central Administration Learning & Research
    // Building, Oman — the formal symmetrical arrival shot from projects_ph1.docx.
    image: '/assets/images/projects/central-administration-learning-and-research-building-01.jpg',
    categories: ['architecture', 'government'],
  },
  {
    slug: 'healthcare-architecture',
    title: 'Healthcare Architecture.',
    // Swapped for the Critical Care Building, Alibag. The Nandurbar photos
    // in the same document have a GPS/timestamp watermark burned in from the
    // site-capture app, so they were not usable for a hero tile.
    image: '/assets/images/projects/critical-care-building-01.jpg',
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
    // Swapped for the Shamkant Patil residence living room — the one actual
    // photograph in that project's panel set; the rest are CGI renders,
    // which read as noticeably lower quality next to the other tiles.
    image: '/assets/images/projects/mr-shamkant-patil-02.jpg',
    categories: ['interior', 'turnkey'],
  },
  {
    slug: 'corporate-interior',
    title: 'Corporate Interior.',
    // Swapped for the CALRC discussion room — an open-plan workspace shot,
    // closer to what "corporate interior" means than the lobby/auditorium
    // photos also available for this category.
    image: '/assets/images/projects/discussion-room-calrc-military-technical-college-01.jpg',
    categories: ['interior', 'turnkey'],
  },
  {
    slug: 'transportation-infrastructure',
    title: 'Transportation Infrastructure.',
    // NOT swapped. The only photography for this category — the Oman
    // International Container Terminal — is two rough grey massing renders,
    // not finished photography. Swapping would visibly downgrade this tile
    // next to the others. Left as the original image; see chat for the
    // candidates if you'd like to use one anyway.
    image: '/assets/images/projects/transportation-infrastructure.jpg',
    categories: ['planning', 'government'],
  },
  {
    slug: 'cafes-and-food-courts',
    title: 'Cafés and Food Courts',
    // Swapped for the Sigma Restaurant general seating floor — the widest,
    // most room-like shot of the four panels for this project.
    image: '/assets/images/projects/sigma-restaurant-03.jpg',
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

/**
 * Project index — real photography and copy, transcribed verbatim from
 * projects_ph1.docx. Replaces the placeholder Sigma Restaurant / Central
 * Administration entries that previously stood in for this data.
 *
 * Images live in public/assets/images/projects/, resized to 1400px wide and
 * re-encoded as progressive JPEG (the source PNGs/JPEGs from the Word file
 * ran up to 2MB+ each). Panel bullet points are the document's own sentences,
 * split one-per-bullet; nothing was reworded.
 *
 * ADDING A PROJECT — same pattern, this file only:
 *   1. Drop images in public/assets/images/projects/
 *   2. Add an entry under the right category slug below.
 */
export const PROJECT_INDEX: Record<string, ProjectEntry[]> = {
  'residential-architecture': [
  ],
  'institutional-architecture': [
    {
      title: 'Central Administration Learning And Research Building',
      location: 'Oman',
      panels: [
        {
          image: '/assets/images/projects/central-administration-learning-and-research-building-01.jpg',
          alt: 'The main academic and administrative block is a deep curved mass in desert-toned stone, crowned by a crenellated parapet that recalls the Omani fort.',
          points: [
            'The main academic and administrative block is a deep curved mass in desert-toned stone, crowned by a crenellated parapet that recalls the Omani fort.',
            'A dark full-height mosaic-glass portal cuts the curve at the centre, marking entry and carrying the institutional emblem.',
            'The approach road, flag court and lawn set up a formal, symmetrical arrival.',
          ],
        },
        {
          image: '/assets/images/projects/central-administration-learning-and-research-building-02.jpg',
          alt: 'A freestanding clock tower anchors the forecourt and gives the campus a single shared reference point.',
          points: [
            'A freestanding clock tower anchors the forecourt and gives the campus a single shared reference point.',
            'Its pointed-arch base, carved banding and stepped plinth restate the main building\'s vocabulary at pedestrian scale.',
            'Set against the long horizontal facade, this vertical marker breaks the mass and completes the ceremonial axis.',
          ],
        },
      ],
    },
    {
      title: 'District Cooling Plant, Military Technical College',
      location: 'Oman',
      panels: [
        {
          image: '/assets/images/projects/district-cooling-plant-military-technical-college-01.jpg',
          alt: 'The chilled-water storage tank is expressed as a fort turret rather than concealed, its crenellated crown turning plant equipment into a campus landmark.',
          points: [
            'The chilled-water storage tank is expressed as a fort turret rather than concealed, its crenellated crown turning plant equipment into a campus landmark.',
            'The adjoining hall carries a rhythm of pointed-arch bays that shade the openings behind.',
            'Louvred infills within the arches deliver the airflow the plant demands without breaking the elevation.',
          ],
        },
        {
          image: '/assets/images/projects/district-cooling-plant-military-technical-college-02.jpg',
          alt: 'From the service road the plant reads as a civic building rather than an industrial shed, its render, arches and parapet matched to the campus language.',
          points: [
            'From the service road the plant reads as a civic building rather than an industrial shed, its render, arches and parapet matched to the campus language.',
            'Utility doors, shutters and ducts are absorbed into a low base band so the upper facade stays uncluttered.',
            'A continuous plinth negotiates the site level and screens ground-mounted equipment.',
          ],
        },
      ],
    },
  ],
  'healthcare-architecture': [
    {
      title: 'Healthcare Building',
      location: 'Nandurbar',
      panels: [
        {
          image: '/assets/images/projects/healthcare-building-01.jpg',
          alt: 'A compact public health facility stacked over three floors so consulting, diagnostic and ward functions share short vertical travel.',
          points: [
            'A compact public health facility stacked over three floors so consulting, diagnostic and ward functions share short vertical travel.',
            'The elevation is built from simple bands of terracotta and cream, with a louvred vertical strip marking the stair and breaking the linear mass.',
            'An open external stair and ramped entry keep patient movement legible on arrival.',
          ],
        },
        {
          image: '/assets/images/projects/healthcare-building-02.jpg',
          alt: 'Seen from the approach, the block sits forward of its service wing so public and back-of-house entries stay clearly apart.',
          points: [
            'Seen from the approach, the block sits forward of its service wing so public and back-of-house entries stay clearly apart.',
            'Deep window reveals and shaded openings cut direct sun on the ward face through the district\'s long summers.',
            'Robust plaster and paint finishes are selected for low maintenance under heavy public use.',
          ],
        },
      ],
    },
    {
      title: 'Critical Care Building',
      location: 'Alibag',
      panels: [
        {
          image: '/assets/images/projects/critical-care-building-01.jpg',
          alt: 'The critical care block is composed as a solid textured entrance tower flanked by lighter ward wings, making arrival unmistakable from the road.',
          points: [
            'The critical care block is composed as a solid textured entrance tower flanked by lighter ward wings, making arrival unmistakable from the road.',
            'A deep cantilevered canopy shelters the drop-off and gives ambulances a covered, column-free approach.',
            'Vertical timber-toned louvres shade the patient rooms while keeping the facade calm rather than clinical.',
          ],
        },
        {
          image: '/assets/images/projects/critical-care-building-02.jpg',
          alt: 'The long side elevation separates the shaded patient wing from the plain service face, holding clean and utility circulation apart.',
          points: [
            'The long side elevation separates the shaded patient wing from the plain service face, holding clean and utility circulation apart.',
            'Openings on the blank volume are kept minimal and irregular, following the stores and plant rooms behind rather than a forced rhythm.',
            'A continuous ground-floor plinth band ties the two treatments into one composition.',
          ],
        },
      ],
    },
  ],
  'public-architecture': [
  ],
  'residential-interior': [
    {
      title: 'Mr. Shamkant Patil',
      panels: [
        {
          image: '/assets/images/projects/mr-shamkant-patil-01.jpg',
          alt: 'Both floors are organised around a central living core, with bedrooms pushed to the quieter edges of the plot.',
          points: [
            'Both floors are organised around a central living core, with bedrooms pushed to the quieter edges of the plot.',
            'Kitchen, dining and outdoor seating are chained along a single service line so the site\'s irregular boundary is absorbed by terraces.',
            'The staircase is positioned to serve both levels without cutting into the main living volume.',
          ],
        },
        {
          image: '/assets/images/projects/mr-shamkant-patil-02.jpg',
          alt: 'The living room is anchored by a full-width stone-clad media wall that runs unbroken behind the television.',
          points: [
            'The living room is anchored by a full-width stone-clad media wall that runs unbroken behind the television.',
            'A slatted timber ceiling band warms the double-height volume and visually lowers the seating zone within it.',
            'The open stair is left deliberately light so the space beyond stays connected rather than screened off.',
          ],
        },
        {
          image: '/assets/images/projects/mr-shamkant-patil-03.jpg',
          alt: 'Viewed from under the stair, the plan reveals its full depth in one uninterrupted sweep to the garden windows.',
          points: [
            'Viewed from under the stair, the plan reveals its full depth in one uninterrupted sweep to the garden windows.',
            'A raised internal planter edges the seating and brings greenery into the core of the house without demanding an outdoor court.',
            'Sheer curtains diffuse the light so the polished floor carries a soft, even glow.',
          ],
        },
        {
          image: '/assets/images/projects/mr-shamkant-patil-04.jpg',
          alt: 'The formal lounge is treated as a gallery: a monochrome cityscape mural on one wall, framed art on the other, and very little else.',
          points: [
            'The formal lounge is treated as a gallery: a monochrome cityscape mural on one wall, framed art on the other, and very little else.',
            'A single pair of vivid pink chairs supplies the only strong colour in an otherwise grey and white palette.',
            'Diamond-patterned panelling and a low console give the wall depth while keeping the floor entirely free.',
          ],
        },
        {
          image: '/assets/images/projects/mr-shamkant-patil-05.jpg',
          alt: 'A suspended swing turns the lounge into a relaxed family space rather than a display room.',
          points: [
            'A suspended swing turns the lounge into a relaxed family space rather than a display room.',
            'The illuminated Om-and-Buddha niche within a carved jaali frame provides a devotional focus at the end of the axis.',
            'Mustard and olive upholstery lifts the grey shell just enough to keep the long room from reading cold.',
          ],
        },
      ],
    },
    {
      title: 'Mahendra Patil',
      panels: [
        {
          image: '/assets/images/projects/mahendra-patil-01.jpg',
          alt: 'The dining zone is placed along the passage so a single volume serves circulation, dining and lounge without partitions.',
          points: [
            'The dining zone is placed along the passage so a single volume serves circulation, dining and lounge without partitions.',
            'A grey stone-textured wall carries the media unit and anchors the composition, its depth accented by concealed cove light.',
            'Slim dark pendants mark the table position and keep the ceiling plane clear.',
          ],
        },
        {
          image: '/assets/images/projects/mahendra-patil-02.jpg',
          alt: 'The furniture layout distributes four bedrooms around a central living and dining space, with balconies extending the shorter rooms.',
          points: [
            'The furniture layout distributes four bedrooms around a central living and dining space, with balconies extending the shorter rooms.',
            'Study, pooja and store are pocketed into circulation zones so no usable area is lost to passage.',
            'Kitchen and utility sit on the service edge, keeping wet zones stacked and clear of the guest sequence.',
          ],
        },
        {
          image: '/assets/images/projects/mahendra-patil-03.jpg',
          alt: 'The living room works on a symmetrical pair of white sofas facing across a low glass table, giving the room a formal centre.',
          points: [
            'The living room works on a symmetrical pair of white sofas facing across a low glass table, giving the room a formal centre.',
            'A dark stone feature wall behind the media unit sets the tonal anchor, softened by warm cove light at its base.',
            'Green and graphic cushions supply the only accent, keeping the palette disciplined.',
          ],
        },
        {
          image: '/assets/images/projects/mahendra-patil-04.jpg',
          alt: 'From the dining end, living and dining read as one continuous volume divided only by ceiling treatment.',
          points: [
            'From the dining end, living and dining read as one continuous volume divided only by ceiling treatment.',
            'A dropped dark plane over the dining table and a lit cove over the living seating separate the two functions without any physical barrier.',
            'Pendant lights, artwork and a single sculpture punctuate an otherwise restrained white envelope.',
          ],
        },
      ],
    },
    {
      title: 'Mr. Amit Khare',
      panels: [
        {
          image: '/assets/images/projects/mr-amit-khare-01.jpg',
          alt: 'The layout gathers living, dining and home theatre into a connected social band, with bedrooms and terraces at the perimeter.',
          points: [
            'The layout gathers living, dining and home theatre into a connected social band, with bedrooms and terraces at the perimeter.',
            'A dedicated home theatre room is planned off the living space so it can be closed acoustically when in use.',
            'Kitchen, wash and utility are grouped on one edge to keep service movement out of the entertaining sequence.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-02.jpg',
          alt: 'A compact room built entirely around one composed wall of teak and white joinery.',
          points: [
            'A compact room built entirely around one composed wall of teak and white joinery.',
            'Open shelves, a recessed television niche and a floating base unit combine storage and display in a single plane so the floor stays clear.',
            'Sliding glazed doors on the opposite side pull daylight deep into the narrow volume.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-03.jpg',
          alt: 'The living room is kept deliberately light, with a floating console and wall-mounted screen replacing bulky furniture.',
          points: [
            'The living room is kept deliberately light, with a floating console and wall-mounted screen replacing bulky furniture.',
            'A patterned rug defines the seating island within the larger floor and gives the arrangement its boundary.',
            'Warm teak trims and a curved arc lamp soften what is otherwise a crisp white envelope.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-04.jpg',
          alt: 'The bedroom is planned with full-height wardrobes on one side and a mirrored return that visually doubles the width.',
          points: [
            'The bedroom is planned with full-height wardrobes on one side and a mirrored return that visually doubles the width.',
            'A low platform bed keeps sight lines long and the ceiling feeling higher than it is.',
            'A simple triptych of framed art with picture lights supplies the headboard interest without built joinery.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-05.jpg',
          alt: 'A full-height teak headboard panel gives the master bedroom its single strong gesture against a textured cream backdrop.',
          points: [
            'A full-height teak headboard panel gives the master bedroom its single strong gesture against a textured cream backdrop.',
            'Glazed and lacquered wardrobe fronts reflect light back into the room, keeping the tone warm rather than heavy.',
            'Bedside pendants and floor-level cove lighting handle the night-time layer without harsh overhead sources.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-06.jpg',
          alt: 'Here the headboard wall is turned into a library, with open shelving and a louvred window flanked by storage.',
          points: [
            'Here the headboard wall is turned into a library, with open shelving and a louvred window flanked by storage.',
            'Frosted glass wardrobe shutters keep the wall opposite quiet so the composed shelf wall remains the focus.',
            'A yellow blind and warm cove line give the otherwise neutral room a soft daylight character.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-07.jpg',
          alt: 'The child\'s room places a full-height wardrobe and a corner study together on one wall, freeing the rest of the floor for play.',
          points: [
            'The child\'s room places a full-height wardrobe and a corner study together on one wall, freeing the rest of the floor for play.',
            'A printed mural in soft pastel tones wraps the flanking wall, giving the room its character without permanent joinery.',
            'Green laminate accents tie the desk, shelves and wardrobe pulls into one family.',
          ],
        },
        {
          image: '/assets/images/projects/mr-amit-khare-08.jpg',
          alt: 'A shared bedroom planned with twin beds against a single green headboard band so the room reads as one composition.',
          points: [
            'A shared bedroom planned with twin beds against a single green headboard band so the room reads as one composition.',
            'Display niches and pin-up shelves are set between the beds, giving each child a personal zone within a common wall.',
            'The illustrated mural and patterned curtain keep the scheme playful while the ceiling and floor stay neutral.',
          ],
        },
      ],
    },
    {
      title: 'Dr. Virendra Desale',
      panels: [
        {
          image: '/assets/images/projects/dr-virendra-desale-01.jpg',
          alt: 'A compact three-bedroom layout arranged around a central living space with the kitchen and dining combined on one edge.',
          points: [
            'A compact three-bedroom layout arranged around a central living space with the kitchen and dining combined on one edge.',
            'Children\'s and parents\' bedrooms are grouped away from the master suite, giving the plan two clear zones.',
            'A single balcony off the living room extends the shared space rather than fragmenting it across rooms.',
          ],
        },
        {
          image: '/assets/images/projects/dr-virendra-desale-02.jpg',
          alt: 'The living room is furnished with a light, low-slung seating set that keeps the small volume feeling open.',
          points: [
            'The living room is furnished with a light, low-slung seating set that keeps the small volume feeling open.',
            'A slatted timber panel on the window wall filters daylight and adds the room\'s only strong texture.',
            'Cove lighting around the ceiling perimeter provides even ambient light without a heavy central fixture.',
          ],
        },
        {
          image: '/assets/images/projects/dr-virendra-desale-03.jpg',
          alt: 'The master bedroom is built on a single deep indigo move: bed, side units and full-height wardrobes all share one colour.',
          points: [
            'The master bedroom is built on a single deep indigo move: bed, side units and full-height wardrobes all share one colour.',
            'Against the pale envelope this reads as furniture rather than as a wall, keeping the room calm.',
            'Under-bed and under-console lighting lift the joinery off the floor so the volume feels lighter than it is.',
          ],
        },
        {
          image: '/assets/images/projects/dr-virendra-desale-04.jpg',
          alt: 'The dining alcove is framed as a recessed niche so it defines itself without needing a partition.',
          points: [
            'The dining alcove is framed as a recessed niche so it defines itself without needing a partition.',
            'A single bold artwork gives the neutral corner its focus and sets the accent colour for the space.',
            'Its position beside the kitchen counter keeps serving distances short in a compact plan.',
          ],
        },
        {
          image: '/assets/images/projects/dr-virendra-desale-05.jpg',
          alt: 'The kitchen runs as an efficient L with the sink under the window and the hob on the return, holding a tight work triangle.',
          points: [
            'The kitchen runs as an efficient L with the sink under the window and the hob on the return, holding a tight work triangle.',
            'Handleless white shutters and a continuous counter keep the small volume visually seamless.',
            'A tall dark refrigerator anchors one end and stops the all-white scheme from feeling flat.',
          ],
        },
        {
          image: '/assets/images/projects/dr-virendra-desale-06.jpg',
          alt: 'The entry and dressing zone is composed as one continuous run of full-height white wardrobes with a dark base console.',
          points: [
            'The entry and dressing zone is composed as one continuous run of full-height white wardrobes with a dark base console.',
            'The console doubles as a drop point on arrival and a seat for the dressing area beyond.',
            'A narrow louvred opening and sheer curtain admit light while keeping the wall composition unbroken.',
          ],
        },
      ],
    },
  ],
  'corporate-interior': [
    {
      title: 'Discussion Room CALRC - Military Technical College',
      location: 'Oman',
      panels: [
        {
          image: '/assets/images/projects/discussion-room-calrc-military-technical-college-01.jpg',
          alt: 'A glazed discussion room set within an open-plan floor, giving acoustic enclosure without cutting visual connection to the workspace.',
          points: [
            'A glazed discussion room set within an open-plan floor, giving acoustic enclosure without cutting visual connection to the workspace.',
            'Full-height glass and a slim frameless door keep the box light, while a printed mural wall gives it identity from across the floor.',
            'Continuous linear coves wash the ceiling so screens and video calls stay glare-free.',
          ],
        },
      ],
    },
    {
      title: 'Arogya Bhavan Lobby',
      panels: [
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-01.jpg',
          alt: 'The lift lobby is faced in large-format marble with slim brass inlays that mark each opening.',
          points: [
            'The lift lobby is faced in large-format marble with slim brass inlays that mark each opening.',
            'Bronze-mirror lift doors extend the space visually and pick up the daylight raking across the stone.',
            'Detail is kept minimal here so the material itself carries the institutional dignity of the entrance.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-02.jpg',
          alt: 'The lift corridor is finished in white panelled walls with a green marble skirting that runs as a continuous datum.',
          points: [
            'The lift corridor is finished in white panelled walls with a green marble skirting that runs as a continuous datum.',
            'Tall arched openings along one side flood the passage with daylight and frame the landscape outside.',
            'Wall sconces between the panels give the corridor an evening scale when the daylight drops.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-03.jpg',
          alt: 'The shrine wall is composed as a cusped arch in gold-textured cork set against fluted white panelling.',
          points: [
            'The shrine wall is composed as a cusped arch in gold-textured cork set against fluted white panelling.',
            'Smaller arched niches on either side repeat the motif at reduced scale, giving the composition rhythm and symmetry.',
            'Concealed light behind each profile makes the arches glow rather than relying on visible fittings.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-04.jpg',
          alt: 'Seen wider, the shrine reads as one end of a formal room rather than an isolated element.',
          points: [
            'Seen wider, the shrine reads as one end of a formal room rather than an isolated element.',
            'A carved white console, mosaic banding and a classical settee establish a seating zone for waiting without crowding the ritual space.',
            'Green marble inlay at the skirting ties this wall back to the lobby\'s overall material scheme.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-05.jpg',
          alt: 'The main lobby is organised around a curved reception counter set against a full-height marble pier.',
          points: [
            'The main lobby is organised around a curved reception counter set against a full-height marble pier.',
            'A commemorative arched panel in gold-framed stone terminates the axis and gives the space its institutional purpose.',
            'A domed cove ceiling and chandelier lift the volume and mark the centre of the plan.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-06.jpg',
          alt: 'From the entrance side, the reception desk sits clear of the circulation route so movement into the lobby is never obstructed.',
          points: [
            'From the entrance side, the reception desk sits clear of the circulation route so movement into the lobby is never obstructed.',
            'A cane-and-brass counter front warms the otherwise cool marble palette at the one point of human contact.',
            'Planters and a green stone band edge the floor, keeping the wide expanse from reading as empty.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-07.jpg',
          alt: 'The double-height volume is expressed through tall tapered piers that carry the eye up to a domed ceiling medallion.',
          points: [
            'The double-height volume is expressed through tall tapered piers that carry the eye up to a domed ceiling medallion.',
            'A chandelier and layered cove lighting scale the height for people standing at floor level.',
            'Bench seating tucked between the piers keeps waiting visitors out of the main circulation path.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-lobby-08.jpg',
          alt: 'The commemorative pillar is treated as the lobby\'s ceremonial centre, framed by an arch and a brass railing.',
          points: [
            'The commemorative pillar is treated as the lobby\'s ceremonial centre, framed by an arch and a brass railing.',
            'Planters at its base soften the marble and mark a respectful standoff without a rope or barrier.',
            'Wall panels in matching stone and gold framing continue the motif around the space so the pillar never reads as an add-on.',
          ],
        },
      ],
    },
    {
      title: 'Arogya Bhavan Auditorium',
      panels: [
        {
          image: '/assets/images/projects/arogya-bhavan-auditorium-01.jpg',
          alt: 'Seen from the rear, the hall focuses squarely on the stage, screen and dais with an unobstructed central aisle.',
          points: [
            'Seen from the rear, the hall focuses squarely on the stage, screen and dais with an unobstructed central aisle.',
            'Staggered timber and fabric acoustic panels of varying depth line the side walls to diffuse sound across the volume.',
            'A curved layered ceiling carries the lighting truss and reflects early sound back to the front rows.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-auditorium-02.jpg',
          alt: 'From the stage edge the raked floor and stepped aisles show how sight lines were set for every row.',
          points: [
            'From the stage edge the raked floor and stepped aisles show how sight lines were set for every row.',
            'The balcony is pulled back so the seats beneath it retain both height and clear view of the platform.',
            'Aisle-level lighting strips in the carpet handle safe movement without spilling light onto the screen.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-auditorium-03.jpg',
          alt: 'This side view shows the acoustic wall build-up: back-lit panel grids on one side and a solid timber balcony fascia on the other.',
          points: [
            'This side view shows the acoustic wall build-up: back-lit panel grids on one side and a solid timber balcony fascia on the other.',
            'The asymmetry is deliberate, breaking parallel reflections that would otherwise cause flutter echo.',
            'Deep crimson seating on grey carpet gives the large volume warmth without competing with the stage.',
          ],
        },
        {
          image: '/assets/images/projects/arogya-bhavan-auditorium-04.jpg',
          alt: 'Viewed from the platform, the full house reads as one continuous bank of seating framed by the balcony fascia.',
          points: [
            'Viewed from the platform, the full house reads as one continuous bank of seating framed by the balcony fascia.',
            'Doors are placed at the rear corners so late entry never crosses the speaker\'s sight line.',
            'Cove-lit ceiling bands and wall grazing lights let the room shift between full-lecture and presentation modes.',
          ],
        },
      ],
    },
  ],
  'transportation-infrastructure': [
    {
      title: 'Oman International Container Terminal',
      panels: [
        {
          image: '/assets/images/projects/oman-international-container-terminal-01.jpg',
          alt: 'The terminal office building is massed as a compact five-storey block with a lower wing for support functions.',
          points: [
            'The terminal office building is massed as a compact five-storey block with a lower wing for support functions.',
            'Horizontal glazing bands wrapped by banded spandrels give the volume a clear, functional order suited to an operational port setting.',
            'A stepped roof terrace and shading trellis break the top edge and provide sheltered outdoor space.',
          ],
        },
        {
          image: '/assets/images/projects/oman-international-container-terminal-02.jpg',
          alt: 'The entrance face gathers the drop-off canopy, the main portal and the corporate signage into one composed arrival.',
          points: [
            'The entrance face gathers the drop-off canopy, the main portal and the corporate signage into one composed arrival.',
            'A projecting flat canopy shelters vehicles and gives the tall facade a horizontal anchor at ground level.',
            'Signage is placed on the upper parapet so the building identifies itself across the open terminal yard.',
          ],
        },
      ],
    },
  ],
  'cafes-and-food-courts': [
    {
      title: 'Sigma Restaurant',
      location: 'Benglore',
      panels: [
        {
          image: '/assets/images/projects/sigma-restaurant-01.jpg',
          alt: 'An open show-kitchen counter where the cooking line itself becomes the display.',
          points: [
            'An open show-kitchen counter where the cooking line itself becomes the display.',
            'A red back-lit fascia carries the brand while a ribbed teak counter front grounds it and keeps the base visually quiet.',
            'Loose tables and stools are kept light and movable so the queueing edge never blocks the dining floor.',
          ],
        },
        {
          image: '/assets/images/projects/sigma-restaurant-02.jpg',
          alt: 'Two brands share a single continuous counter, separated only by colour and signage rather than by built partitions.',
          points: [
            'Two brands share a single continuous counter, separated only by colour and signage rather than by built partitions.',
            'The dark recessive ceiling pushes all attention onto the illuminated fascia so the outlets read instantly from across the hall.',
            'A stainless service edge and high stools support quick grab-and-go ordering.',
          ],
        },
        {
          image: '/assets/images/projects/sigma-restaurant-03.jpg',
          alt: 'The general seating floor is treated as a calm neutral field against which the coloured counters register.',
          points: [
            'The general seating floor is treated as a calm neutral field against which the coloured counters register.',
            'Perimeter banquette pods, loose four-seaters at the centre and a curved rail edge let diners choose privacy or bustle.',
            'Large soft-glow pendants bring the tall volume down to a comfortable human scale.',
          ],
        },
        {
          image: '/assets/images/projects/sigma-restaurant-04.jpg',
          alt: 'A rounded counter in white solid surface and teak softens the corner and slows circulation at the till point.',
          points: [
            'A rounded counter in white solid surface and teak softens the corner and slows circulation at the till point.',
            'The illustrated menu wall doubles as the outlet\'s graphic identity, scaled to be read from across the food court.',
            'Chilled display cases at eye level keep the product itself as the primary advertisement.',
          ],
        },
      ],
    },
  ],
};

/** The four architecture tiles shown in "Selected Work" on the home page. */
export const FEATURED_ARCHITECTURE = PROJECTS.slice(0, 4);
/** The four interior tiles shown directly beneath "Selected Work". */
export const FEATURED_INTERIORS = PROJECTS.slice(4, 8);