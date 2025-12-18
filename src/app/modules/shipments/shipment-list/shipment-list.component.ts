import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShipmentService } from '../../../core/services/shipment.service';
import { Shipment } from '../../../core/models/shipment.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface KpiCard {
  title: string;
  value: number;
  trend?: string;
  color: string;
}

@Component({
  selector: 'app-shipment-list',
  standalone: false,
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['product', 'country', 'amount', 'status', 'date'];
  dataSource = new MatTableDataSource<Shipment>([]);

  kpiCards: KpiCard[] = [];
  countries: string[] = [];

  filter = {
    search: '',
    status: '',
    country: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ShipmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getShipments().subscribe(data => {
      this.dataSource.data = data;
      this.buildKpiCards(data);
      this.buildCountryList(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupFilterPredicate();
  }

  // ---------------- KPI LOGIC ----------------
  private buildKpiCards(data: Shipment[]): void {
    const total = data.length;
    const booked = data.filter(s => s.status === 'Booked').length;
    const inTransit = data.filter(s => s.status === 'In Transit').length;
    const delivered = data.filter(s => s.status === 'Delivered').length;

    this.kpiCards = [
      {
        title: 'Total Shipments',
        value: total,
        color: 'kpi-blue'
      },
      {
        title: 'Booked',
        value: booked,
        color: 'kpi-purple'
      },
      {
        title: 'In Transit',
        value: inTransit,
        color: 'kpi-green'
      },
      {
        title: 'Delivered',
        value: delivered,
        color: 'kpi-orange'
      }
    ];
  }

  private buildCountryList(data: Shipment[]): void {
    this.countries = Array.from(new Set(data.map(s => s.country))).sort();
  }

  // ---------------- FILTER LOGIC ----------------
  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (row: Shipment, filter: string) => {
      const parsed = filter
        ? JSON.parse(filter) as { search: string; status: string; country: string }
        : { search: '', status: '', country: '' };

      const text = parsed.search.toLowerCase();

      const matchesText =
        !text ||
        row.product?.toLowerCase().includes(text) ||
        row.country?.toLowerCase().includes(text);

      const matchesStatus =
        !parsed.status || row.status === parsed.status;

      const matchesCountry =
        !parsed.country || row.country === parsed.country;

      return matchesText && matchesStatus && matchesCountry;
    };
  }

  applyTextFilter(event: Event): void {
    this.filter.search = (event.target as HTMLInputElement).value;
    this.applyFilter();
  }

  applyFilter(): void {
    this.dataSource.filter = JSON.stringify(this.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onStatusChange(): void {
    this.applyFilter();
  }

  onCountryChange(): void {
    this.applyFilter();
  }

  // ---------------- AUTH ----------------
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
