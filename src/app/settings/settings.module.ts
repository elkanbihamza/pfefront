import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SettingsComponent } from './settings.component';
import { MatTreeModule } from '@angular/material/tree';



@NgModule({
  declarations: [
    CategoriesListComponent,
    CreateCategoryComponent,
    CreateUserComponent,
    UsersListComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
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
    MatExpansionModule,
    MatTreeModule


  ],
  exports: [
    CategoriesListComponent,
    CreateCategoryComponent,
    CreateUserComponent,
    UsersListComponent,
    MatPaginatorModule
  ]
})
export class SettingsModule { }
