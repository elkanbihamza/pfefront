import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(obj: any ) {
        return this.http.post('http://localhost:8080/notyfsac/login', obj);
    }
}
