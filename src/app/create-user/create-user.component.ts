import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;

  constructor(private api : ApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      is_responsable: ['']
    });
  }

  onSubmit() {
      console.log(this.userForm.value);
      const userdata = this.userForm.value;
      this.api.postUser(userdata).subscribe(
        response => {
          console.log('Registration successful:', response);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );

  }
  
}

