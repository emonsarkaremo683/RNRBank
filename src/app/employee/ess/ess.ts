import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRMService } from '../../core/services/hrm.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-ess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ess.html'
})
export class EssComponent implements OnInit {
  private hrmService = inject(HRMService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  myAttendance = this.hrmService.attendance;
  myPayroll = this.hrmService.payroll;
  myKpis = this.hrmService.kpis;

  ngOnInit() {
    const employeeId = this.currentUser()?.employeeId || 'EMP-002';
    this.hrmService.getAttendance(employeeId).subscribe();
    this.hrmService.getPayroll().subscribe(); // Simplified for demo
    this.hrmService.getEmployeeKpis(employeeId).subscribe();
  }

  clockIn() {
    // Simulate clock in logic
    alert('Clocked in successfully at ' + new Date().toLocaleTimeString());
  }

  applyLeave() {
    // Modal logic placeholder
    alert('Leave application form opening...');
  }
}
