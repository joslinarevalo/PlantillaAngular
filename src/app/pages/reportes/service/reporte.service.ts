import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlantaDTO } from '../interface/IPlantaDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  urlTratamiento:string=environment.URL_API+"detalleTratamiento/";
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
