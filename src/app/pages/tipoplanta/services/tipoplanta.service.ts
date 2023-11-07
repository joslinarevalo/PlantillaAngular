import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itipoplanta } from '../interfaces/ITipoPlanta';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoplantaService {

  url:string=environment.URL_API+"tipoplanta";

  constructor(private http:HttpClient) { }

  listarTipoPlanta(): Observable<Itipoplanta[]> {
    return this.http.get<Itipoplanta[]>(`${this.url}/listar`);
  }

  guardarTipoPlanta(data : Itipoplanta):Observable<any>{
    return this.http.post(`${this.url}/guardar`, data);
  }

  modificarTipoPlanta(obj:Itipoplanta):Observable<any>{
    return this.http.put(this.url+"/modificar",obj);
  }

  eliminarTipoPlanta(id : Itipoplanta):Observable<any>{
    return this.http.delete(`${this.url}/eliminar/${id.idTipoPlanta}`);
  }

  longitudCampos():Observable<any>{
    return this.http.get<any>(this.url+"/longitudCampos");
  }

}
