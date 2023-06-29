import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { UserApiService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { AnnouncementsListComponent } from './Announcements/announcements-list/announcements-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateAnnouncementComponent } from './Announcements/create-announcement/create-announcement.component';
import { SettingsModule } from './settings/settings.module';
import { NotificationsComponent } from './Announcements/notifications/notifications.component';
import { AnnouncementViewComponent } from './Announcements/announcement-view/announcement-view.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AuthGuardService } from './service/auth-guard.service';
import { FileUploadComponent } from './file-upload/file-upload.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AnnouncementsListComponent,
    CreateAnnouncementComponent,
    NotificationsComponent,
    AnnouncementViewComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    SettingsModule,
    MatTreeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,


  ],
  providers: [
    UserApiService,
    AuthService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
