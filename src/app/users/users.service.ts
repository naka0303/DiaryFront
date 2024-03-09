import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {

  private ROOT_USERS_URL = 'http://localhost:8081/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 全ユーザー情報取得
   * @returns 
   */
  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.ROOT_USERS_URL);
  }

  /**
   * 特定ユーザー情報取得
   * @param userId 
   * @returns 
   */
  getUser(userId: number): Observable<DetailUser> {
    return this.http.get<DetailUser>(`${this.ROOT_USERS_URL}/${userId}`);
  }

  /**
   * ユーザー登録
   * @param registerUser 
   * @returns 
   */
  registerUser(registerUser: any) {
    return this.http.post(`${this.ROOT_USERS_URL}`, registerUser);
  }

  /**
   * 特定ユーザー情報削除
   * @param userId ユーザーID
   * @returns ステータスコード
   */
  deleteUser(userId: number) {
    return this.http.delete(`${this.ROOT_USERS_URL}/${userId}`);
  }

  /**
   * 特定ユーザー情報編集
   * @param editUser 編集情報
   * @param userId ユーザーID
   * @returns ステータスコード
   */
  editUser(editUser: any, userId: number) {
    return this.http.put(`${this.ROOT_USERS_URL}/${userId}`, editUser);
  }
}

export class Users {
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number
}

export class DetailUser {
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number
}

export class RegisterUser {
  username!: string;
  age!: number;
  email!: string;
  password!: string;
  auth!: string;
}

export class EditUser {
  username!: string;
  age!: number;
  email!: string;
  password!: string;
  auth!: string;
}
