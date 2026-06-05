import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowUpRight } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { BlogService } from '../../../../core/blog.service';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, DatePipe, NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapArrowUpRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog.html',
})
export class Blog {
  private readonly blogService = inject(BlogService);

  protected readonly featured = computed(() =>
    this.blogService.getFeaturedBlogs(),
  );
}
