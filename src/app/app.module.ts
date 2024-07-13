import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { UsersComponent } from "./users/users-list/users.component";
import { UsersDetailComponent } from "./users/users-detail/users-detail.component";
import { UsersRegisterComponent } from "./users/users-register/users-register.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./users/login/login.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from "./users/logout/logout.component";
import { DiaryContentRegisterComponent } from "./diary-content/diary-content-register/diary-content-register.component";
import { DiaryContentListComponent } from "./diary-content/diary-content-list/diary-content-list.component";
import { DiaryContentDetailComponent } from "./diary-content/diary-content-detail/diary-content-detail.component";

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users-detail/:userId', component: UsersDetailComponent },
  { path: 'users-edit/:userId', component: UsersEditComponent },
  { path: 'users-register', component: UsersRegisterComponent },
  { path: 'diary-content-list', component: DiaryContentListComponent },
  { path: 'diary-content-detail/:contentId', component: DiaryContentDetailComponent },
  { path: 'diary-content-register', component: DiaryContentRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    HeaderComponent
  ],

  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }