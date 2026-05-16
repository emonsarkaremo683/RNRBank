import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './employee-sidebar.html',
  host: {
    'class': 'offcanvas-lg offcanvas-start bg-primary bg-gradient text-white border-end shadow',
    'id': 'employeeSidebar',
    'style': 'width: 280px; min-height: 100vh;'
  }
})
export class EmployeeSidebarComponent {
  private authService = inject(AuthService);

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  logout() {
    this.authService.logout();
  }
}
