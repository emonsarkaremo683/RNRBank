import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations.service';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styles: []
})
export class TransactionsComponent implements OnInit {
  private opsService = inject(OperationsService);
  private reportService = inject(ReportService);
  transactions: any[] = [];

  ngOnInit() {
    this.opsService.getTransactions(100).subscribe(data => this.transactions = data);
  }

  exportLedger() {
    this.reportService.exportToPdf('opsTxnContainer', 'Global_Transaction_Ledger');
  }
}
