import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kyc.html'
})
export class KycComponent implements OnInit {
  private adminService = inject(AdminService);
  kycRequests = signal<any[]>([]);

  ngOnInit() {
    this.adminService.getKycRequests().subscribe(data => this.kycRequests.set(data));
  }
}
