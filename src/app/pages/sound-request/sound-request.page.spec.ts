import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPage } from './flight.page';

describe('FlightPage', () => {
  let component: FlightPage;
  let fixture: ComponentFixture<FlightPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
