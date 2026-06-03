import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    title: 'Daniel Jancar — Software Developer',
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog-overview/blog-overview').then(
        m => m.BlogOverview,
      ),
    title: 'Blog — Daniel Jancar',
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./features/blog/blog-detail/blog-detail').then(m => m.BlogDetail),
  },
  {
    path: 'legal/:legalId',
    loadComponent: () =>
      import('./features/legal/legal-detail/legal-detail').then(
        m => m.LegalDetail,
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./shared/not-found/not-found').then(m => m.NotFound),
    title: 'Page not found — Daniel Jancar',
  },
  { path: '**', redirectTo: '404' },
];
