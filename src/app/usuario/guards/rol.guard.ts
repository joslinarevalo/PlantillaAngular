import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let role = route.data['rol'] as string[];
      if(this.autenticacionService.tieneRol(role)){
        return true;
      }
      Swal.fire('Acceso denegado',`Hola ${this.autenticacionService.usuario.usuario} ¡no tienes acceso a este recurso!,'warning`);
      return true;
  }
  
}
