import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kyc.html',
  styles: []
})
export class KycComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  kycRequests = computed(() => this.employeeService.kycRequests().filter(k => k.verificationStatus === 'pending'));

  ngOnInit() {
    this.employeeService.getPendingKyc().subscribe();
  }

  approveKyc(id: string) {
    if (confirm('Are you sure you want to approve this KYC request?')) {
      this.employeeService.updateKycStatus(id, 'approved').subscribe(() => {
        this.employeeService.getPendingKyc().subscribe();
        this.employeeService.getDashboardStats().subscribe();
      });
    }
  }

  rejectKyc(id: string) {
    if (confirm('Are you sure you want to reject this KYC request?')) {
      this.employeeService.updateKycStatus(id, 'rejected').subscribe(() => {
        this.employeeService.getPendingKyc().subscribe();
        this.employeeService.getDashboardStats().subscribe();
      });
    }
  }

  viewDocument(id: string) {
    alert('Opening document viewer for: ' + id);
  }
}
