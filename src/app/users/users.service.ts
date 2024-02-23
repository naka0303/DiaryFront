import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {

  private GET_USERS_URL = 'http://localhost:8081/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.GET_USERS_URL);
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
