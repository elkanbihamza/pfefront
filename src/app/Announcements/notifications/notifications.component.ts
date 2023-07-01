import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../service/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = []; // Array to store the retrieved notifications
  isDropdownOpen = false; // Flag to track if the dropdown is open
  notificationCount = 0;

  constructor(private notificationService: NotificationService, private route: Router) { }

  ngOnInit() {
    this.loadNotifications();
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

  openAnnouncement(announcementId: number) {
    this.route.navigate(['/annonces', announcementId]);
    this.notificationCount--; // Decrease the notification count after opening a notification
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown open/close state
  }
}
