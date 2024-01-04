import { Component, OnInit } from '@angular/core';
import * as blogData from '../../../content/blog.json';
import { Blog } from '../../../types/blog.type';
import { CommonModule, NgForOf, NgOptimizedImage } from '@angular/common';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapEmojiExpressionlessFill } from '@ng-icons/bootstrap-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-blog',
  standalone: true,
  imports: [
    NgForOf,
    RelativeTimePipe,
    NgOptimizedImage,
    NgIcon,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.scss'],
  viewProviders: [
    provideIcons({
      bootstrapEmojiExpressionlessFill,
    }),
  ],
})
export class LatestBlogComponent implements OnInit {
  latestBlog: Blog[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadLatestBlogs();
  }

  loadLatestBlogs() {
    this.latestBlog = [...blogData.blogs]
      .sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
      )
      .slice(0, 3);
  }

  reloadBlogs() {
    this.loadLatestBlogs();
  }
}
