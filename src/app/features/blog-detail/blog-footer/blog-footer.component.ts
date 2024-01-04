import { Component, Input } from '@angular/core';
import { Blog } from '../../../types/blog.type';
import { Author } from '../../../types/author.type';

@Component({
  selector: 'app-blog-footer',
  standalone: true,
  imports: [],
  templateUrl: './blog-footer.component.html',
  styleUrl: './blog-footer.component.scss',
})
export class BlogFooterComponent {
  @Input() blog: Blog | undefined;
  @Input() author: Author | undefined;
  protected readonly encodeURIComponent = encodeURIComponent;
}
