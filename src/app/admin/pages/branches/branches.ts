import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './branches.html'
})
export class BranchesComponent implements OnInit {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  
  branches = signal<any[]>([]);
  branchForm: FormGroup;
  showForm = false;
  isLoading = false;

  constructor() {
    this.branchForm = this.fb.group({
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      managerId: ['', Validators.required],
      routingNumber: ['', Validators.required],
      status: ['active']
    });
  }

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.adminService.getBranches().subscribe(data => this.branches.set(data));
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.branchForm.reset({ status: 'active' });
    }
  }

  onSubmit() {
    if (this.branchForm.valid) {
      this.isLoading = true;
      const newBranch = { ...this.branchForm.value, id: 'BR-' + new Date().getTime() };
      this.adminService.createBranch(newBranch).subscribe({
        next: () => {
          this.loadBranches();
          this.toggleForm();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }
}

