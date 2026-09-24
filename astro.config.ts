import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { defineConfig } from 'astro/config';
import photoMeta from './src/integrations/photo-meta';
import { externalLinks } from './src/markdown/external-links';

export default defineConfig({
  site: 'https://danieljancar.dev',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    photoMeta(),
    sitemap({ filter: page => !page.includes('/admin') }),
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  vite: {
    // lightningcss merges animation-timeline into the shorthand, which browsers reject
    build: { cssMinify: 'esbuild' },
  },
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    },
  },
});
