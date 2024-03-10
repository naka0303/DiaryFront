import { Component, NgModule, OnInit, inject } from '@angular/core';
import { RegisterUser, UsersService } from '../users.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {  FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users-register.component.html',
  styleUrl: './users-register.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
})
export class UsersRegisterComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  userId!: number;
  age!: number;
  email!: string;
  password!: string;
  auth!: string;

  userForm = new FormGroup({
    username: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    auth: new FormControl('')
  })

  constructor(
    private usersService: UsersService,
  ) {
    this.userForm;
   }

  ngOnInit() {
    this.title = "ユーザー登録";
  }

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

    this.usersService.registerUser(registerUser)
      .subscribe(res => {
        // TODO: ステータスコードの直書きはやめる
        if (res === "OK") {
          this.ngOnInit();
        }
      });
  }
}
