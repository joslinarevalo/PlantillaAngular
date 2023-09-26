import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

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
        if(this.elTokenExpiro()){
          this.autenticacionService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
    this.router.navigate(['/login']);
    return false;
  }

  elTokenExpiro(): boolean{
    let token = this.autenticacionService.token;
    let payload = this.autenticacionService.obtenerDatosToken(token);
    let ahora = new Date().getTime()/1000;//obteniendo la fecha en milisegundos
    /* if(payload.exp < ahora){
      return true;
    }else{
      return false;
    } */
    return (payload.exp < ahora);
  }
  
}
