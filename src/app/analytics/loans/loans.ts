import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './loans.html'
})
export class LoansComponent implements OnInit {
  public loanTypeData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Home', 'Car', 'Personal', 'Business', 'Education'],
    datasets: [{ data: [45, 15, 20, 15, 5], backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#0dcaf0', '#6f42c1'] }]
  };

  public repaymentData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [98.5, 98.2, 97.8, 98.9, 99.1, 98.4], label: 'Repayment %', borderColor: '#198754', tension: 0.4 }]
  };

  ngOnInit() {}
}
