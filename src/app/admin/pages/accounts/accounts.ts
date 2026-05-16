import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html'
})
export class AccountsComponent implements OnInit {
  private adminService = inject(AdminService);
  accounts = signal<any[]>([]);

  ngOnInit() {
    this.adminService.getAccounts().subscribe(data => this.accounts.set(data));
  }
}
