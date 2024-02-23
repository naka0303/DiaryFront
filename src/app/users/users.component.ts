import { Component, NgModule, OnInit } from '@angular/core';
import { Users, UsersService } from './users.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [NgFor, NgIf, RouterLink],
})
export class UsersComponent implements OnInit {

  title!: string;
  registeredUsers!: any;
  route!: ActivatedRoute;

  constructor(
    private usersService: UsersService,
  ) { }

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
}
