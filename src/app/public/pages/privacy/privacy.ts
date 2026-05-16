import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.html'
})
export class PrivacyComponent implements OnInit {
  private http = inject(HttpClient);
  content = signal<any>(null);

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/pageContent').subscribe(data => {
      this.content.set(data.privacy);
    });
  }
}
