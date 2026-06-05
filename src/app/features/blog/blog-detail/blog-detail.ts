import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  effect,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly document = inject(DOCUMENT);

  readonly slug = input.required<string>();

  /**
   * Heading anchors render as bare `#slug` links. With `<base href="/">` those
   * resolve against the base URL (jumping to `/#slug`), so we intercept in-page
   * hash clicks and scroll to the heading ourselves, reflecting it in the URL
   * without leaving the `/blog/:slug` page.
   */
  @HostListener('click', ['$event'])
  protected onClick(event: MouseEvent): void {
    if (event.button !== 0 || event.metaKey || event.ctrlKey) return;
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    this.scrollToFragment(decodeURIComponent(href.slice(1)));
  }

  /** Scrolls to a fragment heading once the markdown has rendered (deep links). */
  protected onReady(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) this.scrollToFragment(fragment);
  }

  private scrollToFragment(id: string): void {
    const target = this.document.getElementById(id);
    if (!target) return;
    // scrollIntoView honours the heading's `scroll-margin-top`, so it clears
    // the fixed navbar (Angular's anchorScrolling does not).
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
    this.location.replaceState(`${this.location.path()}#${id}`);
  }

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
