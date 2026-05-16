import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-security-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './security-navbar.html',
  styles: []
})
export class SecurityNavbarComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
