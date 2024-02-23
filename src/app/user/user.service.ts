import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  private GET_USER_URL = 'http://localhost:8081/v1/users/2';

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.GET_USER_URL);
  }
}

export class User {
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number
}
