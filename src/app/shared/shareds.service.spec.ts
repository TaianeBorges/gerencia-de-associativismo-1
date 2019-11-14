import { TestBed } from '@angular/core/testing';

import { SharedsService } from './shareds.service';

describe('SharedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedsService = TestBed.get(SharedsService);
    expect(service).toBeTruthy();
  });
});
