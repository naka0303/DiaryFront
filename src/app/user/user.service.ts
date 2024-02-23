import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable, catchError, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  private GET_USER_URL = 'http://localhost:8081/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.GET_USER_URL}/${userId}`);
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
