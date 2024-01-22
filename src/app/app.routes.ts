import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {LegalOverviewComponent} from './features/legal/legal-overview/legal-overview.component';
import {BlogOverviewComponent} from './features/blog/blog-overview/blog-overview.component';
import {BlogDetailComponent} from './features/blog/blog-detail/blog-detail.component';
import {LegalDetailComponent} from './features/legal/legal-detail/legal-detail.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'blog', component: BlogOverviewComponent},
  {path: 'blog/:blogId', component: BlogDetailComponent},
  {path: 'legal', component: LegalOverviewComponent},
  {path: 'legal/:legalId', component: LegalDetailComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];
