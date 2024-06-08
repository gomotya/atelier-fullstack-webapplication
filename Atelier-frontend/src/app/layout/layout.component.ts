import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(public AuthService: AuthService) {}

  onLogout(): void {
    this.AuthService.logout();
  }
}
