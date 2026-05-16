import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html'
})
export class ReportsComponent implements OnInit {
  adminReports = [
    { title: 'Consolidated Branch Revenue', type: 'Financial', scope: 'Global', date: 'Monthly' },
    { title: 'Global Staff Performance Analytics', type: 'HR', scope: 'Internal', date: 'Quarterly' },
    { title: 'System Security & Forensic Logs', type: 'Security', scope: 'System', date: 'Real-time' },
    { title: 'Fraud & AML Intelligence Report', type: 'Compliance', scope: 'Legal', date: 'Monthly' },
    { title: 'Loan Recovery & Default Portfolio', type: 'Credit', scope: 'Risk', date: 'Monthly' },
    { title: 'ATM Network Utilization Ledger', type: 'Operations', scope: 'Global', date: 'Weekly' }
  ];

  ngOnInit() {}
}
