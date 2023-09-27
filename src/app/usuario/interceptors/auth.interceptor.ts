import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/** ESTE INTERCEPTOR SE TIENE QUE CONFIGURAR EN EL app.module.ts */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private autenticacionService: AutenticacionService, private router: Router, private modalService: NgbModal) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        this.modalService.dismissAll();
        if (e.status == 401) {//cuando el usuario no esta autenticado
          if (this.autenticacionService.isAuthenticated()) {
            this.autenticacionService.logout();
          }
          e = 'Tú sesión a expirado, por favor vuelve a iniciar sesión.';
          this.router.navigate(['/login']);
          return throwError(e);
        } else if (e.status == 403) {//cuando el usuario esta autenticado pero no tiene permiso/roles para acceder a ese recurso
          if(this.autenticacionService.usuario.usuario != null){
            if(this.autenticacionService.elTokenExpiro()){
              this.autenticacionService.logout();
              Swal.fire('Sesión expirada', `¡Tú sesión ha expirado, por favor vuelve a iniciar sesión!`, 'warning');
              e = '¡Tú sesión ha expirado, por favor vuelve a iniciar sesión!';
              this.router.navigate(['/login']);
              return throwError(e);
            }
            Swal.fire('Acceso denegado', `Hola ${this.autenticacionService.usuario.usuario} ¡no tienes acceso a este recurso!`, 'warning');
            e = 'No tienes permiso para acceder a este recurso.';
            this.router.navigate(['/paginas-principal/principal'])
            return throwError(e);
          }else{
            if (this.autenticacionService.isAuthenticated()) {
              this.autenticacionService.logout();
            }
            Swal.fire('Sesión expirada', `¡Tú sesión ha expirado, por favor vuelve a iniciar sesión!`, 'warning');
            e = '¡Tú sesión ha expirado, por favor vuelve a iniciar sesión!';
            this.router.navigate(['/login']);
            return throwError(e);
          }
        }/* else{
          return throwError(e);
        } */
      })
    );
  }
}