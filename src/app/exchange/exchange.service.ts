import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FindCommentLinkedUser } from "./CommentLinkedUser";

@Injectable({providedIn: 'root'})
export class ExchangeService {

  private ROOT_COMMENT_REPLY_URL = 'http://localhost:8081/v1/diaries/{diaryId}/comments-replies';
  private ROOT_COMMENT_URL = 'http://localhost:8081/v1/diaries/{diaryId}/comments';
  private ROOT_REPLY_URL = 'http://localhost:8081/v1/diaries/{diaryId}/comments/{commentNo}/replies';

  constructor(
    private http: HttpClient) { }

  /**
    * 指定された日記のコメント/返信取得
    * @param diaryId 日記ID
    * @returns コメント情報
    */
  findCommentsReplies(diaryId: number): Observable<FindCommentLinkedUser> {
    return this.http.get<FindCommentLinkedUser>(`${this.ROOT_COMMENT_REPLY_URL.replace("{diaryId}", diaryId.toString())}`);
  }

  /**
   * コメント投稿.
   * @param diaryId 日記ID
   * @param registerComment 登録内容 
   */
  registerComment(diaryId: number, registerComment: any) {
    return this.http.post(
      `${this.ROOT_COMMENT_URL.replace("{diaryId}", diaryId.toString())}`, registerComment);
  }

  /**
   * 返信投稿.
   * @param diaryId 日記ID
   * @param commentNo コメント番号
   * @param registerReply 登録内容
   */
  registerReply(diaryId: number, commentNo: number, registerReply: any) {
    return this.http.post(
      `${this.ROOT_REPLY_URL
        .replace("{diaryId}", diaryId.toString())
        .replace("{commentNo}", commentNo.toString())}`, registerReply);
  }
}
