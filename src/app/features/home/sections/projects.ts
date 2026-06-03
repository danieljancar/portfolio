import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowUpRight } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PROJECTS } from '../../../data/projects.data';

@Component({
  selector: 'app-projects',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapArrowUpRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="projects"
      class="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 md:px-8"
    >
      <h2 class="font-mono text-sm text-brand-400">Projects</h2>
      <p class="mt-2 text-[var(--text-soft)]">
        Things I've built, broken and rebuilt — mostly out in the open.
      </p>

      <div class="mt-10 grid gap-5 sm:grid-cols-2">
        @for (project of projects; track project.name; let i = $index) {
          <article
            [appReveal]="(i % 2) * 0.05"
            class="group flex flex-col rounded-card border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-brand-400"
            [class.sm:col-span-2]="project.featured"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-semibold">{{ project.name }}</h3>
                <p class="mt-0.5 font-mono text-xs text-brand-400">
                  {{ project.tagline }}
                </p>
              </div>
            </div>
            <p class="mt-3 flex-1 text-[var(--text-soft)]">
              {{ project.description }}
            </p>
            <ul class="mt-4 flex flex-wrap gap-2">
              @for (tech of project.stack; track tech) {
                <li
                  class="rounded-full bg-[var(--bg-soft)] px-2.5 py-1 font-mono text-xs text-[var(--text-soft)]"
                >
                  {{ tech }}
                </li>
              }
            </ul>
            <div class="mt-5 flex flex-wrap gap-4">
              @for (link of project.links; track link.href) {
                <a
                  [href]="link.href"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 text-sm font-medium text-[var(--text)] transition-colors hover:text-brand-400"
                >
                  {{ link.label }}
                  <ng-icon name="bootstrapArrowUpRight" size="14" />
                </a>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
