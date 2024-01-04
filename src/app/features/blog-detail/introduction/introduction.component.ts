import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapBook,
  bootstrapBoxArrowUpRight,
  bootstrapBrush,
  bootstrapClock,
  bootstrapPerson,
  bootstrapRobot,
} from '@ng-icons/bootstrap-icons';
import { Blog } from '../../../types/blog.type';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../../types/author.type';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';

@Component({
  selector: 'app-introduction',
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
    }),
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
export class IntroductionComponent {
  @Input() public blog: Blog | undefined;
  @Input() public author: Author | undefined;
  protected readonly encodeURIComponent = encodeURIComponent;

  constructor(private route: ActivatedRoute) {
    window.scrollTo(0, 0);
  }
}
