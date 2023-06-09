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

  constructor(private api : UserApiService, private auth : AuthService,
    private formBuilder: FormBuilder, private route : Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    const user = this.loginForm.value;
    this.auth.login(user).subscribe((response:any) => {
      debugger
      console.log('response', response);
      localStorage.setItem('session_id', response.token);
      this.route.navigateByUrl('/annonces');
    })
  }

  onLogin(){
    this.route.navigateByUrl('/annonces');
  }
}
