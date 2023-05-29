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
export class CategoriesListComponent {


  displayedColumns: string[] = ['code', 'title', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: CategoryApiService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Category>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.api.getCategories().subscribe((data: Category[]) => {
      this.dataSource.data = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.refreshUsersTable();
      }
    });
  }

  openEditDialog(row: Category): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: row // Pass the row data to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.refreshUsersTable();
      }
    });
  }


  refreshUsersTable(): void {
    this.api.getCategories().subscribe((data: Category[]) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
