import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../service/user.service';
import {Router} from "@angular/router";

interface LoginResponse {
  session: string;
  is_responsible: boolean;
  is_admin: boolean;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm! : FormGroup;
  hide =true;
  loginError!: boolean;

  constructor( private auth : AuthService,
    private formBuilder: FormBuilder, private route : Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const user = this.loginForm.value;
    console.log(user);
    this.auth.login(user).subscribe(
      (response: any) => {
        if (response.hasOwnProperty('error')) {
          console.log('Error:', response.error);
          this.loginError = true;
        } else {
          console.log('response', response);
          localStorage.setItem('session', response.session);
          localStorage.setItem('is_responsible', response.is_responsable);
          localStorage.setItem('is_admin', response.is_admin);
          localStorage.setItem('is_guest', response.is_guest);
          console.log('response stored successfully');
          this.route.navigate(['/annonces']);
        }
      }
    );
  }
  
  loginAsGuest(){
    this.auth.loginAsGuest().subscribe((response: any) => {
      if (response.hasOwnProperty('error')) {
        console.log('Error:', response.error);
      }
      else {
        localStorage.setItem('session', response.session);
        localStorage.setItem('is_guest', response.is_guest);
        this.route.navigateByUrl('/annonces');
      }
    });
  }


}
