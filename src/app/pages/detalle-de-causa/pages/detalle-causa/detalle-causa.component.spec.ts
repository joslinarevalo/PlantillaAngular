import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCausaComponent } from './detalle-causa.component';

describe('DetalleCausaComponent', () => {
  let component: DetalleCausaComponent;
  let fixture: ComponentFixture<DetalleCausaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCausaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
