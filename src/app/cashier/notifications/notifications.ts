import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
      <i class="bi bi-bell text-warning opacity-25 display-1 mb-4"></i>
      <h3 class="fw-bold text-dark">Staff Notifications</h3>
      <p class="text-muted">Stay updated with vault approvals, manager alerts, and branch news.</p>
    </div>
  `
})
export class NotificationsComponent {}
