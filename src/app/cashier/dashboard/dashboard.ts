import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierService } from '../services/cashier.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-cashier-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private cashierService = inject(CashierService);
  stats = this.cashierService.dashboardStats;
  today = new Date();

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'],
    datasets: [
      { data: [5, 12, 25, 18, 10, 30, 45, 20], label: 'Customer Traffic', borderColor: '#0d6efd', tension: 0.4, fill: true, backgroundColor: 'rgba(13, 110, 253, 0.1)' }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { display: false }, ticks: { display: false } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit() {
    this.cashierService.getDashboardStats().subscribe();
  }
}
