import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html'
})
export class CustomersComponent implements OnInit {
  private adminService = inject(AdminService);
  customers = signal<any[]>([]);

  ngOnInit() {
    this.adminService.getCustomers().subscribe(data => this.customers.set(data));
  }
}
