import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRMService } from '../../../core/services/hrm.service';

@Component({
  selector: 'app-hrm-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hrm-dashboard.html'
})
export class HrmDashboardComponent implements OnInit {
  private hrmService = inject(HRMService);
  
  payroll = this.hrmService.payroll;
  leaveRequests = this.hrmService.leaveRequests;
  attendance = this.hrmService.attendance;

  ngOnInit() {
    this.hrmService.getPayroll().subscribe();
    this.hrmService.getLeaveRequests().subscribe();
    this.hrmService.getAttendance().subscribe();
  }

  onApproveLeave(id: string) {
    this.hrmService.approveLeave(id).subscribe();
  }

  onRejectLeave(id: string) {
    this.hrmService.rejectLeave(id).subscribe();
  }

  onProcessPayroll() {
    if (confirm('Are you sure you want to process all pending payroll records for May 2026?')) {
      this.hrmService.processPayroll().subscribe();
    }
  }
}
