import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private customerService = inject(CustomerService);

  customerData = this.customerService.customerData;
  accounts = this.customerService.accounts;
  transactions = this.customerService.transactions;

  // Chart Data
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { data: [6500, 5900, 8000, 8100, 5600, 5500], label: 'Income ($)', backgroundColor: '#198754', borderRadius: 4 },
      { data: [2800, 4800, 4000, 1900, 8600, 2700], label: 'Spending ($)', backgroundColor: '#dc3545', borderRadius: 4 }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      y: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit() {
    this.customerService.loadDashboardData().subscribe();
    this.customerService.getAccounts().subscribe();
    this.customerService.getTransactions(5).subscribe();
  }

  getTotalBalance(): number {
    return this.accounts().reduce((sum, acc) => sum + acc.balance, 0);
  }
}
