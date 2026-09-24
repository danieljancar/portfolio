// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import photoMeta from './src/integrations/photo-meta/index.ts';

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
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
