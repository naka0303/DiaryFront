import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindCommentLinkedUser } from "./CommentLinkedUser";

@Injectable({providedIn: 'root'})
export class ExchangeService {

  private ROOT_COMMENT_URL = 'http://localhost:8081/v1/diaries/{diaryId}/comments';
  private ROOT_REPLY_URL = 'http://localhost:8081/v1/diaries/{diaryId}/comments/{commentId}/reply';

  constructor(
    private http: HttpClient) { }

  /**
    * 指定された日記のコメント取得
    * @param diaryId 日記ID
    * @returns コメント情報
    */
  findComments(diaryId: number): Observable<FindCommentLinkedUser> {
    return this.http.get<FindCommentLinkedUser>(`${this.ROOT_COMMENT_URL.replace("{diaryId}", diaryId.toString())}`);
  }

  /**
   * コメント投稿.
   * @param diaryId 
   * @param registerComment 
   * @returns 
   */
  registerComment(diaryId: number, registerComment: any) {
    return this.http.post(
      `${this.ROOT_COMMENT_URL.replace("{diaryId}", diaryId.toString())}`, registerComment);
  }

  /**
   * コメント返信.
   * @param diaryId 
   * @param commentId 
   * @param registerReply 
   * @returns 
   */
  registerReply(diaryId: number, commentId: number, registerReply: any) {
    return this.http.post(
      `${this.ROOT_REPLY_URL
        .replace("{diaryId}", diaryId.toString())
        .replace("{commentId}", commentId.toString())}`, registerReply);
  }
}
