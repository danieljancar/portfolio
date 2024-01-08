import { Component, Input } from '@angular/core';
import { Legal } from '../../../../types/legal.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RelativeTimePipe } from '../../../../pipes/relative-time.pipe';
import {
  bootstrapClock,
  bootstrapClockHistory,
  bootstrapFiles,
  bootstrapPencilSquare,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-legal-footer',
  standalone: true,
  imports: [NgIcon, RelativeTimePipe],
  templateUrl: './legal-footer.component.html',
  viewProviders: [
    provideIcons({
      bootstrapClock,
      bootstrapClockHistory,
      bootstrapFiles,
      bootstrapPencilSquare,
    }),
  ],
  styleUrl: './legal-footer.component.scss',
})
export class LegalFooterComponent {
  @Input() legal: Legal | undefined;
  public readonly legalFileBaseUrl: string =
    'https://github.com/danieljancar/portfolio/tree/develop/src/assets/legal/content/';
}
