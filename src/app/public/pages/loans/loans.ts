import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBankingService } from '../../../services/banking.service';
import { LoanOffer } from '../../../models/banking.models';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans.html'
})
export class LoansComponent implements OnInit {
  loans: LoanOffer[] = [];

  constructor(private bankingService: MockBankingService) {}

  ngOnInit(): void {
    this.bankingService.getLoanOffers().subscribe(data => {
      // Adding more mock loans for display
      this.loans = [
        ...data,
        { id: '3', type: 'personal', title: 'Express Personal Loan', interestRate: 10.5, maxAmount: 50000, tenure: 'Up to 5 years', description: 'Quick cash for your personal needs.', features: ['Instant disbursal', 'No collateral'] },
        { id: '4', type: 'education', title: 'Bright Future Loan', interestRate: 6.5, maxAmount: 200000, tenure: 'Up to 15 years', description: 'Finance your higher education.', features: ['Grace period', 'Tax benefits'] },
        { id: '5', type: 'business', title: 'SMB Growth Loan', interestRate: 9.0, maxAmount: 1000000, tenure: 'Up to 10 years', description: 'Scale your business to new heights.', features: ['Flexible repayment', 'Business advisory'] }
      ];
    });
  }
}
