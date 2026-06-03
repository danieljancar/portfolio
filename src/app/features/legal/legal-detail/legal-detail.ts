import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeft } from '@ng-icons/bootstrap-icons';
import { LegalService } from '../../../core/legal.service';
import { SeoService } from '../../../core/seo.service';

@Component({
  selector: 'app-legal-detail',
  imports: [RouterLink, DatePipe, MarkdownComponent, NgIcon],
  providers: [provideIcons({ bootstrapArrowLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legal-detail.html',
})
export class LegalDetail {
  private readonly legalService = inject(LegalService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly legalId = input.required<string>();

  protected readonly legal = computed(() =>
    this.legalService.getLegalByFile(this.legalId()),
  );

  constructor() {
    effect(() => {
      const doc = this.legal();
      if (!doc) {
        this.router.navigate(['/404']);
        return;
      }
      this.seo.update({
        title: `${doc.name} — Daniel Jancar`,
        description: doc.description,
        path: `/legal/${doc.file}`,
      });
    });
  }
}
