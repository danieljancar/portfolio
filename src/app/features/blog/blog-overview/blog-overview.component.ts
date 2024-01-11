import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { DatePipe } from '@angular/common';
import { BlogSearchComponent } from './blog-search/blog-search.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';

@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [
    NgIcon,
    DatePipe,
    BlogSearchComponent,
    BlogFilterComponent,
    BlogPostsComponent,
    BlogSidebarComponent,
    BlogPostsComponent,
  ],
  templateUrl: './blog-overview.component.html',
  styleUrl: './blog-overview.component.scss',
})
export class BlogOverviewComponent {}
