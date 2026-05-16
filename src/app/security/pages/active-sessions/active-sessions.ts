import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Session } from '../../../core/models/auth.models';

@Component({
  selector: 'app-active-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-sessions.html',
  styleUrl: './active-sessions.scss'
})
export class ActiveSessionsComponent implements OnInit {
  sessions: Session[] = [
    {
      id: '1', userId: 'USR-013', device: 'MacBook Pro 14"', browser: 'Chrome',
      ipAddress: '192.168.1.41', location: 'Dhaka, BD',
      lastActive: new Date().toISOString(), isCurrent: true
    },
    {
      id: '2', userId: 'USR-013', device: 'iPhone 15 Pro', browser: 'Safari',
      ipAddress: '103.20.14.55', location: 'Dhaka, BD',
      lastActive: new Date(Date.now() - 3600000).toISOString(), isCurrent: false
    },
    {
      id: '3', userId: 'USR-013', device: 'Windows Desktop', browser: 'Firefox',
      ipAddress: '202.4.155.12', location: 'Chittagong, BD',
      lastActive: new Date(Date.now() - 86400000).toISOString(), isCurrent: false
    }
  ];

  ngOnInit() {}

  getDeviceIcon(device: string): string {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) return 'bi-phone';
    if (device.toLowerCase().includes('macbook') || device.toLowerCase().includes('laptop')) return 'bi-laptop';
    return 'bi-display';
  }

  logoutSession(sessionId: string) {
    this.sessions = this.sessions.filter(s => s.id !== sessionId);
  }
}
