import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;
  title!: string;
  userData: any;

  constructor(
    private api: UserApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data.user;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [this.userData?.id || ''],
      fname: [this.userData?.fname || '', Validators.required],
      lname: [this.userData?.lname || '', Validators.required],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      password: [''],
      is_responsible: [this.userData?.is_responsible || false, Validators.required],
      is_active: [this.userData?.is_active || true]
    });

    this.title = this.data.title;
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    const userdata = this.userForm.value;
    if (userdata.id) {
      this.api.updateUser(userdata).subscribe(
        response => {
          console.log('Update successful:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.api.createUser(userdata).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
