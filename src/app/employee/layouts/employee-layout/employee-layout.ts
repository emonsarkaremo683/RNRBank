import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeeSidebarComponent } from '../../components/employee-sidebar/employee-sidebar';
import { EmployeeNavbarComponent } from '../../components/employee-navbar/employee-navbar';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmployeeSidebarComponent, EmployeeNavbarComponent],
  templateUrl: './employee-layout.html',
  styles: []
})
export class EmployeeLayoutComponent {}
