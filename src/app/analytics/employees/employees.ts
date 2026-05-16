import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './employees.html'
})
export class EmployeesComponent implements OnInit {
  public performanceChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['KYC', 'Loans', 'Cash', 'Support', 'Compliance'],
    datasets: [
      { data: [85, 90, 75, 95, 80], label: 'Main Branch Avg', borderColor: '#0d6efd', backgroundColor: 'rgba(13, 110, 253, 0.2)' },
      { data: [70, 85, 90, 80, 75], label: 'Gulshan Avg', borderColor: '#198754', backgroundColor: 'rgba(25, 135, 84, 0.2)' }
    ]
  };

  ngOnInit() {}
}
