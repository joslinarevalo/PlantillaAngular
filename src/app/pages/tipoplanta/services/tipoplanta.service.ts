import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itipoplanta } from '../interfaces/ITipoPlanta';


@Injectable({
  providedIn: 'root'
})
export class TipoplantaService {

  url:string="http://localhost:8080/tipoplanta";

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

}
