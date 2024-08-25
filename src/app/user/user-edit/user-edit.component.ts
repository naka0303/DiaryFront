import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { UsersUtils } from '../user.utils';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  userForm!: FormGroup;
  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  password!: string;
  auth!: string;
  auths = UsersUtils.AUTHS;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.userId = Number(this.route.snapshot.params['userId']);
  }

  ngOnInit() {
    this.title = "ユーザー編集";
    this.getUser(this.userId);

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      auth: ['', Validators.required],
    });
  }

  get f() { return this.userForm.controls; }

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
    });
  }

  /**
   * 特定ユーザー情報編集
   * @param form 入力値
   */
  onEditUser() {
    this.userService.editUser(this.userForm.value, this.userId)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
