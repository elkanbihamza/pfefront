import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AnnouncementsListComponent } from './Announcements/announcements-list/announcements-list.component';
import { CreateAnnouncementComponent } from './Announcements/create-announcement/create-announcement.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersListComponent } from './settings/users-list/users-list.component';
import { CategoriesListComponent } from './settings/categories-list/categories-list.component';
import { AnnouncementViewComponent } from './Announcements/announcement-view/announcement-view.component';
import { AuthGuardService } from './service/auth-guard.service';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'annonces', component: AnnouncementsListComponent, canActivate:[AuthGuardService] },
  { path: 'login', component: LoginPageComponent },
  { path: 'creerannonce', component: CreateAnnouncementComponent },
  {
    path: 'settings', component: SettingsComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersListComponent },
      { path: 'categories', component: CategoriesListComponent },
    ]
  },
  { path: 'annonces/:id', component: AnnouncementViewComponent,  },
  { path:'upload', component: FileUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
