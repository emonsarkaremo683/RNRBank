import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './customers.html'
})
export class CustomersComponent implements OnInit {
  public growthChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [1000, 1500, 1200, 2400, 3100, 4500], label: 'New Users', fill: true, borderColor: '#0d6efd' }]
  };

  public segmentChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Retail', 'Business', 'Premium', 'Student'],
    datasets: [{ data: [60, 15, 10, 15], backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#0dcaf0'] }]
  };

  ngOnInit() {}
}
