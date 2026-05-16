import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-history.html'
})
export class LoginHistoryComponent implements OnInit {
  private http = inject(HttpClient);
  history = [
    { id: 1, userId: 'USR-001', device: 'iPhone 15 Pro', ip: '103.20.14.55', date: '2026-05-15T19:00:00Z', status: 'success' },
    { id: 2, userId: 'USR-ADMIN', device: 'MacBook Air', ip: '192.168.1.100', date: '2026-05-15T18:45:00Z', status: 'success' },
    { id: 3, userId: 'USR-001', device: 'Windows Desktop', ip: '202.4.155.12', date: '2026-05-14T10:30:00Z', status: 'failed' }
  ];

  ngOnInit() {}
}
