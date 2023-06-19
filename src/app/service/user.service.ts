import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

private apiUrl = '/notyfsac/getallusers';

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/notyfsac/getallusers');
}

getUserById(userId: number): Observable<User> {
  const url = `/notyfsac/users/${userId}`;
  return this.http.get<User>(url);
}

createUser(user: User): Observable<User> {
  return this.http.post<User>('/notyfsac/users', user);
}

updateUser(user: User): Observable<User> {
  const url = `/notyfsac/updateuser/${user.id}`;
  return this.http.post<User>(url, user);
}

deleteUser(userId: number): Observable<any> {
  const url = `/notyfsac/users/${userId}`;
  return this.http.delete(url);
}

}

