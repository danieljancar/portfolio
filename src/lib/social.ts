const icons: [RegExp, string][] = [
  [/github\.com/, 'github-fill'],
  [/linkedin\.com/, 'linkedin-box-fill'],
  [/instagram\.com/, 'instagram-line'],
  [/^mailto:/, 'mail-line'],
];

export function socialIcon(href: string): string {
  return icons.find(([pattern]) => pattern.test(href))?.[1] ?? 'link';
}
