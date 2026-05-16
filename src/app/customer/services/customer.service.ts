import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000';

  // Signals
  customerData = signal<any>(null);
  accounts = signal<any[]>([]);
  transactions = signal<any[]>([]);
  beneficiaries = signal<any[]>([]);
  loans = signal<any[]>([]);
  cards = signal<any[]>([]);
  mobileWallets = signal<any[]>([]);
  billPayments = signal<any[]>([]);

  loadDashboardData(): Observable<any> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001'; // Fallback for demo
    
    return this.http.get<any>(`${this.apiUrl}/customers/${customerId}`).pipe(
      tap(data => this.customerData.set(data))
    );
  }

  getAccounts(): Observable<any[]> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    return this.http.get<any[]>(`${this.apiUrl}/accounts?customerId=${customerId}`).pipe(
      tap(data => this.accounts.set(data))
    );
  }

  getTransactions(limit = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?_sort=-createdAt`).pipe(
      tap(data => this.transactions.set(data))
    );
  }

  getBeneficiaries(): Observable<any[]> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    return this.http.get<any[]>(`${this.apiUrl}/beneficiaries?customerId=${customerId}`).pipe(
      tap(data => this.beneficiaries.set(data))
    );
  }

  getLoans(): Observable<any[]> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    return this.http.get<any[]>(`${this.apiUrl}/loans?customerId=${customerId}&_sort=-createdAt`).pipe(
      tap(data => this.loans.set(data))
    );
  }

  applyLoan(loanData: any): Observable<any> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    const payload = {
      ...loanData,
      customerId,
      status: 'pending',
      remaining: loanData.amount,
      progress: 0,
      createdAt: new Date().toISOString()
    };
    return this.http.post(`${this.apiUrl}/loans`, payload);
  }

  getCards(): Observable<any[]> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    return this.http.get<any[]>(`${this.apiUrl}/cards?customerId=${customerId}`).pipe(
      tap(data => this.cards.set(data))
    );
  }

  applyCard(cardData: any): Observable<any> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    const payload = {
      ...cardData,
      customerId,
      status: 'pending',
      number: this.generateCardNumber(),
      expiry: '12/29',
      used: 0,
      limit: cardData.cardType === 'Credit Card' ? 5000 : 10000,
      createdAt: new Date().toISOString()
    };
    return this.http.post(`${this.apiUrl}/cards`, payload);
  }

  private generateCardNumber(): string {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
  }

  getMobileWallets(): Observable<any[]> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    return this.http.get<any[]>(`${this.apiUrl}/mobileWallets?customerId=${customerId}`).pipe(
      tap(data => this.mobileWallets.set(data))
    );
  }

  getBillPayments(): Observable<any[]> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    return this.http.get<any[]>(`${this.apiUrl}/billPayments?customerId=${customerId}&_sort=-date`).pipe(
      tap(data => this.billPayments.set(data))
    );
  }

  payBill(paymentData: any): Observable<any> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    const payload = {
      ...paymentData,
      customerId,
      date: new Date().toISOString(),
      status: 'paid'
    };
    return this.http.post(`${this.apiUrl}/billPayments`, payload);
  }

  openAccount(accountData: any): Observable<any> {
    const user = this.authService.currentUser();
    const customerId = user?.customerId || 'CUST-001';
    const payload = {
      ...accountData,
      customerId,
      accountNumber: this.generateAccountNumber(),
      balance: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    return this.http.post(`${this.apiUrl}/accounts`, payload);
  }

  private generateAccountNumber(): string {
    return 'RN-' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  repayLoan(loanId: string, updatedLoan: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/loans/${loanId}`, updatedLoan);
  }
}
