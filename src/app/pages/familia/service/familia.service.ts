import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFamilia } from '../interfaces/ifamilia';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  url:string=environment.URL_API+"familia";

  constructor(private http:HttpClient) { }

  listarFamilia(): Observable<IFamilia[]> {
    return this.http.get<IFamilia[]>(`${this.url}/listar`);
  }

  guardarFamilia(data : IFamilia):Observable<any>{
    return this.http.post(`${this.url}/guardar`, data);
  }

  modificarFamilia(obj:IFamilia):Observable<any>{
    return this.http.put(this.url+"/modificar",obj);
  }

  eliminarFamilia(id : IFamilia):Observable<any>{
    return this.http.delete(`${this.url}/eliminar/${id.idfamilia}`);
  }

}
