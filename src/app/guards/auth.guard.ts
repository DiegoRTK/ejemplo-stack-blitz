import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppStateProps, RoleProps } from '../store/app.state';
import { selectIsUserAuthenticated, selectRole } from '../store/app.selectors';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppStateProps>,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.verifyIfUserIsAuthenticated(route, state)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.verifyIfUserIsAuthenticated(route, state)
  }

  private verifyIfUserIsAuthenticated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredRole = route.data['role'];
    return this.store.select(selectIsUserAuthenticated).pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
          return false;
        }
        if (!requiredRole) {
          return true;
        } else {
          const userRole = this.store.select(selectRole);
          return this.checkRole(userRole, requiredRole);
        }
      })
    );
  }

  private checkRole(userRole: Observable<string>, requiredRole: string): boolean {
    let hasRequiredRole = false;
    userRole.subscribe(userRole => {
      hasRequiredRole = userRole === requiredRole;
    });
    if (!hasRequiredRole) {
      this.toastr.info('No cuenta con permisos para acceder a esta ruta')
    }
    return hasRequiredRole;
  }
}
