import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { ExperienceSection } from './sections/experience';
import { Projects } from './sections/projects';
import { Gallery } from './sections/gallery';
import { Contact } from './sections/contact';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-home',
  imports: [Hero, About, ExperienceSection, Projects, Gallery, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-experience />
    <app-projects />
    <app-gallery />
    <app-contact />
  `,
})
export class Home {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Daniel Jancar — Software Developer',
      description:
        'Daniel Jancar is a software developer from Lucerne, Switzerland — a generalist who works across the stack, builds his own apps, and teaches kids to code.',
      path: '/',
    });
  }
}
