import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-investors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investors.html'
})
export class InvestorsComponent implements OnInit {
  private http = inject(HttpClient);
  reports = signal<any[]>([]);

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/investorReports').subscribe(data => {
      this.reports.set(data);
    });
  }
}
