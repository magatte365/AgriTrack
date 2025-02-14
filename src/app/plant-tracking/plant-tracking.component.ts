import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';

interface PlantDetail {
  id: number;
  name: string;
  species: string;
  plantingDate: Date;
  expectedHarvestDate: Date;
  currentStage: string;
  progress: number;
  healthStatus: string;
  optimalTemp: string;
  optimalHumidity: string;
  lastMaintenance: Date;
  notes: string;
}

interface MaintenanceTask {
  id: number;
  plantId: number;
  taskName: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

interface CalendarEvent {
  title: string;
  start: Date;
  className: string;
  description: string;
}

@Component({
  selector: 'app-plant-tracking',
  templateUrl: './plant-tracking.component.html',
  styleUrls: ['./plant-tracking.component.css']
})
export class PlantTrackingComponent implements OnInit {
  isSidebarOpen = true;
  activeTab = 'plants';
  selectedPlant: PlantDetail | null = null;
  selectedView: 'grid' | 'calendar' = 'grid';

  // Menu items
  menuItems = [
    { id: 'dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard', route: '/home' },
    { id: 'plants', icon: 'bi bi-tree', label: 'Plant Monitoring', route: '/plant' },
    { id: 'sensors', icon: 'bi bi-broadcast', label: 'IoT Sensors', route: '/sensor' },
    { id: 'analytics', icon: 'bi bi-graph-up', label: 'Analytics', route: '/analytics' },
    { id: 'alerts', icon: 'bi bi-bell', label: 'Alerts' },
    { id: 'settings', icon: 'bi bi-gear', label: 'Settings' }
  ];

  // Données météo ajoutées
  weatherData = {
    temperature: 28,
    humidity: 65,
    forecast: 'Sunny'
  };

  plants: PlantDetail[] = [
    {
      id: 1,
      name: 'Tomato Plot',
      species: 'Roma Tomato',
      plantingDate: new Date(2025, 0, 15),
      expectedHarvestDate: new Date(2025, 3, 15),
      currentStage: 'Growth',
      progress: 45,
      healthStatus: 'Excellent',
      optimalTemp: '20-25°C',
      optimalHumidity: '60-80%',
      lastMaintenance: new Date(2025, 1, 10),
      notes: 'Normal development, vigorous growth'
    },
    {
      id: 2,
      name: 'Corn Plot',
      species: 'Sweet Corn',
      plantingDate: new Date(2025, 0, 20),
      expectedHarvestDate: new Date(2025, 4, 20),
      currentStage: 'Germination',
      progress: 30,
      healthStatus: 'Good',
      optimalTemp: '18-24°C',
      optimalHumidity: '50-70%',
      lastMaintenance: new Date(2025, 1, 12),
      notes: 'Uniform germination'
    }
  ];

  maintenanceTasks: MaintenanceTask[] = [
    {
      id: 1,
      plantId: 1,
      taskName: 'Fertilization',
      dueDate: new Date(2025, 1, 15),
      status: 'pending',
      priority: 'high',
      description: 'Apply organic fertilizer'
    },
    {
      id: 2,
      plantId: 1,
      taskName: 'Pruning',
      dueDate: new Date(2025, 1, 18),
      status: 'pending',
      priority: 'medium',
      description: 'Remove yellowed leaves'
    }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: frLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventDidMount: this.handleEventMount.bind(this),
    height: 'auto'
  };

  constructor() {}

  ngOnInit() {
    this.updateCalendarEvents();
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectPlant(plant: PlantDetail) {
    this.selectedPlant = plant;
  }

  toggleView(view: 'grid' | 'calendar') {
    this.selectedView = view;
  }

  updateCalendarEvents() {
    const events = this.maintenanceTasks.map(task => ({
      title: `${task.taskName} - ${this.plants.find(p => p.id === task.plantId)?.name}`,
      start: task.dueDate,
      classNames: [`priority-${task.priority}`, `status-${task.status}`],
      extendedProps: {
        description: task.description,
        priority: task.priority,
        status: task.status,
        taskId: task.id
      }
    }));

    this.calendarOptions.events = events;
  }

  handleEventClick(info: any) {
    // Gérer le clic sur un événement
    console.log('Event clicked:', info.event);
    const taskId = info.event.extendedProps.taskId;
    const task = this.maintenanceTasks.find(t => t.id === taskId);
    if (task) {
      const plant = this.plants.find(p => p.id === task.plantId);
      if (plant) {
        this.selectPlant(plant);
      }
    }
  }

  handleEventMount(info: any) {
    // Personnaliser l'affichage des événements
    const priority = info.event.extendedProps.priority;
    const status = info.event.extendedProps.status;
    info.el.querySelector('.fc-event-title').innerHTML = `
      <span class="event-title">
        <i class="bi bi-${status === 'completed' ? 'check-circle' : 'clock'}"></i>
        ${info.event.title}
      </span>
    `;
  }

  getMaintenanceTasks(plantId: number): MaintenanceTask[] {
    return this.maintenanceTasks.filter(task => task.plantId === plantId);
  }

  getPlantProgress(plant: PlantDetail): string {
    const totalDays = plant.expectedHarvestDate.getTime() - plant.plantingDate.getTime();
    const elapsedDays = new Date().getTime() - plant.plantingDate.getTime();
    const progress = (elapsedDays / totalDays) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(1);
  }

  updateTaskStatus(task: MaintenanceTask, status: 'pending' | 'completed' | 'overdue') {
    task.status = status;
    this.updateCalendarEvents();
  }
}