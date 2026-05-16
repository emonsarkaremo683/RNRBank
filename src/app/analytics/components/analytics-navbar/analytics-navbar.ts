import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-analytics-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './analytics-navbar.html',
  styles: []
})
export class AnalyticsNavbarComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
