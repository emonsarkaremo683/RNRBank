import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cards.html'
})
export class CardsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);
  
  currentUser = this.authService.currentUser;
  cards = this.customerService.cards;
  cardForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);
  showApplyModal = signal(false);

  constructor() {
    this.cardForm = this.fb.group({
      cardType: ['Credit Card', Validators.required],
      network: ['Visa', Validators.required],
      agreement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.customerService.getCards().subscribe();
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.isSubmitting.set(true);
      this.customerService.applyCard(this.cardForm.value).subscribe(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.customerService.getCards().subscribe();
        setTimeout(() => {
          this.showApplyModal.set(false);
          this.isSuccess.set(false);
          this.cardForm.reset({ cardType: 'Credit Card', network: 'Visa' });
        }, 2000);
      });
    }
  }

  toggleCardStatus(card: any) {
    // In a real app, this would be an API call
    card.status = card.status === 'active' ? 'blocked' : 'active';
  }
}
