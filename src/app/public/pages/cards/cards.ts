import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCard } from '../../../models/banking.models';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html'
})
export class CardsComponent implements OnInit {
  cards: CreditCard[] = [];

  ngOnInit(): void {
    this.cards = [
      {
        id: '1', name: 'RNR Infinite', type: 'visa', category: 'premium',
        features: ['Priority Pass', 'Concierge Service'],
        benefits: ['Unlimited Lounge Access', '3x Points on Travel', 'Premium Insurance'],
        image: ''
      },
      {
        id: '2', name: 'RNR Rewards Plus', type: 'mastercard', category: 'rewards',
        features: ['Cashback', 'No Annual Fee'],
        benefits: ['5% Cashback on Dining', '2x Points on Grocery', 'Zero Fraud Liability'],
        image: ''
      },
      {
        id: '3', name: 'RNR Business Pro', type: 'amex', category: 'business',
        features: ['Expense Management', 'Extended Warranty'],
        benefits: ['Corporate Travel Deals', 'Business Lounge Access', 'Tax Reporting Tools'],
        image: ''
      },
      {
        id: '4', name: 'RNR Student Edge', type: 'visa', category: 'student',
        features: ['Zero Fee', 'Mobile First'],
        benefits: ['Digital Subscription Deals', 'Student Discounts', 'No Overdraft Fees'],
        image: ''
      }
    ];
  }
}
