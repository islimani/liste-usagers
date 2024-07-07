import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>('https://gorest.co.in/public/v2/users')
      .subscribe(users => {
        this.dataSource.data = users;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
