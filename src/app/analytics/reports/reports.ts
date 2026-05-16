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
  analyticsReports = [
    { title: 'Global Revenue Ledger', type: 'Financial', date: 'Monthly', desc: 'Detailed breakdown of revenue sources, fees, and interest income.' },
    { title: 'Customer Segmentation Analytics', type: 'Marketing', date: 'Quarterly', desc: 'Behavioral analysis and demographic breakdown of our user base.' },
    { title: 'ATM Performance & Downtime', type: 'Operations', date: 'Weekly', desc: 'Technical health metrics and maintenance logs for the ATM network.' },
    { title: 'AML Threat Intelligence', type: 'Security', date: 'Real-time', desc: 'Analysis of suspicious transaction patterns and money laundering risks.' },
    { title: 'Loan Portfolio Health', type: 'Credit', date: 'Monthly', desc: 'Recovery rates, defaulting trends, and credit risk assessments.' },
    { title: 'Branch Efficiency Scorecard', type: 'Internal', date: 'Monthly', desc: 'Ranking branches by revenue, customer satisfaction, and operational costs.' }
  ];

  ngOnInit() {}
}
