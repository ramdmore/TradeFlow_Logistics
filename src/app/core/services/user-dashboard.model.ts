import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDashboardData } from '../models/user-dashboard.model';
import { UserShipment } from '../models/user-shipment.model';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor() {}

  getDashboardData(): Observable<UserDashboardData> {
    const shipments: UserShipment[] = [
      { id: '1', product: 'Steel',        country: 'USA',     amount: 50000, status: 'Booked',     date: new Date('2025-12-20') },
      { id: '2', product: 'Textiles',     country: 'Germany', amount: 30000, status: 'In Transit', date: new Date('2025-12-18') },
      { id: '3', product: 'Electronics',  country: 'China',   amount: 45000, status: 'Delivered',  date: new Date('2025-12-10') },
      { id: '4', product: 'Automobiles',  country: 'Japan',   amount: 60000, status: 'In Transit', date: new Date('2025-12-22') },
      { id: '5', product: 'Pharmaceuticals', country: 'India', amount: 35000, status: 'Booked',   date: new Date('2025-12-25') }
    ];

    const data: UserDashboardData = {
      kpiCards: [
        { title: 'Total Shipments', value: shipments.length, trend: '+2 this month' },
        { title: 'In Transit',      value: shipments.filter(s => s.status === 'In Transit').length },
        { title: 'Delivered',       value: shipments.filter(s => s.status === 'Delivered').length },
        { title: 'Pending Payments', value: 3 }
      ],
      shipments,
      totalCount: shipments.length
    };

    return of(data);
  }
}
