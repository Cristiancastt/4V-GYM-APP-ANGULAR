import { Component } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";
import { ActivityCalendarComponent } from "../activity-calendar/activity-calendar.component";

@Component({
    selector: 'app-activity-container',
    standalone: true,
    templateUrl: './activity-container.component.html',
    styleUrl: './activity-container.component.scss',
    imports: [CalendarComponent, ActivityCalendarComponent]
})
export class ActivityContainerComponent {

}
