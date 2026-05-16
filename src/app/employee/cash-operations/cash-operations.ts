import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-cash-operations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash-operations.html'
})
export class CashOperationsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  stats = this.employeeService.dashboardStats;

  ngOnInit() {
    this.employeeService.getDashboardStats().subscribe();
  }
}
