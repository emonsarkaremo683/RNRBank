import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-compliance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliance.html',
  styles: []
})
export class ComplianceComponent implements OnInit {
  private securityService = inject(SecurityService);
  violations: any[] = [];

  ngOnInit() {
    this.securityService.getComplianceViolations().subscribe(data => this.violations = data);
  }
}
