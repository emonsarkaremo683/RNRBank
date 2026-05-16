import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html',
  styles: []
})
export class AccountsComponent implements OnInit {
  private opsService = inject(OperationsService);
  accounts: any[] = [];

  ngOnInit() {
    this.opsService.getAccounts().subscribe(data => {
      // Mock data if empty
      if(data.length === 0) {
        this.accounts = [
          { id: 'ACC-1001', accountNumber: '10052249802', customerName: 'Ahmed Ullah', type: 'Savings', balance: 75000, status: 'active' },
          { id: 'ACC-1002', accountNumber: '30052249806', customerName: 'Farhana Yasmin', type: 'Current', balance: 120500, status: 'active' },
          { id: 'ACC-1003', accountNumber: '40052249807', customerName: 'Abdul Karim', type: 'Business', balance: 500000, status: 'frozen' }
        ];
      } else {
        // Just map from db.json
        this.accounts = data.map((acc: any) => ({
           id: acc.id,
           accountNumber: acc.accountNumber,
           customerName: 'Customer', // Would join in real app
           type: 'Savings',
           balance: acc.balance,
           status: acc.status
        }));
      }
    });
  }
}
