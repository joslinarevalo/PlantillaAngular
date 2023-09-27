import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITratamientoConsulta, ITratamientoDTOValid, ITratamientoMostrar } from '../interface/tratamiento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  urlTratamiento:string="http://localhost:8080/tratamiento/";
  constructor(private http:HttpClient) { }
  listaDeTratamiento():Observable<ITratamientoMostrar[]>{
    return this.http.get<ITratamientoMostrar[]>(this.urlTratamiento+"listar");
  }
  listaDeTratamientoConsulta():Observable<ITratamientoConsulta[]>{
    return this.http.get<ITratamientoConsulta[]>(this.urlTratamiento+"listaConsulta");
  }
  retornarImagen(urlImagen:string):Observable<Blob>{
    return this.http.get<Blob>(this.urlTratamiento+"imagen/"+urlImagen);
  }
  getImagen(idimagen:any):Observable<Blob>{
    //const headers= new HttpHeaders().set("Content-Type",'Aplication/json');
     return this.http.get<Blob>(`${this.urlTratamiento}imagen/${idimagen}`,{
      //headers,
      responseType:'blob' as 'json'
     });
  }
  
  guardarTratamiento(tratamiento:FormData):Observable<any>{
    return this.http.post<any>(this.urlTratamiento+"guardar",tratamiento);
  }
  modificarTratamiento(tratamiento:FormData):Observable<any>{
    return this.http.put<any>(this.urlTratamiento+"modificar",tratamiento);
  }
  eliminarTratamiento(tratamiento:ITratamientoMostrar):Observable<any>{
    return this.http.delete<any>(this.urlTratamiento+"eliminar/"+tratamiento.idTratamiento);
  }
  buscarTratamiento(idTratamiento:string):Observable<ITratamientoMostrar>{
    return this.http.get<ITratamientoMostrar>(this.urlTratamiento+"buscar/"+idTratamiento);
  }
}
