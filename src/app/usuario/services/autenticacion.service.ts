import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { Usuario } from "../models/Usuario";
import { DatosClaveTemp, Email } from "../interfaces/Email";
import { IUsuarioCorreo } from "src/app/pages/usuario-c/interface/usuario.interface";
import { environment } from "../../../environments/environment.prod";
@Injectable({
  providedIn: "root",
})
export class AutenticacionService {
  private urlEndPoid: string = environment.URL_API + "login";
  private urlEndPoid2: string = environment.URL_API + "correo";
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      localStorage.getItem("usuario") != null
    ) {
      this._usuario = JSON.parse(localStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem("token") != null) {
      this._token = localStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoid}`, usuario, {
      headers: this.httpHeaders,
    });
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.usuario = payload.sub;
    this._usuario.roles = payload.authorities;
    localStorage.setItem("usuario", JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem("token", accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null) {
      if (payload.sub != null && payload.sub && payload.sub.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  tieneRol(roles: string[]): boolean {
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

  elTokenExpiro(): boolean {
    let token = this._token;
    let payload = this.obtenerDatosToken(token);
    let ahora = new Date().getTime() / 1000; //obteniendo la fecha en milisegundos
    return payload.exp < ahora;
  }

  resetPassword(email: Email): Observable<any> {
    return this.http.post<any>(
      `${this.urlEndPoid2 + "/enviarMensaje"}`,
      email,
      { headers: this.httpHeaders }
    );
  }

  setClaveTemp(Usuario: IUsuarioCorreo): Observable<IUsuarioCorreo> {
    return this.http.put<IUsuarioCorreo>(
      this.urlEndPoid2 + "/setDatosRecuperacionClave",
      Usuario
    );
  }

  buscarUserEmail(Usuario: IUsuarioCorreo): Observable<any> {
    return this.http.put<any>(this.urlEndPoid2 + "/buscarUserEmail", Usuario);
  }

  setNuevaClave(Usuario: IUsuarioCorreo): Observable<any> {
    return this.http.put<any>(this.urlEndPoid2 + "/setNuevaClave", Usuario);
  }

  logout() {
    this._token = null;
    this._usuario = null;
    localStorage.clear(); //se elimina todo lo que este en localStorage
    /*//de esta otra forma se puede remover item por item
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario'); */
  }
}
