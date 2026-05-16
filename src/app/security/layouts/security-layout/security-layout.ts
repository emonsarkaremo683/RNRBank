import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SecuritySidebarComponent } from '../../components/security-sidebar/security-sidebar';
import { SecurityNavbarComponent } from '../../components/security-navbar/security-navbar';

@Component({
  selector: 'app-security-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SecuritySidebarComponent, SecurityNavbarComponent],
  templateUrl: './security-layout.html'
})
export class SecurityLayoutComponent {}
