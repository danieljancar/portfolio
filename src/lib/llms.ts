import { getEvents, getPosts, getProjects, getSettings } from './content';
import { formatDate } from './dates';
import { getCompanies } from './experience';
import { getAlbums } from './photos';

const link = (site: URL, path: string, label: string, note?: string) =>
  `- [${label}](${new URL(path, site).href})${note ? `: ${note}` : ''}`;

async function collect() {
  const [settings, posts, work, events, companies, albums] = await Promise.all([
    getSettings(),
    getPosts(),
    getProjects(),
    getEvents(),
    getCompanies(),
    getAlbums(),
  ]);
  return { settings, posts, work, events, companies, albums };
}

function summary(
  site: URL,
  data: Awaited<ReturnType<typeof collect>>,
): Block[] {
  const { settings, posts, work, events, companies, albums } = data;
  return [
    `# ${settings.name}`,
    `> ${settings.description}`,
    settings.about,
    '## Experience',
    companies.flatMap(company =>
      company.roles.map(
        ({ entry, period }) =>
          `- ${entry.data.role}, ${company.name} (${period})${entry.data.summary ? `: ${entry.data.summary}` : ''}`,
      ),
    ),
    '## Work',
    work.map(item =>
      link(
        site,
        `/work/${item.id}/`,
        item.data.name,
        `${item.data.tagline} (${item.data.ongoing ? 'ongoing' : 'one-off'}${item.data.year ? `, ${item.data.year}` : ''})`,
      ),
    ),
    '## Blog',
    posts.map(post =>
      link(
        site,
        `/blog/${post.id}/`,
        post.data.title,
        `${formatDate(post.data.published)}. ${post.data.description}`,
      ),
    ),
    '## Events',
    events.map(event =>
      link(
        site,
        `/events/${event.id}/`,
        event.data.title,
        [formatDate(event.data.date), event.data.place]
          .filter(Boolean)
          .join(', '),
      ),
    ),
    '## Photos',
    albums.map(album => link(site, `/photos/${album.id}/`, album.data.title)),
    '## Contact',
    [
      `- Email: ${settings.email}`,
      ...settings.socials.map(social => `- ${social.label}: ${social.href}`),
    ],
  ];
}

type Block = string | string[];

const text = (blocks: Block[]) =>
  new Response(
    `${blocks.map(block => (Array.isArray(block) ? block.join('\n') : block)).join('\n\n')}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );

export async function llmsSummary(site: URL): Promise<Response> {
  const lines = summary(site, await collect());
  return text([
    ...lines,
    '## Optional',
    link(
      site,
      '/llms-full.txt',
      'Full text',
      'every post, work entry and event in full',
    ),
  ]);
}

export async function llmsFull(site: URL): Promise<Response> {
  const data = await collect();
  const section = (title: string, url: string, meta: string, body = '') =>
    [`## ${title}`, `${url}\n${meta}`, body.trim()]
      .filter(Boolean)
      .join('\n\n');
  return text([
    ...summary(site, data),
    '# Full text',
    ...data.posts.map(post =>
      section(
        post.data.title,
        new URL(`/blog/${post.id}/`, site).href,
        `Published ${formatDate(post.data.published)}. ${post.data.description}`,
        post.body,
      ),
    ),
    ...data.work.map(item =>
      section(
        item.data.name,
        new URL(`/work/${item.id}/`, site).href,
        item.data.tagline,
        item.body,
      ),
    ),
    ...data.events.map(event =>
      section(
        event.data.title,
        new URL(`/events/${event.id}/`, site).href,
        formatDate(event.data.date),
        event.body,
      ),
    ),
  ]);
}
