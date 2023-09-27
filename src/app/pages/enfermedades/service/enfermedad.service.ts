import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnfermedad } from '../interfaces/IEnfermedad';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private urlAPI:string="http://localhost:8080/enfermedad/";

  constructor(
    private http:HttpClient) { }


  listaEnfermedades():Observable<IEnfermedad[]>{
    return this.http.get<IEnfermedad[]>(this.urlAPI+"listar");
  }
  listaDeEnfermedadPaginacion(pagina:number,tamaño:number):Observable<any>{
    //return this.http.get<any>(this.urlTratamiento+"listaPaginacion?page='"+pagina+"'&size='"+tamaño+"'").pipe(map((resp:any)=>resp.content));
    const params:any={
      page:pagina,
      size:tamaño
    }
    return this.http.get<any>(this.urlAPI+"listaPaginacion",{params}).pipe(map((resp:any)=>resp.content));;
  }
  retornarImagen(urlImagen:string):Observable<Blob>{
    return this.http.get<Blob>(this.urlAPI+"imagen/"+urlImagen);
  }
  getImagen(idimagen:any):Observable<Blob>{
     return this.http.get<Blob>(`${this.urlAPI}imagen/${idimagen}`,{
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

  buscarEnfermedad(id:String):Observable<IEnfermedad>{
    return this.http.get<IEnfermedad>(this.urlAPI+"buscar/"+id);
  }

  obtenerConteoenfermedad(): Observable<number> {
    return this.http.get<number>(this.urlAPI + "contarEnfermedades");
  }

  longitudCampos():Observable<any>{
    return this.http.get<any>(this.urlAPI+"longitudCampos");
  }
}
