import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlantaMostrar } from '../../planta/interface/iplanta';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private baseUrl = environment.URL_API+'planta';
  private baseUrl2 = environment.URL_API+'detalleTratamiento';
  private baseUrl3 = environment.URL_API+'api/DetalleCausa';
  private baseUrl4 = environment.URL_API+'tratamiento';

constructor(private http: HttpClient) { }
buscarPlanta(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl}/buscarPlanta?texto=${texto}`);
}

buscarDetalleCausa(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl3}/buscar?texto=${texto}`);
}

buscarDetalleTratamiento(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl2}/buscarDetalleTratamiento?texto=${texto}`);
}
buscarTratamiento(texto: string) {
  return this.http.get<any[]>(`${this.baseUrl4}/buscaTratamiento?texto=${texto}`);
}


}
