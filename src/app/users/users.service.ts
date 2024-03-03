import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {

  private GET_USERS_URL = 'http://localhost:8081/v1/users';
  private GET_USER_URL = 'http://localhost:8081/v1/users';
  private REGISTER_USER_URL = 'http://localhost:8081/v1/users';
  private DELETE_USER_URL = 'http://localhost:8081/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 全ユーザー情報取得
   * @returns 
   */
  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.GET_USERS_URL);
  }

  /**
   * 特定ユーザー情報取得
   * @param userId 
   * @returns 
   */
  getUser(userId: number): Observable<DetailUser> {
    return this.http.get<DetailUser>(`${this.GET_USER_URL}/${userId}`);
  }

  /**
   * ユーザー登録
   * @param registerUser 
   * @returns 
   */
  registerUser(registerUser: any) {
    return this.http.post(`${this.REGISTER_USER_URL}`, registerUser);
  }

  /**
   * 特定ユーザー情報削除
   * @param userId 
   * @returns 
   */
  deleteUser(userId: number) {
    return this.http.delete(`${this.DELETE_USER_URL}/${userId}`) ;
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
