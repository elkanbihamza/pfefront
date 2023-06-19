import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Category } from '../models/category.model';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryApiService } from '../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code_categorie', 'titre_categorie', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: CategoryApiService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Category>();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.api.getCategories().subscribe((data: Category[]) => {
      this.dataSource.data = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: {
        isEditing: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.refreshCategoriesTable();
      }
    });
  }

  openEditDialog(row: Category): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: {
        isEditing: true,
        category : row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.refreshCategoriesTable();
      }
    });
  }

  refreshCategoriesTable(): void {
    this.fetchCategories();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
