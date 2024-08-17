import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({providedIn: 'root'})
export class DiaryContentService {

  private ROOT_DIARY_CONTENTS_URL = 'http://localhost:8081/v1/diary-contents';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 日記記事登録
   * @param registerDiary 
   * @returns 
   */
  registerDiaryContent(registerDiary: any) {
    return this.http.post(`${this.ROOT_DIARY_CONTENTS_URL}`, registerDiary);
  }

  /**
   * 日記記事取得
   * @param diaryId 日記ID 
   * @returns 
   */
  getDiaryContentsByDiaryId(params: any): Observable<DiaryContent> {
    return this.http.get<DiaryContent>(`${this.ROOT_DIARY_CONTENTS_URL}`, {params: params});
  }

  /**
   * 指定された日記ID/日記記事IDの日記記事
   * @param diaryId 日記ID
   * @param contentId 日記記事ID
   */
  getDiaryContentByContentId(contentId: number) {
    return this.http.get<DiaryContent>(`${this.ROOT_DIARY_CONTENTS_URL}/${contentId}`);
  }
}

export class RegisterDiary {
  userId!: number;
  diaryTitle!: string;
  diaryContent!: string;
}

export class SearchDiaryRequest {
  diaryId!: number;
}

export class DiaryContent {
  contentId!: number;
  diaryId!: number;
  diaryTitle!: string;
  diaryContent!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;
}
