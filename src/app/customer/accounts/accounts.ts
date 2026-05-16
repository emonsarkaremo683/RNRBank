import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accounts.html'
})
export class AccountsComponent implements OnInit {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  
  accounts = this.customerService.accounts;
  showOpenModal = signal(false);
  isSubmitting = signal(false);
  isSuccess = signal(false);
  accountForm: FormGroup;

  constructor() {
    this.accountForm = this.fb.group({
      accountTypeId: ['AT-001', Validators.required], // AT-001 for Savings
      currency: ['USD', Validators.required],
      initialDeposit: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.customerService.getAccounts().subscribe();
  }

  viewDetails(account: any) {
    alert(`Account: ${account.accountNumber}\nType: ${account.accountTypeId === 'AT-001' ? 'Savings' : 'Current'}\nBalance: $${account.balance}`);
  }

  downloadStatement(account: any) {
    alert(`Downloading statement for ${account.accountNumber}...`);
    // Here we could call a report service if needed
  }

  onOpenAccount() {
    if (this.accountForm.valid) {
      this.isSubmitting.set(true);
      this.customerService.openAccount(this.accountForm.value).subscribe(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.customerService.getAccounts().subscribe();
        setTimeout(() => {
          this.showOpenModal.set(false);
          this.isSuccess.set(false);
          this.accountForm.reset({ accountTypeId: 'AT-001', currency: 'USD', initialDeposit: 0 });
        }, 2000);
      });
    }
  }
}
