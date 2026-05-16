import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forex.html'
})
export class ForexComponent implements OnInit {
  rates: any[] = [];

  ngOnInit(): void {
    this.rates = [
      { currency: 'US Dollar', code: 'USD', buy: 1.0000, sell: 1.0000, flag: '🇺🇸' },
      { currency: 'Euro', code: 'EUR', buy: 0.9205, sell: 0.9215, flag: '🇪🇺' },
      { currency: 'British Pound', code: 'GBP', buy: 0.7850, sell: 0.7865, flag: '🇬🇧' },
      { currency: 'Japanese Yen', code: 'JPY', buy: 156.40, sell: 156.70, flag: '🇯🇵' },
      { currency: 'Canadian Dollar', code: 'CAD', buy: 1.3620, sell: 1.3645, flag: '🇨🇦' },
      { currency: 'Australian Dollar', code: 'AUD', buy: 1.5030, sell: 1.5060, flag: '🇦🇺' },
      { currency: 'Swiss Franc', code: 'CHF', buy: 0.9020, sell: 0.9045, flag: '🇨🇭' }
    ];
  }
}
