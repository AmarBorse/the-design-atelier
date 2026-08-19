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

/** Philosophy pillars — PDF page 13. */
export const PHILOSOPHY = [
  {
    label: 'Listen',
    body: 'We understand client vision and requirements carefully, then shape the design around those priorities.',
  },
  {
    label: 'Anticipate',
    body: 'We design spaces that support future growth, flexibility, and long-term comfort.',
  },
  {
    label: 'Empathize',
    body: 'Every decision prioritizes user experience, from circulation to material selections.',
  },
  {
    label: 'Collaborate',
    body: 'We work closely with consultants, engineers, and contractors for seamless execution.',
  },
] as const;

/** "Why Choose Us" cards — PDF page 9. */
export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Clear design direction',
    body: 'We translate the brief into a practical, elegant plan before details start multiplying.',
  },
  {
    number: '02',
    title: 'Execution-aware detailing',
    body: 'Drawings, materials, and site decisions are coordinated so the finished space stays true to intent.',
  },
  {
    number: '03',
    title: 'Calm communication',
    body: 'You always know what is decided, what needs input, and what is moving next.',
  },
  {
    number: '04',
    title: 'Long-term usability',
    body: 'Every choice is shaped around durability, comfort, and how the space will work over time.',
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
    role: 'Founder & Principal Architect',
    body: 'With over 22 years of experience, Ar. Aditya Mulay brings global perspective, technical expertise, and a refined approach to contemporary architecture. His practice focuses on thoughtful, purposeful design—creating spaces that are distinctive, functional, enduring, and connected to the way people live.',
    image: '/assets/images/about/architect-portrait.jpg',
  },
  {
    name: 'Ar. Jubair Ansari',
    role: 'Senior Architect ',
    body: 'With a Bachelor of Architecture and over 10 years of industry experience, he brings extensive expertise in architecture and interior design, combining creative vision with practical design solutions.',
    image: '/assets/images/about/team-nikita-sharma.jpg',
  },
  {
    name: 'Ar. Sachin Dhavlikar',
    role: 'Senior Architect',
    body: 'With a Bachelor of Architecture and over 20 years of professional experience, Ar. Sachin Dhavlikar brings extensive expertise in architecture and interior design. His approach blends creative vision, technical knowledge, and practical design solutions to create thoughtful and functional spaces.',
    image: '/assets/images/about/team-rahul-deshmukh.jpg',
  },
  {
    name: 'Dr. Aruna Mulay',
    role: 'Healthcare Infrastructure Advisor',
    body: 'With an MBA in Hospital Planning and Management and over 22 years of experience, Dr. Aruna Mam brings extensive expertise in healthcare infrastructure planning, development, and management. She has led and advised on large-scale healthcare projects, providing strategic guidance for efficient planning, operations, and infrastructure management.',
    image: '/assets/images/about/team-nikita-sharma.jpg',
  },
  {
    name: 'ID. Ritika Yeole',
    role: 'Interior Designer',
    body: 'With a Bachelor’s degree in Interior Design and over 5 years of professional experience, Ritika brings a refined approach to creating functional, aesthetic, and thoughtfully detailed spaces. Her expertise spans residential and commercial interiors, with a strong focus on spatial planning, material selection, and contemporary design solutions.',
    image: '/assets/images/about/team-nikita-sharma.jpg',
  }
  
] as const;
