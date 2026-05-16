import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/auth.models';

@Component({
  selector: 'app-user-access-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-access-control.html',
  styleUrl: './user-access-control.scss'
})
export class UserAccessControlComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-success bg-opacity-10 text-success';
      case 'suspended': return 'bg-danger bg-opacity-10 text-danger';
      case 'frozen': return 'bg-warning bg-opacity-10 text-warning';
      default: return 'bg-secondary bg-opacity-10 text-secondary';
    }
  }

  updateStatus(userId: string, status: string) {
    // Implement API call to update status
    console.log(`Updating user ${userId} to ${status}`);
  }

  resetPassword(userId: string) {
    // Implement API call to force reset password
    console.log(`Force resetting password for user ${userId}`);
  }
}
