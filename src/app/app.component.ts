import { Router, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginUtil } from './utils/login-util';
import { isPlatformBrowser } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loginUserId: any;
  loginUsername: any;
  loginAge: any;
  loginAuth: any;
  loginIsEnabled: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {

    // ログイン判定
    LoginUtil.checkLogin(this.platformId, this.router, '');
    if (isPlatformBrowser(this.platformId)) {
      this.loginUserId = localStorage.getItem("loginUserId");
      this.loginUsername = localStorage.getItem("loginUsername");
      this.loginAge = localStorage.getItem("loginAge");
      this.loginAuth = localStorage.getItem("loginAuth");
      this.loginIsEnabled = localStorage.getItem("loginIsEnabled");
    }
  }
}
