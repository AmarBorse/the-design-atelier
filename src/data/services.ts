/** Services list — PDF pages 14 and 15 (About page). */
export const SERVICES = [
  'Architecture Design',
  'Interior Design',
  'Planning & Design Development',
  'Construction Documentation',
  'Construction Administration',
  'Sustainable & Green Design Consulting',
  'Permitting & Approvals',
  'Project Management',
] as const;

/**
 * Philosophy pillars — PDF page 13, copy replaced per our_philosophy.docx §5.6.
 *
 * The review's objection: Listen / Anticipate / Empathize / Collaborate are
 * lifted from the Stanford d.school design-thinking framework — vocabulary at
 * home in a UX consultancy, not in a practice that empanels with NHM and
 * delivers critical care units. The four principles below are the ones the
 * practice actually runs on.
 *
 * Labels are now two or three words rather than single verbs, so the card
 * headings wrap where they used to sit on one line. See About.tsx for the
 * spacing adjustment that keeps the grid's rhythm.
 */
export const PHILOSOPHY = [
  {
    label: 'Personal Accountability',
    body: 'Every drawing set is read, not just signed. Small-studio by choice, because being personally answerable for the work is the practice.',
  },
  {
    label: 'One Standard, Two Disciplines',
    body: 'A 50-bed critical care unit and a private residence follow the same six-stage process, the same documentation checklist, the same coordination discipline. Programme scale changes; the rigor does not.',
  },
  {
    label: 'Documentation as Discipline',
    body: 'Good documentation shows up on site months later as work that goes smoothly. Careless documentation shows up as variations. Every drawing set is reviewed against a fixed studio checklist before it leaves us.',
  },
  {
    label: 'Judgement Stays Human',
    body: 'Where AI helps us think faster or wider, we adopt it deliberately. Where judgement matters — a plan, a detail, a specification — that stays human. Nothing leaves the studio that we would not stand behind ourselves.',
  },
] as const;

/**
 * "Why Choose Us" cards — PDF page 9.
 *
 * Copy replaced per TDA_WEB_COMMENT_19-08-26.docx §5.4, Option A. The review
 * objected that the previous cards ("Clear design direction", "Calm
 * communication") named no concrete differentiator and struck a reassuring
 * tone written for an anxious first-time client rather than the institutional
 * and premium clients the practice actually serves.
 *
 * The document offers Option B — the six-stage workflow — as an alternative,
 * and recommends the two coexist: Option A here on the homepage, Option B on
 * the deeper page. Option B is already built as "Our Workflow" on About.
 */
export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Two disciplines, one standard',
    body: 'Whether the project is a 50-bed critical care unit or a considered private residence, the same rigor of documentation and site coordination applies.',
  },
  {
    number: '02',
    title: 'Empanelled where it counts',
    body: 'NHM, RBI, and PWD empanelments. Government project protocols embedded in how every stage is run — for institutional and private work alike.',
  },
  {
    number: '03',
    title: 'Small studio, personal accountability',
    body: 'The architect who takes your first meeting is the architect on your final site visit. Every drawing set is read, not just signed.',
  },
  {
    number: '04',
    title: 'Nineteen years, two geographies',
    body: 'Nineteen years of practice, including eight in Oman and the wider GCC. The discipline that international-scale work demands, brought to every project.',
  },
] as const;

/** Workflow phases — PDF page 20 (Services page). */
export const WORKFLOW = [
  {
    phase: 'Phase 01',
    title: 'Project Brief',
    body: 'Understanding requirements, goals, budget, and expectations at the outset.',
  },
  {
    phase: 'Phase 02',
    title: 'Concept Design',
    body: 'Developing creative concepts, layouts, and design directions that feel right for the project.',
  },
  {
    phase: 'Phase 03',
    title: 'Design Development',
    body: 'Refining the design through technical planning, materials, and detailing.',
  },
  {
    phase: 'Phase 04',
    title: 'Documentation',
    body: 'Preparing construction drawings, specifications, and execution documents.',
  },
  {
    phase: 'Phase 05',
    title: 'Approvals & Coordination',
    body: 'Managing permits, consultant coordination, and technical reviews for a seamless process.',
  },
  {
    phase: 'Phase 06',
    title: 'Construction Phase',
    body: 'Providing site visits, execution support, quality monitoring, and contractor coordination.',
  },
] as const;

/** Team — PDF page 16. */
export const TEAM = [
  {
    name: 'Ar. Aditya Anil Mulay',
    // §5.5: the correct professional title. "Founder & Principal Architect"
    // conflicted with the "CEO / Principal Architect" used on the homepage.
    role: 'Principal Design Architect & Founder',
    // §3.3: experience figure corrected from "over 22 years" — the site must
    // match the principal's CV and LinkedIn. The GCC clause replaces the
    // vague "global perspective" the review flagged as generic.
    body: 'With nineteen years of professional experience — including eight years delivering projects across Oman and the wider GCC — Ar. Aditya Mulay brings technical expertise and a refined approach to contemporary architecture. His practice focuses on thoughtful, purposeful design—creating spaces that are distinctive, functional, enduring, and connected to the way people live.',
    image: '/assets/images/about/architect-portrait.jpg',
  },
  {
    name: 'Ar. Sachin Dhavlikar',
    role: 'Senior Associate',
    body: 'With a Bachelor of Architecture and over 20 years of professional experience, Ar. Sachin Dhavlikar brings extensive expertise in architecture and interior design. His approach blends creative vision, technical knowledge, and practical design solutions to create thoughtful and functional spaces.',
    image: '/assets/images/about/team-rahul-deshmukh.jpeg',
  },
  {
    name: 'Dr. Aruna Mulay',
    role: 'Healthcare Infrastructure Advisor',
    body: 'With an MBA in Hospital Planning and Management and over 22 years of experience, Dr. Aruna Mam brings extensive expertise in healthcare infrastructure planning, development, and management. She has led and advised on large-scale healthcare projects, providing strategic guidance for efficient planning, operations, and infrastructure management.',
    image: '/assets/images/about/team-nikita-sharma.jpeg',
  },
  {
    name: 'Ar. Zubair Ansari',
    role: 'Senior Architect ',
    body: 'With a Bachelor of Architecture and over 10 years of industry experience, he brings extensive expertise in architecture and interior design, combining creative vision with practical design solutions.',
    image: '/assets/images/about/team-zubair.jpeg',
  },
  {
    name: 'ID. Ritika Yeole',
    role: 'Interior Designer',
    body: 'With a Bachelor’s degree in Interior Design and over 5 years of professional experience, Ritika brings a refined approach to creating functional, aesthetic, and thoughtfully detailed spaces. Her expertise spans residential and commercial interiors, with a strong focus on spatial planning, material selection, and contemporary design solutions.',
    image: '/assets/images/about/team-ritika.jpeg',
  }
  
] as const;