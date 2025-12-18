import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shipment } from '../models/shipment.model';

@Injectable({ providedIn: 'root' })
export class ShipmentService {

  private shipmentSource = new BehaviorSubject<Shipment[]>([
    { id: 1, product: 'Steel',          country: 'USA',           amount: 50000, status: 'Booked',     date: new Date('2025-12-20') },
    { id: 2, product: 'Textiles',       country: 'Germany',       amount: 30000, status: 'In Transit', date: new Date('2025-12-18') },
    { id: 3, product: 'Electronics',    country: 'China',         amount: 45000, status: 'Delivered',  date: new Date('2025-12-10') },
    { id: 4, product: 'Automobiles',    country: 'Japan',         amount: 60000, status: 'In Transit', date: new Date('2025-12-22') },
    { id: 5, product: 'Pharmaceuticals',country: 'India',         amount: 35000, status: 'Booked',     date: new Date('2025-12-25') },
    { id: 6, product: 'Furniture',      country: 'Italy',         amount: 25000, status: 'Booked',     date: new Date('2025-12-19') },
    { id: 7, product: 'Oil',            country: 'Saudi Arabia',  amount: 80000, status: 'In Transit', date: new Date('2025-12-21') },
    { id: 8, product: 'Cotton',         country: 'Egypt',         amount: 20000, status: 'Delivered',  date: new Date('2025-12-08') },
    { id: 9, product: 'Rice',           country: 'Thailand',      amount: 15000, status: 'Booked',     date: new Date('2025-12-24') },
    { id: 10, product: 'Coffee',        country: 'Brazil',        amount: 22000, status: 'Delivered',  date: new Date('2025-12-05') },
    { id: 11, product: 'Sugar',         country: 'Cuba',          amount: 18000, status: 'Booked',     date: new Date('2025-12-23') },
    { id: 12, product: 'Rubber',        country: 'Malaysia',      amount: 27000, status: 'In Transit', date: new Date('2025-12-19') },
    { id: 13, product: 'Cocoa',         country: 'Ghana',         amount: 24000, status: 'Delivered',  date: new Date('2025-12-09') },
    { id: 14, product: 'Gold',          country: 'South Africa',  amount: 90000, status: 'In Transit', date: new Date('2025-12-28') },
    { id: 15, product: 'Silver',        country: 'Mexico',        amount: 75000, status: 'Booked',     date: new Date('2025-12-26') },
    { id: 16, product: 'Wheat',         country: 'Canada',        amount: 32000, status: 'Delivered',  date: new Date('2025-12-07') },
    { id: 17, product: 'Corn',          country: 'Argentina',     amount: 28000, status: 'Booked',     date: new Date('2025-12-27') },
    { id: 18, product: 'Wine',          country: 'France',        amount: 40000, status: 'Delivered',  date: new Date('2025-12-03') },
    { id: 19, product: 'Cheese',        country: 'Switzerland',   amount: 35000, status: 'Booked',     date: new Date('2025-12-29') },
    { id: 20, product: 'Chocolate',     country: 'Belgium',       amount: 37000, status: 'In Transit', date: new Date('2025-12-20') },
    { id: 21, product: 'Glass',         country: 'Spain',         amount: 26000, status: 'Delivered',  date: new Date('2025-12-06') },
    { id: 22, product: 'Aluminum',      country: 'Russia',        amount: 48000, status: 'Booked',     date: new Date('2025-12-30') },
    { id: 23, product: 'Plastics',      country: 'South Korea',   amount: 33000, status: 'In Transit', date: new Date('2025-12-21') }
  ]);

  getShipments() {
    return this.shipmentSource.asObservable();
  }
}
