import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../service/announcement.service';
import { Announcement } from '../../models/announcement.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css']
})
export class AnnouncementsListComponent implements OnInit {
  public announcementData: Announcement[] = [];


  constructor(private apiService: AnnouncementService, private auth : AuthService, private route : Router) {}

  ngOnInit() {
    this.fetchAnnouncements();
  }

  fetchAnnouncements() {
    this.apiService.getAnnouncements().subscribe(
      (announcements: Announcement[]) => {
        console.log(announcements)
        this.announcementData = announcements;
      },
      (error: any) => {
        console.error('Error fetching announcements:', error);
      }
    );
  }

  openAnnouncement(announcementId: number) {
    this.route.navigate(['/annonces', announcementId]);
  }

  hasAnnouncementCreationAccess(){
    const is_responsible = localStorage.getItem('is_responsible');
    const is_admin = localStorage.getItem('is_admin');
    if(is_responsible === 'true'){
      return true;
    }

    if(is_admin === 'true'){
      return true;
    }
    return false;
  }

  hasSettingsAccess(){
    const is_admin = localStorage.getItem('is_admin');
    if(is_admin === 'true'){
      return true;
    }
    return false;
  }
}
