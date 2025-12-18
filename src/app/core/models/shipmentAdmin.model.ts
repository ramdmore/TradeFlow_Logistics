export type ShipmentStatus = 'Booked' | 'In Transit' | 'Delivered';

export interface ShipmentAdmin {
  ref: string;
  customer: string;
  origin: string;
  destination: string;
  etd: string | Date;
  status: ShipmentStatus;
}
