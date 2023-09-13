import { TestBed } from '@angular/core/testing';

import { ConsEnfermedadService } from './cons-enfermedad.service';

describe('ConsEnfermedadService', () => {
  let service: ConsEnfermedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsEnfermedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
