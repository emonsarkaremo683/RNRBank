import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.html'
})
export class TermsComponent implements OnInit {
  private http = inject(HttpClient);
  content = signal<any>(null);

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/pageContent').subscribe(data => {
      this.content.set(data.terms);
    });
  }
}
