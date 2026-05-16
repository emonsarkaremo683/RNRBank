import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './customer-sidebar.html'
})
export class CustomerSidebarComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  isPremium(): boolean {
    const user = this.currentUser();
    return !!user?.isPremium;
  }

  logout() {
    this.authService.logout();
  }
}
