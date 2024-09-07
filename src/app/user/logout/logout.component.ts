import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { UserService } from '../user.service';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink, NgbModule],
})
export class LogoutComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  loginUser!: any;
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  diaryId!: number;

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.userForm;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("loginUsername") !== null
          && localStorage.getItem("loginIsEnabled") !== null) {
        this.router.navigate(['logout']);
      }
    }
  }

  /**
   * ログアウト
   */
  logout() {
    localStorage.removeItem("loginUserId");
    localStorage.removeItem("loginUsername");
    localStorage.removeItem("loginIsEnabled");

    this.router.navigate(['login']);

    window.location.reload();
  }
}
