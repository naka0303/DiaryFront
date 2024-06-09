import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DiariesService {

  private ROOT_DIARIES_URL = 'http://localhost:8081/v1/diaries';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 日記登録
   * @param registerDiary 
   * @returns 
   */
  registerDiary(registerDiary: any) {
    return this.http.post(`${this.ROOT_DIARIES_URL}`, registerDiary);
  }
}

export class RegisterDiary {
  userId!: number;
  diaryTitle!: string;
  diaryContent!: string;
}
