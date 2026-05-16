import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  private securityService = inject(SecurityService);

  stats = this.securityService.dashboardStats;

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Fraud', 'AML', 'Compliance', 'Device'],
    datasets: [{
      data: [300, 500, 100, 200],
      backgroundColor: ['#dc3545', '#0d6efd', '#ffc107', '#198754']
    }]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  ngOnInit() {
    this.securityService.getDashboardStats().subscribe();
  }
}
