import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapConeStriped } from '@ng-icons/bootstrap-icons';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-overview',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './legal-overview.component.html',
  styleUrl: './legal-overview.component.scss',
  viewProviders: [provideIcons({ bootstrapConeStriped })],
})
export class LegalOverviewComponent {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.titleService.setTitle(`Daniel Jancar - Legal`);
    this.metaService.updateTag({
      name: 'description',
      content: `Legal information about this website.`,
    });
  }
}
