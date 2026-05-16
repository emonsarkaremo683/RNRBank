import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  async exportToPdf(elementId: string, fileName: string): Promise<void> {
    const data = document.getElementById(elementId);
    if (!data) return;

    // Use modern high-resolution canvas settings
    const canvas = await html2canvas(data, { 
      scale: 3, 
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Define layout margins and dimensions
    const margin = 10;
    const imgWidth = pdfWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png', 1.0);
    
    // Add professional header
    const displayTitle = fileName.replace(/_/g, ' ').toUpperCase();
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text(`RNR BANK - ${displayTitle}`, margin, margin + 5);
    
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, margin + 11);
    
    // Draw separator line
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(margin, margin + 14, pdfWidth - margin, margin + 14);
    
    // Add content image with multi-page support
    const startPosition = margin + 18;
    let heightLeft = imgHeight;
    let position = startPosition;
    
    pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - startPosition);
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin; // Keep a small margin at the top of new pages
      pdf.addPage();
      pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    
    pdf.save(`${fileName}_${new Date().getTime()}.pdf`);
  }
}
