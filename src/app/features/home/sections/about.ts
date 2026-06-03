import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="about"
      class="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 md:px-8"
    >
      <h2 [appReveal]="0" class="font-mono text-sm text-brand-400">About</h2>
      <div
        [appReveal]="0.05"
        class="mt-4 space-y-5 text-lg text-[var(--text-soft)]"
      >
        <p>
          I'm a generalist at heart. I'd rather understand a whole system than
          one slice of it, so I tend to follow a problem wherever it leads —
          frontend, backend, the database, the build, whatever it takes to get
          something working.
        </p>
        <p>
          Right now I'm learning the craft on real banking software at Luzerner
          Kantonalbank, building my own app
          <span class="text-[var(--text)]">Cranny</span> on the side, and
          teaching kids how computers work. Different worlds, same thing I love:
          figuring things out and bringing people along.
        </p>
        <p>
          When I'm not at a keyboard you'll probably find me out with a camera,
          or behind the counter at a restaurant on the weekend.
        </p>
      </div>
    </section>
  `,
})
export class About {}
