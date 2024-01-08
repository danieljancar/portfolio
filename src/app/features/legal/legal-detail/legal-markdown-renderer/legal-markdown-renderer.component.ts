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
import { BlogFooterComponent } from '../../../blog/blog-detail/blog-footer/blog-footer.component';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { LegalFooterComponent } from '../legal-footer/legal-footer.component';
import { Legal } from '../../../../types/legal.type';

@Component({
  selector: 'app-legal-markdown-renderer',
  standalone: true,
  imports: [
    BlogFooterComponent,
    LoadingSpinnerComponent,
    MarkdownComponent,
    LegalFooterComponent,
  ],
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
  templateUrl: './legal-markdown-renderer.component.html',
  styleUrls: [
    './legal-markdown-renderer.component.scss',
    '../../../../styles/markdown.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LegalMarkdownRendererComponent implements OnInit {
  @Input() legal: Legal | undefined;
  isLoading: boolean = true;

  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {
    const mdPath: string = `assets/legal/content/${this.legal?.file}.md`;
    this.markdownService.getSource(mdPath).subscribe(() => {
      this.isLoading = false;
    });
  }
}
