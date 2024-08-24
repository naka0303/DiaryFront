import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user/user-list/user.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserRegisterComponent } from "./user/user-register/user-register.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./user/login/login.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from "./user/logout/logout.component";
import { DiaryRegisterComponent } from "./diary/diary-register/diary-register.component";
import { DiaryListComponent } from "./diary/diary-list/diary-list.component";
import { DiaryDetailComponent } from "./diary/diary-detail/diary-detail.component";

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user-detail/:userId', component: UserDetailComponent },
  { path: 'user-edit/:userId', component: UserEditComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'diary-list', component: DiaryListComponent },
  { path: 'diary-detail/:diaryId', component: DiaryDetailComponent },
  { path: 'diary-register', component: DiaryRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    // BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //  positionClass: 'toast-top-center'
    //})
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    HeaderComponent
  ],

  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }