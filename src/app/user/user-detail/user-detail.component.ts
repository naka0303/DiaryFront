import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  imports: [NgFor, NgIf, RouterLink, ReactiveFormsModule],
})
export class UserDetailComponent implements OnInit {

  editUserForm!: FormGroup;
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredUser!: any;
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number;
  successFlg!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userId = Number(this.route.snapshot.params['userId']);
  }

  ngOnInit() {
    this.title = "ユーザー詳細";
    this.getUser(this.userId);

    this.editUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      auth: ['', Validators.required],
    });
  }

  /**
   * 特定ユーザー情報取得.
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

  /**
   * 特定ユーザー情報編集.
   * @param form 入力値
   */
  onEditUser(form: any) {
    this.userService.editUser(this.editUserForm.value, this.userId)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
