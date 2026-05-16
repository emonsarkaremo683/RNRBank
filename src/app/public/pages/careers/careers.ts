import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './careers.html'
})
export class CareersComponent implements OnInit {
  private http = inject(HttpClient);
  jobs = signal<any[]>([]);

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/careerJobs').subscribe(data => {
      this.jobs.set(data);
    });
  }
}
