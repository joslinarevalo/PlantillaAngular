/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaUserComponent } from './tablaUser.component';

describe('TablaUserComponent', () => {
  let component: TablaUserComponent;
  let fixture: ComponentFixture<TablaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
