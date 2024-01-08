import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapConeStriped } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './blog-overview.component.html',
  styleUrl: './blog-overview.component.scss',
  viewProviders: [provideIcons({ bootstrapConeStriped })],
})
export class BlogOverviewComponent {}
