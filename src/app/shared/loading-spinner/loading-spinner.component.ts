import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true,
})
export class LoadingSpinnerComponent {
  @Input() size: string = 'lg';
  @Input() marginTop: string = '0';
  @Input() marginBottom: string = '0';
}
