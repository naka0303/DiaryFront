import { Component, NgModule, OnInit, inject } from '@angular/core';
import { Users, UsersService } from './users.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [NgFor, NgIf, RouterLink],
})
export class UsersComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredUsers!: any;
  userId!: number;

  constructor(
    private usersService: UsersService
  ) {
    this.userId = Number(this.route.snapshot.params['userId']);
  }

  ngOnInit() {
    this.title = "ユーザー一覧";
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(res => {
        this.registeredUsers = res;
      });
  }

  onDeleteUser(userId: number) {
    this.usersService.deleteUser(userId)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
