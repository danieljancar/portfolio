import { Component } from '@angular/core';
import { DateUtil } from '../../utils/date.util';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapLinkedin, bootstrapMedium,
  bootstrapStackOverflow,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapGithub,
      bootstrapLinkedin,
      bootstrapStackOverflow,
      bootstrapMedium
    }),
  ],
})
export class FooterComponent {
  public readonly currentYear: string = DateUtil.formatDate(new Date(), 'yyyy');
}
