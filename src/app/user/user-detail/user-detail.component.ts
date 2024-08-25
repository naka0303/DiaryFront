import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  imports: [NgFor, NgIf, RouterLink],
})
export class UserDetailComponent implements OnInit {

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
    private userService: UserService
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
    this.userService.getUser(userId)
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
