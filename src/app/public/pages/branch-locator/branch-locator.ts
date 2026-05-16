import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-branch-locator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-locator.html'
})
export class BranchLocatorComponent implements OnInit {
  private http = inject(HttpClient);
  locations: any[] = [];

  ngOnInit(): void {
    const branches$ = this.http.get<any[]>('http://localhost:3000/branches').pipe(
      map(data => data.map(b => ({
        id: b.branchCode,
        type: 'Branch',
        name: b.branchName,
        address: b.address,
        phone: b.phone,
        hours: '9 AM - 5 PM'
      })))
    );

    const atms$ = this.http.get<any[]>('http://localhost:3000/atmBooths').pipe(
      map(data => data.map(a => ({
        id: a.id,
        type: 'ATM',
        name: a.name,
        address: a.address,
        phone: '24/7 Support',
        hours: '24 Hours'
      })))
    );

    forkJoin([branches$, atms$]).subscribe(([branches, atms]) => {
      this.locations = [...branches, ...atms];
    });
  }
}

