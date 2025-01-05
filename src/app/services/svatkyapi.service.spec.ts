import { TestBed } from '@angular/core/testing';

import { SvatkyapiService } from './svatkyapi.service';

describe('SvatkyapiService', () => {
  let service: SvatkyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvatkyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// ionic generate service services/svatkyapi
