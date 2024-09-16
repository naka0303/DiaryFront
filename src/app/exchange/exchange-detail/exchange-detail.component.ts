import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Diary } from '../../diary/diary';
import { DiaryService } from '../../diary/diary.service';
import { RegisterComment } from '../Comment';
import { ExchangeService } from '../exchange.service';
import { RegisterReply } from '../Reply';

@Component({
  selector: 'app-exchange-detail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgFor],
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
  replyComment!: string;
  registeredComments!: any;
  replyFlg = false;
  commentId!: any;

  registerCommentForm = new FormGroup({
    comment: new FormControl('')
  });
  registerReplyForm = new FormGroup({
    replyComment: new FormControl('')
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
    this.onFindComments();
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
   * 返信するかどうかの切り替え.
   */
  switchReplyFlg(commentId: number) {
    if (this.replyFlg) {
      this.replyFlg = false;
      this.commentId = null;
    } else {
      this.replyFlg = true;
      this.commentId = commentId;
    }
  }

  /**
   * 指定された日記のコメント取得
   * @param diaryId 
   */
  onFindComments() {
    this.exchangeService.findComments(this.diaryId).subscribe(res => {
      this.registeredComments = res;
    });
  }

  /**
   * コメント投稿.
   * @param form 
   */
  onRegisterComment(form: any) {
    let comment = form.comment;

    var registerComment: RegisterComment = new RegisterComment();
    registerComment.commentFrom = this.userId;
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

  /**
   * コメント返信.
   * @param form 
   */
  onRegisterReply(form: any) {
    let replyComment = form.replyComment;

    var registerReply: RegisterReply = new RegisterReply();
    registerReply.replyFrom = this.userId;
    registerReply.replyComment = replyComment;

    this.exchangeService.registerReply(this.diaryId, this.commentId, registerReply)
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
