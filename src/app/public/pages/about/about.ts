import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html'
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);
  content = signal<any>(null);

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/pageContent').subscribe(data => {
      this.content.set(data.about);
    });
  }
}
