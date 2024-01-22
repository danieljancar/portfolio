import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'; // Import Router
import {MarkdownComponent} from 'ngx-markdown';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {BlogInfoComponent} from './blog-info/blog-info.component';
import {BlogMarkdownRendererComponent} from './blog-markdown-renderer/blog-markdown-renderer.component';
import {BlogFooterComponent} from './blog-footer/blog-footer.component';
import {Blog} from '../../../types/blog.type';
import {Author} from '../../../types/author.type';
import {BlogService} from '../../../core/blog.service';
import {ScrollIndicatorComponent} from '../../../shared/scroll-indicator/scroll-indicator.component';
import {BackButtonComponent} from '../../../shared/back-button/back-button.component';
import {Meta, Title} from "@angular/platform-browser";

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
    ScrollIndicatorComponent,
    BackButtonComponent,
  ],
})
export class BlogDetailComponent implements OnInit {
  public blog: Blog | undefined;
  public author: Author | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
  }

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

          this.titleService.setTitle(`${this.blog.title} | by ${this.author.name}`);
          this.metaService.updateTag({
            name: 'description',
            content: this.blog.description,
          });
        }
      }
    } else {
      this.router.navigate(['/404']);
    }
  }
}
