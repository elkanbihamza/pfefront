import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(user: User ) {
      return this.http.post('/fsacnotif/getconnection', user);
    }

    logout(){
      localStorage.clear();
    }

    loginAsGuest(){
      return this.http.get('/fsacnotif/getconnection');
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

    hasSettingsAccess(){
      const is_admin = localStorage.getItem('is_admin');
      if(is_admin === 'true'){
        return true;
      }
      return false;
    }
}
