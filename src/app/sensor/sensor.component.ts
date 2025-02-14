import { Component, OnInit } from '@angular/core';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';

// Define string literal types for status and sensor types
type SensorStatus = 'active' | 'inactive' | 'maintenance' | 'error';
type SensorType = 'temperature' | 'humidity' | 'soil' | 'light' | 'pH';

// Define interfaces
interface Sensor {
  id: number;
  name: string;
  type: SensorType;
  model: string;
  location: string;
  status: SensorStatus;
  lastReading: {
    value: number;
    unit: string;
    timestamp: Date;
  };
  batteryLevel: number;
  installationDate: Date;
  maintenanceHistory: {
    date: Date;
    action: string;
    technician: string;
  }[];
}

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  isSidebarOpen = true;
  activeTab = 'sensors';
  selectedSensor: Sensor | null = null;
  searchText: string = '';
  filterType: 'all' | SensorType = 'all';
  filterStatus: 'all' | SensorStatus = 'all';

  menuItems: MenuItem[] = [
    { id: 'dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard', route: '/home' },
    { id: 'plants', icon: 'bi bi-tree', label: 'Plant Monitoring', route: '/plant' },
    { id: 'sensors', icon: 'bi bi-broadcast', label: 'IoT Sensors', route: '/sensor' },
    { id: 'analytics', icon: 'bi bi-graph-up', label: 'Analytics', route: '/analytics' },
    { id: 'alerts', icon: 'bi bi-bell', label: 'Alerts' },
    { id: 'settings', icon: 'bi bi-gear', label: 'Settings' }
  ];

  weatherData = {
    temperature: 28,
    humidity: 65,
    forecast: 'Sunny'
  };

  sensors: Sensor[] = [
    {
      id: 1,
      name: 'Sensor-T1',
      type: 'temperature',
      model: 'TempPro 2000',
      location: 'Tomato Plot - North',
      status: 'active',
      lastReading: {
        value: 23.5,
        unit: '°C',
        timestamp: new Date()
      },
      batteryLevel: 85,
      installationDate: new Date(2024, 11, 15),
      maintenanceHistory: [
        {
          date: new Date(2025, 1, 10),
          action: 'Calibration',
          technician: 'engineer'
        }
      ]
    },
    {
      id: 2,
      name: 'Sensor-H1',
      type: 'humidity',
      model: 'HygroSense X1',
      location: 'Corn Plot - Center',
      status: 'active',
      lastReading: {
        value: 65,
        unit: '%',
        timestamp: new Date()
      },
      batteryLevel: 92,
      installationDate: new Date(2024, 11, 20),
      maintenanceHistory: []
    }
  ];

  constructor() {}

  ngOnInit() {}

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectSensor(sensor: Sensor) {
    this.selectedSensor = sensor;
  }

  getStatusClass(status: SensorStatus): string {
    const statusClasses: Record<SensorStatus, string> = {
      active: 'status-active',
      inactive: 'status-inactive',
      maintenance: 'status-maintenance',
      error: 'status-error'
    };
    return statusClasses[status];
  }

  getTypeIcon(type: SensorType): string {
    const typeIcons: Record<SensorType, string> = {
      temperature: 'bi-thermometer-half',
      humidity: 'bi-droplet',
      soil: 'bi-flower1',
      light: 'bi-brightness-high',
      pH: 'bi-water'
    };
    return typeIcons[type];
  }

  getFilteredSensors(): Sensor[] {
    return this.sensors.filter(sensor => {
      const matchesSearch = sensor.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                          sensor.location.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesType = this.filterType === 'all' || sensor.type === this.filterType;
      const matchesStatus = this.filterStatus === 'all' || sensor.status === this.filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }
}