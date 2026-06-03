import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapList,
  bootstrapMoonStars,
  bootstrapSun,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { ThemeService } from '../../core/theme.service';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      bootstrapList,
      bootstrapXLg,
      bootstrapSun,
      bootstrapMoonStars,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md"
    >
      <nav
        class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          routerLink="/"
          class="font-mono text-sm font-semibold tracking-tight hover:text-brand-400"
        >
          daniel<span class="text-brand-400">.</span>jancar
        </a>

        <div class="hidden items-center gap-8 md:flex">
          @for (link of links; track link.href) {
            <a
              [routerLink]="['/']"
              [fragment]="link.href"
              class="text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
              >{{ link.label }}</a
            >
          }
          <a
            routerLink="/blog"
            class="text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
            >Blog</a
          >
          <button
            type="button"
            (click)="theme.toggle()"
            class="grid size-9 place-items-center rounded-full border border-[var(--border)] text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
            [attr.aria-label]="
              theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'
            "
          >
            <ng-icon
              [name]="theme.isDark() ? 'bootstrapSun' : 'bootstrapMoonStars'"
              size="18"
            />
          </button>
        </div>

        <button
          type="button"
          (click)="menuOpen.set(!menuOpen())"
          class="grid size-9 place-items-center rounded-full border border-[var(--border)] md:hidden"
          aria-label="Toggle menu"
        >
          <ng-icon
            [name]="menuOpen() ? 'bootstrapXLg' : 'bootstrapList'"
            size="20"
          />
        </button>
      </nav>

      @if (menuOpen()) {
        <div
          class="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 md:hidden"
        >
          <div class="flex flex-col gap-4">
            @for (link of links; track link.href) {
              <a
                [routerLink]="['/']"
                [fragment]="link.href"
                (click)="menuOpen.set(false)"
                class="text-sm text-[var(--text-soft)]"
                >{{ link.label }}</a
              >
            }
            <a
              routerLink="/blog"
              (click)="menuOpen.set(false)"
              class="text-sm text-[var(--text-soft)]"
              >Blog</a
            >
            <button
              type="button"
              (click)="theme.toggle()"
              class="flex items-center gap-2 text-sm text-[var(--text-soft)]"
            >
              <ng-icon
                [name]="theme.isDark() ? 'bootstrapSun' : 'bootstrapMoonStars'"
                size="18"
              />
              {{ theme.isDark() ? 'Light mode' : 'Dark mode' }}
            </button>
          </div>
        </div>
      }
    </header>
  `,
})
export class Navbar {
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  protected readonly links: NavLink[] = [
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'Gallery', href: 'gallery' },
  ];
}
