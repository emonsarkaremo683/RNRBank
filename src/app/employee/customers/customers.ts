import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html'
})
export class CustomersComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  searchTerm = signal('');
  showAddModal = signal(false);
  isSubmitting = signal(false);
  
  customers = computed(() => {
    const list = this.employeeService.customersList();
    const search = this.searchTerm().toLowerCase();
    if (!search) return list;
    return list.filter(c => 
      c.fullName?.toLowerCase().includes(search) || 
      c.id?.toLowerCase().includes(search) ||
      c.email?.toLowerCase().includes(search)
    );
  });

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.employeeService.getCustomers().subscribe();
  }

  onSearch(event: any) {
    this.searchTerm.set(event.target.value);
  }

  onAddCustomer(formData: any) {
    this.isSubmitting.set(true);
    const payload = {
      ...formData,
      id: 'CUST-' + Math.floor(Math.random() * 10000),
      status: 'active',
      createdAt: new Date().toISOString()
    };
    this.employeeService.createCustomer(payload).subscribe(() => {
      this.loadCustomers();
      this.showAddModal.set(false);
      this.isSubmitting.set(false);
    });
  }

  viewCustomer(id: string) {
    alert('Directing to full customer profile for: ' + id);
  }

  updateStatus(id: string, status: string) {
    this.employeeService.updateCustomerStatus(id, status).subscribe(() => this.loadCustomers());
  }
}
