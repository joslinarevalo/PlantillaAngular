import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ITipoCausa, TipoCausa } from "../models/TipoCausa";
import { environment } from "src/environments/environment";
const urlEndPoint: string = environment.URL_API+"tipoCausa";
//listar
@Injectable({
  providedIn: "root",
})
export class CausaenfermedadService {
  constructor(private http: HttpClient) {}

  listaDeTpoCausaPaginacion(pagina: number, tamaño: number): Observable<any> {
    //return this.http.get<any>(this.urlTratamiento+"listaPaginacion?page='"+pagina+"'&size='"+tamaño+"'").pipe(map((resp:any)=>resp.content));
    const params: any = {
      page: pagina,
      size: tamaño,
    };
    return this.http
      .get<any>(urlEndPoint + "/causaTipoPaginacion", { params })
      .pipe(map((resp: any) => resp.content));
  }
  listaDeTipoCausa(): Observable<ITipoCausa[]> {
    return this.http.get<ITipoCausa[]>(`${urlEndPoint}/listar`);
  }
  retornarImagen(urlImagen: string): Observable<Blob> {
    return this.http.get<Blob>(`${urlEndPoint}/imagen/urlImagen`);
  }

  getImagen(idimagen: any): Observable<Blob> {
    //const headers= new HttpHeaders().set("Content-Type",'Aplication/json');
    return this.http.get<Blob>(`${urlEndPoint}/imagen/${idimagen}`, {
      //headers,
      responseType: "blob" as "json",
    });
  }
  eliminarCausa(tcausa: ITipoCausa): Observable<any> {
    const url = `${urlEndPoint}/eliminar/${tcausa.idTipoCausa}`;
    return this.http.delete<any>(url);
  }
  obtenerPatogenoPorId(id: String): Observable<ITipoCausa> {
    return this.http.get<ITipoCausa>(`${urlEndPoint}/${id}`);
  }

  guardarcausa(causa: FormData): Observable<any> {
    return this.http.post<any>(`${urlEndPoint}/guardar`, causa);
  }
  modificarcausa(causa: FormData): Observable<any> {
    const url = `${urlEndPoint}/modificar`;
    return this.http.put<any>(url, causa);
  }
}
