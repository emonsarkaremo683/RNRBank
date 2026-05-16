import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-atm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atm.html'
})
export class AtmComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  atms = this.employeeService.atmList;

  ngOnInit() {
    this.employeeService.getAtms().subscribe();
  }

  updateStatus(id: string, status: string) {
    this.employeeService.updateAtmStatus(id, status).subscribe(() => {
      this.employeeService.getAtms().subscribe();
      this.employeeService.getDashboardStats().subscribe();
    });
  }

  requestMaintenance(id: string) {
    alert('Maintenance request sent for ATM: ' + id);
    this.updateStatus(id, 'maintenance');
  }
}
