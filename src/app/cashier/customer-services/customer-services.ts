import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
      <i class="bi bi-headset text-info opacity-25 display-1 mb-4"></i>
      <h3 class="fw-bold text-dark">Customer Support Tools</h3>
      <p class="text-muted">Process card blocks, account status changes, and general inquiries here.</p>
    </div>
  `
})
export class CustomerServicesComponent {}
