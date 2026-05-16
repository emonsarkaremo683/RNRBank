import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OperationsSidebarComponent } from '../../components/operations-sidebar/operations-sidebar';
import { OperationsNavbarComponent } from '../../components/operations-navbar/operations-navbar';

@Component({
  selector: 'app-operations-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OperationsSidebarComponent, OperationsNavbarComponent],
  templateUrl: './operations-layout.html',
  styles: []
})
export class OperationsLayoutComponent {}
