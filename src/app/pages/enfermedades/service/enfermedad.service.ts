import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnfermedad } from '../interfaces/IEnfermedad';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  urlAPI:string="http://localhost:8080/enfermedad/";
  constructor(private http:HttpClient) { }
  listaEnfermedades():Observable<IEnfermedad[]>{
    return this.http.get<IEnfermedad[]>(this.urlAPI+"listar");
  }
  retornarImagen(urlImagen:string):Observable<Blob>{
    return this.http.get<Blob>(this.urlAPI+"imagen/"+urlImagen);
  }
  getImagen(idimagen:any):Observable<Blob>{
    const headers= new HttpHeaders().set("Content-Type",'Aplication/json');
     return this.http.get<Blob>(`${this.urlAPI}imagen/${idimagen}`,{
      headers,
      responseType:'blob' as 'json'
     });
  }
  
  guardar(obj:FormData):Observable<any>{
    return this.http.post<any>(this.urlAPI+"guardar",obj);
  }
  modificar(obj:FormData):Observable<any>{
    return this.http.put<any>(this.urlAPI+"modificar",obj);
  }
  eliminar(obj:IEnfermedad):Observable<any>{
    return this.http.delete<any>(this.urlAPI+"eliminar/"+obj.idEnfermedad);
  }

  buscarEnfermedad(id:String):Observable<any>{
    return this.http.get<IEnfermedad>(this.urlAPI+"buscar/"+id);
  }

  longitudCampos():Observable<any>{
    return this.http.get<any>(this.urlAPI+"longitudCampos");
  }
}
