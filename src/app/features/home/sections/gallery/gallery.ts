import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapXLg,
  bootstrapChevronLeft,
  bootstrapChevronRight,
} from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { GALLERY } from '../../../../data/gallery.data';

@Component({
  selector: 'app-gallery',
  imports: [NgIcon, RevealDirective],
  providers: [
    provideIcons({ bootstrapXLg, bootstrapChevronLeft, bootstrapChevronRight }),
  ],
  host: {
    '(document:keydown.escape)': 'close()',
    '(document:keydown.arrowright)': 'onArrow($event, 1)',
    '(document:keydown.arrowleft)': 'onArrow($event, -1)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.html',
})
export class Gallery {
  protected readonly photos = GALLERY;
  private readonly index = signal<number | null>(null);

  protected readonly active = computed(() => {
    const i = this.index();
    return i === null ? null : this.photos[i];
  });

  protected open(i: number): void {
    this.index.set(i);
  }

  protected close(): void {
    this.index.set(null);
  }

  protected next(): void {
    this.index.update(i => (i === null ? null : (i + 1) % this.photos.length));
  }

  protected prev(): void {
    this.index.update(i =>
      i === null ? null : (i - 1 + this.photos.length) % this.photos.length,
    );
  }

  protected onArrow(event: Event, dir: 1 | -1): void {
    if (this.index() === null) {
      return;
    }
    event.preventDefault();
    dir === 1 ? this.next() : this.prev();
  }
}
