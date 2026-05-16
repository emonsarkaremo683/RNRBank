import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans.html',
  styles: []
})
export class LoansComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  
  loans = computed(() => {
    const loans = this.employeeService.loansList();
    const customers = this.employeeService.customersList();
    
    return loans.map(loan => ({
      ...loan,
      customerName: customers.find(c => c.id === loan.customerId)?.fullName || 'Unknown Customer',
      type: loan.purpose || 'Personal Loan'
    }));
  });

  ngOnInit() {
    forkJoin({
      loans: this.employeeService.getLoans(),
      customers: this.employeeService.getCustomers()
    }).subscribe();
  }

  approveLoan(id: string) {
    if (confirm('Approve this loan application?')) {
      this.employeeService.updateLoanStatus(id, 'approved').subscribe(() => {
        this.employeeService.getLoans().subscribe();
        this.employeeService.getDashboardStats().subscribe();
      });
    }
  }

  rejectLoan(id: string) {
    if (confirm('Reject this loan application?')) {
      this.employeeService.updateLoanStatus(id, 'rejected').subscribe(() => {
        this.employeeService.getLoans().subscribe();
        this.employeeService.getDashboardStats().subscribe();
      });
    }
  }
}
