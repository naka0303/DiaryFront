import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Diary } from '../../diary/diary';
import { DiaryService } from '../../diary/diary.service';
import { ExchangeService } from '../exchange.service';
import { RegisterReply } from '../Reply';
import { RegisterComment } from '../Comment';

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
  content!: string;
  registeredCommentsReplies!: any;
  replyFlg = false;
  commentNo!: any;
  replyNo!: any;
  comments: any = [];
  replies: any = [];

  registerCommentForm = new FormGroup({
    content: new FormControl('')
  });
  registerReplyForm = new FormGroup({
    content: new FormControl('')
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
  switchReplyFlg(commentNo: any, replyNo: any) {
    if (this.replyFlg) {
      this.replyFlg = false;
      this.commentNo = null;
    } else {
      this.replyFlg = true;
      this.commentNo = commentNo;
    }
  }

  /**
   * 指定された日記のコメントと返信を取得.
   * @param diaryId 日記ID
   */
  onFindComments() {
    this.exchangeService.findCommentsReplies(this.diaryId).subscribe(res => {
      this.registeredCommentsReplies = res;

      for (let commentReply of this.registeredCommentsReplies) {
        if (commentReply.commentNo != null) {
          this.comments.push(commentReply);
        } else {
          this.replies.push(commentReply);
        }
      }
    });
  }

  /**
   * コメント投稿.
   * @param form 
   */
  onRegisterComment(form: any) {
    let content = form.content;

    var registerComment: RegisterComment = new RegisterComment();
    registerComment.commentFrom = this.userId;
    registerComment.content = content;

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
    let content = form.content;

    var registerReply: RegisterReply = new RegisterReply();
    registerReply.replyFrom = this.userId;
    registerReply.replyTo = this.commentNo;
    registerReply.content = content;

    this.exchangeService.registerReply(this.diaryId, this.commentNo, registerReply)
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
