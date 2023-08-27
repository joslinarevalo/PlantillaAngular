import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoCausa } from "../models/TipoCausa";
const urlEndPoint: string = "http://localhost:8080/tipoCausa";
//listar
@Injectable({
  providedIn: "root",
})
export class CausaenfermedadService {
  constructor(private http: HttpClient) {}
  getcausaenfermedad(): Observable<TipoCausa[]> {
    return this.http.get<TipoCausa[]>(`${urlEndPoint}/listar`);
  }

  eliminar(tcausa: TipoCausa) {
    const url = `${urlEndPoint}/${tcausa.idTipoCausa}`;
    return this.http.delete(url);
  }
  actualizar(tcausa: TipoCausa): Observable<TipoCausa> {
    const url = `${urlEndPoint}`;
    return this.http.put<TipoCausa>(url, tcausa);
  }
  registrar(data: TipoCausa): Observable<TipoCausa> {
    return this.http.post(urlEndPoint, data);
  }
}
