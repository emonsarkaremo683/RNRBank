import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-intelligence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-intelligence.html',
  styles: []
})
export class BusinessIntelligenceComponent implements OnInit {
  kpis = [
    { label: 'Customer Retention Rate', value: '94.2%', target: '92.0%', status: 'success' },
    { label: 'Net Promoter Score (NPS)', value: '78', target: '75', status: 'success' },
    { label: 'Cost to Income Ratio', value: '42.5%', target: '45.0%', status: 'warning' },
    { label: 'Average Transaction Time', value: '1.2s', target: '1.5s', status: 'success' },
    { label: 'MFA Adoption Rate', value: '88.5%', target: '95.0%', status: 'danger' }
  ];

  ngOnInit() {}
}
