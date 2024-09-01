import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiaryService } from '../diary.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EditDiary } from '../diary';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-diary-detail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './diary-detail.component.html',
  styleUrl: './diary-detail.component.css'
})
export class DiaryDetailComponent implements OnInit {
  editDiaryForm!: FormGroup;
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: any;
  diaryId!: any;
  diaryTitle!: string;
  diaryContent!: string;
  createdAt!: string;
  successFlg!: boolean;

  constructor(
    private router: Router,
    private diaryService: DiaryService,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.userId = Number(localStorage.getItem("loginUserId"));
    this.diaryId = Number(this.route.snapshot.params['diaryId']);
  }
  
  ngOnInit(): void {
    this.successFlg = false;
    this.title = "日記詳細画面";
    this.getDiary();

    this.editDiaryForm = this.formBuilder.group({
      diaryTitle: ['', Validators.required],
      diaryContent: ['', Validators.required],
    });
  }

  get f() { return this.editDiaryForm.controls; }

  /**
   * 指定された日記情報取得.
   */
  getDiary() {
    this.diaryService.getDiary(this.userId, this.diaryId)
      .subscribe(res => {
        this.diaryTitle = res.diaryTitle;
        this.diaryContent = res.diaryContent;
        this.createdAt = res.createdAt;
      });
  }

  /**
   * 日記編集
   * @param form 
   */
  onEditDiary(form: any) :void {
    console.log(this.f)
    let diaryTitle = form.diaryTitle;
    let diaryContent = form.diaryContent;

    var editDiary: EditDiary = new EditDiary();
    editDiary.diaryTitle = diaryTitle;
    editDiary.diaryContent = diaryContent;

    this.diaryService.editDiary(this.userId, this.diaryId, editDiary)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.successFlg = true;

          setTimeout(() => {
            if (this.successFlg) {
              this.router.navigate(['diary-list']);
            }
          }, 2000);
        }
      })
  }
}
