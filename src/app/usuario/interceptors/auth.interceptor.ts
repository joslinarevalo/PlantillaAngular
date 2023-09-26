import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/** ESTE INTERCEPTOR SE TIENE QUE CONFIGURAR EN EL app.module.ts */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private autenticacionService: AutenticacionService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {//cuando el usuario no esta autenticado
          if(this.autenticacionService.isAuthenticated()){
            this.autenticacionService.logout();
          }
          this.router.navigate(['/login']);
        } 

        if(e.status == 403){//cuando el usuario esta autenticado pero no tiene permiso/roles para acceder a ese recurso
          Swal.fire('Acceso denegado', `Hola ${this.autenticacionService.usuario.usuario} ¡no tienes acceso a este recurso!`, 'warning');
          this.router.navigate(['/paginas-principal/principal'])
        }

        return throwError(e);
      })
    );
  }
}