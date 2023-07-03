import { Announcement } from 'src/app/models/announcement.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:3000/announcements';

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>('/fsacnotif/getallannounces');
  }

  getAnnouncement(Id: number): Observable<Announcement>  {
    const url = `/fsacnotif/announces/${Id}`;
    return this.http.get<Announcement>(url);
  }

  createAnnouncement(announcement: any): Observable<Announcement> {
    return this.http.post<Announcement>('/fsacnotif/traitementfile', announcement);
  }

  updateAnnouncement(announcement: any) {
    return this.http.post<Announcement>(`/fsacnotif/updateannounces`, announcement);
  }

  hideAnnouncement(id:number){
    return this.http.put<Announcement>(`/fsacnotif/announces/${id}`,{});
  }

  deleteAnnouncement(id:number){
    return this.http.delete<Announcement>(`/fsacnotif/announces/${id}`);
  }
}
