import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

/** ESTE INTERCEPTOR SE TIENE QUE CONFIGURAR EN EL app.module.ts */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(private autenticacionService: AutenticacionService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = this.autenticacionService.token;
    if(token != null){
      const authReq = req.clone({
        headers: req.headers.set('Authorization','Bearer '+ token)
      });
      
      return next.handle(authReq);//se va al proximo interceptor dentro de la pila de interceptores hasta llegar al ultimo
    }
    return next.handle(req);
  }
}