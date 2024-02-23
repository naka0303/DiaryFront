import { Component, NgModule, OnInit } from '@angular/core';
import { User, UserService } from './user.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [NgFor, NgIf],
})
export class UserComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    this.title = "ユーザー詳細";
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser()
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
