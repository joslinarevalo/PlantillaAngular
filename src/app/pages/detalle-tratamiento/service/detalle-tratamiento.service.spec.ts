import { TestBed } from '@angular/core/testing';

import { DetalleTratamientoService } from './detalle-tratamiento.service';

describe('DetalleTratamientoService', () => {
  let service: DetalleTratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleTratamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
