import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html',
  styleUrls: ['./user-delete-form.component.css']
})
export class UserDeleteFormComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.deleteUser(userId);
    });
  }

  deleteUser(userId: string) {
    // const JsonUserId = JSON.stringify({ id: userId });
    // console.log(JsonUserId);
    this.http.delete<any>(`/mavenpfe1/supprimer/:userId`)
    .subscribe({
      next: response => {
        console.log('User fetched successfully:', response);
      },
      error: error => {
        console.error('Error fetching user:', error);
      }
    });
  }
}


