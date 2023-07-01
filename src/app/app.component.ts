import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pfefront';
  isSpecificComponentActive!: boolean;

  constructor ( private router: Router, private route: ActivatedRoute, private api: AuthService) { }


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Logic to check if the specific component is active in the router outlet
        const isSpecificComponentActive = this.route.firstChild?.snapshot.component === LoginPageComponent;
  
        // Update a boolean flag based on the result
        this.isSpecificComponentActive = isSpecificComponentActive;
      }
    });
  }


  logout(){
    this.api.logout();
  }

  hasAnnouncementCrationAccess(){
    const is_responsible = localStorage.getItem('is_responsible');
    const is_admin = localStorage.getItem('is_admin');
    if(is_responsible === 'true'){
      return true;
    }

    if(is_admin === 'true'){
      return true;
    }
    return false;
  }

  isLoginComponentActive(){
    const LoginComponentActive =  this.route.firstChild?.snapshot.component !== LoginPageComponent;
    return LoginComponentActive ;
  }

  

  logoutButtonView() : boolean {
    const isSpecificComponentActive = this.route.firstChild?.snapshot.component !== LoginPageComponent;
    console.log('isSpecificComponentActive', isSpecificComponentActive);
    return isSpecificComponentActive;
  }


  isAdmin(){
    const is_admin = localStorage.getItem('is_admin');
    if(is_admin === 'true'){
      return true;
    }
    return false;
  }

  isGuest(){
    const is_guest = localStorage.getItem('is_guest');
    if(is_guest === 'false'){
      return false;
    }
    return true;
    
  }

  isResponsible(){
    const is_responsible = localStorage.getItem('is_responsible');
    if(is_responsible === 'true'){
      return true;
    }
    return false;
  }

  hasSession(){
    const session = localStorage.getItem('session');
    if(session !== undefined){
      return true;
    }
    return false;
  }

  hasSettingsAccess() {
    const is_admin = localStorage.getItem('is_admin');
    const is_guest = localStorage.getItem('is_guest');
    if(is_admin === 'true'){
      return true;
    }else {
      if(is_guest === 'true'){
        return false;
      }
      return false;
    }
  
  }
  
}
