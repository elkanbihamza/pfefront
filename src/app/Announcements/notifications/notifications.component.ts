import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../service/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = []; // Array to store the retrieved notifications
  isDropdownOpen = false; // Flag to track if the dropdown is open

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(
      (response: any) => {
        this.notifications = response; // Assign the retrieved notifications to the array
      },
      (error: any) => {
        console.error('Error retrieving notifications:', error);
      }
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown open/close state
  }
}
