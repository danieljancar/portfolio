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
      'A mobile app for discovering and sharing hidden places — quiet viewpoints, good coffee, little corners worth the detour. My current main thing.',
    stack: ['Expo', 'React Native', 'Supabase', 'PostGIS'],
    links: [{ label: 'Visit', href: 'https://cranny.app' }],
    featured: true,
  },
  {
    name: 'Chorizo',
    tagline: 'Course management, made open',
    description:
      'An open-source tool for organising courses and the people in them. Started as a school project, grew into something I genuinely enjoy maintaining.',
    stack: ['Angular', 'TypeScript', 'Firebase'],
    links: [{ label: 'GitHub', href: 'https://github.com/danieljancar' }],
    featured: true,
  },
  {
    name: 'Stellar Smart Contract Challenge',
    tagline: 'Vivid Video Award winner',
    description:
      'A submission to the Stellar challenge on dev.to that took home the Vivid Video Award. A fun sprint into web3 and a reminder that shipping beats perfecting.',
    stack: ['Stellar', 'Soroban', 'Web3'],
    links: [{ label: 'Read on dev.to', href: 'https://dev.to/danieljancar' }],
    featured: false,
  },
  {
    name: 'This portfolio',
    tagline: 'The site you’re on',
    description:
      'Built with Angular and prerendered to static HTML. Open source, like most of what I make. Have a poke around the code.',
    stack: ['Angular', 'Tailwind', 'GSAP'],
    links: [
      { label: 'GitHub', href: 'https://github.com/danieljancar/portfolio' },
    ],
    featured: false,
  },
];
