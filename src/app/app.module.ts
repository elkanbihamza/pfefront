import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { UserApiService } from './service/user.service';
import { AuthService } from './service/auth.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginPageComponent,
    UsersListComponent,
    SideMenuComponent,
    AnnouncementsListComponent,
    CategoriesListComponent,
    CreateCategoryComponent,
    CreateAnnouncementComponent
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
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule


  ],
  providers: [
    UserApiService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
