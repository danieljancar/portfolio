import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog, BlogsJson } from '../../types/blog.type';
import * as blogData from '../../content/blog/blog.json';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [provideMarkdown({ loader: HttpClient })],
  standalone: true,
  imports: [MarkdownComponent],
})
export class BlogDetailComponent implements OnInit {
  blogData: Blog | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('blogId');
    if (blogId) {
      this.loadBlogData(blogId);
    }
  }

  private loadBlogData(blogId: string): void {
    const blogs: Blog[] = (blogData as BlogsJson).blogs;
    this.blogData = blogs.find(blog => blog.slug === blogId);
  }
}
