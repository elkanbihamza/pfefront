import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('/fsacnotif/getallnotifications');
  }

  markAsViewed(id:number){
    this.http.get<Notification>(`/fsacnotif/notifications/${id}`);
  }
}
