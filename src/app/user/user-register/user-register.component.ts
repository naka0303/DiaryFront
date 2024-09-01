import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RegisterUser, UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersUtils } from '../user.utils';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
})
export class UserRegisterComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: number;
  age!: number;
  email!: string;
  password!: string;
  auth!: string;
  auths = UsersUtils.AUTHS;
  successFlg!: boolean;

  userForm = new FormGroup({
    username: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    auth: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) {
      this.userForm;
  }

  ngOnInit() {
    this.title = "ユーザー登録";
  }

  /**
   * ユーザー登録
   * @param form 
   */
  onRegisterUser(form: any) {
    let username = form.username;
    let age = form.age;
    let email = form.email;
    let password = form.password;
    let auth = form.auth;

    var registerUser: RegisterUser = new RegisterUser();
    registerUser.username = username;
    registerUser.age = age;
    registerUser.email = email;
    registerUser.password = password;
    registerUser.auth = auth;

    this.userService.registerUser(registerUser)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.successFlg = true;

          setTimeout(() => {
            if (this.successFlg) {
              this.router.navigate(['user-list']);
            }
          }, 2000);
        }
      });
  }
}
