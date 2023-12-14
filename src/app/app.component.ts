import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { NavegacionComponent } from "./navegacion/navegacion.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ActivityCalendarComponent } from "./activity-calendar/activity-calendar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, NavbarComponent, NavegacionComponent, CalendarComponent, ActivityCalendarComponent]
})
export class AppComponent {
  title = 'gymApp';
}
