export interface Social {
  label: string;
  href: string;
  icon: string;
}

export const EMAIL = 'daniel@danieljancar.dev';

export const SOCIALS: Social[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/danieljancar',
    icon: 'bootstrapGithub',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/danieljancar/',
    icon: 'bootstrapLinkedin',
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/20283236/daniel-jancar',
    icon: 'bootstrapStackOverflow',
  },
  {
    label: 'dev.to',
    href: 'https://dev.to/danieljancar',
    icon: 'simpleDevdotto',
  },
];
