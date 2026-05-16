import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-cash-deposits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cash-deposits.html'
})
export class CashDepositsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cashierService = inject(CashierService);
  
  depositForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);
  history = signal<any[]>([]);
  today = new Date();
  stats = this.cashierService.dashboardStats;

  constructor() {
    this.depositForm = this.fb.group({
      accountNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(10)]],
      depositType: ['CASH', Validators.required],
      referenceNote: [''],
      transactionPin: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.cashierService.getTransactions().subscribe(txns => {
      this.history.set(txns.filter(t => t.transactionType === 'DEPOSIT'));
    });
  }

  onSubmit() {
    if (this.depositForm.valid) {
      this.isSubmitting.set(true);
      const payload = {
        ...this.depositForm.value,
        transactionType: 'DEPOSIT',
        senderAccountId: 'CASH-COUNTER',
        receiverAccountId: this.depositForm.value.accountNumber
      };
      
      this.cashierService.performTransaction(payload).subscribe(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.loadHistory();
        setTimeout(() => {
          this.isSuccess.set(false);
          this.depositForm.reset({ depositType: 'CASH' });
        }, 3000);
      });
    }
  }
}
