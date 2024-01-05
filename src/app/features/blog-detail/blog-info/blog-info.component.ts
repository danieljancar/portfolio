import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapBook,
  bootstrapBoxArrowUpRight,
  bootstrapBrush,
  bootstrapClock,
  bootstrapGithub,
  bootstrapImage,
  bootstrapLink45deg,
  bootstrapPerson,
  bootstrapRobot,
} from '@ng-icons/bootstrap-icons';
import { Blog } from '../../../types/blog.type';
import { Author } from '../../../types/author.type';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { simpleStackblitz } from '@ng-icons/simple-icons';
import { DefaultImageService } from '../../../core/default-image.service';

@Component({
  selector: 'app-blog-info',
  standalone: true,
  imports: [DatePipe, NgIcon, RelativeTimePipe],
  viewProviders: [
    provideIcons({
      bootstrapBoxArrowUpRight,
      bootstrapRobot,
      bootstrapBook,
      bootstrapClock,
      bootstrapPerson,
      bootstrapBrush,
      bootstrapGithub,
      bootstrapLink45deg,
      bootstrapImage,
      simpleStackblitz,
    }),
  ],
  templateUrl: './blog-info.component.html',
  styleUrl: './blog-info.component.scss',
})
export class BlogInfoComponent {
  @Input() public blog: Blog | undefined;
  @Input() public author: Author | undefined;
  public defaultImageShown = false;
  protected readonly encodeURIComponent = encodeURIComponent;

  constructor(private defaultImageService: DefaultImageService) {
    window.scrollTo(0, 0);
  }

  setDefaultImage(event: Event) {
    this.defaultImageService.setDefaultImage(event);
    this.defaultImageShown = true;
  }
}
