import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IEnfermedad } from '../interfaces/IEnfermedad';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AutenticacionService } from 'src/app/usuario/services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private urlAPI:string="http://localhost:8080/enfermedad/";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(
    private http:HttpClient,
    private router: Router,
    private autenticacionService: AutenticacionService) { }
  
  private agregarAutorizacionHeader(){
    let token = this.autenticacionService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token)
    }
  }

  private isNoAutorizado(error): boolean{
    if (error.status) {
      const estadoError = error.status;
      console.log("Estado del error: " + estadoError);
      this.isNoAutorizado(error);
      if(this.autenticacionService.isAuthenticated()){
        this.router.navigate(['/login']);
        return true;
      }
    } else {
      console.log("Error:", error || "Unknown Error"); // Imprime el mensaje de error si está disponible, de lo contrario, imprime "Unknown Error"
      if(this.autenticacionService.isAuthenticated()){
        this.router.navigate(['/login']);
        return true;
      }
    }
    if(error.estatus==401 || error.status ==403){
      this.router.navigate(['/login'])
      return true;
    }
    if(this.autenticacionService.isAuthenticated()){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  listaEnfermedades():Observable<IEnfermedad[]>{
    return this.http.get<IEnfermedad[]>(this.urlAPI+"listar",{headers: this.agregarAutorizacionHeader()}).pipe(
      //sino esta autorizado
      catchError(error => {
        this.isNoAutorizado(error);
        return throwError(error);
      })
    );
  }
  retornarImagen(urlImagen:string):Observable<Blob>{
    return this.http.get<Blob>(this.urlAPI+"imagen/"+urlImagen,{headers: this.agregarAutorizacionHeader()}).pipe(
       //sino esta autorizado
       catchError(error => {
        this.isNoAutorizado(error);
        return throwError(error);
      })
    );
  }
  getImagen(idimagen:any):Observable<Blob>{
     return this.http.get<Blob>(`${this.urlAPI}imagen/${idimagen}`,{
      headers: this.agregarAutorizacionHeader(),
      responseType:'blob' as 'json'
     });
  }
  
  guardar(obj:FormData):Observable<any>{
    let httpHeaders  = new HttpHeaders();
    let token = this.autenticacionService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Autorization','Bearer '+token);
    }

    return this.http.post<any>(this.urlAPI+"guardar",obj,{
      reportProgress: true,
      headers:httpHeaders
     });
  }
  modificar(obj:FormData):Observable<any>{
    /* let formData = new FormData();
    formData.append("enfermedad",obj); */

    let httpHeaders  = new HttpHeaders();
    let token = this.autenticacionService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }

    return this.http.put<any>(this.urlAPI+"modificar",obj,{
      reportProgress: true,
      headers:httpHeaders
     });
  }
  
  eliminar(obj:IEnfermedad):Observable<any>{
    return this.http.delete<any>(this.urlAPI+"eliminar/"+obj.idEnfermedad).pipe(
      catchError(error => {
        console.error('Error en la solicitud DELETE:', error);
        // Tratar el error de forma genérica
        if (error.status === 403) {
          console.log('Acceso prohibido');
          // Realizar acciones específicas para el error de acceso prohibido si es necesario
        } else {
          console.log('Error general');
          // Otras acciones para manejar errores generales
        }
        return throwError(error);
      })
    );
  }

  buscarEnfermedad(id:String):Observable<any>{
    return this.http.get<IEnfermedad>(this.urlAPI+"buscar/"+id);
  }

  obtenerConteoenfermedad(): Observable<number> {
    return this.http.get<number>(this.urlAPI + "contarEnfermedades");
  }

  longitudCampos():Observable<any>{
    return this.http.get<any>(this.urlAPI+"longitudCampos",{headers: this.agregarAutorizacionHeader()}).pipe(
      //sino esta autorizado
      catchError(error => {
       this.isNoAutorizado(error);
       return throwError(error);
     })
   );
  }
}
