import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-banking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-banking.html'
})
export class MobileBankingComponent {}
