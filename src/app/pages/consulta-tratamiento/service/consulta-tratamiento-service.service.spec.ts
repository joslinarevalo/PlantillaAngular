import { TestBed } from '@angular/core/testing';

import { ConsultaTratamientoServiceService } from './consulta-tratamiento-service.service';

describe('ConsultaTratamientoServiceService', () => {
  let service: ConsultaTratamientoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaTratamientoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
