import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-cash-transfers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cash-transfers.html'
})
export class CashTransfersComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cashierService = inject(CashierService);
  
  transferForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);
  history = signal<any[]>([]);

  constructor() {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      transferType: ['INTERNAL', Validators.required],
      reference: [''],
      pin: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.cashierService.getTransactions().subscribe(txns => {
      this.history.set(txns.filter(t => t.transactionType === 'TRANSFER'));
    });
  }

  onSubmit() {
    if (this.transferForm.valid) {
      this.isSubmitting.set(true);
      const payload = {
        ...this.transferForm.value,
        transactionType: 'TRANSFER',
        senderAccountId: this.transferForm.value.fromAccount,
        receiverAccountId: this.transferForm.value.toAccount
      };
      
      this.cashierService.performTransaction(payload).subscribe(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.loadHistory();
        setTimeout(() => {
          this.isSuccess.set(false);
          this.transferForm.reset({ transferType: 'INTERNAL' });
        }, 3000);
      });
    }
  }
}
