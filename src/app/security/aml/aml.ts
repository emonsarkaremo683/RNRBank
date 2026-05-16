import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-aml',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aml.html',
  styles: []
})
export class AmlComponent implements OnInit {
  private securityService = inject(SecurityService);
  amlAlerts: any[] = [];

  ngOnInit() {
    this.securityService.getAmlAlerts().subscribe(data => this.amlAlerts = data);
  }
}
