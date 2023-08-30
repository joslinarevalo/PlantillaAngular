import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnfermedad } from '../interfaces/IEnfermedad';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private apiURL = 'http://localhost:8080/enfermedad';

  constructor(private httpClient: HttpClient) { }

  get listaEnfermedades(){
    return this.httpClient.get<IEnfermedad[]>(`${this.apiURL}/listar`)
  }
}
