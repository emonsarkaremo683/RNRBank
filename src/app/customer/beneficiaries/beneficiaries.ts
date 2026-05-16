import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './beneficiaries.html'
})
export class BeneficiariesComponent implements OnInit {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  beneficiaries = this.customerService.beneficiaries;
  showForm = false;
  isLoading = false;
  beneficiaryForm: FormGroup;

  constructor() {
    this.beneficiaryForm = this.fb.group({
      name: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(10)]],
      bankName: ['', Validators.required],
      relation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.customerService.getBeneficiaries().subscribe();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.beneficiaryForm.reset();
  }

  onSubmit() {
    if (this.beneficiaryForm.valid) {
      this.isLoading = true;
      const user = this.authService.currentUser();
      const customerId = user?.customerId || 'CUST-001';
      
      const newBen = { 
        ...this.beneficiaryForm.value, 
        id: 'BEN-' + new Date().getTime().toString().slice(-6),
        customerId
      };
      
      this.http.post('http://localhost:3000/beneficiaries', newBen).subscribe({
        next: () => {
          this.customerService.getBeneficiaries().subscribe(); // Refresh list
          this.toggleForm();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          alert('Failed to add beneficiary');
        }
      });
    }
  }

  deleteBeneficiary(id: string) {
    if (confirm('Remove this beneficiary?')) {
      this.http.delete(`http://localhost:3000/beneficiaries/${id}`).subscribe(() => {
        this.customerService.getBeneficiaries().subscribe(); // Refresh list
      });
    }
  }
}
