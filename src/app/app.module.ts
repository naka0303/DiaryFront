import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { UsersDetailComponent } from "./users/users-detail.component";
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersRegisterComponent } from "./users/users-register.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { NgFor, NgIf } from "@angular/common";

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users-detail/:userId', component: UsersDetailComponent},
  { path: 'users-register', component: UsersRegisterComponent}
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