import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans.html'
})
export class LoansComponent implements OnInit {
  private adminService = inject(AdminService);
  loans = signal<any[]>([]);

  ngOnInit() {
    this.adminService.getLoans().subscribe(data => this.loans.set(data));
  }
}
