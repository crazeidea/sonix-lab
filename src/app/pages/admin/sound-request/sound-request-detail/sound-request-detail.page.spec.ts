import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundRequestDetailPage } from './sound-request-detail.page';

describe('SoundRequestDetailPage', () => {
  let component: SoundRequestDetailPage;
  let fixture: ComponentFixture<SoundRequestDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundRequestDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundRequestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
