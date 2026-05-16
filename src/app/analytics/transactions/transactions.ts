import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './transactions.html'
})
export class TransactionsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  
  public txnVolumeData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [1200, 1500, 1800, 1400, 2100, 900, 800], label: 'Txn Count', backgroundColor: '#0d6efd' }]
  };

  public txnTypeData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Deposit', 'Withdrawal', 'Transfer'],
    datasets: [{ data: [45, 25, 30], backgroundColor: ['#198754', '#dc3545', '#0dcaf0'] }]
  };

  ngOnInit() {}
}
