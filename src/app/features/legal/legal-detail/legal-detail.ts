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
  template: `
    @if (legal(); as doc) {
      <article class="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <a
          routerLink="/"
          class="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
        >
          <ng-icon name="bootstrapArrowLeft" size="16" /> Home
        </a>
        <h1 class="text-3xl font-bold tracking-tight">{{ doc.name }}</h1>
        <p class="mt-2 font-mono text-xs text-[var(--text-soft)]">
          Version {{ doc.version }} · Updated
          {{ doc.edited | date: 'MMMM d, y' }}
        </p>
        <div class="mt-8">
          <markdown
            class="prose-md"
            [src]="'assets/legal/content/' + doc.file + '.md'"
          />
        </div>
      </article>
    }
  `,
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
