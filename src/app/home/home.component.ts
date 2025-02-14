// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';

interface PlantData {
  id: number;
  name: string;
  humidity: number;
  temperature: number;
  lastWatering: Date;
  health: string;
  nextWateringDue: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSidebarOpen = true;
  activeTab = 'dashboard';
  
  // Current weather data
  weatherData = {
    temperature: 28,
    humidity: 65,
    forecast: 'Sunny'
  };

  // Plant data
  plantsData: PlantData[] = [
    {
      id: 1,
      name: 'Tomato Plot',
      humidity: 68,
      temperature: 25,
      lastWatering: new Date(2025, 1, 13, 8, 30),
      health: 'Excellent',
      nextWateringDue: new Date(2025, 1, 13, 16, 30)
    },
    {
      id: 2,
      name: 'Corn Plot',
      humidity: 55,
      temperature: 27,
      lastWatering: new Date(2025, 1, 13, 7, 45),
      health: 'Good',
      nextWateringDue: new Date(2025, 1, 13, 17, 45)
    }
  ];

  // Data for charts
  temperatureChartData = [
    {
      name: "Temperature",
      series: [
        { name: "6 AM", value: 22 },
        { name: "9 AM", value: 24 },
        { name: "12 PM", value: 28 },
        { name: "3 PM", value: 27 },
        { name: "6 PM", value: 25 }
      ]
    }
  ];

  humidityChartData = [
    {
      name: "Humidity",
      series: [
        { name: "6 AM", value: 70 },
        { name: "9 AM", value: 65 },
        { name: "12 PM", value: 60 },
        { name: "3 PM", value: 58 },
        { name: "6 PM", value: 62 }
      ]
    }
  ];

  // Chart options
  view: [number, number] = [700, 300];
  legend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Hour';
  yAxisLabel: string = 'Value';
  animations: boolean = true;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3']
  };

  selectedChart: 'temperature' | 'humidity' = 'temperature';

  // Menu items
  menuItems = [
    { id: 'dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard', route: '/home' },
    { id: 'plants', icon: 'bi bi-tree', label: 'Plant Monitoring', route: '/plant' },
    { id: 'sensors', icon: 'bi bi-broadcast', label: 'IoT Sensors', route: '/sensor' },
    { id: 'analytics', icon: 'bi bi-graph-up', label: 'Analytics', route: '/analytics' },
    { id: 'alerts', icon: 'bi bi-bell', label: 'Alerts' },
    { id: 'settings', icon: 'bi bi-gear', label: 'Settings' }
  ];

  // Recent alerts
  recentAlerts = [
    {
      type: 'warning',
      message: 'Low humidity level - Corn Plot',
      time: '11:30'
    },
    {
      type: 'info',
      message: 'Scheduled watering in 1 hour - Tomato Plot',
      time: '13:45'
    },
    {
      type: 'success',
      message: 'Watering completed - Tomato Plot',
      time: '08:30'
    }
  ];

  constructor() {}

  ngOnInit() {
    // Initialization
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  toggleChart(type: 'temperature' | 'humidity') {
    this.selectedChart = type;
    this.yAxisLabel = type === 'temperature' ? 'Temperature (°C)' : 'Humidity (%)';
  }

  getHealthClass(health: string): string {
    switch (health.toLowerCase()) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'average': return 'text-warning';
      default: return 'text-danger';
    }
  }

  getTimeUntilWatering(nextWatering: Date): string {
    const now = new Date();
    const diff = nextWatering.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
  
}