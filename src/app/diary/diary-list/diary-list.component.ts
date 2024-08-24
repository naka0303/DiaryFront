import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, NgModule, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { DiaryService } from '../diary.service';
import { UsersService } from '../../user/user.service';

import { LoginUtil } from '../../utils/login-util';
import { Diary } from '../diary';
@Component({
  selector: 'app-diary-content-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './diary-list.component.html',
  styleUrl: './diary-list.component.css'
})
export class DiaryListComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredContents!: any;
  registeredDiary!: any;
  userId!: any;
  diaryId!: any;

  constructor(
    private diaryService: DiaryService,
    private usersService: UsersService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {
    LoginUtil.checkLogin(this.platformId, this.router, '/diary-list');

    this.title = "日記一覧表示画面";

    if (isPlatformBrowser(this.platformId)) {
      this.userId = Number(localStorage.getItem("loginUserId"));
      this.getUser(this.userId);
      setTimeout(() => {
        this.getDiaries();
      }, 1000);
    }
  }

  /**
   * 特定ユーザー情報取得
   * @param userId ユーザーID
   */
  getUser(userId: number): void {
    this.usersService.getUser(userId)
      .subscribe(res => {
        this.diaryId = res.diaryId;
    });
  }

  /**
   * 指定されたユーザーに紐づく日記情報取得.
   */
  getDiaries(): void {
    this.diaryService.getDiaries(this.userId)
      .subscribe((res: Diary) => {
        this.registeredDiary = res;
      });
  }
}
