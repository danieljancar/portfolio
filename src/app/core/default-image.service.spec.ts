import { TestBed } from '@angular/core/testing';

import { DefaultImageService } from './default-image.service';

describe('DefaultImageService', () => {
  let service: DefaultImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
