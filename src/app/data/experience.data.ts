export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  featured?: boolean;
  summary?: string;
  stack?: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Developer (Apprentice)',
    company: 'Luzerner Kantonalbank',
    companyUrl: 'https://www.lukb.ch',
    period: 'Aug 2022 — now',
    current: true,
    featured: true,
    summary:
      'I had the privilege of completing my "Applikationsentwickler EFZ" apprenticeship at LUKB. Alongside the fundamentals I picked up at vocational school and the continous learnings I did privately, those four years gave me the chance to grow both technically and on a human level.',
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
    companyUrl: 'https://istep.ch',
    period: 'Occasional',
    current: true,
    summary:
      'Every now and then I help out with iStep, teaching kids the first steps of computers and code.',
    stack: ['Teaching', 'Scratch', 'Mentoring'],
  },
  {
    role: 'Waiter',
    company: 'Rössli Ess-Kultur & Bacchus',
    period: 'Part-time',
    current: true,
  },
];
