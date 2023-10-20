import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  private baseUrl = environment.URL_API+'grafico'; 
constructor(private http: HttpClient) { }
obtenerDatosParaGrafico(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/datos-para-grafico`);
}
}
