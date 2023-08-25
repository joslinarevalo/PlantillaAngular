import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleCausa, Enfermedad, TipoCausa } from '../models/DetalleCausa';
import { Observable } from 'rxjs';
const urlEndPoint: string = 'http://localhost:8080/api/DetalleCausa';
@Injectable({
  providedIn: 'root'
})
export class DetallecausaService {

constructor(private http: HttpClient) { }

listaenfermedad(): Observable<Enfermedad[]> {
  return this.http.get<Enfermedad[]>(urlEndPoint + "/enfermedad");
}

listatipocausa(): Observable<TipoCausa[]> {
  return this.http.get<TipoCausa[]>(urlEndPoint + "/tipoCausa");
}
getdetalleCausa(): Observable<DetalleCausa[]> {
  return this.http.get<DetalleCausa[]>(urlEndPoint);
}
getConsultas(){
  return this.http.get<DetalleCausa[]>(urlEndPoint +`/all`);
}
eliminar(iddetalleCausa: number): Observable<Object> {

  return this.http.delete(`${urlEndPoint}/${iddetalleCausa}`);
}
actualizar(dtcausa: DetalleCausa): Observable<DetalleCausa> {
  const url = `${urlEndPoint}}`;
  return this.http.put<DetalleCausa>(url, dtcausa);
}
registrar(data: DetalleCausa): Observable<DetalleCausa> {
  return this.http.post(urlEndPoint, data);
}
}

