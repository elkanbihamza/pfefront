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
  return this.http.get<User[]>(this.apiUrl);
}

getUserById(userId: number): Observable<User> {
  const url = `${this.apiUrl}/${userId}`;
  return this.http.get<User>(url);
}

createUser(user: User): Observable<User> {
  return this.http.post<User>(this.apiUrl, user);
}

updateUser(user: User): Observable<User> {
  const url = `${this.apiUrl}/${user.id}`;
  return this.http.put<User>(url, user);
}

deleteUser(userId: number): Observable<any> {
  const url = `${this.apiUrl}/${userId}`;
  return this.http.delete(url);
}

}

