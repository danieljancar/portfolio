import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDown, bootstrapGeoAlt } from '@ng-icons/bootstrap-icons';
import { EMAIL } from '../../../data/socials.data';
import { HeroCanvas } from './hero-canvas';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, NgIcon, HeroCanvas, ScrambleDirective],
  providers: [provideIcons({ bootstrapArrowDown, bootstrapGeoAlt })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center gap-12 overflow-hidden px-5 py-20 md:flex-row md:gap-16 md:px-8"
    >
      <app-hero-canvas />
      <div class="relative z-10 flex-1 text-center md:text-left">
        <p class="mb-4 font-mono text-sm text-brand-400">
          <span appScramble>Hi, I'm Daniel</span> 👋
        </p>
        <h1
          class="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          I build things end-to-end<br class="hidden sm:block" />
          and help people along the way.
        </h1>
        <p
          class="mx-auto mt-6 max-w-xl text-pretty text-lg text-[var(--text-soft)] md:mx-0"
        >
          A software developer who likes learning fast, working across the whole
          stack, and shipping things that feel good to use.
        </p>
        <p
          class="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-[var(--text-soft)]"
        >
          <ng-icon name="bootstrapGeoAlt" size="15" /> Lucerne, Switzerland
        </p>

        <div
          class="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
        >
          <a
            routerLink="/"
            fragment="projects"
            class="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-400"
          >
            See my work
          </a>
          <a
            [href]="'mailto:' + email"
            class="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div class="relative z-10 flex-shrink-0">
        <div
          class="relative size-56 overflow-hidden rounded-full border border-[var(--border)] shadow-xl sm:size-72"
        >
          <img
            src="assets/images/daniel-portrait.webp"
            alt="Daniel Jancar"
            class="size-full object-cover"
            width="288"
            height="288"
          />
        </div>
      </div>

      <a
        routerLink="/"
        fragment="about"
        aria-label="Scroll to about"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
      >
        <ng-icon name="bootstrapArrowDown" size="22" class="animate-bounce" />
      </a>
    </section>
  `,
})
export class Hero {
  protected readonly email = EMAIL;
}
