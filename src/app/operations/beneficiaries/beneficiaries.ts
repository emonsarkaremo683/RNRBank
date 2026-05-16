import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beneficiaries.html',
  styles: []
})
export class BeneficiariesComponent implements OnInit {
  private opsService = inject(OperationsService);
  beneficiaries: any[] = [];

  ngOnInit() {
    this.opsService.getBeneficiaries().subscribe(data => this.beneficiaries = data);
  }
}
