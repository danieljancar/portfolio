import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, AboutMeComponent, LatestBlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.titleService.setTitle(`Daniel Jancar - Passionate Software Developer`);
    this.metaService.updateTag({
      name: 'description',
      content: `I'm a passionate developer and tech enthusiast. Find some of my blog posts here about many different topics.`,
    });
  }
}
