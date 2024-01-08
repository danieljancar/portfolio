import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFooterComponent } from './legal-footer.component';

describe('LegalFooterComponent', () => {
  let component: LegalFooterComponent;
  let fixture: ComponentFixture<LegalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
