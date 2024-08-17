import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryContentListComponent } from './diary-content-list.component';

describe('DiaryContentListComponent', () => {
  let component: DiaryContentListComponent;
  let fixture: ComponentFixture<DiaryContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryContentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaryContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
