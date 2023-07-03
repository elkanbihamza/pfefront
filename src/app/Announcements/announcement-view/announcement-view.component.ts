import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'src/app/models/announcement.model';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
  styleUrls: ['./announcement-view.component.css']
})
export class AnnouncementViewComponent implements OnInit {
  announcement!: Announcement;
  notifications: any[] = [];
  notificationCount = 0;
  action!: string;
  
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private apiService: AnnouncementService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.fetchAnnouncement();
  }

  fetchAnnouncement() {
    const announcementId = this.route.snapshot.params['id'];
    this.apiService.getAnnouncement(announcementId).subscribe(
      (response: Announcement) => {
        this.announcement = response;
        console.log(response);
      },
      (error: any) => {
        // Handle error
        console.error(error);
      }
    );
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(
      (response: any) => {
        this.notifications = response;
        this.notificationCount = this.notifications.length; // Update the notification count
        console.log('response:', response); // Assign the retrieved notifications to the array
      },
      (error: any) => {
        console.error('Error retrieving notifications:', error);
      }
    );
  }

  openEditor(id: number) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  hideAnnouncement(id: number) { 
    this.apiService.hideAnnouncement(id).subscribe(
      (response : any) => {
        console.log(response);
        this.fetchAnnouncement();
      },
      (error: any) => {
        console.log('Error hiding announcement:', error);
      }
    );
  }

  deleteAnnouncement(id: number) {
    this.apiService.deleteAnnouncement(id).subscribe(
      (response : any) => {
        this.router.navigateByUrl(`/annonces`);
        console.log(response);
      },
      (error: any) => {
        console.log('Error hiding announcement:', error);
      }
    );
  }

  
}