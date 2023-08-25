/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CausaenfermedadService } from './causaenfermedad.service';

describe('Service: Causaenfermedad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CausaenfermedadService]
    });
  });

  it('should ...', inject([CausaenfermedadService], (service: CausaenfermedadService) => {
    expect(service).toBeTruthy();
  }));
});
