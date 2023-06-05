import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../models/category.model';
import { CategoryApiService } from '../service/category.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;
  title!: string;
  userData: any;
  categories: Category[] = [];
  flatCategories: Category[] = [];
  selectedCategory: string[] = [];

  constructor(
    private userapi: UserApiService,
    private catapi: CategoryApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data.user;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [this.userData?.id || ''],
      fname: [this.userData?.fname || '', Validators.required],
      lname: [this.userData?.lname || '', Validators.required],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      belongs_to: [this.userData?.belongs_to || '', Validators.required],
      is_responsible_of: [this.userData?.is_responsible_of || '', Validators.required],
      is_responsible: [this.userData?.is_responsible || false, Validators.required],
      is_active: [this.userData?.is_active || true],
    });
    this.fetchCategories();
    this.title = this.data.title;
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    const userdata = this.userForm.value;
    if (userdata.id) {
      this.userapi.updateUser(userdata).subscribe(
        response => {
          console.log('Update successful:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.userapi.createUser(userdata).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
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
      if (category.children.length > 0) {
        this.flattenCategories(category.children);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get showCategoryControl(): FormControl {
    return this.userForm.get('is_responsible') as FormControl;
  }
}
