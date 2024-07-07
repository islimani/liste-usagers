import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {User, UserService} from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource.data = users;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  goBack(): void {
    this.userService.goHome();
  }
}
