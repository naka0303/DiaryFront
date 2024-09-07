import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LoginUtil } from '../../utils/login-util';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  imports: [NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserListComponent implements OnInit {

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
    LoginUtil.checkLogin(this.platformId, this.router, '/user-list');
    this.title = "ユーザー一覧";
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(res => {
        this.registeredUsers = res;
      });
  }

  /**
   * 指定ユーザー削除
   * @param userId ユーザーID
   */
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
