import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessions.html',
  styles: []
})
export class SessionsComponent implements OnInit {
  private http = inject(HttpClient);
  sessions: any[] = [
    { id: 1, userId: 'USR-001', device: 'iPhone 15 Pro', ip: '103.20.14.55', browser: 'Safari Mobile', status: 'active', lastActive: '2026-05-15T19:00:00Z' },
    { id: 2, userId: 'USR-002', device: 'MacBook Air', ip: '192.168.1.100', browser: 'Chrome', status: 'active', lastActive: '2026-05-15T18:45:00Z' },
    { id: 3, userId: 'USR-003', device: 'Android Tablet', ip: '202.4.155.12', browser: 'Edge', status: 'idle', lastActive: '2026-05-15T15:30:00Z' }
  ];

  ngOnInit() {}

  terminateSession(id: any) {
    if (confirm('Forcibly terminate this user session?')) {
      this.sessions = this.sessions.filter(s => s.id !== id);
    }
  }
}
