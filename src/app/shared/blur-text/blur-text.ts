import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-blur-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full' },
  templateUrl: './blur-text.html',
})
export class BlurText {
  readonly text = input.required<string>();
  readonly animateBy = input<'words' | 'letters'>('words');
  readonly direction = input<'top' | 'bottom'>('top');
  readonly delay = input(80);
  readonly wrap = input(true);

  private readonly platformId = inject(PLATFORM_ID);
  protected readonly shown = signal(!isPlatformBrowser(this.platformId));

  protected readonly segments = computed(() => {
    const by = this.animateBy();
    const parts = by === 'words' ? this.text().split(' ') : [...this.text()];
    return parts.map((value, i) => ({
      value,
      space: by === 'words' && i < parts.length - 1,
    }));
  });

  protected readonly offset = computed(() =>
    this.direction() === 'top' ? 'translateY(-20px)' : 'translateY(20px)',
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.shown.set(true));
    }
  }
}
