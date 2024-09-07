import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { LoginUser, UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginUtil } from '../../utils/login-util';
import { MessageUtil } from '../../utils/message-util';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink, NgbModule],
})
export class LoginComponent implements OnInit {

  public userForm!: FormGroup;
  route: ActivatedRoute = inject(ActivatedRoute);
  loginUser!: any;
  userId!: number;
  loginIsEnabled: any;
  response!: any;

  // ログインボタン押下判定用フラグ
  submitted = false;

  // フォーム
  username!: FormControl;
  password!: FormControl;

  // エラーメッセージ
  errorMessage!: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private builder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.submitted = false;

    // ログイン判定
    LoginUtil.checkLogin(this.platformId, this.router, '');
  }

  /**
   * ログインします.
   * @param userId ユーザーID
   */
  login(form: any) {
    let username = form.username;
    let password = form.password;
    
    var loginUser: LoginUser = new LoginUser();
    loginUser.username = username;
    loginUser.password = password;

    if (loginUser.username !== null && loginUser.password !== null) {
      this.userService.login(loginUser)
        .subscribe(res => {
          this.username = this.userForm.get('username') as FormControl;
          this.password = this.userForm.get('password') as FormControl;
          if (res === null) {
            this.submitted = true;
            this.errorMessage = MessageUtil.makeErrorMessage("login");

            return false;
          }

          const jsonParsed = JSON.parse(JSON.stringify(res));
          setTimeout(() => {

            // ユーザーIDでのユーザー情報取得
            this.userService.getUser(jsonParsed.userId)
            .subscribe(userInfo => {
              localStorage.setItem("loginUserId", userInfo.userId.toString());
              localStorage.setItem("loginUsername", userInfo.username.toString());
              localStorage.setItem("loginAge", userInfo.age.toString());
              localStorage.setItem("loginAuth", userInfo.auth.toString());
              localStorage.setItem("loginIsEnabled", jsonParsed.enabled.toString());

              this.router.navigate(['']);

              window.location.reload();
            });
          }, 100);
        return true;
      });
    }
  }
}
