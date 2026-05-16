import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BankingService, LoanOffer, CreditCard, ExchangeRate, Branch, ATM, NewsItem, FAQItem } from '../models/banking.models';

@Injectable({
  providedIn: 'root'
})
export class MockBankingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getServices(): Observable<BankingService[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accountTypes`).pipe(
      map(types => types.map(t => ({
        id: t.id,
        title: t.name,
        description: t.description,
        icon: 'bi-bank',
        link: `/services/${t.name.toLowerCase()}`
      })))
    );
  }

  getLoanOffers(): Observable<LoanOffer[]> {
    return this.http.get<LoanOffer[]>(`${this.apiUrl}/loanTypes`);
  }

  getExchangeRates(): Observable<ExchangeRate[]> {
    // Simulated from a settings or dedicated endpoint if existed
    return this.http.get<ExchangeRate[]>(`${this.apiUrl}/exchangeRates`);
  }

  getFAQs(): Observable<FAQItem[]> {
    // Using a hardcoded fallback if not in db.json, or adding it to db.json
    return this.http.get<FAQItem[]>(`${this.apiUrl}/faqs`);
  }

  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.apiUrl}/newsItems`);
  }
}
