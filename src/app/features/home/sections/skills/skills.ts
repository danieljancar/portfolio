import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowRepeat } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SKILLS } from '../../../../data/skills.data';
import { SkillsPhysics } from './skills.physics';

@Component({
  selector: 'app-skills',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapArrowRepeat })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly skills = SKILLS;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly boxRef = viewChild.required<ElementRef<HTMLElement>>('box');

  private readonly physics = new SkillsPhysics();

  constructor() {
    afterNextRender(() => this.init());
  }

  protected shake(): void {
    this.physics.shake();
  }

  private init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const box = this.boxRef().nativeElement;
    this.physics.setBounds(box.clientWidth, box.clientHeight);

    for (const el of box.querySelectorAll<HTMLElement>('[data-skill]')) {
      el.style.position = 'absolute';
      el.style.left = '0';
      el.style.top = '0';
      const body = this.physics.add(el, el.offsetWidth, el.offsetHeight);
      el.style.transform = `translate(${body.x}px, ${body.y}px)`;
    }

    this.attachPointer(box);

    const observer = new ResizeObserver(() =>
      this.physics.setBounds(box.clientWidth, box.clientHeight),
    );
    observer.observe(box);

    let last = performance.now();
    let frame = 0;
    let running = true;

    const loop = (now: number) => {
      if (!running) {
        return;
      }
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      this.physics.step(dt);
      this.render();
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    frame = requestAnimationFrame(loop);

    this.destroyRef.onDestroy(() => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    });
  }

  private render(): void {
    for (const b of this.physics.bodies) {
      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    }
  }

  private attachPointer(box: HTMLElement): void {
    const toLocal = (e: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest('[data-skill]');
      const body = this.physics.bodyForElement(target);
      if (!body) {
        return;
      }
      const p = toLocal(e);
      this.physics.grab(body, p.x, p.y);
      box.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      this.physics.movePointer(p.x, p.y);
    };

    const onUp = (e: PointerEvent) => {
      this.physics.release();
      if (box.hasPointerCapture(e.pointerId)) {
        box.releasePointerCapture(e.pointerId);
      }
    };

    const onLeave = () => this.physics.clearPointer();

    box.addEventListener('pointerdown', onDown);
    box.addEventListener('pointermove', onMove);
    box.addEventListener('pointerup', onUp);
    box.addEventListener('pointercancel', onUp);
    box.addEventListener('pointerleave', onLeave);

    this.destroyRef.onDestroy(() => {
      box.removeEventListener('pointerdown', onDown);
      box.removeEventListener('pointermove', onMove);
      box.removeEventListener('pointerup', onUp);
      box.removeEventListener('pointercancel', onUp);
      box.removeEventListener('pointerleave', onLeave);
    });
  }
}
