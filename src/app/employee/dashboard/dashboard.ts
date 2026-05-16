import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  stats = this.employeeService.dashboardStats;
  recentTransactions = signal<any[]>([]);
  pendingKyc = this.employeeService.kycRequests;
  
  pendingLoans = computed(() => {
    const loans = this.employeeService.loansList().filter(l => l.status === 'pending');
    const customers = this.employeeService.customersList();
    return loans.map(l => ({
      ...l,
      customerName: customers.find(c => c.id === l.customerId)?.fullName || 'Unknown Customer'
    }));
  });

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { data: [45, 60, 80, 50, 90, 110, 70], label: 'Daily Transactions (k)', backgroundColor: '#0d6efd', borderRadius: 4 },
      { data: [20, 40, 60, 30, 70, 80, 50], label: 'Cash Operations (k)', backgroundColor: '#ffc107', borderRadius: 4 }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      y: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit() {
    this.employeeService.getDashboardStats().subscribe();
    this.employeeService.getTransactions(5).subscribe(data => this.recentTransactions.set(data.slice(0, 5)));
    this.employeeService.getPendingKyc().subscribe();
    this.employeeService.getLoans().subscribe();
    this.employeeService.getCustomers().subscribe();
  }

  approveLoan(loanId: string) {
    if (confirm('Are you sure you want to approve this loan?')) {
      this.employeeService.updateLoanStatus(loanId, 'approved').subscribe(() => {
        this.employeeService.getLoans().subscribe();
        this.employeeService.getDashboardStats().subscribe();
      });
    }
  }

  rejectLoan(loanId: string) {
    if (confirm('Are you sure you want to reject this loan?')) {
      this.employeeService.updateLoanStatus(loanId, 'rejected').subscribe(() => {
        this.employeeService.getLoans().subscribe();
        this.employeeService.getDashboardStats().subscribe();
      });
    }
  }
}
