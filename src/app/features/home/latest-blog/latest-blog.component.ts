import { Component, OnInit } from '@angular/core';
import * as blogData from '../../../content/blog/blog.json';
import { Blog } from '../../../types/blog.type';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';

@Component({
  selector: 'app-latest-blog',
  standalone: true,
  imports: [NgForOf, RelativeTimePipe, NgOptimizedImage],
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.scss'],
})
export class LatestBlogComponent implements OnInit {
  latestBlog: Blog[] = [];

  constructor() {}

  ngOnInit() {
    this.latestBlog = [...blogData.blogs]
      .sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
      )
      .slice(0, 3);
  }
}
