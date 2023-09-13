/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagInicioUserComponent } from './pagInicioUser.component';

describe('PagInicioUserComponent', () => {
  let component: PagInicioUserComponent;
  let fixture: ComponentFixture<PagInicioUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagInicioUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagInicioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
