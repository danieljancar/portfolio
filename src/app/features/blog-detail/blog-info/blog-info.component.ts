import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapBook,
  bootstrapBoxArrowUpRight,
  bootstrapBrush,
  bootstrapClock,
  bootstrapGithub,
  bootstrapLink45deg,
  bootstrapPerson,
  bootstrapRobot,
} from '@ng-icons/bootstrap-icons';
import { Blog } from '../../../types/blog.type';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../../types/author.type';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';

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
    }),
  ],
  templateUrl: './blog-info.component.html',
  styleUrl: './blog-info.component.scss',
})
export class BlogInfoComponent {
  @Input() public blog: Blog | undefined;
  @Input() public author: Author | undefined;

  constructor(private route: ActivatedRoute) {
    window.scrollTo(0, 0);
  }
}
