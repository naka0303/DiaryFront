import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiaryService } from '../diary.service';
import { LoginUtil } from '../../utils/login-util';
import { RegisterDiary } from '../diary';

@Component({
  selector: 'app-diary-register',
  standalone: true,
  templateUrl: './diary-register.component.html',
  styleUrl: './diary-register.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink]
})
export class DiaryRegisterComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: any;
  diaryTitle!: string;
  diaryContent!: string;
  successFlg!: boolean;

  registerDiaryForm = new FormGroup({
    diaryTitle: new FormControl(''),
    diaryContent: new FormControl('')
  });

  constructor(
    private diaryService: DiaryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) {
      this.registerDiaryForm;
      this.userId = Number(localStorage.getItem("loginUserId"));
  }
  
  ngOnInit(): void {
    this.successFlg = false;
    LoginUtil.checkLogin(this.platformId, this.router, '/diary-register');
    this.title = "日記登録";
  }

  onRegisterDiary(form: any) {
    let diaryTitle = form.diaryTitle;
    let diaryContent = form.diaryContent;

    var registerDiary: RegisterDiary = new RegisterDiary();
    registerDiary.diaryTitle = diaryTitle;
    registerDiary.diaryContent = diaryContent;

    this.diaryService.registerDiary(this.userId, registerDiary)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.successFlg = true;

          setTimeout(() => {
            if (this.successFlg) {
              this.router.navigate(['diary-list']);
            }
          }, 2000);
        }
      });
  }
}
