import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCarrousselComponent } from './monitor-carroussel.component';

describe('MonitorCarrousselComponent', () => {
  let component: MonitorCarrousselComponent;
  let fixture: ComponentFixture<MonitorCarrousselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorCarrousselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorCarrousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
