import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html'
})
export class CardsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  
  cards = computed(() => {
    const cards = this.employeeService.cardsList();
    const customers = this.employeeService.customersList();
    
    return cards.map(card => ({
      ...card,
      customerName: customers.find(c => c.id === card.customerId)?.fullName || 'Unknown Customer'
    }));
  });

  ngOnInit() {
    forkJoin({
      cards: this.employeeService.getCards(),
      customers: this.employeeService.getCustomers()
    }).subscribe();
  }

  updateStatus(id: string, status: string) {
    this.employeeService.updateCardStatus(id, status).subscribe(() => {
      this.employeeService.getCards().subscribe();
    });
  }

  approveCard(id: string) {
    this.updateStatus(id, 'active');
  }

  blockCard(id: string) {
    if (confirm('Are you sure you want to block this card?')) {
      this.updateStatus(id, 'blocked');
    }
  }
}
