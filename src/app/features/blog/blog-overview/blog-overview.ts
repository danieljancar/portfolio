import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../core/blog.service';
import { SeoService } from '../../../core/seo.service';

type Sort = 'latest' | 'oldest';

@Component({
  selector: 'app-blog-overview',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-overview.html',
})
export class BlogOverview {
  private readonly blogService = inject(BlogService);

  protected readonly sorts: Sort[] = ['latest', 'oldest'];
  protected readonly sort = signal<Sort>('latest');
  protected readonly blogs = computed(() =>
    this.blogService.getBlogs(this.sort()),
  );

  constructor() {
    inject(SeoService).update({
      title: 'Blog — Daniel Jancar',
      description:
        "Notes on things I've built, learned, or found worth sharing.",
      path: '/blog',
    });
  }
}
