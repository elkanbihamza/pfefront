// schedule-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent {
  selectedDate!: Date;
  selectedTime!: string;

  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>) { }
}
