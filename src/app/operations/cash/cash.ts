import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash.html',
  styles: []
})
export class CashComponent implements OnInit {
  cashSummary = {
    openingBalance: 25000000,
    deposits: 4500000,
    withdrawals: 2800000,
    currentVault: 26700000
  };

  ngOnInit() {}
}
