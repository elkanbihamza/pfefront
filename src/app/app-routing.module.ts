import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path: '',redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'users', component: UsersListComponent},
  {path: 'create', component: CreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
