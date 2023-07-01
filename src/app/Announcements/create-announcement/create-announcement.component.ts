import { Announcement } from './../../models/announcement.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { CategoryApiService } from 'src/app/service/category.service';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';
//import { AnnouncementApiService } from '../service/announcement.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {
  announcementForm!: FormGroup;
  selectedFile: any;
  selectedFileName: string | undefined;
  selectedFileBase64: string | ArrayBuffer | null = null;
  categories: Category[] = [];
  flatCategories: Category[] = [];
  selectedCategory: string[] = [];
  announcementData: any ;
  

  constructor(
    private dialog: MatDialog,
    // private api: AnnouncementApiService,
    private formBuilder: FormBuilder,
    private catapi: CategoryApiService,
    private api : AnnouncementService,
    private router : Router,
    @Inject() public data: any
  ) {
    this.announcementData = data.Announcement;
   }

  ngOnInit(): void {
    this.announcementForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: []
    });

    this.fetchCategories();
  }

  fetchCategories() {
    this.catapi.getOwnCategories().subscribe(
      categories => {
        this.categories = categories;
        this.flattenCategories(categories);
      },
      error => {
        console.log('Error fetching categories:', error);
      }
    );
  }

  flattenCategories(categories: Category[]) {
    for (const category of categories) {
      this.flatCategories.push(category);
      if (category.subcategories.length > 0) {
        this.flattenCategories(category.subcategories);
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.announcementForm.get('image')?.setValue(file);
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileBase64 = e.target.result;
      this.announcementForm.get('image')?.setValue(this.selectedFileBase64);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    console.log(this.announcementForm.value);
    const announcementData = this.announcementForm.value;
    this.api.createAnnouncement(announcementData).subscribe(
      response => {
        console.log('Registration successful:', response);
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
    this.router.navigate(['/annonces']);
  }

  onFileSelect(event : any){
    const file = event.target.files[0];
    this.announcementForm.get('image')?.setValue(file);
  }

  submit() {
    const formData = new FormData();
    formData.append('title', this.announcementForm.get('title')?.value);
    formData.append('category', JSON.stringify(this.announcementForm.get('category')?.value));
    formData.append('body', this.announcementForm.get('body')?.value);
    formData.append('file', this.announcementForm.get('image')?.value);

    formData.forEach((value, key) => {
      console.log(key, value);
    })

    this.api.createAnnouncement(formData).subscribe(
      response => {
        console.log('Success:', response);
        this.router.navigate(['/annonces']);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  openDialog(): void {
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      data : {
        title: 'Créez un nouvel utilisateur'
      },
      panelClass: 'dialog'
    };

    const dialogRef = this.dialog.open(ScheduleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

}
