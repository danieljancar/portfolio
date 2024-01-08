import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMarkdownRendererComponent } from './blog-markdown-renderer.component';

describe('MarkdownRendererComponent', () => {
  let component: BlogMarkdownRendererComponent;
  let fixture: ComponentFixture<BlogMarkdownRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogMarkdownRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogMarkdownRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
