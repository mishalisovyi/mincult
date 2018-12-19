import { TestBed } from '@angular/core/testing';

import { MovedValuesService } from './moved-values.service';

describe('MovedValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovedValuesService = TestBed.get(MovedValuesService);
    expect(service).toBeTruthy();
  });
});
