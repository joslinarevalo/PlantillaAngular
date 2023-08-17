import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISintoma } from '../interfaces/ISintoma';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {
  private apiURL = 'http://localhost:8080/sintoma';

  constructor(private httpClient: HttpClient) { }

  get listaSintomas(){
    return this.httpClient.get<ISintoma[]>(`${this.apiURL}/listar`)
  }

  deleteSintoma(id: string) {
    return this.httpClient.delete<ISintoma[]>(`${this.apiURL}/eliminar/${id}`);
  }

  nuevoSintoma(obj: ISintoma): any {
    return this.httpClient.post(`${this.apiURL}/agregar`,obj);
  }

   editarSintoma(obj: ISintoma): any {
    return this.httpClient.put(`${this.apiURL}/editar/${obj.idsintoma}` ,obj);
  }


  obtenerConsultas() {
    return this.httpClient.get<ISintoma[]>(this.apiURL+`/listar`); // Realizar la petición HTTP para obtener las consultas
  }
  obtenerSintoma() {
    return this.httpClient.get<any>(this.apiURL+`/listar`); // Realizar la petición HTTP para obtener las consultas
  }


}
