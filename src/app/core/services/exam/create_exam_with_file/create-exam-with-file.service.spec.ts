import { TestBed } from '@angular/core/testing';

import { CreateExamWithFileService } from './create-exam-with-file.service';

describe('CreateExamWithFileService', () => {
  let service: CreateExamWithFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateExamWithFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
