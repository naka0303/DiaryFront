import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, NgModule, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { DiaryContentService, DiaryContent, SearchDiaryRequest } from '../diary-content.service';
import { UsersService } from '../../users/users.service';
import { HttpParams, HttpParamsOptions } from '@angular/common/http';
@Component({
  selector: 'app-diary-content-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './diary-content-list.component.html',
  styleUrl: './diary-content-list.component.css'
})
export class DiaryContentListComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredContents!: any;
  registeredDiaryContents!: any;
  diaryId!: number;

  constructor(
    private diaryContentService: DiaryContentService,
    private usersService: UsersService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("loginUsername") !== null
          && localStorage.getItem("loginIsEnabled") !== null) {
        this.router.navigate(['diary-content-list']);
      } else {
        this.router.navigate(['login']);
        return;
      }
    }

    this.title = "日記一覧表示画面";
    const userId = localStorage.getItem("loginUserId");

    this.getUser(Number(userId));

    setTimeout(() => {
      this.getDiaryContentsByDiaryId();
    }, 1000);
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
   * 指定された日記IDに紐づく日記記事
   */
  getDiaryContentsByDiaryId(): void {

    const paramsOptions = <HttpParamsOptions>{fromObject: {'diaryId': 9}};
    const params = new HttpParams(paramsOptions);

    this.diaryContentService.getDiaryContentsByDiaryId(params)
      .subscribe((res: DiaryContent) => {
        this.registeredDiaryContents = res;
      });
  }
}
