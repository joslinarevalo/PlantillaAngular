import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.autenticacionService.isAuthenticated()){
        /* if(this.autenticacionService.elTokenExpiro()){
          this.autenticacionService.logout();
          Swal.fire('Sesión expirada', `¡Tú sesión ha expirado, por favor vuelve a iniciar sesión!`, 'warning');
          this.router.navigate(['/login']);
          return false;
        } */
        return true;
      }
    this.router.navigate(['/login']);
    return false;
  }

  
  
}
