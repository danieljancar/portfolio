import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BlogOverviewComponent } from './features/blog-overview/blog-overview.component';
import { AuthorComponent } from './features/author/author.component';
import { BlogDetailComponent } from './features/blog-detail/blog-detail.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogOverviewComponent },
  { path: 'blog/:blogId', component: BlogDetailComponent },
  { path: 'author/:authorId', component: AuthorComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
