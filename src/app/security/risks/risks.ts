import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-risks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risks.html',
  styles: []
})
export class RisksComponent implements OnInit {
  private securityService = inject(SecurityService);
  riskProfiles: any[] = [];

  ngOnInit() {
    this.securityService.getRiskProfiles().subscribe(data => this.riskProfiles = data);
  }
}
