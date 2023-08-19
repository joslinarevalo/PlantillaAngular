import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleCausa, Enfermedad, IConsulta, TipoCausa } from '../models/DetalleCausa';
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
  return this.http.get<IConsulta[]>(urlEndPoint +`/all`);
}
}

