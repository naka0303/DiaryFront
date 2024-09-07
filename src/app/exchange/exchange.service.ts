import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ExchangeService {

  private ROOT_EXCHANGE_URL = 'http://localhost:8081/v1/diaries/{diaryId}/comments';

  constructor(
    private http: HttpClient) { }

  /**
   * コメント投稿
   * @param diaryId 
   * @param registerComment 
   * @returns 
   */
  registerComment(diaryId: number, registerComment: any) {
    return this.http.post(
      `${this.ROOT_EXCHANGE_URL.replace("{diaryId}", diaryId.toString())}`, registerComment);
  }
}
