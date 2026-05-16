import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './financial.html'
})
export class FinancialComponent implements OnInit {
  public revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
    datasets: [{ data: [150, 220, 310, 280, 420, 452], label: 'Annual Revenue (M)', fill: true, borderColor: '#0dcaf0' }]
  };

  public profitChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{ data: [35, 42, 28, 55], label: 'Quarterly Profit (M)', backgroundColor: '#198754' }]
  };

  ngOnInit() {}
}
