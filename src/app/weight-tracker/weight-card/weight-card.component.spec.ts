import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightCardComponent } from './weight-card.component';

describe('WeightCardComponent', () => {
  let component: WeightCardComponent;
  let fixture: ComponentFixture<WeightCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
