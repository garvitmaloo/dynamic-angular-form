import { TestBed } from '@angular/core/testing';

import { EmployeeDetailsFormService } from './employee-details-form.service';

describe('EmployeeDetailsFormService', () => {
  let service: EmployeeDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDetailsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
