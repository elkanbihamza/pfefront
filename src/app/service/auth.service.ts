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
      localStorage.removeItem('session');
    }
}
