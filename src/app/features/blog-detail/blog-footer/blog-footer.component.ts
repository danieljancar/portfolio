import { Component, Input } from '@angular/core';
import { Blog } from '../../../types/blog.type';

@Component({
  selector: 'app-blog-footer',
  standalone: true,
  imports: [],
  templateUrl: './blog-footer.component.html',
  styleUrl: './blog-footer.component.scss',
})
export class BlogFooterComponent {
  @Input() blog: Blog | undefined;
}
