import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapStackOverflow,
} from '@ng-icons/bootstrap-icons';
import { simpleDevdotto } from '@ng-icons/simple-icons';
import { EMAIL, SOCIALS } from '../../data/socials.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      bootstrapGithub,
      bootstrapLinkedin,
      bootstrapStackOverflow,
      simpleDevdotto,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly socials = SOCIALS;
  protected readonly email = EMAIL;
  protected readonly year = new Date().getFullYear();
}
