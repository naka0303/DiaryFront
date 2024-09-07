import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Diary } from '../../diary/diary';
import { DiaryService } from '../../diary/diary.service';
import { LoginUtil } from '../../utils/login-util';
import { RegisterComment } from '../Comment';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-exchange-detail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './exchange-detail.component.html',
  styleUrl: './exchange-detail.component.css'
})
export class ExchangeDetailComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredDiary!: any;
  userId!: any;
  diaryId!: any;
  successFlg!: boolean;
  diaryTitle!: string;
  diaryContent!: string;
  comment!: string;

  registerCommentForm = new FormGroup({
    comment: new FormControl('')
  });
  
  constructor(
    private diaryService: DiaryService,
    private exchangeService: ExchangeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) {
      this.userId = Number(localStorage.getItem("loginUserId"));
      this.diaryId = Number(this.route.snapshot.params['diaryId']);
  }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = Number(localStorage.getItem("loginUserId"));
      setTimeout(() => {
        this.getDiaries();
      }, 100);
    }
  }

  /**
   * 全ての日記情報取得.
   */
  getDiaries(): void {
    this.diaryService.getDiaries()
      .subscribe((res: Diary) => {
        this.registeredDiary = res;
        for (let diary of this.registeredDiary) {
          if (diary.diaryId === this.diaryId) {
            this.diaryTitle = diary.diaryTitle;
            this.diaryContent = diary.diaryContent;
          }
        }
      });
  }

  /**
   * コメント投稿.
   * @param form 
   */
  onRegisterComment(form: any) {
    let comment = form.comment;

    var registerComment: RegisterComment = new RegisterComment();
    registerComment.userId = this.userId;
    registerComment.comment = comment;

    this.exchangeService.registerComment(this.diaryId, registerComment)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.successFlg = true;

          setTimeout(() => {
            if (this.successFlg) {
              this.router.navigate(['exchange-list']);
            }
          }, 2000);
        }
      });
  }
}
