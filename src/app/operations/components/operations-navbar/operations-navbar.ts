import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-operations-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './operations-navbar.html',
  styles: []
})
export class OperationsNavbarComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
