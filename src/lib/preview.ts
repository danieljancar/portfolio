const cache = new Map<string, Promise<string | undefined>>();

const patterns = [
  /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/i,
];

const headers = { 'user-agent': 'Mozilla/5.0 (compatible; danieljancar.dev)' };

async function spotify(url: string): Promise<string | undefined> {
  const endpoint = new URL('https://open.spotify.com/oembed');
  endpoint.searchParams.set('url', url);
  const response = await fetch(endpoint, {
    headers,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return undefined;
  const { thumbnail_url } = (await response.json()) as {
    thumbnail_url?: string;
  };
  return thumbnail_url;
}

async function load(url: string): Promise<string | undefined> {
  try {
    if (new URL(url).hostname === 'open.spotify.com') {
      const image = await spotify(url);
      if (image) return image;
    }
    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return undefined;
    const html = await response.text();
    const match = patterns
      .map(pattern => html.match(pattern)?.[1])
      .find(Boolean);
    return match
      ? new URL(match.replaceAll('&amp;', '&'), url).href
      : undefined;
  } catch {
    return undefined;
  }
}

export function previewImage(url: string): Promise<string | undefined> {
  let image = cache.get(url);
  if (!image) {
    image = load(url);
    cache.set(url, image);
  }
  return image;
}
