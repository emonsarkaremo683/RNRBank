import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styles: []
})
export class ReportsComponent implements OnInit {
  reportsList = [
    { title: 'Daily Branch Transaction Summary', desc: 'Comprehensive list of all successful and failed transactions.', date: 'Today' },
    { title: 'Monthly KYC Approval Report', desc: 'Metrics on verification times and rejection reasons.', date: 'Last 30 Days' },
    { title: 'ATM Cash Depletion Log', desc: 'Predictive analysis on cash withdrawal patterns.', date: 'Weekly' },
    { title: 'Loan Disbursement Ledger', desc: 'Total disbursed amount against assigned loan limits.', date: 'Monthly' }
  ];
  ngOnInit() {}
}
