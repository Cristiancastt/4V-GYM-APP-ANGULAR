import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Monitor } from '../services/models/monitor';
import { DatePipe, CommonModule } from '@angular/common';
import { ReloadService } from '../services/reload-service.service';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent {
  onUpdateMonitor(id: number|undefined):void {
    var monitor = this.monitors.find((monitor) => monitor.id === id);
    var monitorEdited = new Monitor();
    var name = window.prompt('Introduce el nuevo nombre del monitor');
    var phone = window.prompt('Introduce el nuevo teléfono del monitor');
    var email = window.prompt('Introduce el nuevo email del monitor');
    monitorEdited.setEmail(email ?? monitor?.email ?? '');
    monitorEdited.setPhone(phone ?? monitor?.phone ??'');
    monitorEdited.setName(name ?? monitor?.name ??'');
    monitorEdited.setPhoto("img" ?? monitor?.photo ??'');
    this.apiService.updateMonitor(id!, monitorEdited).subscribe(
      () => {
        console.log('Monitor actualizado exitosamente');
        this.reloadService.reloadCurrentRoute();
      },
      (error) => {
        console.error('Error al actualizar el monitor', error);
      }
    );
    
  }
  monitors: Monitor[] = [];

  constructor(private apiService: ApiService, private reloadService: ReloadService) {}

  ngOnInit() {
    this.apiService.getMonitors().subscribe((monitors: Monitor[]) => {
      this.monitors = monitors;
      
    });
  }


  onDeleteMonitor(id: number | undefined): void {
    this.apiService.deleteMonitor(id!).subscribe(
      () => {
        console.log('Monitor eliminado exitosamente');
        this.reloadService.reloadCurrentRoute();
      },
      (error) => {
        console.error('Error al eliminar el monitor', error);
      }
    );
  }

  
}
