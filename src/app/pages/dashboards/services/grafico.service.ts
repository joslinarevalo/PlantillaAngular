import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  private baseUrl = 'http://localhost:8080/grafico'; 
constructor(private http: HttpClient) { }
obtenerDatosParaGrafico(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/datos-para-grafico`);
}
}
