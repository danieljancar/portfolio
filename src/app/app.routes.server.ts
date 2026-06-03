import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './core/blog.service';
import { LegalService } from './core/legal.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      new BlogService().getSlugs().map(slug => ({ slug })),
  },
  {
    path: 'legal/:legalId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      new LegalService().getFiles().map(legalId => ({ legalId })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
