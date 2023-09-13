import { TestBed } from '@angular/core/testing';

import { TipoplantaService } from './tipoplanta.service';

describe('TipoplantaService', () => {
  let service: TipoplantaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoplantaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
