import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000';

  dashboardStats = signal<any>(null);

  getDashboardStats(): Observable<any> {
    return forkJoin({
      fraudAlerts: this.getFraudAlerts(),
      amlAlerts: this.getAmlAlerts(),
      compliance: this.getComplianceViolations(),
      devices: this.getDevices(),
      ips: this.getIps()
    }).pipe(
      tap((results) => {
        this.dashboardStats.set({
          totalAlerts: results.fraudAlerts.length + results.amlAlerts.length,
          fraudAlerts: results.fraudAlerts.length,
          failedLogins: 0,
          activeSessions: results.devices.filter(d => d.status === 'active').length,
          blockedIps: results.ips.filter(i => i.status === 'blocked').length,
          amlAlerts: results.amlAlerts.length,
          suspiciousTxns: results.fraudAlerts.length,
          complianceViolations: results.compliance.length,
          deviceRisks: results.devices.filter(d => d.riskLevel === 'high').length,
          securityScore: 92
        });
      })
    );
  }

  getFraudAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fraudAlerts`);
  }

  getAuditLogs(limit = 50): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/auditLogs?_sort=-timestamp`);
  }

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/devices`);
  }

  getIps(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ips`);
  }

  getComplianceViolations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/complianceViolations`);
  }

  getAmlAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/amlAlerts`);
  }

  getRiskProfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/riskProfiles`);
  }
}
