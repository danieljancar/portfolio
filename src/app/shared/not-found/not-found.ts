import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 px-5 text-center"
    >
      <p class="font-mono text-7xl font-bold text-brand-400">404</p>
      <h1 class="text-2xl font-semibold">This page wandered off.</h1>
      <p class="text-[var(--text-soft)]">
        The link might be broken, or the page may have moved. Let's get you
        back.
      </p>
      <a
        routerLink="/"
        class="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >Back home</a
      >
    </section>
  `,
})
export class NotFound {}
