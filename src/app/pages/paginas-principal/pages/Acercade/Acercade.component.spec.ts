/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcercadeComponent } from './Acercade.component';

describe('AcercadeComponent', () => {
  let component: AcercadeComponent;
  let fixture: ComponentFixture<AcercadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
