import { Component  } from '@angular/core';
import { DateServiceService } from '../services/date-service.service';
import { ApiService } from '../services/api.service';
import { Activity } from '../services/models/activity';
import { DatePipe, CommonModule } from '@angular/common';
import { ReloadService } from '../services/reload-service.service';
import { Monitor } from '../services/models/monitor';
import { ActivityType } from '../services/models/activity_type';
import {  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-activity-calendar',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-calendar.component.html',
  styleUrl: './activity-calendar.component.scss'
})
export class ActivityCalendarComponent {

  form = new FormGroup({
    activityTypeId: new FormControl("", Validators.required),
    monitor1: new FormControl('', Validators.required),
    monitor2: new FormControl('')
  });
  submitted = false;

  listDateStart: string[] = ["09:00", "13:30", "17:30"];
  date_start: string = "";
  date_end: string = "";
  formatDate(hora:string){
    var day = this.datePipe.transform(this.selectedDate, 'dd');
    var month = this.selectedDate.getMonth()+1;
    var year = this.selectedDate.getFullYear();
    if (hora == "09:00:00"){
      this.date_start = `${year}-${month}-${day} ${hora}`;
      this.date_end = `${year}-${month}-${day} 10:30:00`;
    }else if( hora == "13:30:00") {
      this.date_start = `${year}-${month}-${day} ${hora}`;
      this.date_end = `${year}-${month}-${day} 15:00:00`;
    }else if( hora == "17:30:00") {
      this.date_start = `${year}-${month}-${day} ${hora}`;
      this.date_end = `${year}-${month}-${day} 19:00:00`;
    }
  }

  checkMissingHours() {
    for (const response of this.activities) {
      const startHour = this.datePipe.transform(response.date_start, 'HH:mm') || '';
      const index = this.listDateStart.indexOf(startHour);
      if (index !== -1) {
        this.listDateStart.splice(index, 1);
      }
    }
  }

  calculateEndTime(hora:string){
    if (hora == "09:00" || hora == "09:00:00"){
      return `10:30`;
    }else if( hora == "13:30" || hora == "13:30:00") {
      return `15:00`;
    }else if( hora == "17:30" || hora == "17:30:00") {
      return `19:00`;
    }
    return ""; 
  }

  

  onSubmit() {
    if (this.form.valid) {
      var activityData: {
        activity_type_id: number,
        date_start: string,
        date_end: string,
        monitors: { id: number }[]
      } = {
        activity_type_id: null!,  
        date_start: this.date_start,
        date_end: this.date_end,
        monitors: []
      };
      var monitor1Id = this.form.get('monitor1')?.value;
      var monitor2Id = this.form.get('monitor2')?.value;
      var activityTypeId = this.form.get('activityTypeId')?.value;
      if (activityTypeId && activityTypeId !== '') {
        activityData.activity_type_id = parseInt(activityTypeId, 10);
      }
      if (monitor1Id) {
        activityData.monitors.push({ "id": parseInt(monitor1Id, 10) });
      }
      
      if (monitor2Id) {
        activityData.monitors.push({ "id": parseInt(monitor2Id, 10) });
      }
      activityData.date_end = this.date_end;
      activityData.date_start = this.date_start;

      this.apiService.addActivity(activityData).subscribe(
        response => {
          console.log('Actividad agregada exitosamente:', response);
          this.updateActivities();
          console.log(activityData);
          this.closeCard();
        },
        error => {
          console.error('Error al agregar la actividad:', error);
          console.log(activityData);
        }
      );
    }
    this.submitted = true;

  }
  
  
  
  
  
  card(hora:string){
    this.showCard();
    this.form.reset();
    this.formatDate(hora);
  }

  



  @ViewChild('addActivityCard', { static: false }) cardActivity!: ElementRef;

  closeCard() {

    this.cardActivity.nativeElement.classList.add('hidden');
  }

  showCard() {
    this.cardActivity.nativeElement.classList.remove('hidden');
  }


  listMonitors:Monitor[] = [];
  listActivitiesTypes:ActivityType[] = [];
  selectedDate: Date = new Date();
  formattedDate: string = "";
  activities: Activity[] = []; 
  formattedDateApi: string = "";
  errorMessage: string = "";


  constructor(private dateService: DateServiceService, private apiService: ApiService, private reloadService:ReloadService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.dateService.selectedDate$.subscribe((date) => {
      this.selectedDate = date;
      this.updateActivities();
    });

    this.dateService.formattedDate$.subscribe((formattedDate) => {
      this.formattedDate = formattedDate;

    });

    
    this.updateActivities();

    this.apiService.getMonitors().subscribe((monitors: Monitor[]) => {
      this.listMonitors = monitors;
    });

    this.apiService.getActivityTypes().subscribe((activities: ActivityType[]) => {
      this.listActivitiesTypes = activities;
    });

    this.checkMissingHours();
    
  }
  
    updateActivities() {
      this.apiService.getActivitiesByDate(this.formattedDateApiMethod(this.selectedDate)).subscribe(
        (activities) => {
          this.activities = activities;
          this.errorMessage = "";
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          this.errorMessage = error.message;
        }
      );
    }
  

  updateDate() {
    this.dateService.setSelectedDate(this.selectedDate);
    this.updateActivities();
    this.checkMissingHours();
    
  }

  decrementDate() {
    this.dateService.decrementDate();
    this.updateDate();
    this.updateActivities();
    this.checkMissingHours();
  }

  incrementDate() {
    this.dateService.incrementDate();
    this.updateDate();
    this.updateActivities();
    this.checkMissingHours();
  }

  formattedDateApiMethod(inputDate: Date): string {
    const day: number = inputDate.getDate();
    const month: number = inputDate.getMonth() + 1;
    const year: number = inputDate.getFullYear();
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    return `${formattedDay}-${formattedMonth}-${year}`;


  }
  onUpdateActivity(id: number|undefined) {
    const activityToUpdate = this.activities.find((a) => a.id === id);
    if (activityToUpdate) {
      var activityData: {
        activity_id: number,
        activity_type_id: number,
        date_start: string,
        date_end: string,
        monitors: { id: number }[]
      } = {
        activity_id: id!,
        activity_type_id: null!,  
        date_start: this.date_start,
        date_end: this.date_end,
        monitors: []
      };
      var monitor1Id = window.prompt("Ingrese el id del monitor 1", activityToUpdate.monitors[0]?.id?.toString() ?? '');
      var monitor2Id = window.prompt("Ingrese el id del monitor 2", activityToUpdate.monitors[1]?.id?.toString() ?? '');
      var activityTypeId = window.prompt("Ingrese el id del tipo de actividad", activityToUpdate.activity_type?.id?.toString() ?? '');
      if (activityTypeId && activityTypeId !== '') {
        activityData.activity_type_id = parseInt(activityTypeId, 10);
      }
      if (monitor1Id && monitor1Id !== '') {
        activityData.monitors.push({ "id": parseInt(monitor1Id, 10) });
      }
      if (monitor2Id && monitor2Id !== '') {
        activityData.monitors.push({ "id": parseInt(monitor2Id, 10) });
      }
      if (activityToUpdate.date_start) {
        activityData.date_start = activityToUpdate.date_start.toString();
      }
      if (activityToUpdate.date_end) {
        activityData.date_end = activityToUpdate.date_end.toString();
      }
      this.apiService.updateActivity(activityData).subscribe(
        () => {
          console.log('Actividad actualizada exitosamente');
          this.updateActivities();
          this.checkMissingHours();
          this.reloadService.reloadCurrentRoute();
        },
        (error) => {
          console.error('Error al actualizar actividad', error);
        }
      );
    }
  }
  onDeleteActivity(id: number|undefined) {
    this.apiService.deleteActivity(id!).subscribe(
      () => {
        console.log('Actividad eliminada exitosamente');
        this.updateActivities();
        this.checkMissingHours();
        this.reloadService.reloadCurrentRoute();
      },
      (error) => {
        console.error('Error al eliminar actividad', error);
      }
    );
  }
}
