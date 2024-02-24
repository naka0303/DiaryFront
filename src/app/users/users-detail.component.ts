import { Component, NgModule, OnInit, inject } from '@angular/core';
import { DetailUser, UsersService } from '../users/users.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.css',
  imports: [NgFor, NgIf],
})
export class UsersDetailComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredUser!: any;
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number;

  constructor(
    private usersService: UsersService
  ) {
    this.userId = Number(this.route.snapshot.params['userId']);
  }

  ngOnInit() {
    this.title = "ユーザー詳細";
    this.getUser(this.userId);
  }

  /**
   * 特定ユーザー情報取得
   * @param userId ユーザーID
   */
  getUser(userId: number): void {
    this.usersService.getUser(userId)
      .subscribe(res => {
          this.userId = res.userId;
          this.username = res.username;
          this.age = res.age;
          this.email = res.email;
          this.auth = res.auth;
          this.diaryId = res.diaryId;
    });
  }
}
