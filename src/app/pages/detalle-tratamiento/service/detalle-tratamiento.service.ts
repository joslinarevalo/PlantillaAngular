import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDetalleCausaDTO, IDetalleTratamientoDTOMostrar, IDetalleTratamientoDTOValid } from '../interface/detalleTratamiento.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetalleTratamientoService {
  urlTratamiento:string= environment.URL_API+"detalleTratamiento/";
  constructor(private http:HttpClient) { }
  listaDetalleTratamiento():Observable<IDetalleTratamientoDTOMostrar[]>{
    return this.http.get<IDetalleTratamientoDTOMostrar[]>(this.urlTratamiento+"lista");
  }
  listaDetalleCausa():Observable<IDetalleCausaDTO[]>{
    return this.http.get<IDetalleCausaDTO[]>(this.urlTratamiento+"listaDetalleCausa");
  }
  guardarDetalleTratamiento(detalleTratamiento:IDetalleTratamientoDTOValid):Observable<any>{
    return this.http.post<any>(this.urlTratamiento+"guardar",detalleTratamiento);
  }
  modificarDetalleTratamiento(detalleTratamiento:IDetalleTratamientoDTOValid):Observable<any>{
    return this.http.put<any>(this.urlTratamiento+"modificar",detalleTratamiento);
  }
  eliminarDetalleTratamiento(detalleTratamiento:IDetalleTratamientoDTOMostrar):Observable<any>{
    return this.http.delete<any>(this.urlTratamiento+"eliminar/"+detalleTratamiento.idDetalleTratamiento);
  }
 
}
