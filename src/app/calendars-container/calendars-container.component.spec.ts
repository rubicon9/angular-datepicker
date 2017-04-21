import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarsContainerComponent } from './calendars-container.component';

describe('CalendarsContainerComponent', () => {
  let component: CalendarsContainerComponent;
  let fixture: ComponentFixture<CalendarsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
