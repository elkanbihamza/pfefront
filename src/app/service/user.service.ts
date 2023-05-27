import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "/notyfsac/users"
  constructor(private http: HttpClient) { }

  postUser(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  updateUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

}

