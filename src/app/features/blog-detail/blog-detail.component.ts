import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { IntroductionComponent } from './introduction/introduction.component';
import { Blog, BlogsJson } from '../../types/blog.type';
import * as blogData from '../../content/blog.json';
import { Author } from '../../types/author.type';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [provideMarkdown({ loader: HttpClient })],
  standalone: true,
  imports: [
    MarkdownComponent,
    NgOptimizedImage,
    NgIcon,
    DatePipe,
    IntroductionComponent,
  ],
})
export class BlogDetailComponent implements OnInit {
  public blog: Blog | undefined;
  public authorName: string | undefined;

  constructor(private route: ActivatedRoute) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('blogId');
    if (blogId) {
      this.loadBlogData(blogId);
    }
  }

  private loadBlogData(blogId: string): void {
    const blogs: Blog[] = (blogData as BlogsJson).blogs;
    this.blog = blogs.find(blog => blog.slug === blogId);
    if (this.blog) {
      this.getAuthor(this.blog.author);
    }
  }

  public async getAuthor(username: string | undefined) {
    const authors: Author[] = (blogData as BlogsJson).authors;
    const author = authors.find(author => author.username === username);
    if (author) {
      this.authorName = author.name;
    }
    return author;
  }
}
