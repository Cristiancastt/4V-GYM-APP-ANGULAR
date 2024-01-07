import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Monitor } from '../services/models/monitor';
import { ReloadService } from '../services/reload-service.service';

@Component({
  selector: 'app-add-monitor-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-monitor-button.component.html',
  styleUrl: './add-monitor-button.component.scss'
})
export class AddMonitorButtonComponent {
  form = new FormGroup({
    nombre: new FormControl("Cristian", Validators.required),
    email: new FormControl('a@a.com', Validators.required),
    telefono: new FormControl('666666666', Validators.required)
  });
  monitor: Monitor = new Monitor(); 
  submitted = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private reloadService: ReloadService) {}

  isValid(): boolean {
    return (
      this.form.get('nombre')?.value !== null &&
      this.form.get('email')?.value !== null &&
      this.form.get('telefono')?.value !== null
    );
  }
  miBoton = document.getElementById('miBoton');
  onSubmit() {
    if (this.isValid() && this.form.valid) {
      this.monitor.setName(this.form.get('nombre')?.value?.toString() || '');
      this.monitor.setEmail(this.form.get('email')?.value?.toString()  || '');
      this.monitor.setPhone(this.form.get('telefono')?.value?.toString()  || '');
      this.monitor.setPhoto("img")

      this.apiService.addMonitor(this.monitor).subscribe(
        response => {
          console.log('Monitor agregado exitosamente:', response);
          this.reloadService.reloadCurrentRoute();
          if (this.miBoton) {
            this.miBoton.click();
          }

        },
        error => {
          console.error('Error al agregar el monitor:', error);
        }
      );
    }
    this.submitted = true;
  }
}
