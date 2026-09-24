const SITE_HOST = 'danieljancar.dev';

export function isExternal(href: string): boolean {
  if (!/^https?:\/\//.test(href)) return false;
  return new URL(href).hostname.replace(/^www\./, '') !== SITE_HOST;
}

export function withRef(href: string): string {
  if (!isExternal(href)) return href;
  const url = new URL(href);
  if (!url.searchParams.has('ref')) url.searchParams.set('ref', SITE_HOST);
  return url.toString();
}

export function linkProps(href: string): {
  href: string;
  target?: string;
  rel?: string;
} {
  return isExternal(href)
    ? { href: withRef(href), target: '_blank', rel: 'noopener' }
    : { href };
}
