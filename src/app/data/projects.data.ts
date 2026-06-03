export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: 'Cranny',
    tagline: 'Find the spots only locals know',
    description:
      'A mobile app for finding and sharing the hidden spots near you, from quiet viewpoints to a really good coffee. A side project that I have been doing with some friends for fun.',
    stack: ['Expo', 'React Native', 'Supabase', 'PostGIS'],
    links: [{ label: 'Visit', href: 'https://the-cranny.com' }],
    featured: true,
  },
  {
    name: 'Chorizo',
    tagline: 'Course management, made open',
    description:
      'An open-source tool for organising courses and the people in them. It was one of my first bigger projects and is being actively used for managing taster days for information technology.',
    stack: ['Angular', 'TypeScript', 'Firebase'],
    links: [
      { label: 'GitHub', href: 'https://github.com/danieljancar/chorizo' },
    ],
    featured: false,
  },
  {
    name: 'Stellar Smart Contract Challenge',
    tagline: 'Vivid Video Award winner',
    description:
      'A submission to the Stellar challenge on dev.to that ended up winning the Vivid Video Award.',
    stack: ['Stellar', 'Soroban', 'Web3'],
    links: [{ label: 'Read on dev.to', href: 'https://dev.to/danieljancar' }],
    featured: false,
  },
];
