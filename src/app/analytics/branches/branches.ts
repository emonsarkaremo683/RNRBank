import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './branches.html'
})
export class BranchesComponent implements OnInit {
  public branchRevenueData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Motijheel', 'Gulshan', 'Agrabad', 'Uttara', 'Dhanmondi'],
    datasets: [{ data: [450, 380, 310, 250, 220], label: 'Revenue (k)', backgroundColor: '#0dcaf0' }]
  };

  ngOnInit() {}
}
