export type UserShipmentStatus = 'Booked' | 'In Transit' | 'Delivered';

export interface UserShipment {
  id: string;
  product: string;
  country: string;
  amount: number;
  status: UserShipmentStatus;
  date: string | Date;   // shipment date
}
