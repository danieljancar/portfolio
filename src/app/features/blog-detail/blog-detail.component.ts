import {Component} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {bootstrapConeStriped} from "@ng-icons/bootstrap-icons";

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({bootstrapConeStriped})
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
}
