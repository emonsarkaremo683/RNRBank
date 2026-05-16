import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-security-awareness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-awareness.html'
})
export class SecurityAwarenessComponent implements OnInit {
  private http = inject(HttpClient);
  tips = signal<any[]>([]);

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/securityTips').subscribe(data => {
      this.tips.set(data);
    });
  }
}
