import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html'
})
export class TransactionsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private reportService = inject(ReportService);
  transactions = signal<any[]>([]);

  ngOnInit() {
    this.employeeService.getTransactions(100).subscribe(data => this.transactions.set(data));
  }

  exportLedger() {
    this.reportService.exportToPdf('empTxnContainer', 'Branch_Transaction_Ledger');
  }
}
