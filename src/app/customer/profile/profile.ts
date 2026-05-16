import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  currentUser = this.authService.currentUser;
  profileForm: FormGroup;
  showEditModal = signal(false);
  isSubmitting = signal(false);

  constructor() {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });
  }

  ngOnInit() {
    const user = this.currentUser();
    if (user) {
      this.profileForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: 'House 42, Road 7, Block C, Banani, Dhaka' // Mock address
      });
    }
  }

  toggleEditModal() {
    this.showEditModal.set(!this.showEditModal());
  }

  onUpdateProfile() {
    if (this.profileForm.valid) {
      this.isSubmitting.set(true);
      setTimeout(() => {
        this.authService.updateCurrentUser(this.profileForm.value);
        this.isSubmitting.set(false);
        this.showEditModal.set(false);
      }, 1500);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Simulate photo upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.authService.updateCurrentUser({ profilePhoto: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    document.getElementById('profileFileInput')?.click();
  }
}
