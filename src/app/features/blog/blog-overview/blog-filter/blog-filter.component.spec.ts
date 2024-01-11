import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFilterComponent } from './blog-filter.component';

describe('BlogFilterComponent', () => {
  let component: BlogFilterComponent;
  let fixture: ComponentFixture<BlogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
