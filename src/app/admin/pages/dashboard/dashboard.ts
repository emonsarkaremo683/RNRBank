import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AdminService } from '../../services/admin.service';
import { ReportService } from '../../../core/services/report.service';
import { StatsCardComponent } from '../../components/stats-card/stats-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective, StatsCardComponent],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private adminService = inject(AdminService);
  private reportService = inject(ReportService);

  stats = this.adminService.dashboardStats;
  transactions = signal<any[]>([]);

  // Chart Data
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Transactions ($)',
        fill: true,
        tension: 0.4,
        borderColor: '#0a192f',
        backgroundColor: 'rgba(10, 25, 47, 0.1)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit() {
    this.adminService.getStats().subscribe();
    this.adminService.getTransactions(5).subscribe(data => this.transactions.set(data));
  }

  exportReport() {
    this.reportService.exportToPdf('statsContainer', 'Dashboard_Summary');
  }
}
