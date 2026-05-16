import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
      <i class="bi bi-file-earmark-bar-graph text-primary opacity-25 display-1 mb-4"></i>
      <h3 class="fw-bold text-dark">Cashier Operational Reports</h3>
      <p class="text-muted">Access detailed logs, reconciliation reports, and audit trails here.</p>
    </div>
  `
})
export class ReportsComponent {}
