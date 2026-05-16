import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss'
})
export class AuthLayoutComponent implements OnInit {
  private http = inject(HttpClient);
  bankName = signal('RNR Bank');

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/settings').subscribe(data => {
      this.bankName.set(data.bankName);
    });
  }
}
