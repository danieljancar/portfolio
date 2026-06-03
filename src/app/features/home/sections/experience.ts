import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBoxArrowUpRight } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { EXPERIENCE } from '../../../data/experience.data';

@Component({
  selector: 'app-experience',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapBoxArrowUpRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="experience"
      class="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 md:px-8"
    >
      <h2 class="font-mono text-sm text-brand-400">Experience</h2>
      <p class="mt-2 text-[var(--text-soft)]">
        A few of the places I've spent my time lately.
      </p>

      <ol class="mt-10 space-y-10 border-l border-[var(--border)] pl-6">
        @for (item of experience; track item.company; let i = $index) {
          <li [appReveal]="i * 0.05" class="relative">
            <span
              class="absolute -left-[1.65rem] top-1.5 size-3 rounded-full border-2 border-[var(--bg)]"
              [style.background]="
                item.current ? 'var(--color-brand-400)' : 'var(--border)'
              "
            ></span>
            <div
              class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
            >
              <h3 class="text-lg font-semibold">
                {{ item.role }}
                <span class="text-[var(--text-soft)]">·</span>
                @if (item.companyUrl) {
                  <a
                    [href]="item.companyUrl"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-1 text-brand-400 hover:underline"
                  >
                    {{ item.company }}
                    <ng-icon name="bootstrapBoxArrowUpRight" size="12" />
                  </a>
                } @else {
                  <span class="text-brand-400">{{ item.company }}</span>
                }
              </h3>
              <span class="font-mono text-xs text-[var(--text-soft)]">
                {{ item.period }}
              </span>
            </div>
            <p class="mt-2 text-[var(--text-soft)]">{{ item.summary }}</p>
            <ul class="mt-3 flex flex-wrap gap-2">
              @for (tech of item.stack; track tech) {
                <li
                  class="rounded-full bg-[var(--bg-soft)] px-2.5 py-1 font-mono text-xs text-[var(--text-soft)]"
                >
                  {{ tech }}
                </li>
              }
            </ul>
          </li>
        }
      </ol>
    </section>
  `,
})
export class ExperienceSection {
  protected readonly experience = EXPERIENCE;
}
