/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerDetalleCComponent } from './VerDetalleC.component';

describe('VerDetalleCComponent', () => {
  let component: VerDetalleCComponent;
  let fixture: ComponentFixture<VerDetalleCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
