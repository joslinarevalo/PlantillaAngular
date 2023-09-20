import { TestBed } from '@angular/core/testing';

import { ConsPlantaService } from './cons-planta.service';

describe('ConsPlantaService', () => {
  let service: ConsPlantaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsPlantaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
