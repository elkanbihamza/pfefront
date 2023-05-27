import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface UserData {
  id: number;
  fname: string;
  lname: string;
  email: string;
  is_responsible: boolean;
  categories: string[];
  is_active: boolean;
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'categories', 'is_responsible', 'is_active'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor() {
    // Initialize the dataSource with data
    const tableData: UserData[] = [
      {"id":1,"lname":"Hamza","fname":"Aboutaleb","email":"hamza1@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":2,"lname":"Hamza","fname":"El Kanbi","email":"hamza2@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":3,"lname":"Hamza","fname":"Aboutaleb","email":"hamza3@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":4,"lname":"Hamza","fname":"El ","email":"hamza4@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":5,"lname":"Hamza","fname":"","email":"hamza5@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":6,"lname":"Hamza","fname":"Aboutaleb","email":"hamza1@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":7,"lname":"Hamza","fname":"El Kanbi","email":"hamza2@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":8,"lname":"Hamza","fname":"Aboutaleb","email":"hamza3@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":9,"lname":"Hamza","fname":"El ","email":"hamza4@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":10,"lname":"Hamza","fname":"","email":"hamza5@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":11,"lname":"Hamza","fname":"Aboutaleb","email":"hamza1@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":12,"lname":"Hamza","fname":"El Kanbi","email":"hamza2@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":13,"lname":"Hamza","fname":"Aboutaleb","email":"hamza3@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":14,"lname":"Hamza","fname":"El ","email":"hamza4@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":15,"lname":"Hamza","fname":"","email":"hamza5@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":16,"lname":"Hamza","fname":"Aboutaleb","email":"hamza1@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":17,"lname":"Hamza","fname":"El Kanbi","email":"hamza2@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":18,"lname":"Hamza","fname":"Aboutaleb","email":"hamza3@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      {"id":19,"lname":"Hamza","fname":"El ","email":"hamza4@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":true,"is_active":false},
      {"id":20,"lname":"Hamza","fname":"","email":"hamza5@gmail.com","categories":["SMIA","SMI","S1"],"is_responsible":false,"is_active":true},
      // Add more data entries as needed
    ];
    this.dataSource = new MatTableDataSource<UserData>(tableData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

