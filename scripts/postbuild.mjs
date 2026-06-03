import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'dist/portfolio/browser');
const baseUrl = 'https://danieljancar.dev';

const readJson = rel => JSON.parse(readFileSync(resolve(root, rel), 'utf8'));

const blog = readJson('src/app/data/blog.json');
const legal = readJson('src/app/data/legal.json');

const day = iso => (iso ?? '').slice(0, 10);

const urls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
  ...blog.blogs.map(post => ({
    loc: `/blog/${post.slug}`,
    lastmod: day(post.edited ?? post.created),
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...legal.files.map(doc => ({
    loc: `/legal/${doc.file}`,
    lastmod: day(doc.edited ?? doc.created),
    changefreq: 'yearly',
    priority: '0.3',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod, changefreq, priority }) =>
    [
      '  <url>',
      `    <loc>${baseUrl}${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
writeFileSync(resolve(outDir, 'CNAME'), 'danieljancar.dev\n');
writeFileSync(resolve(outDir, '.nojekyll'), '');

// GitHub Pages serves 404.html for unmatched paths — use our styled 404 page.
const notFound = resolve(outDir, '404/index.html');
if (existsSync(notFound)) {
  copyFileSync(notFound, resolve(outDir, '404.html'));
}

console.log(
  `postbuild: wrote sitemap (${urls.length} urls), CNAME, .nojekyll, 404.html`,
);
