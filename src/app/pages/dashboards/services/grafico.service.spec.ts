/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GraficoService } from './grafico.service';

describe('Service: Grafico', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraficoService]
    });
  });

  it('should ...', inject([GraficoService], (service: GraficoService) => {
    expect(service).toBeTruthy();
  }));
});
