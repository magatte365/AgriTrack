import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import Chart from 'chart.js/auto';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';

// Types definitions
interface MenuItem {
  id: string;
  icon: string;
  label: string;
  route?: string;
}

interface TimeFrame {
  label: string;
  value: '7d' | '30d' | '90d';
}

interface HealthStat {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
  icon: string;
}

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
  icon: string;
}

interface ChatMessage {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  forecast: string;
  windSpeed: number;
  precipitation: number;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('growthChart') growthChartCanvas!: ElementRef;
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  // Sidebar and header properties
  isSidebarOpen = true;
  activeTab = 'analytics';
  searchText = '';

  // Analytics properties
  selectedTimeframe: '7d' | '30d' | '90d' = '30d';
  timeframes: TimeFrame[] = [
    { label: '7 days', value: '7d' },
    { label: '30 days', value: '30d' },
    { label: '90 days', value: '90d' }
  ];

  // Menu items
  menuItems: MenuItem[] = [
    { id: 'dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard', route: '/home' },
    { id: 'plants', icon: 'bi bi-tree', label: 'Plant Tracking', route: '/plant' },
    { id: 'sensors', icon: 'bi bi-broadcast', label: 'IoT Sensors', route: '/sensor' },
    { id: 'analytics', icon: 'bi bi-graph-up', label: 'Analytics', route: '/analytics' },
    { id: 'alerts', icon: 'bi bi-bell', label: 'Alerts' },
    { id: 'settings', icon: 'bi bi-gear', label: 'Settings' }
  ];

  // Weather data
  weatherData: WeatherData = {
    temperature: 28,
    humidity: 65,
    forecast: 'Sunny',
    windSpeed: 12,
    precipitation: 20
  };

  // Health statistics
  healthStats: HealthStat[] = [
    {
      label: 'Healthy Plants',
      value: 85,
      change: 5,
      trend: 'up',
      status: 'healthy',
      icon: 'bi-heart-pulse'
    },
    {
      label: 'Need Attention',
      value: 12,
      change: -2,
      trend: 'down',
      status: 'warning',
      icon: 'bi-exclamation-triangle'
    },
    {
      label: 'Critical State',
      value: 3,
      change: 1,
      trend: 'up',
      status: 'critical',
      icon: 'bi-x-circle'
    }
  ];

  // Recent alerts
  recentAlerts: Alert[] = [
    {
      id: '1',
      title: 'Water Deficit Detected',
      message: 'Tomato Plot - North Section',
      severity: 'high',
      timestamp: new Date(),
      icon: 'bi-droplet-half'
    },
    {
      id: '2',
      title: 'Slowed Growth',
      message: 'Corn - East Section',
      severity: 'medium',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'bi-graph-down'
    }
  ];

  // Chat properties
  chatMessages: ChatMessage[] = [];
  currentMessage = '';
  private growthChart: Chart | null = null;

  constructor(private dialog: Dialog) { }

  ngOnInit() {
    // Initial welcome message
    this.chatMessages.push({
      type: 'assistant',
      text: 'Hello! I am your AgriTrack assistant. How can I help you today?',
      timestamp: new Date()
    });

    // Initialize weather data
    this.updateWeatherData();
  }

  ngAfterViewInit() {
    this.initGrowthChart();
  }

  // Weather Modal
  openWeatherModal() {
    this.dialog.open(WeatherModalComponent, {
      data: {
        currentWeather: this.weatherData
      }
    });
  }

  // Update weather data
  private updateWeatherData() {
    // Simulate weather data update every 5 minutes
    setInterval(() => {
      // In a real case, you would make an API call here
      this.weatherData = {
        ...this.weatherData,
        temperature: Math.round(Math.random() * (30 - 20) + 20),
        humidity: Math.round(Math.random() * (80 - 50) + 50),
        windSpeed: Math.round(Math.random() * (20 - 5) + 5)
      };
    }, 300000); // 5 minutes
  }

  // Chart initialization
  private initGrowthChart() {
    if (!this.growthChartCanvas) return;

    const ctx = this.growthChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.growthChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
          {
            label: 'Current Growth',
            data: [10, 15, 25, 30, 35, 40],
            borderColor: '#1a472a',
            tension: 0.4
          },
          {
            label: 'Expected Growth',
            data: [12, 18, 28, 35, 42, 48],
            borderColor: '#90caf9',
            tension: 0.4,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // UI handlers
  setTimeframe(timeframe: '7d' | '30d' | '90d') {
    this.selectedTimeframe = timeframe;
    // Update chart data based on timeframe
  }

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'bi-arrow-up-right' : 'bi-arrow-down-right';
  }

  handleAlert(alert: Alert) {
    // Handle alert action
    console.log('Handling alert:', alert);
  }

  // Chat functions
  async sendMessage() {
    if (!this.currentMessage.trim()) return;

    // Add user message
    this.chatMessages.push({
      type: 'user',
      text: this.currentMessage,
      timestamp: new Date()
    });

    // Simulate AI response
    const userQuestion = this.currentMessage;
    this.currentMessage = '';

    // Scroll to bottom
    setTimeout(() => {
      this.scrollToBottom();
    });

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add AI response
    this.chatMessages.push({
      type: 'assistant',
      text: this.generateResponse(userQuestion),
      timestamp: new Date()
    });

    // Scroll to bottom again
    setTimeout(() => {
      this.scrollToBottom();
    });
  }

  private generateResponse(question: string): string {
    // Simulate AI responses based on keywords
    const keywords = {
      'watering': 'To optimize watering, I recommend using humidity sensor data. The ideal time is early morning or evening to minimize evaporation.',
      'disease': 'If you observe signs of disease, take a photo of the plant and I can help identify the problem. Meanwhile, isolate affected plants to prevent spreading.',
      'fertilizer': 'The choice of fertilizer depends on your soil type and crop. Our sensors indicate that your soil is [type]. I recommend a fertilizer rich in [nutrients].',
      'temperature': `The optimal temperature for most crops is between 20 and 25°C. Your sensors currently indicate an average of ${this.weatherData.temperature}°C.`,
    };

    // Default response
    let response = 'I can help you with crop management. Ask me a question about watering, diseases, fertilizers, or temperature.';

    // Check for keywords in the question
    for (const [key, value] of Object.entries(keywords)) {
      if (question.toLowerCase().includes(key)) {
        response = value;
        break;
      }
    }

    return response;
  }

  private scrollToBottom() {
    if (!this.chatContainer) return;
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  clearChat() {
    this.chatMessages = [{
      type: 'assistant',
      text: 'History cleared. How can I help you?',
      timestamp: new Date()
    }];
  }

  // Sidebar toggle
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}