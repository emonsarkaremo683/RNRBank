import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-atm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './atm.html'
})
export class AtmComponent implements OnInit {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  
  atms = signal<any[]>([]);
  atmForm: FormGroup;
  showForm = false;
  isLoading = false;

  constructor() {
    this.atmForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      status: ['active']
    });
  }

  ngOnInit() {
    this.loadAtms();
  }

  loadAtms() {
    this.adminService.getAtmBooths().subscribe(data => this.atms.set(data));
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.atmForm.reset({ status: 'active' });
    }
  }

  onSubmit() {
    if (this.atmForm.valid) {
      this.isLoading = true;
      const newAtm = { 
        ...this.atmForm.value, 
        id: 'ATM-' + new Date().getTime(),
        features: ["Cash Withdrawal", "Check Balance"] 
      };
      this.adminService.createAtmBooth(newAtm).subscribe({
        next: () => {
          this.loadAtms();
          this.toggleForm();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }
}
