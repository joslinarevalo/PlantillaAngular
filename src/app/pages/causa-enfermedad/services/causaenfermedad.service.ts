import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoCausa } from '../../detalle-causa/models/DetalleCausa';
import { Observable } from 'rxjs';
const urlEndPoint: string = 'http://localhost:8080/tipoCausa';
@Injectable({
  providedIn: 'root'
})
export class CausaenfermedadService {
constructor(private http: HttpClient) { }
getcausaenfermedad(): Observable<TipoCausa[]> {
  return this.http.get<TipoCausa[]>(urlEndPoint);
}

eliminar(tcausa:TipoCausa){
  const url=`${urlEndPoint}/${tcausa.idtipoCausa}`;
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
