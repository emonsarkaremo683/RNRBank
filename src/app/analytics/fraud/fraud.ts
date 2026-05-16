import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-fraud',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './fraud.html'
})
export class FraudComponent implements OnInit {
  public riskChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Suspicious Login', 'High-Value Transfer', 'Unknown Device', 'Frequent Failed Pins'],
    datasets: [{ data: [45, 12, 28, 65], label: 'Alert Count', backgroundColor: '#dc3545' }]
  };

  ngOnInit() {}
}
