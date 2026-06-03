import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDown, bootstrapGeoAlt } from '@ng-icons/bootstrap-icons';
import { EMAIL } from '../../../../data/socials.data';
import { HeroCanvas } from '../hero-canvas/hero-canvas';
import { BlurText } from '../../../../shared/blur-text/blur-text';
import { GooeyText } from '../../../../shared/gooey-text/gooey-text';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, NgIcon, HeroCanvas, BlurText, GooeyText],
  providers: [provideIcons({ bootstrapArrowDown, bootstrapGeoAlt })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly email = EMAIL;
  protected readonly morphWords = [
    'end-to-end',
    'full-stack',
    'from scratch',
    'with care',
  ];
}
