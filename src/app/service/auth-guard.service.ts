import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const session = localStorage.getItem('session');
    const isResponsible = localStorage.getItem('is_responsible');
    const isAdmin = localStorage.getItem('is_admin');
  
    // Check for 'creerannonce' path
    if (route.routeConfig?.path === 'creerannonce') {
      if (session !== undefined && isResponsible === 'true') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  
    // Check for 'settings' path
    if (route.routeConfig?.path === 'settings') {
      if (session !== undefined && isAdmin === 'true') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    // Check for 'annonces' path
    if (route.routeConfig?.path === 'annonces') {
        if (session !== undefined) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
  
    // Default case (unknown path)
    return false;
  }
  
}
