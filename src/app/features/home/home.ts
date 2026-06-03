import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Experience } from './sections/experience/experience';
import { Skills } from './sections/skills/skills';
import { Projects } from './sections/projects/projects';
import { Gallery } from './sections/gallery/gallery';
import { Contact } from './sections/contact/contact';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    About,
    Experience,
    Skills,
    Projects,
    Gallery,
    Contact,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-experience />
    <app-skills />
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
        'Daniel Jancar is a software developer from Lucerne, Switzerland. A generalist who works across the stack, builds his own apps, and teaches kids to code.',
      path: '/',
    });
  }
}
