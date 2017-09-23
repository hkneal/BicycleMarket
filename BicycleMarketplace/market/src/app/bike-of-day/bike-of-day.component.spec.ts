import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeOfDayComponent } from './bike-of-day.component';

describe('BikeOfDayComponent', () => {
  let component: BikeOfDayComponent;
  let fixture: ComponentFixture<BikeOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
