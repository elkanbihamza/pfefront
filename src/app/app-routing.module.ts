import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';

const routes: Routes = [
  {path: '',redirectTo:'announcements', pathMatch:'full'},
  {path: 'announcements', component: AnnouncementsListComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'users', component: UsersListComponent},
  { path: 'categories', component: CategoriesListComponent},
  { path : 'create-announcement', component: CreateAnnouncementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
