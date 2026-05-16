import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html'
})
export class TasksComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  tasks = this.employeeService.tasksList;

  ngOnInit() {
    this.employeeService.getTasks().subscribe();
  }

  completeTask(id: string) {
    alert('Task completed: ' + id);
  }
}
