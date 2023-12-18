import { Component } from '@angular/core';
import { DateUtil } from '../../../utils/date.util';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  currentYear: number = Number(DateUtil.formatDate(new Date(), 'yyyy'));
  yearsOfExperience: number = this.currentYear - 2021;
}
