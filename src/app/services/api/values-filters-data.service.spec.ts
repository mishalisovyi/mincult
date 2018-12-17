import { TestBed } from '@angular/core/testing';

import { ValuesFiltersDataService } from './values-filters-data.service';

describe('ValuesFiltersDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValuesFiltersDataService = TestBed.get(ValuesFiltersDataService);
    expect(service).toBeTruthy();
  });
});
