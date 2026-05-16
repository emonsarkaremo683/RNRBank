import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.html'
})
export class EmployeesComponent implements OnInit {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  
  employees = signal<any[]>([]);
  employeeForm: FormGroup;
  showForm = false;
  isLoading = false;

  constructor() {
    this.employeeForm = this.fb.group({
      employeeCode: ['', Validators.required],
      branchId: ['', Validators.required],
      departmentId: ['', Validators.required],
      designationId: ['', Validators.required],
      roleId: ['', Validators.required],
      salary: [0, Validators.required],
      joinDate: ['', Validators.required],
      status: ['active']
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.adminService.getEmployees().subscribe(data => this.employees.set(data));
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.employeeForm.reset({ status: 'active' });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      const newEmp = { ...this.employeeForm.value, id: 'EMP-' + new Date().getTime() };
      this.adminService.createEmployee(newEmp).subscribe({
        next: () => {
          this.loadEmployees();
          this.toggleForm();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }
}

