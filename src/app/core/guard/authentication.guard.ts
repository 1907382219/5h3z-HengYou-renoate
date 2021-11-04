import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem(environment.tokenStorageKey);
        if (!token && state.url !== '/login') {
            this.router.navigate(['/login']);
            return false;
        }
        if (state.url === '/login' && !!token) {
            this.router.navigate(['/companies']);
            return false;
        }
        return true;
    }
}