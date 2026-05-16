import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html'
})
export class CardsComponent implements OnInit {
  private adminService = inject(AdminService);
  cards = signal<any[]>([]);

  ngOnInit() {
    this.adminService.getCards().subscribe(data => this.cards.set(data));
  }
}
