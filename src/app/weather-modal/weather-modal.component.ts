// weather-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

interface WeatherForecast {
  day: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: string;
  icon: string;
}

@Component({
  selector: 'app-weather-modal',
  template: `
    <div class="modal-overlay" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Weather Forecast</h2>
          <button class="close-btn" (click)="close()">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="current-weather">
          <div class="main-info">
            <i [class]="'bi ' + currentWeather.icon"></i>
            <div class="temperature">
              <span class="temp-value">{{currentWeather.temperature}}°C</span>
              <span class="forecast">{{currentWeather.forecast}}</span>
            </div>
          </div>
          <div class="details">
            <div class="detail-item">
              <i class="bi bi-droplet"></i>
              <span>{{currentWeather.humidity}}%</span>
              <small>Humidity</small>
            </div>
            <div class="detail-item">
              <i class="bi bi-wind"></i>
              <span>{{currentWeather.windSpeed}} km/h</span>
              <small>Wind</small>
            </div>
            <div class="detail-item">
              <i class="bi bi-cloud-rain"></i>
              <span>{{currentWeather.precipitation}}%</span>
              <small>Precipitation</small>
            </div>
          </div>
        </div>

        <div class="forecast-container">
          <h3>5-Day Forecast</h3>
          <div class="forecast-list">
            <div class="forecast-item" *ngFor="let forecast of weeklyForecast">
              <div class="day">{{forecast.day}}</div>
              <i [class]="'bi ' + forecast.icon"></i>
              <div class="temp-range">
                <span>{{forecast.temperature}}°C</span>
              </div>
              <div class="forecast-details">
                <small>
                  <i class="bi bi-droplet"></i> {{forecast.humidity}}%
                </small>
                <small>
                  <i class="bi bi-wind"></i> {{forecast.windSpeed}} km/h
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 600px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }

    .current-weather {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .main-info {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1.5rem;
    }

    .main-info i {
      font-size: 4rem;
      color: #1a472a;
    }

    .temperature {
      display: flex;
      flex-direction: column;
    }

    .temp-value {
      font-size: 3rem;
      font-weight: bold;
    }

    .forecast {
      font-size: 1.2rem;
      color: #666;
    }

    .details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      text-align: center;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .detail-item i {
      font-size: 1.5rem;
      color: #1a472a;
    }

    .forecast-container {
      padding: 1rem 0;
    }

    .forecast-list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
    }

    .forecast-item {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .forecast-item i {
      font-size: 2rem;
      color: #1a472a;
    }

    .day {
      font-weight: bold;
    }

    .forecast-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.8rem;
      color: #666;
    }

    @media (max-width: 768px) {
      .forecast-list {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 480px) {
      .forecast-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class WeatherModalComponent implements OnInit {
  currentWeather = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    forecast: 'Sunny',
    icon: 'bi-sun'
  };

  weeklyForecast: WeatherForecast[] = [
    {
      day: 'Mon',
      temperature: 27,
      humidity: 60,
      windSpeed: 10,
      precipitation: 10,
      forecast: 'Sunny',
      icon: 'bi-sun'
    },
    {
      day: 'Tue',
      temperature: 25,
      humidity: 70,
      windSpeed: 15,
      precipitation: 30,
      forecast: 'Cloudy',
      icon: 'bi-cloud'
    },
    {
      day: 'Wed',
      temperature: 23,
      humidity: 75,
      windSpeed: 20,
      precipitation: 60,
      forecast: 'Rainy',
      icon: 'bi-cloud-rain'
    },
    {
      day: 'Thu',
      temperature: 24,
      humidity: 68,
      windSpeed: 12,
      precipitation: 40,
      forecast: 'Partly Cloudy',
      icon: 'bi-cloud-sun'
    },
    {
      day: 'Fri',
      temperature: 26,
      humidity: 62,
      windSpeed: 8,
      precipitation: 15,
      forecast: 'Sunny',
      icon: 'bi-sun'
    }
  ];

  constructor(private dialog: Dialog) {}

  ngOnInit() {}

  close() {
    this.dialog.closeAll();
  }
}