import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfers.html',
  styles: []
})
export class TransfersComponent implements OnInit {
  private opsService = inject(OperationsService);
  transfers: any[] = [];

  ngOnInit() {
    this.opsService.getTransfers().subscribe(data => this.transfers = data);
  }
}
