import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent{
  userForm : FormGroup;
  user: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.userForm =this.formBuilder.group({
      id :['', Validators.required],
      fname :['', Validators.required],
      lname :['', Validators.required]
    });
   }

  
  createUser() {
    const user = JSON.stringify(this.userForm.value);
    console.log('User details :', user);
    this.http.post<any>('/mavenpfe1/ajouter', user).subscribe({
      next : response => {
        console.log ('User created successfully :', response)
      },
      error : error => {
        console.log ('Error creating user :',error)
      }
    });
  }
}
