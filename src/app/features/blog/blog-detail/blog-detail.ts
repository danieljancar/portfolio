import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowLeft,
  bootstrapBook,
  bootstrapBoxArrowUpRight,
  bootstrapClock,
  bootstrapRobot,
} from '@ng-icons/bootstrap-icons';
import { BlogService } from '../../../core/blog.service';
import { SeoService } from '../../../core/seo.service';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, DatePipe, MarkdownComponent, NgIcon],
  providers: [
    provideIcons({
      bootstrapArrowLeft,
      bootstrapClock,
      bootstrapBook,
      bootstrapRobot,
      bootstrapBoxArrowUpRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-detail.html',
})
export class BlogDetail {
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly blog = computed(() =>
    this.blogService.getBlogBySlug(this.slug()),
  );
  protected readonly author = computed(() =>
    this.blogService.getAuthor(this.blog()?.author),
  );

  constructor() {
    effect(() => {
      const post = this.blog();
      if (!post) {
        this.router.navigate(['/404']);
        return;
      }
      this.seo.update({
        title: `${post.title} — Daniel Jancar`,
        description: post.description,
        path: `/blog/${post.slug}`,
        image: `https://danieljancar.dev/assets/blog/images/${post.banner}`,
        type: 'article',
      });
    });
  }
}
