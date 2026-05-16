import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-ip-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ip-monitoring.html',
  styles: []
})
export class IpMonitoringComponent implements OnInit {
  private securityService = inject(SecurityService);
  ips: any[] = [];

  ngOnInit() {
    this.securityService.getIps().subscribe(data => this.ips = data);
  }
}
