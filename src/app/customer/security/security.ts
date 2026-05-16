import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './security.html'
})
export class SecurityComponent implements OnInit {
  private fb = inject(FormBuilder);
  
  passwordForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);

  loginHistory = [
    { device: 'iPhone 15 Pro', browser: 'Safari Mobile', location: 'Dhaka, BD', date: '2026-05-15T19:26:06Z', status: 'Success' },
    { device: 'MacBook Pro 14"', browser: 'Chrome', location: 'Dhaka, BD', date: '2026-05-14T09:15:00Z', status: 'Success' },
    { device: 'Windows Desktop', browser: 'Firefox', location: 'Unknown', date: '2026-05-10T14:22:00Z', status: 'Failed' }
  ];

  constructor() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  private passwordMatchValidator(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.isSubmitting.set(true);
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.passwordForm.reset();
        setTimeout(() => this.isSuccess.set(false), 3000);
      }, 2000);
    }
  }
}
