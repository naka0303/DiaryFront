import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryContentRegisterComponent } from './diary-content-register.component';

describe('DiaryContentRegisterComponent', () => {
  let component: DiaryContentRegisterComponent;
  let fixture: ComponentFixture<DiaryContentRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryContentRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaryContentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
