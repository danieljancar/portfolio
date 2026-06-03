import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly delay = input(0, { alias: 'appReveal' });

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const node = this.el.nativeElement;
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduced) {
        return;
      }

      gsap.set(node, { opacity: 0, y: 24 });

      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              gsap.to(node, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: this.delay(),
                ease: 'power2.out',
              });
              observer.unobserve(node);
            }
          }
        },
        { threshold: 0.15 },
      );

      observer.observe(node);
    });
  }
}
