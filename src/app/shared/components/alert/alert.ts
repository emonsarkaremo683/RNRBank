import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html'
})
export class AlertComponent {
  @Input() type: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  visible: boolean = true;

  getIcon(): string {
    switch (this.type) {
      case 'success': return 'bi-check-circle-fill';
      case 'danger': return 'bi-exclamation-octagon-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      default: return 'bi-info-circle-fill';
    }
  }

  close() {
    this.visible = false;
  }
}
