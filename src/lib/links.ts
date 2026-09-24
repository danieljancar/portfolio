const SITE_HOST = 'danieljancar.dev';

export function isExternal(href: string): boolean {
  if (!/^https?:\/\//.test(href)) return false;
  return new URL(href).hostname.replace(/^www\./, '') !== SITE_HOST;
}

export function linkAttrs(href: string): { target?: string; rel?: string } {
  return isExternal(href)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
