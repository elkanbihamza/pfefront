import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryApiService } from '../../service/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm! : FormGroup;
  categoryData: any;
  categories: Category[] = [];
  flatCategories: Category[] = [];
  selectedCategory: string[] = [];
  title!: string;
  isEdit!: boolean;

  constructor(
    private api: CategoryApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.categoryData = data.category;
  }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;

    this.categoryForm = this.formBuilder.group({
      code: [this.categoryData?.code || '', this.isEdit ? [] : [Validators.required]],
      title: [this.categoryData?.title || '', [Validators.required]],
      ParentCategory: [this.categoryData?.ParentCategory || [], this.isEdit ? [] : Validators.required]
    });

    if (this.isEdit) {
      this.categoryForm.controls['code'].enable();
      this.categoryForm.controls['ParentCategory'].disable();
    }

    this.title = this.data.title;
    this.fetchCategories();
  }

  onSubmit(): void {
    console.log(this.categoryForm.value);
    const categoryData = this.categoryForm.value;
  
    if (categoryData.code && categoryData.code.trim().length > 0) {
      categoryData.ParentCategory = this.categoryData.ParentCategory;
      this.api.updateCategory(categoryData).subscribe(
        response => {
          console.log('Update successful:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.api.createCategory(categoryData).subscribe(
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
    this.api.getCategories().subscribe(
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

  onCancel(): void {
    this.dialogRef.close();
  }
}
