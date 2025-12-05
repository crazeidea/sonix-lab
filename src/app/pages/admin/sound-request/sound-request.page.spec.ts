import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundRequestPage } from './sound-request.page';

describe('SoundRequestPage', () => {
  let component: SoundRequestPage;
  let fixture: ComponentFixture<SoundRequestPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundRequestPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
