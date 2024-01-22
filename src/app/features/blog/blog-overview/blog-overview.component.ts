import {Component} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {DatePipe} from '@angular/common';
import {BlogSearchComponent} from './blog-search/blog-search.component';
import {BlogFilterComponent} from './blog-filter/blog-filter.component';
import {BlogPostsComponent} from './blog-posts/blog-posts.component';
import {BlogSidebarComponent} from './blog-sidebar/blog-sidebar.component';
import {LoadingSpinnerComponent} from '../../../shared/loading-spinner/loading-spinner.component';
import {PlaceholderMessageComponent} from '../../../shared/placeholder-message/placeholder-message.component';
import {BackButtonComponent} from '../../../shared/back-button/back-button.component';
import {Meta, Title} from "@angular/platform-browser";

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
    LoadingSpinnerComponent,
    PlaceholderMessageComponent,
    BackButtonComponent,
  ],
  templateUrl: './blog-overview.component.html',
  styleUrl: './blog-overview.component.scss',
})
export class BlogOverviewComponent {
  constructor(private titleService: Title, private metaService: Meta
  ) {
    this.titleService.setTitle(`Daniel Jancar - Blog`);
    this.metaService.updateTag({
      name: 'description',
      content: `Find some of my blog posts here about many different topics.`,
    });
  }
}
