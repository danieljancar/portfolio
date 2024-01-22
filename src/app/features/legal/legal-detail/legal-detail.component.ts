import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Legal} from '../../../types/legal.type';
import {LegalService} from '../../../core/legal.service';
import {LegalInfoComponent} from './legal-info/legal-info.component';
import {BlogInfoComponent} from '../../blog/blog-detail/blog-info/blog-info.component';
import {
  BlogMarkdownRendererComponent
} from '../../blog/blog-detail/blog-markdown-renderer/blog-markdown-renderer.component';
import {LegalMarkdownRendererComponent} from './legal-markdown-renderer/legal-markdown-renderer.component';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-legal-detail',
  standalone: true,
  imports: [
    LegalInfoComponent,
    BlogInfoComponent,
    BlogMarkdownRendererComponent,
    LegalMarkdownRendererComponent,
  ],
  templateUrl: './legal-detail.component.html',
  styleUrl: './legal-detail.component.scss',
})
export class LegalDetailComponent implements OnInit {
  public legal: Legal | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private legalService: LegalService,
    private titleService: Title,
    private metaService: Meta
  ) {
  }

  ngOnInit(): void {
    const legalId = this.route.snapshot.paramMap.get('legalId');
    if (legalId) {
      this.legal = this.legalService.getLegalByFile(legalId);
      if (this.legal) {
        this.titleService.setTitle(`${this.legal.name} | Daniel Jancar`);
        this.metaService.updateTag({
          name: 'description',
          content: this.legal.description,
        });
      }
      if (!this.legal) {
        this.router.navigate(['/404']);
      }
    } else {
      this.router.navigate(['/404']);
    }
  }
}
