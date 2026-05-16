import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CashierService } from '../services/cashier.service';

@Component({
  selector: 'app-vault-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vault-requests.html'
})
export class VaultRequestsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cashierService = inject(CashierService);
  
  vaultForm: FormGroup;
  requests = signal<any[]>([]);
  isSubmitting = signal(false);

  constructor() {
    this.vaultForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(100)]],
      type: ['REFILL', Validators.required],
      priority: ['medium', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.cashierService.getVaultRequests().subscribe(data => {
      this.requests.set(data);
    });
  }

  onSubmit() {
    if (this.vaultForm.valid) {
      this.isSubmitting.set(true);
      this.cashierService.createVaultRequest(this.vaultForm.value).subscribe(() => {
        this.isSubmitting.set(false);
        this.vaultForm.reset({ type: 'REFILL', priority: 'medium' });
        this.loadRequests();
      });
    }
  }

  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-dark';
      case 'rejected': return 'bg-danger text-white';
      default: return 'bg-light text-dark';
    }
  }
}
