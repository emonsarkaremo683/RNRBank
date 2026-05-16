import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent, AdminNavbarComponent],
  templateUrl: './admin-layout.html'
})
export class AdminLayoutComponent implements OnInit {
  private http = inject(HttpClient);
  systemVersion = signal('V1.0.0');

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/settings').subscribe(data => {
      this.systemVersion.set('V' + data.version);
    });
  }
}
