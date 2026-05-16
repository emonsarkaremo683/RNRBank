import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './executive-dashboard.html',
  styles: []
})
export class ExecutiveDashboardComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);

  stats = this.analyticsService.executiveStats;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [450, 480, 520, 510, 580, 620],
        label: 'Revenue (M)',
        fill: true,
        tension: 0.4,
        borderColor: '#0dcaf0',
        backgroundColor: 'rgba(13, 202, 240, 0.1)'
      },
      {
        data: [120, 140, 150, 145, 170, 190],
        label: 'Profit (M)',
        fill: true,
        tension: 0.4,
        borderColor: '#198754',
        backgroundColor: 'rgba(25, 135, 84, 0.1)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit() {
    this.analyticsService.getExecutiveStats().subscribe();
  }
}
