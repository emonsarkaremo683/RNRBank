import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-fraud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fraud.html',
  styles: []
})
export class FraudComponent implements OnInit {
  private securityService = inject(SecurityService);
  fraudAlerts: any[] = [];

  ngOnInit() {
    this.securityService.getFraudAlerts().subscribe(data => this.fraudAlerts = data);
  }
}
