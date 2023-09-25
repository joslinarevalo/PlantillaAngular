import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlantaMostrar } from '../../planta/interface/iplanta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private baseUrl = 'http://localhost:8080/planta';
  private baseUrl2 = 'http://localhost:8080/detalleTratamiento';
  private baseUrl3 = 'http://localhost:8080/api/DetalleCausa';
  private baseUrl4 = 'http://localhost:8080/tratamiento';

constructor(private http: HttpClient) { }
buscarPlanta(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl}/buscarPlanta?texto=${texto}`);
}

buscarDetalleCausa(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl3}/buscar?texto=${texto}`);
}

buscarDetalleTratamiento(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl2}/buscarTratamiento?texto=${texto}`);
}
buscarTratamiento(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl4}/buscaTratamiento?texto=${texto}`);
}


}
