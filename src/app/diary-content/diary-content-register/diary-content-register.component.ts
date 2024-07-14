import { NgFor } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryContentService, RegisterDiary } from '../diary-content.service';
import { LoginUtil } from '../../utils/login-util';

@Component({
  selector: 'app-diary-register',
  standalone: true,
  templateUrl: './diary-content-register.component.html',
  styleUrl: './diary-content-register.component.css',
  imports: [NgFor, ReactiveFormsModule],
})
export class DiaryContentRegisterComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: any;
  diaryTitle!: string;
  diaryContent!: string;

  registerDiaryForm = new FormGroup({
    diaryTitle: new FormControl(''),
    diaryContent: new FormControl('')
  });

  constructor(
    private diaryContentService: DiaryContentService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) {
      this.registerDiaryForm;
      this.userId = Number(this.route.snapshot.params['userId']);
  }
  
  ngOnInit(): void {
    LoginUtil.checkLogin(this.platformId, this.router, '/diary-content-register');
    this.title = "日記登録";
  }

  onRegisterDiary(form: any) {
    let diaryTitle = form.diaryTitle;
    let diaryContent = form.diaryContent;

    var registerDiary: RegisterDiary = new RegisterDiary();
    registerDiary.userId = Number(localStorage.getItem("loginUserId"));
    registerDiary.diaryTitle = diaryTitle;
    registerDiary.diaryContent = diaryContent;

    this.diaryContentService.registerDiaryContent(registerDiary)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
