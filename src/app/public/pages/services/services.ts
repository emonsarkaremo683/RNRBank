import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockBankingService } from '../../../services/banking.service';
import { BankingService } from '../../../models/banking.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html'
})
export class ServicesComponent implements OnInit {
  allServices: BankingService[] = [];

  constructor(private bankingService: MockBankingService) {}

  ngOnInit(): void {
    this.bankingService.getServices().subscribe(data => {
      // Extend with more services for the services page
      this.allServices = [
        ...data,
        { id: '5', title: 'Student Banking', description: 'Special accounts for students with zero balance and high benefits.', icon: 'bi-mortarboard', link: '/services/student' },
        { id: '6', title: 'ATM Services', description: 'Access your cash anywhere with our wide network of smart ATMs.', icon: 'bi-cash', link: '/services/atm' },
        { id: '7', title: 'Foreign Remittance', description: 'Receive money from abroad instantly with the best exchange rates.', icon: 'bi-globe-americas', link: '/services/remittance' },
        { id: '8', title: 'Merchant Banking', description: 'Scale your business with our enterprise-grade payment solutions.', icon: 'bi-shop', link: '/services/merchant' }
      ];
    });
  }
}
