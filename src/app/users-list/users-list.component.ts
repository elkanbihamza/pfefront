import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from '../service/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'categories', 'is_responsible', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userapi: UserApiService, private dialog :MatDialog) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userapi.getUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
