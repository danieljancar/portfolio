export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  summary: string;
  stack: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Founder',
    company: 'Cranny',
    period: 'Nov 2025 — now',
    current: true,
    summary:
      'Building a mobile app that helps people discover hidden spots near them. I wear every hat here — product, design, backend and the app itself.',
    stack: [
      'Expo',
      'React Native',
      'Supabase',
      'PostgreSQL',
      'PostGIS',
      'Resend',
    ],
  },
  {
    role: 'Software Developer (Apprentice)',
    company: 'Luzerner Kantonalbank',
    companyUrl: 'https://www.lukb.ch',
    period: 'Aug 2022 — now',
    current: true,
    summary:
      'Learning the trade on real banking software — from frontend apps to database logic — while shipping features alongside the team.',
    stack: [
      'Angular',
      'Ionic',
      'Jenkins',
      'OpenShift',
      'Firebase',
      'PL/SQL',
      'Avaloq',
    ],
  },
  {
    role: 'IT Teacher (Volunteer)',
    company: 'iStep',
    period: 'Nov 2024 — now',
    current: true,
    summary:
      'Teaching kids the basics of computers and code. Watching the moment something clicks for them is easily the best part of my week.',
    stack: ['Teaching', 'Scratch', 'Mentoring'],
  },
  {
    role: 'Waiter',
    company: 'Restaurant Rössli',
    period: 'Part-time',
    current: true,
    summary:
      'Keeping a busy floor running on weekends. It keeps me sharp on the things code can’t teach — people, pace and staying calm under pressure.',
    stack: ['Hospitality', 'Teamwork'],
  },
];
