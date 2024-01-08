import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapConeStriped } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-legal-overview',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './legal-overview.component.html',
  styleUrl: './legal-overview.component.scss',
  viewProviders: [provideIcons({ bootstrapConeStriped })],
})
export class LegalOverviewComponent {}
