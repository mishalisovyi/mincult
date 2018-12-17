import { TestBed } from '@angular/core/testing';

import { RegularValuesService } from './regular-values.service';

describe('RegularValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegularValuesService = TestBed.get(RegularValuesService);
    expect(service).toBeTruthy();
  });
});
