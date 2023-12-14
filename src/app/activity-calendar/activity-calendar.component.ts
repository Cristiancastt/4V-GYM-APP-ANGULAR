import { Component } from '@angular/core';
import { DateServiceService } from '../services/date-service.service';


@Component({
  selector: 'app-activity-calendar',
  standalone: true,
  imports: [],
  templateUrl: './activity-calendar.component.html',
  styleUrl: './activity-calendar.component.scss'
})
export class ActivityCalendarComponent {
  selectedDate: Date = new Date();
  formattedDate: string = "";

  constructor(private dateService: DateServiceService) {}

  ngOnInit() {
    this.dateService.selectedDate$.subscribe((date) => {
      this.selectedDate = date;
    });

    this.dateService.formattedDate$.subscribe((formattedDate) => {
      this.formattedDate = formattedDate;
    });
  }

  updateDate() {
    this.dateService.setSelectedDate(this.selectedDate);
  }

  decrementDate() {
    this.dateService.decrementDate();
    this.updateDate();
  }

  incrementDate() {
    this.dateService.incrementDate();
    this.updateDate();
  }
}
