import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-daily-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-summary.html'
})
export class DailySummaryComponent implements OnInit {
  private cashierService = inject(CashierService);
  stats = this.cashierService.dashboardStats;
  today = new Date();

  ngOnInit() {
    this.cashierService.getDashboardStats().subscribe();
  }
}
