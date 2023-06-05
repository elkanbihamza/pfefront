import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementApiService {

private apiUrl = 'http://localhost:3000/announcements';

constructor(private http: HttpClient) { }

// getCategories(): Observable<Announcement[]> {
//   return this.http.get<Announcement[]>(this.apiUrl);
// }

// getAnnouncementByCode(AnnouncementCode: string): Observable<Announcement> {
//   const url = `${this.apiUrl}/${AnnouncementCode}`;
//   return this.http.get<Announcement>(url);
// }

createAnnouncement(Announcement : Announcement): Observable<Announcement> {
  return this.http.post<Announcement>(this.apiUrl, Announcement);
}

updateAnnouncement(Announcement : Announcement): Observable<Announcement> {
  const url = `${this.apiUrl}/${Announcement.id}`;
  return this.http.put<Announcement>(url, Announcement);
}

deleteAnnouncement(announcementId : number): Observable<any> {
  const url = `${this.apiUrl}/${announcementId}`;
  return this.http.delete(url);
}

}

