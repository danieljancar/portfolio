import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { renderGooeyStatic, startGooeyMorph } from './gooey-text.morph';

let uid = 0;

@Component({
  selector: 'app-gooey-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gooey-text.html',
})
export class GooeyText {
  readonly texts = input.required<string[]>();
  readonly morphTime = input(1);
  readonly cooldownTime = input(0.25);
  readonly textClass = input('');

  protected readonly filterId = `gooey-${uid++}`;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly text1 =
    viewChild.required<ElementRef<HTMLSpanElement>>('text1');
  private readonly text2 =
    viewChild.required<ElementRef<HTMLSpanElement>>('text2');

  constructor() {
    afterNextRender(() => this.run());
  }

  private run(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const elements = {
      current: this.text1().nativeElement,
      next: this.text2().nativeElement,
    };
    const words = this.texts();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderGooeyStatic(elements, words);
      return;
    }

    const stop = startGooeyMorph(
      elements,
      words,
      this.morphTime(),
      this.cooldownTime(),
    );
    this.destroyRef.onDestroy(stop);
  }
}
