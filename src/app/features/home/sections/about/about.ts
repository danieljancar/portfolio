import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { Experience } from '../experience/experience';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, Experience],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
})
export class About {}
