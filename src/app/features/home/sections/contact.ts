import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapStackOverflow,
  bootstrapEnvelope,
} from '@ng-icons/bootstrap-icons';
import { simpleDevdotto } from '@ng-icons/simple-icons';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { EMAIL, SOCIALS } from '../../../data/socials.data';

@Component({
  selector: 'app-contact',
  imports: [NgIcon, RevealDirective],
  providers: [
    provideIcons({
      bootstrapGithub,
      bootstrapLinkedin,
      bootstrapStackOverflow,
      bootstrapEnvelope,
      simpleDevdotto,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="contact"
      class="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 text-center md:px-8"
    >
      <h2 [appReveal]="0" class="font-mono text-sm text-brand-400">Contact</h2>
      <p
        [appReveal]="0.05"
        class="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Let's build something, or just say hi.
      </p>
      <p
        [appReveal]="0.1"
        class="mx-auto mt-4 max-w-lg text-[var(--text-soft)]"
      >
        Got an idea, a question, or want to collaborate? My inbox is always
        open.
      </p>

      <div [appReveal]="0.15" class="mt-8 flex flex-col items-center gap-6">
        <a
          [href]="'mailto:' + email"
          class="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-400"
        >
          <ng-icon name="bootstrapEnvelope" size="18" />
          {{ email }}
        </a>
        <div class="flex items-center gap-5">
          @for (social of socials; track social.href) {
            <a
              [href]="social.href"
              target="_blank"
              rel="noopener"
              [attr.aria-label]="social.label"
              class="text-[var(--text-soft)] transition-colors hover:text-brand-400"
            >
              <ng-icon [name]="social.icon" size="22" />
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly email = EMAIL;
  protected readonly socials = SOCIALS;
}
