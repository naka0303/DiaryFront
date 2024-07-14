import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { LoginUser, UsersService } from '../users.service';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginUtil } from '../../utils/login-util';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink, NgbModule],
})
export class LoginComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  loginUser!: any;
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number;
  loginIsEnabled: any;

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private usersService: UsersService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.userForm;
  }

  ngOnInit(): void {
    // ログイン判定
    LoginUtil.checkLogin(this.platformId, this.router, '');
  }

  /**
   * ログインを実行します.
   * @param userId ユーザーID
   */
  login(form: any) {
    let username = form.username;
    let password = form.password;

    var loginUser: LoginUser = new LoginUser();
    loginUser.username = username;
    loginUser.password = password;

    this.usersService.login(loginUser)
      .subscribe(res => {
        if (res == null) {
          return false;
        }

        const jsonParsed = JSON.parse(JSON.stringify(res));
        localStorage.setItem("loginUserId", jsonParsed.userId);
        localStorage.setItem("loginUsername", jsonParsed.username);
        localStorage.setItem("loginIsEnabled", jsonParsed.enabled);
        localStorage.setItem("loginDiaryId", jsonParsed.loginDiaryId);

        this.router.navigate(['']);
      return true;
    });
  }
}
