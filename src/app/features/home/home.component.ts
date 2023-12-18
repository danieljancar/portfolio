import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, AboutMeComponent, LatestBlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
