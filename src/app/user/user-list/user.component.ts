import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, NgModule, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { User, UserService } from '../user.service';
import { CommonModule, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { LoginUtil } from '../../utils/login-util';


@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredUsers!: any;
  userId!: number;

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.userId = Number(this.route.snapshot.params['userId']);
  }

  ngOnInit() {
    LoginUtil.checkLogin(this.platformId, this.router, '/users');
    this.title = "ユーザー一覧";
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(res => {
        this.registeredUsers = res;
      });
  }

  onDeleteUser(userId: number) {
    this.userService.deleteUser(userId)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
