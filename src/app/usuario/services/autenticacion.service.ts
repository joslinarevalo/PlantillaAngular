import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private urlEndPoid: string = 'http://localhost:8080/login';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  private _usuario: Usuario;
  private _token: string;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(){
    
  }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario:Usuario): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoid}`,usuario,{headers: this.httpHeaders});
  }

  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.usuario = payload.sub;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
  }

  obtenerDatosToken(accessToken: string):any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null ){
      if (payload.sub != null && payload.sub && payload.sub.length > 0){
        return true;
       }else{
        return false;
       }
    }else{
      return false;
    }
     
  }

  tieneRol(roles:string[]): boolean{
    // Recorre todos los roles proporcionados como parámetro
    for (let i = 0; i < roles.length; i++) {
      // Comprueba si el usuario tiene el rol actual en sus roles
      if (this.usuario.roles.includes(roles[i])) {
        return true; // Si encuentra al menos un rol coincidente, devuelve true
      }
    }
    // Si no se encuentra ningún rol coincidente, devuelve false al final del bucle
    return false;
    
  }

  logout() {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();//se elimina todo lo que este en localStorage
    /*//de esta otra forma se puede remover item por item 
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario'); */
  }
}
