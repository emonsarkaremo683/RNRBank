import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loans.html'
})
export class LoansComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  
  loans = this.customerService.loans;
  accounts = this.customerService.accounts;

  loanForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);
  showApplyModal = signal(false);

  constructor() {
    this.loanForm = this.fb.group({
      loanType: ['Personal Loan', Validators.required],
      amount: [null, [Validators.required, Validators.min(1000)]],
      tenure: [12, [Validators.required, Validators.min(6)]],
      purpose: ['', Validators.required],
      accountId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.customerService.getLoans().subscribe();
    this.customerService.getAccounts().subscribe();
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.isSubmitting.set(true);
      const payload = {
        ...this.loanForm.value,
        emi: Math.floor(this.loanForm.value.amount / this.loanForm.value.tenure),
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      this.customerService.applyLoan(payload).subscribe(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.customerService.getLoans().subscribe();
        setTimeout(() => {
          this.showApplyModal.set(false);
          this.isSuccess.set(false);
          this.loanForm.reset({ loanType: 'Personal Loan', tenure: 12 });
        }, 2000);
      });
    }
  }

  payEMI(loan: any) {
    if (confirm(`Pay EMI of $${loan.emi} for ${loan.type}?`)) {
      // In a real app, this would be a complex transaction
      // Here we just update the loan status/remaining
      const updatedRemaining = loan.remaining - loan.emi;
      const updatedProgress = Math.min(100, Math.floor(((loan.amount - updatedRemaining) / loan.amount) * 100));
      
      this.customerService.payBill({ 
        biller: `Loan Payment: ${loan.id}`, 
        amount: loan.emi 
      }).subscribe(() => {
        // Update loan record
        this.customerService.repayLoan(loan.id, { 
          remaining: updatedRemaining, 
          progress: updatedProgress 
        }).subscribe(() => {
          this.customerService.getLoans().subscribe();
          alert('EMI Payment Successful!');
        });
      });
    }
  }
}
