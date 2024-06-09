import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiariesRegisterComponent } from './diaries-register.component';

describe('DiariesRegisterComponent', () => {
  let component: DiariesRegisterComponent;
  let fixture: ComponentFixture<DiariesRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiariesRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiariesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
