import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBoxArrowUpRight } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { EXPERIENCE } from '../../../../data/experience.data';

@Component({
  selector: 'app-experience',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapBoxArrowUpRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
})
export class Experience {
  protected readonly experience = EXPERIENCE;
}
