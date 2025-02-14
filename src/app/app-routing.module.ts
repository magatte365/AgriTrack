import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantTrackingComponent } from './plant-tracking/plant-tracking.component';
import { SensorComponent } from './sensor/sensor.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { WeatherModalComponent } from './weather-modal/weather-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'plant', component: PlantTrackingComponent},
  {path: 'sensor', component: SensorComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'modal', component: WeatherModalComponent}

 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
