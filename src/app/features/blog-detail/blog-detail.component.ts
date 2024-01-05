import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { MarkdownComponent } from 'ngx-markdown';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { BlogInfoComponent } from './blog-info/blog-info.component';
import { Blog } from '../../types/blog.type';
import { BlogMarkdownRendererComponent } from './blog-markdown-renderer/blog-markdown-renderer.component';
import { BlogFooterComponent } from './blog-footer/blog-footer.component';
import { BlogService } from '../../core/blog.service';
import { Author } from '../../types/author.type';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [
    MarkdownComponent,
    NgOptimizedImage,
    NgIcon,
    DatePipe,
    BlogInfoComponent,
    BlogMarkdownRendererComponent,
    BlogFooterComponent,
  ],
})
export class BlogDetailComponent implements OnInit {
  public blog: Blog | undefined;
  public author: Author | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('blogId');
    if (blogId) {
      this.blog = this.blogService.getBlogBySlug(blogId);
      if (!this.blog) {
        this.router.navigate(['/404']);
      } else {
        const author = this.blogService.getAuthor(this.blog.author);
        if (author) {
          this.author = author;
        }
      }
    } else {
      this.router.navigate(['/404']);
    }
  }
}
