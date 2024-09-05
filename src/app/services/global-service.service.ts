import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _activateRoute = 'home';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get activateRoute(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('activateRoute') || this._activateRoute;
    }
    return this._activateRoute;
  }

  setRoute(route: string) {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedin = localStorage.getItem('isLoggedin') === 'true';
  
      if (route === 'profile') {
        route = isLoggedin ? 'profile' : 'login';
      }
  
      this._activateRoute = route;
      localStorage.setItem('activateRoute', route);
    } else {
      this._activateRoute = route;
    }
  }
  
}
