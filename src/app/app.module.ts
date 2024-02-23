import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./user/user.component";
import { RouterLink } from '@angular/router';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/:userId', component: UserComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }