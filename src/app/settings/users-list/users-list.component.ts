import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserApiService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['fname', 'lname', 'email', 'belongs_to', 'is_responsible_of', 'is_responsible', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userapi: UserApiService, private dialog: MatDialog) {
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
      console.log(data);
      this.dataSource.data = data;
    });
  }

  toggleUserActive(user: any) {
    const updatedUser = { ...user };
    updatedUser.is_active = !updatedUser.is_active;
    this.userapi.updateUser(updatedUser)
      .subscribe(
        (response) => {
          this.refreshUsersTable();
        },
        (error) => {
          console.log(error);
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

    const dialogRef = this.dialog.open(CreateUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.refreshUsersTable();
      }
    });
  }

  openEditDialog(row: User): void {
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      data:{
        user: row,
        title : 'Modifiez cet utilisateur'
      },
      panelClass: 'dialog' // Add a custom CSS class to the dialog
    };

    const dialogRef = this.dialog.open(CreateUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.refreshUsersTable();
      }
    });
  }


  refreshUsersTable(): void {
    this.userapi.getUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
