import { TestBed } from '@angular/core/testing';

import { MissedValuesService } from './missed-values.service';

describe('MissedValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissedValuesService = TestBed.get(MissedValuesService);
    expect(service).toBeTruthy();
  });
});
