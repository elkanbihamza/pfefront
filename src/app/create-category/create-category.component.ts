import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryApiService } from '../service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm! : FormGroup;
  categoryData: any;

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
      id: [this.categoryData?.id || ''],
      code: [this.categoryData?.code || '', [Validators.required]],
      title: [this.categoryData?.title || '', [Validators.required]]
    });
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

  onCancel(): void {
    this.dialogRef.close();
  }
}
