import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html'
})
export class AccountsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  accounts = signal<any[]>([]);
  showOpenModal = signal(false);
  isSubmitting = signal(false);

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.employeeService.getAccounts().subscribe(data => this.accounts.set(data));
  }

  onOpenAccount(formData: any) {
    this.isSubmitting.set(true);
    const payload = {
      ...formData,
      id: 'ACC-' + Math.floor(Math.random() * 1000000),
      status: 'active'
    };
    this.employeeService.createAccount(payload).subscribe(() => {
      this.loadAccounts();
      this.showOpenModal.set(false);
      this.isSubmitting.set(false);
    });
  }

  updateStatus(id: string, status: string) {
    this.employeeService.updateAccountStatus(id, status).subscribe(() => this.loadAccounts());
  }
}
