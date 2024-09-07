import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryRegisterComponent } from './diary-register.component';

describe('DiaryRegisterComponent', () => {
  let component: DiaryRegisterComponent;
  let fixture: ComponentFixture<DiaryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DiaryRegisterComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
