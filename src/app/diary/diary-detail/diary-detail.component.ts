import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-diary-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './diary-detail.component.html',
  styleUrl: './diary-detail.component.css'
})
export class DiaryDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: any;
  diaryId!: any;
  diaryTitle!: string;
  diaryContent!: string;
  createdAt!: string;

  constructor(
    private router: Router,
    private diaryService: DiaryService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.userId = Number(localStorage.getItem("loginUserId"));
    this.diaryId = Number(this.route.snapshot.params['diaryId']);
  }
  
  ngOnInit(): void {
    this.title = "日記詳細画面";
    this.getDiary();
  }

  /**
   * 指定された日記情報取得.
   */
  getDiary() {
    console.log(this.userId, this.diaryId);
    this.diaryService.getDiary(this.userId, this.diaryId)
      .subscribe(res => {
        this.diaryTitle = res.diaryTitle;
        this.diaryContent = res.diaryContent;
        this.createdAt = res.createdAt;
      });
  }
}
