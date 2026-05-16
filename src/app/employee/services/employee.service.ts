import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000';

  customersList = signal<any[]>([]);
  kycRequests = signal<any[]>([]);
  loansList = signal<any[]>([]);
  cardsList = signal<any[]>([]);
  atmList = signal<any[]>([]);
  tasksList = signal<any[]>([]);
  announcementsList = signal<any[]>([]);
  dashboardStats = signal<any>(null);

  getDashboardStats(): Observable<any> {
    return forkJoin({
      customers: this.getCustomers(),
      kyc: this.getPendingKyc(),
      loans: this.getLoans(),
      txns: this.getTransactions(),
      atms: this.getAtms(),
      fraud: this.http.get<any[]>(`${this.apiUrl}/fraudAlerts`)
    }).pipe(
      tap((results) => {
        const today = new Date().toISOString().split('T')[0];
        const todayTxns = results.txns.filter(t => t.createdAt && t.createdAt.startsWith(today)).length;
        const atmIssues = results.atms.filter(a => a.status === 'down' || a.status === 'maintenance').length;
        
        const pendingKycCount = results.kyc.filter(k => k.verificationStatus === 'pending').length;
        
        this.dashboardStats.set({
          assignedCustomers: results.customers.length,
          pendingKyc: pendingKycCount,
          approvedKycToday: 0,
          pendingLoans: results.loans.filter(l => l.status === 'pending').length,
          todayTransactions: todayTxns || results.txns.length,
          branchCustomers: results.customers.length,
          activeAccounts: results.customers.length,
          fraudAlerts: results.fraud.length,
          atmIssues: atmIssues,
          supportRequests: 15 // Simulated
        });
      })
    );
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`).pipe(
      tap(data => this.customersList.set(data))
    );
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers`, { ...customer, createdAt: new Date().toISOString() });
  }

  updateCustomerStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/customers/${id}`, { status });
  }

  getPendingKyc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/kycRequests`).pipe(
      tap(data => this.kycRequests.set(data))
    );
  }

  updateKycStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/kycRequests/${id}`, { verificationStatus: status });
  }

  getLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/loans`).pipe(
      tap(data => this.loansList.set(data))
    );
  }

  updateLoanStatus(loanId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/loans/${loanId}`, { status });
  }

  getTransactions(limit = 20): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?_sort=-createdAt`);
  }

  getAtms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/atmBooths`).pipe(
      tap(data => this.atmList.set(data))
    );
  }

  updateAtmStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/atmBooths/${id}`, { status });
  }

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cards`).pipe(
      tap(data => this.cardsList.set(data))
    );
  }

  updateCardStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cards/${id}`, { status });
  }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts`);
  }

  createAccount(accountData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts`, { 
      ...accountData, 
      createdAt: new Date().toISOString(),
      balance: accountData.initialDeposit || 0
    });
  }

  updateAccountStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/accounts/${id}`, { status });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`).pipe(
      tap(data => this.tasksList.set(data))
    );
  }

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/announcements`).pipe(
      tap(data => this.announcementsList.set(data))
    );
  }
}
