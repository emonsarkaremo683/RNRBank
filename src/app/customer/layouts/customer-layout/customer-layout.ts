import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerSidebarComponent } from '../../components/customer-sidebar/customer-sidebar';
import { CustomerNavbarComponent } from '../../components/customer-navbar/customer-navbar';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomerSidebarComponent, CustomerNavbarComponent],
  templateUrl: './customer-layout.html'
})
export class CustomerLayoutComponent {}
