import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { NavegacionComponent } from "./navegacion/navegacion.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ActivityCalendarComponent } from "./activity-calendar/activity-calendar.component";
import { CarrouselComponent } from "./carrousel/carrousel.component";
import { AddMonitorButtonComponent } from "./add-monitor-button/add-monitor-button.component";
import { ActivityContainerComponent } from "./activity-container/activity-container.component";
import { MonitorContainerComponent } from "./monitor-container/monitor-container.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, NavbarComponent, NavegacionComponent, CalendarComponent, ActivityCalendarComponent, CarrouselComponent, AddMonitorButtonComponent, ActivityContainerComponent, MonitorContainerComponent]
})
export class AppComponent {
  title = 'gymApp';
}
