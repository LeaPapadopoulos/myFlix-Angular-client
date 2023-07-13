import { TestBed } from '@angular/core/testing';

import { apiService } from './fetch-api-data.service';

describe('apiService', () => {
  let service: apiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(apiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
