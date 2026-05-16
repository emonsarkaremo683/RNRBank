import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-banking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-banking.html',
  styles: []
})
export class MobileBankingComponent implements OnInit {
  wallets = [
    { id: 'WAL-1001', customerId: 'CUST-001', provider: 'bKash', phoneNumber: '+8801711001122', status: 'linked', balance: 5000 },
    { id: 'WAL-1002', customerId: 'CUST-002', provider: 'Nagad', phoneNumber: '+8801811001123', status: 'pending', balance: 0 }
  ];
  
  ngOnInit() {}
}
