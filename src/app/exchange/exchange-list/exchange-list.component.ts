import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginUtil } from '../../utils/login-util';
import { DiaryService } from '../../diary/diary.service';
import { Diary } from '../../diary/diary';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './exchange-list.component.html',
  styleUrl: './exchange-list.component.css'
})
export class ExchangeListComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredDiary!: any;
  userId!: any;
  diaryId!: any;
  successFlg!: boolean;
  
  constructor(
    private diaryService: DiaryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) {
  }
  
  ngOnInit(): void {
    LoginUtil.checkLogin(this.platformId, this.router, '/exchange-list');

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
      });
  }
}
