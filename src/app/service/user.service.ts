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
  return this.http.get<User[]>('/fsacnotif/getallusers');
}

getUserById(userId: number): Observable<User> {
  const url = `/fsacnotif/users/${userId}`;
  return this.http.get<User>(url);
}

createUser(user: User): Observable<User> {
  return this.http.post<User>('/fsacnotif/users', user);
}

updateUser(user: User): Observable<User> {
  const url = `/fsacnotif/users/${user.id}`;
  return this.http.put<User>(url, user);
}

deleteUser(userId: number): Observable<any> {
  const url = `/fsacnotif/users/${userId}`;
  return this.http.delete(url);
}

}

