import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // Signals for state management
  executiveStats = signal<any>(null);

  getExecutiveStats(): Observable<any> {
    return forkJoin({
      customers: this.http.get<any[]>(`${this.apiUrl}/customers`),
      accounts: this.http.get<any[]>(`${this.apiUrl}/accounts`),
      txns: this.http.get<any[]>(`${this.apiUrl}/transactions`),
      loans: this.http.get<any[]>(`${this.apiUrl}/loans`),
      atms: this.http.get<any[]>(`${this.apiUrl}/atmBooths`),
      fraud: this.http.get<any[]>(`${this.apiUrl}/fraudAlerts`)
    }).pipe(
      tap((results) => {
        this.executiveStats.set({
          totalRevenue: 452000000, // Keep static for now as it requires complex calculation
          monthlyProfit: 12500000, // Keep static
          totalCustomers: results.customers.length,
          totalAccounts: results.accounts.length,
          totalTransactions: results.txns.length,
          loanPortfolio: 1250000000, // Keep static
          activeAtms: results.atms.filter(a => a.status === 'active').length,
          fraudAlerts: results.fraud.length,
          branchGrowth: 8.5,
          employeePerformance: 94
        });
      })
    );
  }

  getRevenueAnalytics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/revenue_reports`); // Placeholder endpoint
  }

  getCustomerAnalytics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customer_analytics`);
  }

  getBranchPerformance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/branches`);
  }

  getLoanAnalytics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/loans`);
  }

  getEmployeePerformance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }

  getAtmUsage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/atmBooths`);
  }

  getFraudTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fraudAlerts`);
  }

  getTransactions(limit = 100): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?_sort=-createdAt`);
  }
}
