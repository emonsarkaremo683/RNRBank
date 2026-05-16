import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HRMService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // Signals
  payroll = signal<any[]>([]);
  leaveRequests = signal<any[]>([]);
  attendance = signal<any[]>([]);
  kpis = signal<any[]>([]);

  getPayroll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payroll`).pipe(
      tap(data => this.payroll.set(data))
    );
  }

  getLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leaveRequests`).pipe(
      tap(data => this.leaveRequests.set(data))
    );
  }

  getAttendance(employeeId?: string): Observable<any[]> {
    const url = employeeId ? `${this.apiUrl}/attendance?employeeId=${employeeId}` : `${this.apiUrl}/attendance`;
    return this.http.get<any[]>(url).pipe(
      tap(data => this.attendance.set(data))
    );
  }

  getEmployeeKpis(employeeId?: string): Observable<any[]> {
    const url = employeeId ? `${this.apiUrl}/employeeKpis?employeeId=${employeeId}` : `${this.apiUrl}/employeeKpis`;
    return this.http.get<any[]>(url).pipe(
      tap(data => this.kpis.set(data))
    );
  }

  approveLeave(leaveId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/leaveRequests/${leaveId}`, { status: 'approved' }).pipe(
      tap(() => this.getLeaveRequests().subscribe())
    );
  }

  rejectLeave(leaveId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/leaveRequests/${leaveId}`, { status: 'rejected' }).pipe(
      tap(() => this.getLeaveRequests().subscribe())
    );
  }

  processPayroll(): Observable<any> {
    // In a real app, this would be a single API call to trigger a bulk update
    // Here we simulate it by fetching all and updating pending ones
    return this.http.get<any[]>(`${this.apiUrl}/payroll?status=pending`).pipe(
      tap(pending => {
        pending.forEach(p => {
          this.http.patch(`${this.apiUrl}/payroll/${p.id}`, { status: 'paid' }).subscribe();
        });
        setTimeout(() => this.getPayroll().subscribe(), 500);
      })
    );
  }
}
