import { Component, OnInit } from '@angular/core';
import { DateServiceService } from '../services/date-service.service';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent{
  selected: Date | null | undefined;

  constructor(private dateService: DateServiceService) {}

  updateDate() {
    console.log(this.dateService);
    if (this.selected) {
      this.dateService.setSelectedDate(this.selected);
    }
  }


  

  
}

  

