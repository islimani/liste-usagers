import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
