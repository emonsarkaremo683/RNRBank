import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html'
})
export class NotificationsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  staffNotifications = this.employeeService.announcementsList;

  ngOnInit() {
    this.employeeService.getAnnouncements().subscribe();
  }
}
