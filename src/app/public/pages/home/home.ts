import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockBankingService } from '../../../services/banking.service';
import { AuthService } from '../../../core/services/auth.service';
import { BankingService, FAQItem } from '../../../models/banking.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  private bankingService = inject(MockBankingService);
  private authService = inject(AuthService);
  
  services: BankingService[] = [];
  faqs: FAQItem[] = [];

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get dashboardLink(): string {
    return this.authService.getDashboardPath();
  }

  ngOnInit(): void {
    this.bankingService.getServices().subscribe(data => this.services = data);
    this.bankingService.getFAQs().subscribe(data => this.faqs = data);
  }
}
