import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './email-verification.html'
})
export class EmailVerificationComponent {}
