import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryContentDetailComponent } from './diary-content-detail.component';

describe('DiaryContentDetailComponent', () => {
  let component: DiaryContentDetailComponent;
  let fixture: ComponentFixture<DiaryContentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryContentDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaryContentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
