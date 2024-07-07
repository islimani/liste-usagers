import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  // fetchUsers() {
  //   this.http.get<any[]>('https://gorest.co.in/public/v2/users')
  //     .subscribe(
  //       (response) => {
  //         this.users = response;
  //       },
  //       (error) => {
  //         console.error('Error fetching users:', error);
  //       }
  //     );
  // }

  fetchUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://gorest.co.in/public/v2/users');
  }
}
