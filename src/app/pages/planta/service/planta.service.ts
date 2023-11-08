import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlanta, IPlantaMostrar } from '../interface/iplanta';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  urlPlanta:string=environment.URL_API+"planta/";
  constructor(private http:HttpClient) { }
  listaDePlanta():Observable<IPlantaMostrar[]>{
    return this.http.get<IPlantaMostrar[]>(this.urlPlanta+"listar");
  }

  retornarImagen(urlImagen:string):Observable<Blob>{
    return this.http.get<Blob>(this.urlPlanta+"imagen/"+urlImagen);
  }

  getImagen(idimagen:any):Observable<Blob>{
    const headers= new HttpHeaders().set("Content-Type",'Aplication/json');
     return this.http.get<Blob>(`${this.urlPlanta}imagen/${idimagen}`,{
      headers,
      responseType:'blob' as 'json'
     });
  }
  guardarPlanta(planta:FormData):Observable<any>{
    return this.http.post<any>(this.urlPlanta+"guardar",planta);
  }
  modificarPlanta(planta:FormData):Observable<any>{
    return this.http.put<any>(this.urlPlanta+"modificar",planta);
  }
  eliminarPlanta(tratamiento:IPlantaMostrar):Observable<any>{
    return this.http.delete<any>(this.urlPlanta+"eliminar/"+tratamiento.idPlanta);
  }
  obtenerConteoPlantas(): Observable<number> {
    return this.http.get<number>(this.urlPlanta + "contarPlantas");
  }
  buscarPlanta(id:String):Observable<any>{
    return this.http.get<IPlanta>(this.urlPlanta+"buscar/"+id);
  }
  listaDePlantaPaginacion(pagina:number,tamaño:number):Observable<any>{
    //return this.http.get<any>(this.urlTratamiento+"listaPaginacion?page='"+pagina+"'&size='"+tamaño+"'").pipe(map((resp:any)=>resp.content));
    const params:any={
      page:pagina,
      size:tamaño
    }
    return this.http.get<any>(this.urlPlanta+"listaPaginacion",{params}).pipe(map((resp:any)=>resp.content));;
  }
  longitudCampos():Observable<any>{
    return this.http.get<any>(this.urlPlanta+"longitudCampos");
  }

}
