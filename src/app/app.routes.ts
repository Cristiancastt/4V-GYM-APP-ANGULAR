import { Routes } from '@angular/router';
import { ActivityContainerComponent } from './activity-container/activity-container.component';
import { MonitorContainerComponent } from './monitor-container/monitor-container.component';

export const routes: Routes = [
    { path: 'actividades', component: ActivityContainerComponent },
    { path: 'monitores', component: MonitorContainerComponent },
    { path: '', redirectTo: '/actividades', pathMatch: 'full' },
  ];
