import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../services/operations.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-statements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statements.html',
  styles: []
})
export class StatementsComponent implements OnInit {
  private opsService = inject(OperationsService);
  statements: any[] = [];
  isExporting = false;

  ngOnInit() {
    this.opsService.getStatements().subscribe(data => this.statements = data);
  }

  async downloadPdf(stmt: any) {
    this.isExporting = true;
    try {
      // In a real app we'd fetch statement details and render them.
      // Here we just mock generating a simple PDF.
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(20);
      pdf.text('RNR Bank Statement', 20, 20);
      pdf.setFontSize(12);
      pdf.text(`Statement ID: ${stmt.id}`, 20, 30);
      pdf.text(`Account ID: ${stmt.accountId}`, 20, 40);
      pdf.text(`Month: ${stmt.month}`, 20, 50);
      pdf.text(`Opening Balance: $${stmt.openingBalance}`, 20, 60);
      pdf.text(`Closing Balance: $${stmt.closingBalance}`, 20, 70);
      pdf.text(`Total Credit: $${stmt.totalCredit}`, 20, 80);
      pdf.text(`Total Debit: $${stmt.totalDebit}`, 20, 90);
      
      pdf.save(`Statement_${stmt.id}.pdf`);
    } finally {
      this.isExporting = false;
    }
  }
}
