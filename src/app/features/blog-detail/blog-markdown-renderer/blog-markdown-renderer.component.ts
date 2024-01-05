import {
  Component,
  Input,
  OnInit,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  MarkdownComponent,
  MarkdownService,
  provideMarkdown,
} from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../../types/blog.type';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-blog-markdown-renderer',
  standalone: true,
  imports: [MarkdownComponent, LoadingSpinnerComponent],
  providers: [
    provideMarkdown({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
    }),
  ],
  templateUrl: './blog-markdown-renderer.component.html',
  styleUrl: './blog-markdown-renderer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BlogMarkdownRendererComponent implements OnInit {
  @Input() public blog: Blog | undefined;
  isLoading = true;

  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {
    const mdPath = `assets/blog/content/${this.blog?.content}`;
    this.markdownService.getSource(mdPath).subscribe(() => {
      this.isLoading = false;
    });
  }
}
