import {
  Component,
  Input,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  MarkdownComponent,
  provideMarkdown,
} from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../../types/blog.type';

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  imports: [MarkdownComponent],
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
  templateUrl: './markdown-renderer.component.html',
  styleUrl: './markdown-renderer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownRendererComponent {
  @Input() public blog: Blog | undefined;
}
