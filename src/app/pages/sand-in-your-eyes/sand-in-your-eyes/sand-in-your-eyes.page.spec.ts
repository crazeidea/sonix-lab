import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandInYourEyesPage } from './sand-in-your-eyes.page';

describe('SandInYourEyesPage', () => {
  let component: SandInYourEyesPage;
  let fixture: ComponentFixture<SandInYourEyesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandInYourEyesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandInYourEyesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
