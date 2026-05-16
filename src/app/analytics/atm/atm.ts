import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-atm',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './atm.html'
})
export class AtmComponent implements OnInit {
  public uptimeChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15'],
    datasets: [{ data: [99.5, 99.2, 98.4, 99.8, 99.9, 99.7], label: 'Global Uptime %', borderColor: '#0dcaf0', fill: true }]
  };

  ngOnInit() {}
}
