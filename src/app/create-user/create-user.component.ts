import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../service/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;

  constructor(
    private api: UserApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      is_responsable: ['', Validators.required],
      is_active: ['']
    });
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    const userdata = this.userForm.value;
    this.api.createUser(userdata).subscribe(
      response => {
        console.log('Registration successful:', response);
        this.dialogRef.close();
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
