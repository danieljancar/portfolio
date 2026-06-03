import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/<>';

@Directive({
  selector: '[appScramble]',
})
export class ScrambleDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.run());
  }

  private run(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const node = this.el.nativeElement;
    const target = (node.textContent ?? '').trim();
    if (!target) {
      return;
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) {
      return;
    }

    const total = 28; // frames
    let frame = 0;
    let raf = 0;

    const tick = () => {
      const progress = frame / total;
      const revealed = Math.floor(progress * target.length);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        if (i < revealed || ch === ' ') {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      node.textContent = out;

      if (frame < total) {
        frame++;
        raf = requestAnimationFrame(tick);
      } else {
        node.textContent = target;
      }
    };

    raf = requestAnimationFrame(tick);
    this.destroyRef.onDestroy(() => cancelAnimationFrame(raf));
  }
}
