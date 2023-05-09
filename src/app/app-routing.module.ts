import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { StudentsTableComponent } from './students-table/students-table.component';
import { FormComponent } from './form/form.component';


const appRoute : Routes =[
  {path: '', component:StudentsTableComponent},
  {path: 'home', redirectTo : '', pathMatch: 'full'},
  {path : 'create', component: FormComponent}
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
