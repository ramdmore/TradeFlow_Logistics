import { UserShipment } from "./user-shipment.model";

export interface UserKpiCard {
  title: string;
  value: number;
  trend?: string;
}

export interface UserDashboardData {
  kpiCards: UserKpiCard[];
  shipments: UserShipment[];
  totalCount: number;
}
