import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { UsersDetailComponent } from "./users/users-detail/users-detail.component";
import { UsersRegisterComponent } from "./users/users-register/users-register.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users-detail/:userId', component: UsersDetailComponent },
  { path: 'users-edit/:userId', component: UsersEditComponent },
  { path: 'users-register', component: UsersRegisterComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],

  declarations: [
    // AppComponent
  ],

  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }