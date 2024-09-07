import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Diary } from "./diary";

@Injectable({providedIn: 'root'})
export class DiaryService {

  private ROOT_USER_URL = 'http://localhost:8081/v1/users';
  private ROOT_DIARY_URL = 'http://localhost:8081/v1/diaries';

  constructor(
    private http: HttpClient) { }
  
  /**
   * 全ての日記情報取得
   * @returns 
   */
  getDiaries(): Observable<Diary> {
    return this.http.get<Diary>(`${this.ROOT_DIARY_URL}`);
  }

  /**
   * 指定されたユーザーに紐づく日記情報取得
   * @param diaryId 日記ID 
   * @returns 
   */
  getDiariesByUser(userId: number): Observable<Diary> {
    return this.http.get<Diary>(`${this.ROOT_USER_URL}/${userId}/diaries`);
  }

  /**
   * 指定された日記情報取得
   * @param diaryId 日記ID
   * @param contentId 日記記事ID
   */
  getDiary(userId: number, diaryId: number) {
    return this.http.get<Diary>(`${this.ROOT_USER_URL}/${userId}/diaries/${diaryId}`);
  }

  /**
   * 日記登録
   * 
   * @param userId ユーザーID
   * @param registerDiary 日記情報
   */
  registerDiary(userId: number, registerDiary: any) {
    return this.http.post(`${this.ROOT_USER_URL}/${userId}/diaries`, registerDiary);
  }

  /**
   * 日記編集
   * @param userId ユーザーID 
   * @param diaryId 日記ID
   * @param editDiary 日記情報
   */
  editDiary(userId: number, diaryId: number, editDiary: any) {
    return this.http.put(`${this.ROOT_USER_URL}/${userId}/diaries/${diaryId}`, editDiary);
  }

  /**
   * 日記削除
   * @param userId ユーザーID
   * @param diaryId 日記ID
   */
  deleteDiary(userId: number, diaryId: number) {
    return this.http.delete(`${this.ROOT_USER_URL}/${userId}/diaries/${diaryId}`);
  }
}
