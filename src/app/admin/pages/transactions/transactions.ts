import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html'
})
export class TransactionsComponent implements OnInit {
  private adminService = inject(AdminService);
  transactions = signal<any[]>([]);

  ngOnInit() {
    this.adminService.getTransactions(100).subscribe(data => this.transactions.set(data));
  }
}
