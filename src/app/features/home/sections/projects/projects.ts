import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowUpRight } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { PROJECTS } from '../../../../data/projects.data';

@Component({
  selector: 'app-projects',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapArrowUpRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECTS;
}
