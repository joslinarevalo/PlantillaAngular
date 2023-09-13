import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoplantaComponent } from './tipoplanta.component';

describe('TipoplantaComponent', () => {
  let component: TipoplantaComponent;
  let fixture: ComponentFixture<TipoplantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoplantaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoplantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
