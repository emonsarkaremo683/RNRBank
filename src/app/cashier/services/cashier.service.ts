import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000';

  dashboardStats = signal<any>(null);
  tellerQueue = signal<any[]>([]);

  getDashboardStats(): Observable<any> {
    return forkJoin({
      queue: this.getQueue(),
      deposits: this.http.get<any[]>(`${this.apiUrl}/transactions?transactionType=DEPOSIT`),
      withdrawals: this.http.get<any[]>(`${this.apiUrl}/transactions?transactionType=WITHDRAWAL`),
      vault: this.http.get<any[]>(`${this.apiUrl}/vaultRequests`)
    }).pipe(
      tap((results) => {
        const totalDeposits = results.deposits.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        const totalWithdrawals = results.withdrawals.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        
        this.dashboardStats.set({
          todayDeposits: totalDeposits,
          todayWithdrawals: totalWithdrawals,
          pendingQueue: results.queue.filter(q => q.status === 'waiting').length,
          processedTransactions: results.deposits.length + results.withdrawals.length,
          vaultBalance: 250000 - totalWithdrawals + totalDeposits, // Simplified logic
          cashInHand: 50000 + totalDeposits - totalWithdrawals,
          failedTransactions: results.deposits.filter(t => t.status === 'failed').length,
          customerRequests: results.vault.filter(v => v.status === 'pending').length,
          dailyCashFlow: totalDeposits + totalWithdrawals,
          pendingVerifications: results.queue.filter(q => q.status === 'serving').length
        });
      })
    );
  }

  getQueue(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tellerQueue`).pipe(
      tap(data => this.tellerQueue.set(data))
    );
  }

  updateQueueStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/tellerQueue/${id}`, { status });
  }

  performTransaction(data: any): Observable<any> {
    const payload = {
      ...data,
      transactionReference: 'TXN-' + Math.floor(Math.random() * 1000000),
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    return this.http.post(`${this.apiUrl}/transactions`, payload);
  }

  getVaultRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vaultRequests`);
  }

  createVaultRequest(data: any): Observable<any> {
    const user = this.authService.currentUser();
    const payload = {
      ...data,
      employeeId: user?.employeeId,
      branchId: user?.branchId || 'BR-001',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    return this.http.post(`${this.apiUrl}/vaultRequests`, payload);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?_sort=-createdAt&_limit=20`);
  }
}
