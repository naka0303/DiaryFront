import { Component, NgModule, OnInit, inject } from '@angular/core';
import { DetailUser, RegisterUser, UsersService } from '../users.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
})
export class LoginComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  title!: string;
  registeredUser!: any;
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
    private usersService: UsersService,
    private router: Router
  ) {
    this.userForm;
  }

  ngOnInit() {
    this.title = "ログイン";
  }

  /**
   * ログイン
   * @param userId ユーザーID
   */
  login(form: any) {
    let username = form.username;
    let password = form.password;

    var registerUser: RegisterUser = new RegisterUser();
    registerUser.username = username;
    registerUser.password = password;

    this.usersService.login(registerUser)
      .subscribe(res => {
        if (res == null) {
          return false;
        }
        
        // TODO:principalをlocalstorageに保存
        console.log(res);

        this.router.navigate(['']);
      return true;
    });
  }
}
