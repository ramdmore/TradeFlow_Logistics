export type ShipmentStatus = 'Booked' | 'In Transit' | 'Delivered';

export interface Shipment {
  id: number;              // changed from string to number
  product: string;
  country: string;
  amount: number;
  status: ShipmentStatus;
  date: string | Date;
}
