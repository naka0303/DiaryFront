import { Component, NgModule, OnInit, inject } from '@angular/core';
import { User, UserService } from './user.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [NgFor, NgIf],
})
export class UserComponent implements OnInit {

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
    private userService: UserService,
  ) {
    this.userId = Number(this.route.snapshot.params['userId']);
  }

  ngOnInit() {
    this.title = "ユーザー詳細";
    this.getUser(this.userId);
  }

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
