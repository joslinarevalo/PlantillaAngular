import { TestBed } from '@angular/core/testing';

import { DetalleCausaService } from './detalle-causa.service';

describe('DetalleCausaService', () => {
  let service: DetalleCausaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCausaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
