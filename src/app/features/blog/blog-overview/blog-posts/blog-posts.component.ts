import { Component, HostListener, OnInit } from '@angular/core';
import { BlogService } from '../../../../core/blog.service';
import { Blog } from '../../../../types/blog.type';
import { NgIcon } from '@ng-icons/core';
import { PlaceholderMessageComponent } from '../../../../shared/placeholder-message/placeholder-message.component';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss',
  standalone: true,
  imports: [
    NgIcon,
    PlaceholderMessageComponent,
    LoadingSpinnerComponent,
    DatePipe,
    RouterLink,
  ],
})
export class BlogPostsComponent implements OnInit {
  public blogs: Blog[] = [];
  public hasMoreBlogs: boolean = true;
  public loading: boolean = false;
  public maxLoadMoreCount: number = 0;
  private startIndex: number = 0;
  private loadCount: number = 6;
  private currentFilter: string = 'latest';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.adjustLoadCount();
    this.loadBlogs();
  }

  onFilterChange(filter: string) {
    this.currentFilter = filter;
    this.resetLoading();
  }

  loadBlogs() {
    this.loading = true;
    const moreBlogs = this.blogService.getFilteredBlogs(
      this.currentFilter,
      this.startIndex,
      this.loadCount,
    );

    this.blogs = [...this.blogs, ...moreBlogs];
    this.startIndex += this.loadCount;

    this.hasMoreBlogs = moreBlogs.length === this.loadCount;
    this.loading = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustLoadCount();
  }

  loadMoreBlogs(): void {
    this.maxLoadMoreCount += 1;
    this.loadCount = window.innerWidth > 768 ? 4 : 2;
    this.loadBlogs();
  }

  private resetLoading() {
    this.blogs = [];
    this.startIndex = 0;
    this.maxLoadMoreCount = 2;
    this.loadBlogs();
  }

  private adjustLoadCount(): void {
    this.loadCount = window.innerWidth > 768 ? 6 : 4;
  }
}
