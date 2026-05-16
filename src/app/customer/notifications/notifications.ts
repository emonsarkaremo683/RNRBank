import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html'
})
export class NotificationsComponent implements OnInit {
  notifications = [
    { id: '1', type: 'alert', title: 'New Login Detected', message: 'A new login was detected from iPhone 15 Pro.', time: '1 hour ago', read: false },
    { id: '2', type: 'success', title: 'Salary Credited', message: '$4,500.00 has been credited to your Savings Account.', time: '10 mins ago', read: false },
    { id: '3', type: 'info', title: 'Card Statement Available', message: 'Your monthly card statement for May 2026 is ready.', time: '1 day ago', read: true },
    { id: '4', type: 'warning', title: 'EMI Due Reminder', message: 'Your personal loan EMI of $1,200 is due on Jun 5.', time: '2 days ago', read: true }
  ];

  ngOnInit() {}
}
