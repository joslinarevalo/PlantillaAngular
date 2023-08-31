import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITipoCausa, TipoCausa } from "../models/TipoCausa";
const urlEndPoint: string = "http://localhost:8080/tipoCausa";
//listar
@Injectable({
  providedIn: "root",
})
export class CausaenfermedadService {
  constructor(private http: HttpClient) {}

 
  listaDeTipoCausa(): Observable<ITipoCausa[]> {
    return this.http.get<ITipoCausa[]>(`${urlEndPoint}/listar`);
  }
  retornarImagen(urlImagen: string): Observable<Blob> {

    return this.http.get<Blob>(`${urlEndPoint}/imagen/urlImagen`);
  
  }
  getImagen(idimagen: any): Observable<Blob> {
    const headers = new HttpHeaders().set("Content-Type", "Aplication/json");
    return this.http.get<Blob>(`${urlEndPoint}/imagen/${idimagen}`, {
      headers,
      responseType: "blob" as "json",
    });
  }
  eliminar(tcausa: TipoCausa) {
    const url = `${urlEndPoint}/${tcausa.idTipoCausa}`;
    return this.http.delete(url);
  }
  eliminarCausa(tcausa:ITipoCausa):Observable<any>{
    return this.http.delete<any>(urlEndPoint+"/eliminar/"+tcausa.idTipoCausa);
  }
  editarTipoCausa(tipoCausa: TipoCausa):any {
    console.log("entro a editar los tipoCausa: ",tipoCausa);
    const url =`${urlEndPoint}/modificar`;
    return this.http.put(url, tipoCausa);
  }
  addTipoCausa(tipoCausa: TipoCausa, file: File): Observable<Object> {
    console.log("si entra");
    console.log(tipoCausa);
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('tipoCausa', JSON.stringify(tipoCausa));
    return this.http.post(`${urlEndPoint}/guardar`, formData);
  }

}
