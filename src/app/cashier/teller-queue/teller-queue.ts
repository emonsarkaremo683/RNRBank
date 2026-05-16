import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-teller-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teller-queue.html'
})
export class TellerQueueComponent implements OnInit {
  private cashierService = inject(CashierService);
  queue = this.cashierService.tellerQueue;
  stats = this.cashierService.dashboardStats;

  ngOnInit() {
    this.cashierService.getQueue().subscribe();
  }

  getQueueByStatus(status: string) {
    return this.queue().filter(q => q.status === status);
  }

  serveCustomer(id: string) {
    this.cashierService.updateQueueStatus(id, 'serving').subscribe(() => {
      this.cashierService.getQueue().subscribe();
    });
  }

  completeService(id: string) {
    this.cashierService.updateQueueStatus(id, 'completed').subscribe(() => {
      this.cashierService.getQueue().subscribe();
    });
  }

  skipCustomer(id: string) {
    this.cashierService.updateQueueStatus(id, 'skipped').subscribe(() => {
      this.cashierService.getQueue().subscribe();
    });
  }
}
