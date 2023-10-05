import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoles, IUsuarioMostrar, IUsuarioValid } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  urlUsuario:string="http://localhost:8080/usuario/";
  constructor(private http:HttpClient) { }
  listaDeUsuarios():Observable<IUsuarioMostrar[]>{
    return this.http.get<IUsuarioMostrar[]>(this.urlUsuario+"lista");
  }
  listaDeRoles():Observable<IRoles[]>{
    return this.http.get<IRoles[]>(this.urlUsuario+"listaRoles");
  }
  guardarUsuario(Usuario:IUsuarioValid):Observable<IUsuarioValid>{
    return this.http.post<IUsuarioValid>(this.urlUsuario+"guardar",Usuario);
  }
  modificarUsuario(Usuario:IUsuarioValid):Observable<IUsuarioValid>{
    return this.http.put<IUsuarioValid>(this.urlUsuario+"modificar",Usuario);
  }
  eliminarUsuario(Usuario:IUsuarioMostrar):Observable<any>{
    return this.http.delete<any>(this.urlUsuario+"eliminar/"+Usuario.id);
  }
  buscarUsuario(idUsuario:string):Observable<IUsuarioMostrar>{
    return this.http.get<IUsuarioMostrar>(this.urlUsuario+"buscar/"+idUsuario);
  }
}
