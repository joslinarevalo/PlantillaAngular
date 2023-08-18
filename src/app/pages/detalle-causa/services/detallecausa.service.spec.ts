/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetallecausaService } from './detallecausa.service';

describe('Service: Detallecausa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetallecausaService]
    });
  });

  it('should ...', inject([DetallecausaService], (service: DetallecausaService) => {
    expect(service).toBeTruthy();
  }));
});
