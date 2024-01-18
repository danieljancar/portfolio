import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeftCircle } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-back-button',
  template: `
    <button
      (click)="backToLastPage()"
      class="flex items-center text-xl px-2 py-1 hover:opacity-75 transition ease-in-out duration-150"
    >
      <ng-icon name=" bootstrapArrowLeftCircle" class="mr-1 h-5 w-5" />
      {{ label }}
    </button>
  `,
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({ bootstrapArrowLeftCircle })],
})
export class BackButtonComponent {
  @Input() route: string = '/';
  @Input() label: string = 'Back';

  constructor(private router: Router) {}

  backToLastPage() {
    if (this.route && this.route !== '/') {
      this.router.navigate([this.route]);
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
