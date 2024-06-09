import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiariesService, RegisterDiary } from '../diaries.service';

@Component({
  selector: 'app-diary-register',
  standalone: true,
  templateUrl: './diaries-register.component.html',
  styleUrl: './diaries-register.component.css',
  imports: [NgFor, ReactiveFormsModule],
})
export class DiariesRegisterComponent implements OnInit {
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
    private diariesService: DiariesService) {
      this.registerDiaryForm;
      this.userId = Number(this.route.snapshot.params['userId']);
  }
  
  ngOnInit(): void {
    this.title = "日記登録";
  }

  onRegisterDiary(form: any) {
    let diaryTitle = form.diaryTitle;
    let diaryContent = form.diaryContent;

    var registerDiary: RegisterDiary = new RegisterDiary();
    registerDiary.userId = Number(localStorage.getItem("loginUserId"));
    registerDiary.diaryTitle = diaryTitle;
    registerDiary.diaryContent = diaryContent;

    this.diariesService.registerDiary(registerDiary)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
