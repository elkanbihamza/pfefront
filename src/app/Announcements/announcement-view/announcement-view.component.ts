import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/announcement.model';
import { AnnouncementService } from 'src/app/service/announcement.service';

@Component({
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
  styleUrls: ['./announcement-view.component.css']
})
export class AnnouncementViewComponent implements OnInit {
  announcement!: Announcement;

  constructor(
    private route: ActivatedRoute,
    private apiService: AnnouncementService
  ) {}

  ngOnInit() {
    this.fetchAnnouncement();
  }

  fetchAnnouncement() {
    const announcementId = this.route.snapshot.params['id'];
    this.apiService.getAnnouncement(announcementId).subscribe(
      (response: Announcement) => {
        this.announcement = response;
      },
      (error: any) => {
        // Handle error
        console.error(error);
      }
    );
  }
}
