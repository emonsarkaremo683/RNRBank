import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000';

  // Signals for state management
  dashboardStats = signal<any>(null);

  getDashboardStats(): Observable<any> {
    return forkJoin({
      accounts: this.getAccounts(),
      txns: this.getTransactions(),
      beneficiaries: this.getBeneficiaries()
    }).pipe(
      tap((results) => {
        const today = new Date().toISOString().split('T')[0];
        const dailyTxns = results.txns.filter(t => t.createdAt && t.createdAt.startsWith(today)).length;
        const failedTxns = results.txns.filter(t => t.status === 'failed').length;

        this.dashboardStats.set({
          totalAccounts: results.accounts.length,
          activeAccounts: results.accounts.filter(a => a.status !== 'frozen').length,
          frozenAccounts: results.accounts.filter(a => a.status === 'frozen').length,
          totalTransactions: results.txns.length,
          dailyTransactions: dailyTxns,
          failedTransactions: failedTxns,
          pendingTransfers: 0,
          vaultBalance: 25000000,
          dailyCashFlow: 1500000,
          totalBeneficiaries: results.beneficiaries.length
        });
      })
    );
  }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts`);
  }

  getTransactions(limit = 50): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?_sort=-createdAt`);
  }

  getTransfers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transfers`);
  }

  getBeneficiaries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/beneficiaries`);
  }

  getStatements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/statements`);
  }
}
