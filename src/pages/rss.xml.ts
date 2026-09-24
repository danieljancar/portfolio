import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, getSettings } from '~/lib/content';

export async function GET(context: APIContext) {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  return rss({
    title: `${settings.name} · Writing`,
    description: settings.description,
    site: context.site ?? 'https://danieljancar.dev',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
