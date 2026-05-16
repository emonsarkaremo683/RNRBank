import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  private opsService = inject(OperationsService);

  stats = this.opsService.dashboardStats;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1200, 1500, 1400, 1800, 1600, 1900, 2100],
        label: 'Daily Transactions',
        fill: true,
        tension: 0.4,
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.1)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit() {
    this.opsService.getDashboardStats().subscribe();
  }
}
