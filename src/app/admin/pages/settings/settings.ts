import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html'
})
export class SettingsComponent implements OnInit {
  private http = inject(HttpClient);
  bankSettings = signal<any>(null);

  ngOnInit() {
    this.http.get('http://localhost:3000/settings').subscribe(data => this.bankSettings.set(data));
  }
}
