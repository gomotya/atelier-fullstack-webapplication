import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <style>
    button, mat-form-field{
      margin-left: 15px;
    }
  </style>
    <div>
      <h2>Авторизация</h2>
      <form (ngSubmit)="onLogin()">
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input matInput [(ngModel)]="username" name="username" required>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input matInput [(ngModel)]="password" name="password" type="password" required>
        </mat-form-field>
        <button mat-raised-button type="submit">Войти</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('username', response.username);
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Login failed');
      }
    );
  }
}
