import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryApiService } from '../service/category.service';
import { Category } from '../models/category.model';

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

  constructor(
    private api: CategoryApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryData = data.category;
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      code_categorie: [this.categoryData?.code_categorie || '', [Validators.required]],
      titre_categorie: [this.categoryData?.titre_categorie || '', [Validators.required]],
      code_categorie_1: [this.categoryData?.code_categorie_1 || '', [Validators.required]]
    });
    this.fetchCategories();
  }

  onSubmit(): void {
    console.log(this.categoryForm.value);
    const categorydata = this.categoryForm.value;
    if (categorydata.id) {
      this.api.updateCategory(categorydata).subscribe(
        response => {
          console.log('Update successful:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.api.createCategory(categorydata).subscribe(
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
