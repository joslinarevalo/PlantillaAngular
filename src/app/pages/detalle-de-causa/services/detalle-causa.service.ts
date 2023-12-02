import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDetalleCausaDTOMostrar, IDetalleCausaDTOValid, IEnfermedad, IPlanta, ITipoCausa } from '../interface/detalleCausa.interface';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class DetalleCausaService {

  urlDetalleCausa:string= environment.URL_API+ "api/DetalleCausa/";
  constructor(private http: HttpClient) {}
  listaDetalleCausa():Observable<IDetalleCausaDTOMostrar[]>{
    return this.http.get<IDetalleCausaDTOMostrar[]>(this.urlDetalleCausa+"listaDTO");
  }
  listaTipoCausa():Observable<ITipoCausa[]>{
    return this.http.get<ITipoCausa[]>(environment.URL_API+"tipoCausa/listar");
  }
  listaEnfermedad():Observable<IEnfermedad[]>{
    return this.http.get<IEnfermedad[]>(environment.URL_API+"enfermedad/listar");
  }
  listaPlanta():Observable<IPlanta[]>{
    return this.http.get<IPlanta[]>(environment.URL_API+"planta/listar");
  }
  guardarDetalleCausa(detalleCausa:IDetalleCausaDTOValid):Observable<any>{
    return this.http.post<any>(this.urlDetalleCausa+"guardar",detalleCausa);
  }
  modificarDetalleCausa(detalleCausa:IDetalleCausaDTOValid):Observable<any>{
    return this.http.put<any>(this.urlDetalleCausa+"modificar",detalleCausa);
  }
  eliminarDetalleCausa(detalleCausa:IDetalleCausaDTOMostrar):Observable<any>{
    return this.http.delete<any>(this.urlDetalleCausa+"eliminar/"+detalleCausa.idDetalleCausa);
  }
  
}
