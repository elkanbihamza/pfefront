import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { StudentsTableComponent } from './students-table/students-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDeleteFormComponent } from './user-delete-form/user-delete-form.component';

const appRoute : Routes =[
  {path: '', component:StudentsTableComponent},
  {path : 'create', component: UserFormComponent},
  {path : 'delete/:userId', component: UserDeleteFormComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports : [
    RouterModule
  ]
})

export class AppRoutingModule{

}
