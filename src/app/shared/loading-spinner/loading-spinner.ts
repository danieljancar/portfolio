import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex justify-center py-16" role="status" aria-label="Loading">
      <span
        class="size-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-brand-400"
      ></span>
    </div>
  `,
})
export class LoadingSpinner {}
