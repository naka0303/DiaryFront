import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserRegisterComponent } from "./user/user-register/user-register.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./user/login/login.component";
import { LogoutComponent } from "./user/logout/logout.component";
import { DiaryRegisterComponent } from "./diary/diary-register/diary-register.component";
import { DiaryListComponent } from "./diary/diary-list/diary-list.component";
import { DiaryDetailComponent } from "./diary/diary-detail/diary-detail.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ExchangeComponent } from "./exchange/exchange.component";

export const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user-detail/:userId', component: UserDetailComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'diary-list', component: DiaryListComponent },
  { path: 'diary-detail/:diaryId', component: DiaryDetailComponent },
  { path: 'diary-register', component: DiaryRegisterComponent },
  { path: 'diary-exchange', component: ExchangeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    HeaderComponent
  ],

  providers: [
    
  ],
})
export class AppModule {}

