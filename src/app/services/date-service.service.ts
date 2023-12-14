import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {
  
  private selectedDateSubject = new BehaviorSubject<Date>(new Date());
  selectedDate$: Observable<Date> = this.selectedDateSubject.asObservable();
  formattedDate$: Observable<string>;

  constructor() {
    this.formattedDate$ = this.selectedDateSubject.asObservable().pipe(
      map((date: string | number | Date) => formatDate(date, 'dd  MMMM yyyy', 'en-US'))
    );
  }

  setSelectedDate(date: Date) {
    this.updateSelectedDate(date);
  }

  private updateSelectedDate(date: Date) {
    this.selectedDateSubject.next(date);
  }

  incrementDate() {
    const newDate = new Date(this.selectedDateSubject.value);
    newDate.setDate(newDate.getDate() + 1);
    this.updateSelectedDate(newDate);
  }

  decrementDate() {
    const newDate = new Date(this.selectedDateSubject.value);
    newDate.setDate(newDate.getDate() - 1);
    this.updateSelectedDate(newDate);
  }
}
