import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { CategoryApiService } from 'src/app/service/category.service';
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

  constructor(
    // private api: AnnouncementApiService,
    private formBuilder: FormBuilder,
    private catapi: CategoryApiService,
    private api : AnnouncementService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.announcementForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      imageInput: ['', [Validators.required]],
      categories: [],
      is_hidden: [false]
    });

    this.fetchCategories();
  }

  fetchCategories() {
    this.catapi.getCategories().subscribe(
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
      this.announcementForm.get('imageInput')?.setValue(file);
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileBase64 = e.target.result;
      this.announcementForm.get('imageInput')?.setValue(this.selectedFileBase64);
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

}
