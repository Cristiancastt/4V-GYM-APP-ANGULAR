import { Component } from '@angular/core';
import { AddMonitorButtonComponent } from "../add-monitor-button/add-monitor-button.component";
import { CarrouselComponent } from "../carrousel/carrousel.component";

@Component({
    selector: 'app-monitor-container',
    standalone: true,
    templateUrl: './monitor-container.component.html',
    styleUrl: './monitor-container.component.scss',
    imports: [AddMonitorButtonComponent, CarrouselComponent]
})
export class MonitorContainerComponent {

}
