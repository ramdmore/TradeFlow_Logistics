import { ShipmentAdmin } from "./shipmentAdmin.model";

export interface KpiCard {
  title: string;
  value: number;
  trend?: string;
  link: string;
}

export interface PendingSummary {
  documents: number;
  payments: number;
  quotes: number;
}

export interface DashboardData {
  userName: string;
  userRole: string;
  kpiCards: KpiCard[];
  recentShipments: ShipmentAdmin[];
  pending: PendingSummary;
}
