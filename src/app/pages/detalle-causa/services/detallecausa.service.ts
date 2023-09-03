import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { DetalleCausa, Enfermedad, Planta } from "../models/DetalleCausa";
import { TipoCausa } from "../../causa-enfermedad/models/TipoCausa";
import { catchError, map } from "rxjs/operators";
import swal from "sweetalert2";
import Swal from "sweetalert2";
const urlEndPoint: string = "http://localhost:8080/api/DetalleCausa";
@Injectable({
  providedIn: "root",
})
export class DetallecausaService {
  private urlEndPoints: string = "http://localhost:8080/detalleApi/detalle";

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) {}
  listaenfermedad(): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(urlEndPoint + "/enfermedad");
  }

  listatipocausa(): Observable<TipoCausa[]> {
    return this.http.get<TipoCausa[]>(urlEndPoint + "/tipoCausa");
  }
  getPlantas(): Observable<Planta[]> {
    return this.http.get<Planta[]>(urlEndPoint + "/plantas");
  }

  getDetalle(): Observable<DetalleCausa[]> {
    return this.http.get<DetalleCausa[]>(urlEndPoint + "/listar");
  }

  eliminar(id: String): Observable<DetalleCausa> {
    return this.http.delete<DetalleCausa>(`${urlEndPoint + "/eliminar"}/${id}`);
  }

  registrarDetalleCausa(detalle: DetalleCausa): Observable<DetalleCausa> {
    return this.http
      .post(urlEndPoint + "/guardar", detalle, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.detalle as DetalleCausa),
        catchError((e) => {

          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  modificar(detalle: DetalleCausa): Observable<any> {
    return this.http.put<any>(`${urlEndPoint + "/modificar"}`, detalle);
  }

  update(detalle: DetalleCausa): Observable<any> {
    return this.http
      .put<any>(`${urlEndPoint+"/detalle"}/${detalle.idDetalleCausa}`, detalle, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

}
