import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBankingService } from '../../../services/banking.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html'
})
export class NewsComponent implements OnInit {
  private bankingService = inject(MockBankingService);
  newsItems: any[] = [];

  ngOnInit(): void {
    this.bankingService.getNews().subscribe(data => this.newsItems = data);
  }
}
