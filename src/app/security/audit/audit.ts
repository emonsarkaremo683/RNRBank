import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.html',
  styles: []
})
export class AuditComponent implements OnInit {
  private securityService = inject(SecurityService);
  auditLogs: any[] = [];

  ngOnInit() {
    this.securityService.getAuditLogs(100).subscribe(data => this.auditLogs = data);
  }
}
