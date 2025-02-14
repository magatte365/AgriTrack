import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTrackingComponent } from './plant-tracking.component';

describe('PlantTrackingComponent', () => {
  let component: PlantTrackingComponent;
  let fixture: ComponentFixture<PlantTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
