import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTratamientoComponent } from './consulta-tratamiento.component';

describe('ConsultaTratamientoComponent', () => {
  let component: ConsultaTratamientoComponent;
  let fixture: ComponentFixture<ConsultaTratamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaTratamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
