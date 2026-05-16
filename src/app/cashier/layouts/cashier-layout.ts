import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cashier-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cashier-layout.html'
})
export class CashierLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser = this.authService.currentUser;
  isSidebarOpen = signal(true);

  menuItems = [
    { path: 'dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
    { path: 'deposits', icon: 'bi-cash-stack', label: 'Cash Deposits' },
    { path: 'withdrawals', icon: 'bi-bank', label: 'Cash Withdrawals' },
    { path: 'teller-queue', icon: 'bi-people-fill', label: 'Teller Queue' },
    { path: 'transfers', icon: 'bi-arrow-left-right', label: 'Cash Transfers' },
    { path: 'transactions', icon: 'bi-list-ul', label: 'Transactions' },
    { path: 'daily-summary', icon: 'bi-journal-check', label: 'Daily Summary' },
    { path: 'vault', icon: 'bi-safe2-fill', label: 'Vault Requests' },
    { path: 'customer-services', icon: 'bi-headset', label: 'Customer Services' },
    { path: 'notifications', icon: 'bi-bell-fill', label: 'Notifications' },
    { path: 'reports', icon: 'bi-file-earmark-bar-graph', label: 'Reports' }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
