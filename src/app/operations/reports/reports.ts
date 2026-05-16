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
  reports = [
    { title: 'Transaction Flow Analytics', type: 'Financial', date: 'Monthly', desc: 'Detailed breakdown of all global transactions and associated fees.' },
    { title: 'Account Growth Report', type: 'Performance', date: 'Quarterly', desc: 'Metrics on new account openings vs closures.' },
    { title: 'Teller Cash Summary', type: 'Operations', date: 'Daily', desc: 'End of day reconciliation and vault balance.' },
    { title: 'KYC Compliance Report', type: 'Audit', date: 'Weekly', desc: 'Pending verifications and rejection statistics.' }
  ];

  ngOnInit() {}
}
