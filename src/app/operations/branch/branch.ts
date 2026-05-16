import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch.html',
  styles: []
})
export class BranchComponent implements OnInit, OnDestroy {
  branchData = signal<any>({
    name: 'Motijheel Main Branch',
    code: '001',
    manager: 'Farhana Yasmin',
    totalCustomers: 4500,
    dailyRevenue: 250000,
    staffOnline: 24,
    status: 'Operational'
  });

  private interval: any;

  ngOnInit() {
    // Simulate real-time branch data updates
    this.interval = setInterval(() => {
      this.branchData.update(current => ({
        ...current,
        totalCustomers: current.totalCustomers + Math.floor(Math.random() * 3),
        dailyRevenue: current.dailyRevenue + Math.floor(Math.random() * 5000),
        staffOnline: 20 + Math.floor(Math.random() * 10)
      }));
    }, 5000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}
