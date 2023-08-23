import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITratamientoDTOValid, ITratamientoMostrar } from '../interface/tratamiento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  url_tratamiento:string="http://localhost:8080/tratamiento/";
  constructor(private http:HttpClient) { }
  ListaDeTratamiento():Observable<ITratamientoMostrar[]>{
    return this.http.get<ITratamientoMostrar[]>(this.url_tratamiento+"listar");
  }
  RetornarImagen(urlImagen:string):Observable<Blob>{
    return this.http.get<Blob>(this.url_tratamiento+"imagen/"+urlImagen);
  }
  getImagen(idimagen:any):Observable<Blob>{
    const headers= new HttpHeaders().set("Content-Type",'Aplication/json');
     return this.http.get<Blob>(`${this.url_tratamiento}imagen/${idimagen}`,{
      headers,
      responseType:'blob' as 'json'
     });
  }
  
  GuardarTratamiento(tratamiento:FormData):Observable<any>{
    return this.http.post<any>(this.url_tratamiento+"guardar",tratamiento);
  }
  ModificarTratamiento(tratamiento:ITratamientoDTOValid):Observable<ITratamientoDTOValid>{
    return this.http.put<ITratamientoDTOValid>(this.url_tratamiento+"modificar",tratamiento);
  }
  EliminarTratamiento(tratamiento:ITratamientoDTOValid):Observable<any>{
    return this.http.delete<any>(this.url_tratamiento+"eliminar/"+tratamiento.idtratamiento);
  }
}
