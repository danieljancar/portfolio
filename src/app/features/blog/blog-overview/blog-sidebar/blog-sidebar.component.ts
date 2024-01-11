import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBoxArrowUpRight } from '@ng-icons/bootstrap-icons';
import { PlaceholderMessageComponent } from '../../../../shared/placeholder-message/placeholder-message.component';
import { BlogService } from '../../../../core/blog.service';

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [NgIcon, PlaceholderMessageComponent],
  templateUrl: './blog-sidebar.component.html',
  styleUrl: './blog-sidebar.component.scss',
  viewProviders: [provideIcons({ bootstrapBoxArrowUpRight })],
})
export class BlogSidebarComponent implements OnInit {
  public recommendedTags: string[] | undefined;
  protected readonly encodeURIComponent = encodeURIComponent;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.recommendedTags = this.blogService.getRecommendedTags();
  }
}
