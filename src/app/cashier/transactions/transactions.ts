import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html'
})
export class TransactionsComponent implements OnInit {
  private cashierService = inject(CashierService);
  transactions = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading.set(true);
    this.cashierService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-success bg-opacity-10 text-success';
      case 'pending': return 'bg-warning bg-opacity-10 text-warning';
      case 'failed': return 'bg-danger bg-opacity-10 text-danger';
      default: return 'bg-light text-dark';
    }
  }
}
