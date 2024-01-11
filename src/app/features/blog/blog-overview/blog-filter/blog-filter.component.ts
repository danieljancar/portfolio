import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-blog-filter',
  standalone: true,
  imports: [],
  templateUrl: './blog-filter.component.html',
  styleUrl: './blog-filter.component.scss',
})
export class BlogFilterComponent {
  @Output() filterChanged = new EventEmitter<string>();
  currentFilter: string = 'latest';

  applyFilter(filter: string) {
    this.filterChanged.emit(filter);
    this.currentFilter = filter;
  }
}
