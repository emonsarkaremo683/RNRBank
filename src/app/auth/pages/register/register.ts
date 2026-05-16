import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  currentStep = 1;
  showPassword = false;
  isLoading = false;

  // Password Strength properties
  strengthValue = 0;
  strengthLabel = 'Weak';
  strengthClass = 'bg-danger';
  strengthTextClass = 'text-danger';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^\\+8801[3-9]\\d{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]],
      subscribeNewsletter: [true]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  checkPasswordStrength() {
    const password = this.registerForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    this.strengthValue = strength;

    if (strength <= 25) {
      this.strengthLabel = 'Weak';
      this.strengthClass = 'bg-danger';
      this.strengthTextClass = 'text-danger';
    } else if (strength <= 50) {
      this.strengthLabel = 'Fair';
      this.strengthClass = 'bg-warning';
      this.strengthTextClass = 'text-warning';
    } else if (strength <= 75) {
      this.strengthLabel = 'Good';
      this.strengthClass = 'bg-info';
      this.strengthTextClass = 'text-info';
    } else {
      this.strengthLabel = 'Strong';
      this.strengthClass = 'bg-success';
      this.strengthTextClass = 'text-success';
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/auth/otp']);
      }, 2000);
    }
  }
}
