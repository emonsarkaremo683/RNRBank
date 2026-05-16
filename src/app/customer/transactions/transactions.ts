import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ReportService } from '../../core/services/report.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html'
})
export class TransactionsComponent implements OnInit {
  private customerService = inject(CustomerService);
  private reportService = inject(ReportService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  transactions = signal<any[]>([]);
  
  showTransferModal = signal(false);
  transferData = {
    toAccount: '',
    amount: 0,
    remarks: ''
  };
  transferSuccess = signal(false);

  ngOnInit() {
    // Load more transactions for the main list
    this.customerService.getTransactions(50).subscribe(data => this.transactions.set(data));
    
    // Check for transfer query params
    this.route.queryParams.subscribe(params => {
      if (params['transferTo']) {
        this.openTransferModal();
        this.transferData.toAccount = params['transferTo'];
      }
    });
  }

  exportTransactions() {
    this.reportService.exportToPdf('txnTableContainer', 'Transaction_History');
  }

  openTransferModal() {
    this.showTransferModal.set(true);
    this.transferSuccess.set(false);
    this.transferData = { toAccount: '', amount: 0, remarks: '' };
  }

  closeTransferModal() {
    this.showTransferModal.set(false);
  }

  submitTransfer() {
    if (!this.transferData.toAccount || this.transferData.amount <= 0) return;
    
    const newTxn = {
      transactionReference: 'RNRB-TXN-' + Math.floor(10000 + Math.random() * 90000),
      senderAccountId: 'ACC-001',
      receiverAccountId: this.transferData.toAccount,
      amount: this.transferData.amount,
      charge: 0,
      transactionType: 'TRANSFER',
      status: 'completed',
      remarks: this.transferData.remarks || 'Money Transfer',
      createdAt: new Date().toISOString()
    };
    
    this.http.post('http://localhost:3000/transactions', newTxn).subscribe(() => {
      this.transferSuccess.set(true);
      // Reload transactions
      this.customerService.getTransactions(50).subscribe(data => this.transactions.set(data));
      setTimeout(() => this.closeTransferModal(), 2000);
    });
  }
}
