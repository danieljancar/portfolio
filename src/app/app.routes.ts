import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { AuthorComponent } from './features/author/author.component';
import { BlogDetailComponent } from './features/blog-detail/blog-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'blog',
    component: BlogOverviewComponent,
  },
  {
    path: 'blog/:id',
    component: BlogDetailComponent,
  },
  {
    path: 'author/:id',
    component: AuthorComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
