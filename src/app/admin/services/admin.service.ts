import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000';

  // Signals for global dashboard state
  dashboardStats = signal<any>(null);
  recentActivities = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return forkJoin({
      customers: this.getCustomers(),
      accounts: this.getAccounts(),
      branches: this.getBranches(),
      employees: this.getEmployees(),
      atms: this.getAtmBooths(),
      loans: this.getLoans(),
      cards: this.getCards(),
      kyc: this.getKycRequests(),
      fraud: this.http.get<any[]>(`${this.apiUrl}/fraudAlerts`)
    }).pipe(
      tap(results => {
        this.dashboardStats.set({
          totalCustomers: results.customers.length,
          totalAccounts: results.accounts.length,
          totalBranches: results.branches.length,
          totalEmployees: results.employees.length,
          totalAtms: results.atms.length,
          totalLoans: results.loans.length,
          totalRevenue: 45000000, // Revenue calculation would be complex, keep static
          activeCards: results.cards.filter(c => c.status === 'active').length,
          pendingKyc: results.kyc.filter(k => k.verificationStatus === 'pending').length,
          pendingLoans: results.loans.filter(l => l.status === 'pending').length,
          fraudAlerts: results.fraud.length
        });
      })
    );
  }

  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/branches`);
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/branches`, branch);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employees`, employee);
  }

  getAtmBooths(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/atmBooths`);
  }

  createAtmBooth(atm: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/atmBooths`, atm);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts`);
  }

  getKycRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/kycRequests`);
  }

  getLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/loans`);
  }

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cards`);
  }

  getTransactions(limit = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?_sort=-createdAt`);
  }
}
