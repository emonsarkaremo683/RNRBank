import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
  private http = inject(HttpClient);
  bankName = signal('RNR Bank');

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/settings').subscribe(data => {
      this.bankName.set(data.bankName);
    });
  }
}
