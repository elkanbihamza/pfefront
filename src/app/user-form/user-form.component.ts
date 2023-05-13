import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = { id: null, name: '', email: '', phone: '' };
  users: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<User[]>('/api/users').subscribe(users => this.users = users);
  }

  createUser(): void {
    this.http.post<User>('/api/users', this.user).subscribe(user => {
      this.users.push(user);
      this.user = { id: null, name: '', email: '', phone: '' };
    });
  }

  updateUser(): void {
    this.http.put<User>(`/api/users/${this.user.id}`, this.user).subscribe(user => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users[index] = user;
      this.user = { id: null, name: '', email: '', phone: '' };
    });
  }

  deleteUser(): void {
    this.http.delete<void>(`/api/users/${this.user.id}`).subscribe(() => {
      const index = this.users.findIndex(u => u.id === this.user.id);
      this.users.splice(index, 1);
      this.user = { id: null, name: '', email: '', phone: '' };
    });
  }
}
