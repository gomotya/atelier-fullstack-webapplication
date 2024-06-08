import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService, LoginResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private loggedInUser: string | null = null;

  
  constructor(private http: HttpClient, private router: Router) {
    this.getCurrentUser().subscribe(user => {
      if (user) {
        this.loggedInUser = user.username;
      }
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true }).pipe(
      map(response => {
        this.loggedInUser = response.username;
        return response;
      })
    );
  }
  

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.loggedInUser = null;
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    });
  }

  get isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  get username(): string | null {
    return this.loggedInUser;
  }

  private getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-user`, { withCredentials: true }).pipe(
      catchError(() => of(null))
    );
  }
}
