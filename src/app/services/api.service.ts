import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from './models/activity';
import { Observable } from 'rxjs';
import { ActivityType } from './models/activity_type';
import { Monitor } from './models/monitor';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; 
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private httpClient: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.apiUrl}/activities`, { headers: this.headers });
  }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.httpClient.get<ActivityType[]>(`${this.apiUrl}/activity-types`, { headers: this.headers });
  }

  getMonitors(): Observable<Monitor[]> {
    return this.httpClient.get<Monitor[]>(`${this.apiUrl}/monitors`, { headers: this.headers });
  }

  getActivitiesByDate(selectedDate: String): Observable<any> {
    const url = `${this.apiUrl}/activities?date_param=${selectedDate}`;
    return this.httpClient.get<any>(url, { headers: this.headers });
  }

  addMonitor(monitor: Monitor): Observable<Monitor> {
    const url = `${this.apiUrl}/monitors`;
    return this.httpClient.post<Monitor>(url, monitor, { headers: this.headers });
  }

  updateMonitor(id: number, updatedMonitor: Monitor): Observable<Monitor> {
    const url = `${this.apiUrl}/monitors/${id}`;
    return this.httpClient.put<Monitor>(url, updatedMonitor, { headers: this.headers });
  }

  deleteMonitor(id: number): Observable<any> {
    const url = `${this.apiUrl}/monitors/${id}`;
    return this.httpClient.delete(url, { headers: this.headers });
  }

  addActivity(activityData: {
    activity_type_id: number,
    date_start: string,
    date_end: string,
    monitors: { id: number }[]
  }): Observable<any> {
    const url = `${this.apiUrl}/activities`;
    return this.httpClient.post(url, activityData, { headers: this.headers });
  }

  updateActivity(activityData: {
    activity_id: number,
    activity_type_id: number,
    date_start: string,
    date_end: string,
    monitors: { id: number }[]
  }): Observable<any> {
    const url = `${this.apiUrl}/activities/${activityData.activity_id}`;
    return this.httpClient.put(url, activityData, { headers: this.headers });
  }
  

  

  deleteActivity(id: number): Observable<any> {
    const url = `${this.apiUrl}/activities/${id}`;
    return this.httpClient.delete(url, { headers: this.headers });
  }
  



}
