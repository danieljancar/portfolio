import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapConeStriped } from '@ng-icons/bootstrap-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({ bootstrapConeStriped })],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  public mdFile: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.mdFile = this.route.snapshot.paramMap.get('blogId');
  }
}
