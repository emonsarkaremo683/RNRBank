import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-cash-withdrawals',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cash-withdrawals.html'
})
export class CashWithdrawalsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cashierService = inject(CashierService);
  
  withdrawalForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);
  history = signal<any[]>([]);
  today = new Date();
  stats = this.cashierService.dashboardStats;

  constructor() {
    this.withdrawalForm = this.fb.group({
      accountNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(10)]],
      availableBalance: [15000, Validators.required], // Simulated balance
      referenceNote: ['']
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.cashierService.getTransactions().subscribe(txns => {
      this.history.set(txns.filter(t => t.transactionType === 'WITHDRAWAL'));
    });
  }

  onSubmit() {
    if (this.withdrawalForm.valid) {
      if (this.withdrawalForm.value.amount > this.withdrawalForm.value.availableBalance) {
        alert('Insufficient balance for this withdrawal!');
        return;
      }
      
      this.isSubmitting.set(true);
      const payload = {
        ...this.withdrawalForm.value,
        transactionType: 'WITHDRAWAL',
        senderAccountId: this.withdrawalForm.value.accountNumber,
        receiverAccountId: 'CASH-COUNTER'
      };
      
      this.cashierService.performTransaction(payload).subscribe(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.loadHistory();
        setTimeout(() => {
          this.isSuccess.set(false);
          this.withdrawalForm.reset({ availableBalance: 15000 });
        }, 3000);
      });
    }
  }
}
