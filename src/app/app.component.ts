import { Router, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginUtil } from './utils/login-util';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DiaryFront';
  loginIsEnabled: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    // ログイン判定
    LoginUtil.checkLogin(this.platformId, this.router, '');
    this.loginIsEnabled = localStorage.getItem("loginIsEnabled");
  }
}
