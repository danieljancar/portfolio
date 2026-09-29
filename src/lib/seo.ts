import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { getExperience, getSettings } from './content';

export type Schema = Record<string, unknown>;

export interface ShareImage {
  url: string;
  width: number;
  height: number;
}

const SHARE = { width: 1200, height: 630 };

export const personId = (site: URL) => new URL('/#person', site).href;

export async function shareImage(
  image: ImageMetadata | undefined,
  site: URL,
): Promise<ShareImage> {
  if (!image) return { url: new URL('/og.jpg', site).href, ...SHARE };
  const ratio = SHARE.width / SHARE.height;
  const width = Math.round(
    Math.min(SHARE.width, image.width, image.height * ratio),
  );
  const height = Math.round(width / ratio);
  const { src } = await getImage({
    src: image,
    width,
    height,
    fit: 'cover',
    format: 'jpg',
    quality: 80,
  });
  return { url: new URL(src, site).href, width, height };
}

export async function identity(site: URL): Promise<Schema[]> {
  const [settings, experience] = await Promise.all([
    getSettings(),
    getExperience(),
  ]);
  const role = experience.find(entry => !entry.data.end);
  const portrait = settings.portrait
    ? new URL(
        (await getImage({ src: settings.portrait, width: 800, format: 'jpg' }))
          .src,
        site,
      ).href
    : undefined;

  return [
    {
      '@type': 'WebSite',
      '@id': new URL('/#website', site).href,
      url: site.href,
      name: settings.name,
      description: settings.description,
      inLanguage: 'en',
      publisher: { '@id': personId(site) },
    },
    {
      '@type': 'Person',
      '@id': personId(site),
      name: settings.name,
      description: settings.description,
      url: site.href,
      image: portrait,
      email: `mailto:${settings.email}`,
      jobTitle: role?.data.role,
      worksFor: role && {
        '@type': 'Organization',
        name: role.data.company,
        url: role.data.companyUrl,
      },
      knowsAbout: settings.skills.flatMap(group => group.items),
      sameAs: settings.socials.map(link => link.href),
    },
  ];
}

export interface Crumb {
  name: string;
  path: string;
}

const sections: Record<string, string> = {
  about: 'About',
  blog: 'Blog',
  events: 'Events',
  photos: 'Photos',
  recipes: 'Recipes',
  recommended: 'Recommended',
  tags: 'Tags',
  work: 'Work',
};

export function crumbsFor(pathname: string, title?: string): Crumb[] {
  const parts = pathname.split('/').filter(Boolean);
  const trail: Crumb[] = [{ name: 'Home', path: '/' }];
  const section = sections[parts[0] ?? ''];
  if (section) trail.push({ name: section, path: `/${parts[0]}/` });
  if (parts.length > 1 && title) trail.push({ name: title, path: pathname });
  return trail;
}

export function clip(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export function excerpt(markdown = ''): string {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .find(block => block && !/^(#|!\[|<|```|[-*>|] )/.test(block));
  return (paragraph ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '');
}
