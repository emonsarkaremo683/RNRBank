import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact.html'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  
  contactForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      type: ['General Inquiry'],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.contactForm.reset({ type: 'General Inquiry' });
      }, 2000);
    }
  }
}
