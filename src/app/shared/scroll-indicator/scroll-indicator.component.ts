import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-indicator',
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss'],
  standalone: true,
})
export class ScrollIndicatorComponent implements OnInit {
  scrollWidth = '0%';

  ngOnInit(): void {
    this.updateScrollWidth();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateScrollWidth();
  }

  private updateScrollWidth(): void {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled: number = (scrollTop / height) * 100;
    this.scrollWidth = scrolled + '%';
  }
}
