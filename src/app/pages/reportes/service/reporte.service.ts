import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlantaDTO } from '../interface/IPlantaDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  urlTratamiento:string="http://localhost:8080/detalleTratamiento/";
  constructor(private http:HttpClient) { }
  generarConsultaPdf(nombre:string){
    const httpOptios={responseType:'arraybuffer' as 'json'};
    return this.http.get<Blob>(this.urlTratamiento+nombre,httpOptios);
  }
  generarConsultaEnfermedadesPlantaParamPdf(nombre:string,idPlanta:string){
    const httpOptios={responseType:'arraybuffer' as 'json'};
    return this.http.get<Blob>(this.urlTratamiento+nombre+"?idPlanta="+idPlanta,httpOptios);
  }
  listaPlantas():Observable<IPlantaDTO[]>{
    return this.http.get<IPlantaDTO[]>(this.urlTratamiento+"listaPlantas");
  }
}