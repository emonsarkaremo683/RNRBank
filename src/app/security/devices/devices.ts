import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devices.html',
  styles: []
})
export class DevicesComponent implements OnInit {
  private securityService = inject(SecurityService);
  devices: any[] = [];

  ngOnInit() {
    this.securityService.getDevices().subscribe(data => this.devices = data);
  }

  blockDevice(id: any) {
    if (confirm('Block this device from future system access?')) {
      this.devices = this.devices.filter(d => d.id !== id);
    }
  }
}
