import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../service/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm! : FormGroup;
  hide =true;

  constructor( private auth : AuthService,
    private formBuilder: FormBuilder, private route : Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    const user = this.loginForm.value;
    console.log(user);
    this.auth.login(user).subscribe((response:any) => {
      console.log('response', response);
      localStorage.setItem('session :', response.session);
      console.log('response stored successfully');
    })
  }



  onLogin(){
   this.route.navigateByUrl('/annonces');
  }
}
