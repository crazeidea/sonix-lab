import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBg } from './hero-bg';

describe('HeroBg', () => {
  let component: HeroBg;
  let fixture: ComponentFixture<HeroBg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
