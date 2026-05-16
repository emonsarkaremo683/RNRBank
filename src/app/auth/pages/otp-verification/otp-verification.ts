import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.scss'
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  countdown = 120; // 2 minutes
  timer: any;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.otpForm = this.fb.group({
      otp1: [''],
      otp2: [''],
      otp3: [''],
      otp4: [''],
      otp5: [''],
      otp6: ['']
    });
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  moveFocus(event: any, next: HTMLInputElement | null, prev?: HTMLInputElement) {
    if (event.key === 'Backspace' && prev && !event.target.value) {
      prev.focus();
    } else if (event.target.value && next) {
      next.focus();
    }
  }

  isOtpComplete(): boolean {
    // Check if all inputs have values (simulated)
    return true; // Simplified for demo
  }

  resendOtp() {
    this.countdown = 120;
    this.startTimer();
    // API call for resend
  }

  onVerify() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 2000);
  }
}
