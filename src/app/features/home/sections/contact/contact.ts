import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapEnvelope } from '@ng-icons/bootstrap-icons';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { EMAIL } from '../../../../data/socials.data';

@Component({
  selector: 'app-contact',
  imports: [NgIcon, RevealDirective],
  providers: [provideIcons({ bootstrapEnvelope })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly email = EMAIL;
}
