import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support.html'
})
export class SupportComponent implements OnInit {
  tickets = [
    { id: 'TCK-001', subject: 'Card Not Working', status: 'open', date: '2026-05-15', description: 'My Visa credit card is being declined at POS terminals.' },
    { id: 'TCK-002', subject: 'Transaction Failed', status: 'resolved', date: '2026-05-10', description: 'Amount deducted but transfer failed.' }
  ];

  ngOnInit() {}
}
