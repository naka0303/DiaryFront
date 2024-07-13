import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiaryContentService } from '../diary-content.service';

@Component({
  selector: 'app-diary-content-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './diary-content-detail.component.html',
  styleUrl: './diary-content-detail.component.css'
})
export class DiaryContentDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  diaryId!: number;
  contentId!: number;
  diaryTitle!: string;
  diaryContent!: string;
  createdAt!: string;

  constructor(
    private router: Router,
    private diaryContentService: DiaryContentService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.contentId = Number(this.route.snapshot.params['contentId']);
  }
  
  ngOnInit(): void {
    this.title = "日記記事詳細画面";
    this.getDiaryContentByContentId();
  }

  /**
   * 指定された日記記事IDに紐づく日記記事習得
   */
  getDiaryContentByContentId() {
    this.diaryContentService.getDiaryContentByContentId(this.contentId)
      .subscribe(res => {
        this.diaryTitle = res.diaryTitle;
        this.diaryContent = res.diaryContent;
        this.createdAt = res.createdAt;
      });
  }
}
