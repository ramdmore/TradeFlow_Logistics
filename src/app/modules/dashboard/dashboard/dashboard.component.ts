import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { KpiCard, DashboardData } from '../../../core/models/dashboard.model';
import { DashboardService } from '../../../core/services/dashboard.service';
import { ShipmentAdmin } from '../../../core/models/shipmentAdmin.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName = '';
  userRole = '';

  kpiCards: KpiCard[] = [];
  recentShipments: ShipmentAdmin[] = [];

  pendingDocs = 0;
  pendingPayments = 0;
  pendingQuotes = 0;

  loading = true;

  // ✅ ADD THIS
  shipmentColumns: string[] = [
    'ref',
    'customer',
    'origin',
    'destination',
    'etd',
    'status',
    'actions'
  ];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.userName = data.userName;
        this.userRole = data.userRole;
        this.kpiCards = data.kpiCards;
        this.recentShipments = data.recentShipments;
        this.pendingDocs = data.pending.documents;
        this.pendingPayments = data.pending.payments;
        this.pendingQuotes = data.pending.quotes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard error', err);
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  viewShipment(s: ShipmentAdmin): void {
    this.router.navigate(['/shipments', s.ref]);
  }
}
