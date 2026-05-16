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
    { title: 'Anti-Money Laundering (AML) Weekly Summary', type: 'Regulatory', date: 'May 15, 2026', desc: 'Summary of high-value transactions and detected AML alerts.' },
    { title: 'Global Threat Analysis Report', type: 'Security', date: 'May 10, 2026', desc: 'Forensic breakdown of blocked attacks and IP blacklisting metrics.' },
    { title: 'Monthly Compliance Audit', type: 'Compliance', date: 'April 2026', desc: 'Policy violation metrics and mitigation status for the entire month.' },
    { title: 'User Identity & Authentication Audit', type: 'Audit', date: 'Quarterly', desc: 'Analysis of login patterns, MFA adoption, and identity theft prevention.' }
  ];

  ngOnInit() {}
}
