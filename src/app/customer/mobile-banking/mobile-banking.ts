import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile-banking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mobile-banking.html'
})
export class MobileBankingComponent implements OnInit {
  private customerService = inject(CustomerService);
  
  mobileWallets = this.customerService.mobileWallets;
  recentPayments = this.customerService.billPayments;
  
  showAddMoneyModal = signal(false);
  isSubmitting = signal(false);
  isSuccess = signal(false);
  isPaySuccess = signal(false);

  ngOnInit() {
    this.customerService.getMobileWallets().subscribe();
    this.customerService.getBillPayments().subscribe();
  }

  onAddMoney(formData: any) {
    this.isSubmitting.set(true);
    // Reuse payBill for simulation or create a separate endpoint
    this.customerService.payBill({ ...formData, type: 'ADD_MONEY' }).subscribe(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      this.customerService.getBillPayments().subscribe();
      setTimeout(() => {
        this.showAddMoneyModal.set(false);
        this.isSuccess.set(false);
      }, 2000);
    });
  }

  onPay(formData: any) {
    this.isSubmitting.set(true);
    this.customerService.payBill(formData).subscribe(() => {
      this.isSubmitting.set(false);
      this.isPaySuccess.set(true);
      this.customerService.getBillPayments().subscribe();
      setTimeout(() => {
        this.isPaySuccess.set(false);
      }, 3000);
    });
  }
}
