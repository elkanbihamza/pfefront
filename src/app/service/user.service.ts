import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

private apiUrl = 'http://localhost:3000/users';

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('http://localhost:3000/users');
}

getUserById(userId: number): Observable<User> {
  const url = `http://localhost:3000/users/${userId}`;
  return this.http.get<User>(url);
}

createUser(user: User): Observable<User> {
  return this.http.post<User>('http://localhost:3000/users', user);
}

updateUser(user: User): Observable<User> {
  const url = `http://localhost:3000/users/${user.id}`;
  return this.http.put<User>(url, user);
}

deleteUser(userId: number): Observable<any> {
  const url = `http://localhost:3000/users/${userId}`;
  return this.http.delete(url);
}

}

