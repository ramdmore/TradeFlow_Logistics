import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardData } from '../models/dashboard.model';
import { ShipmentAdmin } from '../models/shipmentAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() {}

  getDashboardData(): Observable<DashboardData> {
    const mockRecentShipments: ShipmentAdmin[] = [
      {
        ref: 'IMP-001',
        customer: 'ABC Exports',
        origin: 'Mumbai',
        destination: 'Dubai',
        etd: new Date('2025-12-20'),
        status: 'Booked'
      },
      {
        ref: 'EXP-002',
        customer: 'Global Traders',
        origin: 'Chennai',
        destination: 'Singapore',
        etd: new Date('2025-12-22'),
        status: 'In Transit'
      },
      {
        ref: 'EXP-003',
        customer: 'XYZ Corp',
        origin: 'Hyderabad',
        destination: 'New York',
        etd: new Date('2025-12-18'),
        status: 'Delivered'
      }
    ];

    const data: DashboardData = {
      userName: 'Admin User',
      userRole: 'Admin',
      kpiCards: [
        { title: 'Active Shipments', value: 3, trend: '+1 vs last week', link: '/shipments?filter=active' },
        { title: 'Departing in 7 days', value: 1, link: '/shipments?filter=departing' },
        { title: 'Arriving in 7 days', value: 2, link: '/shipments?filter=arriving' },
        { title: 'Pending Payments', value: 5, link: '/payments?filter=pending' }
      ],
      recentShipments: mockRecentShipments,
      pending: {
        documents: 2,
        payments: 5,
        quotes: 1
      }
    };

    return of(data); // emit mock data immediately
  }
}
