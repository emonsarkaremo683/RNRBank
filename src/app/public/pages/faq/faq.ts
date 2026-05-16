import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockBankingService } from '../../../services/banking.service';
import { FAQItem } from '../../../models/banking.models';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.html'
})
export class FaqComponent implements OnInit {
  private bankingService = inject(MockBankingService);
  faqs: FAQItem[] = [];

  ngOnInit(): void {
    this.bankingService.getFAQs().subscribe(data => this.faqs = data);
  }
}
