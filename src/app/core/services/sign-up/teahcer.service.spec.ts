import {TestBed} from '@angular/core/testing';

import {TeahcerService} from './teahcer.service';

describe('TeahcerService', () => {
  let service: TeahcerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeahcerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
