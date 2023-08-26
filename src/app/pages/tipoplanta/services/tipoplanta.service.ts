import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITipoPlanta } from '../interfaces/ITipoPlanta';

@Injectable({
  providedIn: 'root'
})
export class TipoplantaService {

  url = 'http://localhost:8080/tipoPlanta';

  constructor(private http: HttpClient) { }

  listarTipoPlanta(): Observable<ITipoPlanta[]> {
    return this.http.get<ITipoPlanta[]>(`${this.url}/listar`);
  }

  guardarTipoPlanta(data : ITipoPlanta){
    return this.http.post(`${this.url}/guardar`, data);
  }

  editarTipoPlanta(data : ITipoPlanta): any{
    return this.http.put(`${this.url}/editar/${data.idPlanta}`, data);
  }

 /* editarTipoPlanta(id : number, tipo : any){
    return this.http.put(`${this.url}/editar/`,{"idPlanta": id, "tipoPlanta": tipo});
  }*/

  eliminarTipoPlanta(id : ITipoPlanta){
    return this.http.delete(`${this.url}/eliminar/${id.idPlanta}`);

  }

}
