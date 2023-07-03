import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, OnInit} from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import { Category } from 'src/app/models/category.model';
import { CategoryApiService } from 'src/app/service/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {
  
  treeControl = 
    new NestedTreeControl<Category>(node => node.subcategories);
    dataSource!: MatTreeNestedDataSource<Category>;

  ngOnInit(): void {
   this.fetchCategories();
  }

  constructor(private api : CategoryApiService, private dialog: MatDialog) {
    this.dataSource = new MatTreeNestedDataSource<Category>();
  }

  hasChild = (_: number, node: Category) =>
    !!node.subcategories && node.subcategories.length > 0;

    fetchCategories() {
      this.api.getCategories().subscribe((data: Category[]) => {
        console.log(data);
        this.dataSource.data = data;
      });
    }

    openDialog(): void {
      const dialogConfig: MatDialogConfig = {
        width: '500px',
        data : {
          title: 'Créez une nouvelle catégorie'
        },
        panelClass: 'dialog'
      };
  
      const dialogRef = this.dialog.open(CreateCategoryComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result) {
          this.refreshCategoriesTable();
        }
      });
    }

    openEditDialog(node: Category): void {
      const dialogConfig: MatDialogConfig = {
        width: '500px',
        data:{
          category: node,
          title : 'Modifiez cette catégorie',
          isEdit: true
        },
        panelClass: 'dialog' // Add a custom CSS class to the dialog
      };
  
      const dialogRef = this.dialog.open(CreateCategoryComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result) {
          this.refreshCategoriesTable();
        }
      });
    }

    refreshCategoriesTable(): void {
      this.api.getCategories().subscribe((data: Category[]) => {
        this.dataSource.data = data;
      });
    }
}


