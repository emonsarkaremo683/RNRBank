import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-logs.html',
  styleUrl: './audit-logs.scss'
})
export class AuditLogsComponent implements OnInit {
  logs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/auditLogs').subscribe(data => {
      this.logs = data;
    });
  }

  getActionClass(action: string): string {
    switch (action) {
      case 'LOGIN': return 'bg-info bg-opacity-10 text-info';
      case 'PASSWORD_CHANGED': return 'bg-warning bg-opacity-10 text-warning';
      case 'KYC_APPROVED': return 'bg-success bg-opacity-10 text-success';
      case 'TRANSFER_INITIATED': return 'bg-primary bg-opacity-10 text-primary';
      default: return 'bg-secondary bg-opacity-10 text-secondary';
    }
  }

  viewDetails(log: any) {
    // Implement modal for full log details
    console.log('Viewing log details:', log);
  }
}
