import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AnalyticsSidebarComponent } from '../../components/analytics-sidebar/analytics-sidebar';
import { AnalyticsNavbarComponent } from '../../components/analytics-navbar/analytics-navbar';

@Component({
  selector: 'app-analytics-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AnalyticsSidebarComponent, AnalyticsNavbarComponent],
  templateUrl: './analytics-layout.html',
  styles: []
})
export class AnalyticsLayoutComponent {}
