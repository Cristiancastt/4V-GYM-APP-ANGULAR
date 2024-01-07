import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  constructor(private router: Router) {}
  reloadCurrentRoute(navigationExtras?: NavigationExtras): void {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute], navigationExtras);
    });
  }
}
